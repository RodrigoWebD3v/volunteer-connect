import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import type { AnalisarOngDto } from './dto/analisar-ong.dto';
import type { ReenviarAnaliseOngDto } from './dto/reenviar-analise-ong.dto';

interface UsuarioLocal {
  id: string;
  nome_completo?: string | null;
  email: string;
  papel: 'voluntario' | 'ong' | 'admin';
  ativo?: boolean | null;
  conta_suspensa?: boolean | null;
}

type PerfilOngRow = Record<string, unknown>;
type StatusAnaliseOng = 'pendente' | 'aprovado' | 'reprovado';

@Injectable()
export class OngsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async listarPublicas() {
    const { data, error } = await this.supabaseService.adminClient
      .from('perfis_ongs')
      .select(
        'id,nome_fantasia,descricao,site_url,cidade,estado,logo_storage_path,status_analise,verificada,usuarios!perfis_ongs_usuario_gestor_id_fkey(ativo,conta_suspensa)',
      )
      .or('status_analise.eq.aprovado,verificada.eq.true')
      .order('nome_fantasia', { ascending: true });

    if (error) {
      throw new BadRequestException('Falha ao listar ONGs publicas.');
    }

    return (data ?? [])
      .filter((ong) => this.ongEstaPublica(ong as PerfilOngRow))
      .map((ong) => this.toPublicOng(ong as PerfilOngRow));
  }

  async detalharPublica(id: string) {
    const { data, error } = await this.supabaseService.adminClient
      .from('perfis_ongs')
      .select(
        'id,nome_fantasia,descricao,site_url,cidade,estado,logo_storage_path,status_analise,verificada,usuarios!perfis_ongs_usuario_gestor_id_fkey(ativo,conta_suspensa)',
      )
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new BadRequestException('Falha ao consultar ONG publica.');
    }

    if (!data || !this.ongEstaPublica(data)) {
      throw new NotFoundException('ONG nao encontrada.');
    }

    return this.toPublicOng(data);
  }

  async obterMinhaOng(accessToken: string) {
    const { usuario } = await this.obterUsuarioAtual(accessToken);
    this.garantirUsuarioOng(usuario);

    const perfil = await this.buscarPerfilDaOng(usuario.id);

    if (!perfil) {
      throw new NotFoundException('Perfil de ONG nao encontrado.');
    }

    return this.toOwnOng(perfil);
  }

  async reenviarAnalise(accessToken: string, input: ReenviarAnaliseOngDto) {
    const { usuario } = await this.obterUsuarioAtual(accessToken);
    this.garantirUsuarioOng(usuario);

    if (this.usuarioEstaSuspenso(usuario)) {
      throw new ForbiddenException('Conta suspensa nao pode reenviar analise.');
    }

    const perfil = await this.buscarPerfilDaOng(usuario.id);

    if (!perfil) {
      throw new NotFoundException('Perfil de ONG nao encontrado.');
    }

    if (perfil.status_analise !== 'reprovado') {
      throw new BadRequestException(
        'Apenas ONGs reprovadas podem reenviar analise.',
      );
    }

    const atualizacao = this.montarAtualizacaoReenvio(input);

    const { data, error } = await this.supabaseService.adminClient
      .from('perfis_ongs')
      .update(atualizacao)
      .eq('id', perfil.id)
      .select(
        'id,nome_fantasia,descricao,site_url,cidade,estado,logo_storage_path,status_analise,motivo_reprovacao,analisado_em,reenviado_em',
      )
      .maybeSingle();

    if (error || !data) {
      throw new BadRequestException('Falha ao reenviar ONG para analise.');
    }

    return this.toOwnOng(data);
  }

  async listarParaAnalise(accessToken: string, status?: string) {
    const { usuario } = await this.obterUsuarioAtual(accessToken);
    this.garantirUsuarioAdmin(usuario);

    const statusFiltro = this.normalizarStatusAnalise(status);
    let query = this.supabaseService.adminClient
      .from('perfis_ongs')
      .select(
        'id,usuario_gestor_id,nome_fantasia,cnpj,descricao,site_url,cidade,estado,logo_storage_path,status_analise,motivo_reprovacao,analisado_por_usuario_id,analisado_em,reenviado_em,criado_em,usuarios!perfis_ongs_usuario_gestor_id_fkey(email,ativo,conta_suspensa)',
      )
      .order('criado_em', { ascending: true });

    if (statusFiltro) {
      query = query.eq('status_analise', statusFiltro);
    }

    const { data, error } = await query;

    if (error) {
      throw new BadRequestException('Falha ao listar ONGs para analise.');
    }

    return (data ?? []).map((ong) => this.toAdminOng(ong as PerfilOngRow));
  }

  async aprovar(accessToken: string, id: string) {
    const { usuario } = await this.obterUsuarioAtual(accessToken);
    this.garantirUsuarioAdmin(usuario);

    return this.atualizarAnalise(id, {
      status_analise: 'aprovado',
      motivo_reprovacao: null,
      analisado_por_usuario_id: usuario.id,
      analisado_em: new Date().toISOString(),
    });
  }

  async reprovar(accessToken: string, id: string, input: AnalisarOngDto) {
    const { usuario } = await this.obterUsuarioAtual(accessToken);
    this.garantirUsuarioAdmin(usuario);

    const motivo = input.motivoReprovacao?.trim();

    if (!motivo) {
      throw new BadRequestException('Motivo de reprovacao e obrigatorio.');
    }

    return this.atualizarAnalise(id, {
      status_analise: 'reprovado',
      motivo_reprovacao: motivo,
      analisado_por_usuario_id: usuario.id,
      analisado_em: new Date().toISOString(),
    });
  }

  private async obterUsuarioAtual(accessToken: string) {
    if (!accessToken) {
      throw new UnauthorizedException('Token de acesso ausente.');
    }

    const { data: authData, error: authError } =
      await this.supabaseService.adminClient.auth.getUser(accessToken);

    if (authError || !authData.user) {
      throw new UnauthorizedException('Token invalido ou expirado.');
    }

    const usuario = await this.buscarUsuarioLocal(authData.user);

    return {
      authUser: authData.user,
      usuario,
    };
  }

  private async buscarUsuarioLocal(authUser: User): Promise<UsuarioLocal> {
    const { data, error } = await this.supabaseService.adminClient
      .from('usuarios')
      .select('id,nome_completo,email,papel,ativo,conta_suspensa')
      .eq('id', authUser.id)
      .maybeSingle();

    if (error) {
      throw new BadRequestException('Falha ao consultar usuario local.');
    }

    if (!data) {
      throw new UnauthorizedException('Usuario local nao encontrado.');
    }

    return data;
  }

  private async buscarPerfilDaOng(usuarioId: string) {
    const { data, error } = await this.supabaseService.adminClient
      .from('perfis_ongs')
      .select(
        'id,usuario_gestor_id,nome_fantasia,descricao,site_url,cidade,estado,logo_storage_path,status_analise,motivo_reprovacao,analisado_em,reenviado_em',
      )
      .eq('usuario_gestor_id', usuarioId)
      .maybeSingle();

    if (error) {
      throw new BadRequestException('Falha ao consultar perfil de ONG.');
    }

    return data as PerfilOngRow | null;
  }

  private garantirUsuarioOng(usuario: UsuarioLocal): void {
    if (usuario.papel !== 'ong') {
      throw new ForbiddenException('Acesso permitido apenas para ONG.');
    }
  }

  private garantirUsuarioAdmin(usuario: UsuarioLocal): void {
    if (usuario.papel !== 'admin' || this.usuarioEstaSuspenso(usuario)) {
      throw new ForbiddenException('Acesso permitido apenas para admin ativo.');
    }
  }

  private normalizarStatusAnalise(
    status?: string,
  ): StatusAnaliseOng | undefined {
    if (!status) {
      return undefined;
    }

    if (['pendente', 'aprovado', 'reprovado'].includes(status)) {
      return status as StatusAnaliseOng;
    }

    throw new BadRequestException('Status de analise invalido.');
  }

  private async atualizarAnalise(
    id: string,
    atualizacao: {
      status_analise: StatusAnaliseOng;
      motivo_reprovacao: string | null;
      analisado_por_usuario_id: string;
      analisado_em: string;
    },
  ) {
    const { data, error } = await this.supabaseService.adminClient
      .from('perfis_ongs')
      .update(atualizacao)
      .eq('id', id)
      .select(
        'id,usuario_gestor_id,nome_fantasia,cnpj,descricao,site_url,cidade,estado,logo_storage_path,status_analise,motivo_reprovacao,analisado_por_usuario_id,analisado_em,reenviado_em,criado_em',
      )
      .maybeSingle();

    if (error || !data) {
      throw new NotFoundException('ONG nao encontrada para analise.');
    }

    return this.toAdminOng(data);
  }

  private usuarioEstaSuspenso(usuario: UsuarioLocal): boolean {
    return usuario.conta_suspensa === true || usuario.ativo === false;
  }

  private ongEstaPublica(ong: PerfilOngRow): boolean {
    const usuarios = ong.usuarios as
      | { ativo?: boolean | null; conta_suspensa?: boolean | null }
      | { ativo?: boolean | null; conta_suspensa?: boolean | null }[]
      | undefined;
    const usuario = Array.isArray(usuarios) ? usuarios[0] : usuarios;
    const aprovada =
      ong.status_analise === 'aprovado' || ong.verificada === true;

    return (
      Boolean(usuario) &&
      aprovada &&
      usuario?.conta_suspensa !== true &&
      usuario?.ativo !== false
    );
  }

  private montarAtualizacaoReenvio(input: ReenviarAnaliseOngDto) {
    return {
      ...(input.nomeFantasia ? { nome_fantasia: input.nomeFantasia } : {}),
      ...(input.descricao !== undefined ? { descricao: input.descricao } : {}),
      ...(input.siteUrl !== undefined ? { site_url: input.siteUrl } : {}),
      ...(input.cidade !== undefined ? { cidade: input.cidade } : {}),
      ...(input.estado !== undefined
        ? { estado: input.estado.toUpperCase() }
        : {}),
      status_analise: 'pendente',
      motivo_reprovacao: null,
      analisado_por_usuario_id: null,
      analisado_em: null,
      reenviado_em: new Date().toISOString(),
    };
  }

  private toPublicOng(ong: PerfilOngRow) {
    return {
      id: ong.id,
      nomeFantasia: ong.nome_fantasia,
      descricao: ong.descricao,
      siteUrl: ong.site_url,
      cidade: ong.cidade,
      estado: ong.estado,
      logoStoragePath: ong.logo_storage_path,
      status: 'aprovado',
    };
  }

  private toOwnOng(ong: PerfilOngRow) {
    return {
      id: ong.id,
      nomeFantasia: ong.nome_fantasia,
      descricao: ong.descricao,
      siteUrl: ong.site_url,
      cidade: ong.cidade,
      estado: ong.estado,
      logoStoragePath: ong.logo_storage_path,
      statusAnalise: ong.status_analise,
      motivoReprovacao: ong.motivo_reprovacao,
      analisadoEm: ong.analisado_em,
      reenviadoEm: ong.reenviado_em,
    };
  }

  private toAdminOng(ong: PerfilOngRow) {
    return {
      id: ong.id,
      usuarioGestorId: ong.usuario_gestor_id,
      nomeFantasia: ong.nome_fantasia,
      cnpj: ong.cnpj,
      descricao: ong.descricao,
      siteUrl: ong.site_url,
      cidade: ong.cidade,
      estado: ong.estado,
      logoStoragePath: ong.logo_storage_path,
      statusAnalise: ong.status_analise,
      motivoReprovacao: ong.motivo_reprovacao,
      analisadoPorUsuarioId: ong.analisado_por_usuario_id,
      analisadoEm: ong.analisado_em,
      reenviadoEm: ong.reenviado_em,
      criadoEm: ong.criado_em,
    };
  }
}
