import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import type { FiltrarPresencasDto } from './dto/filtrar-presencas.dto';
import type { MarcarPresencaDto } from './dto/marcar-presenca.dto';

type Papel = 'voluntario' | 'ong' | 'admin';
type PresencaRow = Record<string, any>;

interface UsuarioLocal {
  id: string;
  papel: Papel;
  ativo?: boolean | null;
  conta_suspensa?: boolean | null;
}

@Injectable()
export class PresencasService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async marcar(
    accessToken: string,
    oportunidadeId: string,
    input: MarcarPresencaDto,
  ) {
    const { usuario, ong } = await this.obterOngAprovada(accessToken);
    const oportunidade = await this.buscarOportunidadeDaOngEncerrada(
      oportunidadeId,
      String(ong.id),
    );
    const inscricao = await this.buscarInscricaoAprovada(
      input.inscricaoId,
      String(oportunidade.id),
    );

    const payload = {
      inscricao_id: inscricao.id,
      oportunidade_id: oportunidade.id,
      voluntario_usuario_id: inscricao.voluntario_usuario_id,
      status: input.status,
      observacao: input.observacao?.trim() || null,
      registrado_por_usuario_id: usuario.id,
      registrado_em: new Date().toISOString(),
      atualizado_em: new Date().toISOString(),
    };

    const { data: existente, error: buscaError } =
      await this.supabaseService.adminClient
        .from('presencas')
        .select('id')
        .eq('inscricao_id', inscricao.id)
        .maybeSingle();

    if (buscaError) {
      throw new BadRequestException('Falha ao consultar presenca existente.');
    }

    const query = existente
      ? this.supabaseService.adminClient
          .from('presencas')
          .update(payload)
          .eq('id', existente.id)
      : this.supabaseService.adminClient.from('presencas').insert(payload);

    const { data, error } = await query
      .select(
        'id,inscricao_id,oportunidade_id,voluntario_usuario_id,status,observacao,registrado_em,criado_em,atualizado_em',
      )
      .maybeSingle();

    if (error || !data) {
      throw new BadRequestException('Falha ao registrar presenca.');
    }

    return this.toOng(this.asPresencaRow(data));
  }

  async listarDaOportunidade(
    accessToken: string,
    oportunidadeId: string,
    filtros: FiltrarPresencasDto = {},
  ) {
    const { ong } = await this.obterOngAprovada(accessToken);
    const oportunidade = await this.buscarOportunidadeDaOngEncerrada(
      oportunidadeId,
      String(ong.id),
    );

    const query = this.supabaseService.adminClient
      .from('inscricoes')
      .select(
        'id,oportunidade_id,voluntario_usuario_id,status,mensagem,usuarios!inscricoes_voluntario_usuario_id_fkey(id,nome_completo,email),presencas(id,status,observacao,registrado_em,atualizado_em)',
      )
      .eq('oportunidade_id', oportunidade.id)
      .eq('status', 'aprovada')
      .order('criado_em', { ascending: true });

    const { data, error } = await query;

    if (error) {
      throw new BadRequestException('Falha ao listar presencas.');
    }

    const linhas = (data ?? []).map((row) =>
      this.inscricaoComPresenca(this.asPresencaRow(row)),
    );

    if (filtros.status) {
      return linhas.filter((row) => row.presenca?.status === filtros.status);
    }

    return linhas;
  }

  async listarMinhas(accessToken: string) {
    const usuario = await this.obterUsuarioAtual(accessToken);

    if (usuario.papel !== 'voluntario') {
      throw new ForbiddenException(
        'Apenas voluntario pode acessar seu historico de presencas.',
      );
    }

    const query = this.supabaseService.adminClient
      .from('presencas')
      .select(
        'id,status,observacao,registrado_em,oportunidades(id,titulo,tipo_atividade,cidade,estado,data_inicio,data_fim,perfis_ongs(nome_fantasia))',
      )
      .eq('voluntario_usuario_id', usuario.id)
      .order('registrado_em', { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw new BadRequestException('Falha ao listar seu historico.');
    }

    return (data ?? []).map((row) =>
      this.toVoluntario(this.asPresencaRow(row)),
    );
  }

  private async buscarOportunidadeDaOngEncerrada(
    id: string,
    perfilOngId: string,
  ) {
    const { data, error } = await this.supabaseService.adminClient
      .from('oportunidades')
      .select('id,perfil_ong_id,status,data_fim')
      .eq('id', id)
      .eq('perfil_ong_id', perfilOngId)
      .maybeSingle();

    if (error || !data) {
      throw new NotFoundException('Oportunidade nao encontrada para esta ONG.');
    }

    const encerradaPorStatus = data.status === 'encerrada';
    const encerradaPorData = new Date(String(data.data_fim)) < new Date();

    if (!encerradaPorStatus && !encerradaPorData) {
      throw new BadRequestException(
        'Presenca so pode ser registrada apos conclusao da oportunidade.',
      );
    }

    return data as PresencaRow;
  }

  private async buscarInscricaoAprovada(id: string, oportunidadeId: string) {
    const { data, error } = await this.supabaseService.adminClient
      .from('inscricoes')
      .select('id,oportunidade_id,voluntario_usuario_id,status')
      .eq('id', id)
      .eq('oportunidade_id', oportunidadeId)
      .maybeSingle();

    if (error || !data) {
      throw new NotFoundException('Inscricao nao encontrada.');
    }

    if (data.status !== 'aprovada') {
      throw new BadRequestException(
        'Presenca exige inscricao aprovada na oportunidade.',
      );
    }

    return data as PresencaRow;
  }

  private async obterOngAprovada(accessToken: string) {
    const usuario = await this.obterUsuarioAtual(accessToken);

    if (usuario.papel !== 'ong' || this.usuarioEstaSuspenso(usuario)) {
      throw new ForbiddenException('Acesso permitido apenas para ONG ativa.');
    }

    const { data, error } = await this.supabaseService.adminClient
      .from('perfis_ongs')
      .select('id,usuario_gestor_id,status_analise')
      .eq('usuario_gestor_id', usuario.id)
      .eq('status_analise', 'aprovado')
      .maybeSingle();

    if (error || !data) {
      throw new ForbiddenException('ONG precisa estar aprovada.');
    }

    return { usuario, ong: data };
  }

  private async obterUsuarioAtual(accessToken: string): Promise<UsuarioLocal> {
    if (!accessToken) {
      throw new UnauthorizedException('Token de acesso ausente.');
    }

    const { data: authData, error: authError } =
      await this.supabaseService.adminClient.auth.getUser(accessToken);

    if (authError || !authData.user) {
      throw new UnauthorizedException('Token invalido ou expirado.');
    }

    const { data, error } = await this.supabaseService.adminClient
      .from('usuarios')
      .select('id,papel,ativo,conta_suspensa')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (error || !data) {
      throw new UnauthorizedException('Usuario local nao encontrado.');
    }

    return data as UsuarioLocal;
  }

  private usuarioEstaSuspenso(usuario: UsuarioLocal): boolean {
    return usuario.conta_suspensa === true || usuario.ativo === false;
  }

  private asPresencaRow(row: unknown): PresencaRow {
    return row as PresencaRow;
  }

  private inscricaoComPresenca(row: PresencaRow) {
    const usuario = Array.isArray(row.usuarios)
      ? row.usuarios[0]
      : row.usuarios;
    const presenca = Array.isArray(row.presencas)
      ? row.presencas[0]
      : row.presencas;

    return {
      inscricaoId: row.id,
      oportunidadeId: row.oportunidade_id,
      statusInscricao: row.status,
      voluntario: usuario
        ? {
            id: usuario.id,
            nomeCompleto: usuario.nome_completo,
            email: usuario.email,
          }
        : null,
      presenca: presenca
        ? {
            id: presenca.id,
            status: presenca.status,
            observacao: presenca.observacao,
            registradoEm: presenca.registrado_em,
            atualizadoEm: presenca.atualizado_em,
          }
        : null,
    };
  }

  private toOng(row: PresencaRow) {
    return {
      id: row.id,
      inscricaoId: row.inscricao_id,
      oportunidadeId: row.oportunidade_id,
      voluntarioUsuarioId: row.voluntario_usuario_id,
      status: row.status,
      observacao: row.observacao,
      registradoEm: row.registrado_em,
      criadoEm: row.criado_em,
      atualizadoEm: row.atualizado_em,
    };
  }

  private toVoluntario(row: PresencaRow) {
    const oportunidade = Array.isArray(row.oportunidades)
      ? row.oportunidades[0]
      : row.oportunidades;
    const ong = Array.isArray(oportunidade?.perfis_ongs)
      ? oportunidade.perfis_ongs[0]
      : oportunidade?.perfis_ongs;

    return {
      id: row.id,
      status: row.status,
      observacao: row.observacao,
      registradoEm: row.registrado_em,
      oportunidade: oportunidade
        ? {
            id: oportunidade.id,
            titulo: oportunidade.titulo,
            tipoAtividade: oportunidade.tipo_atividade,
            cidade: oportunidade.cidade,
            estado: oportunidade.estado,
            dataInicio: oportunidade.data_inicio,
            dataFim: oportunidade.data_fim,
            ong: ong?.nome_fantasia ?? null,
          }
        : null,
    };
  }
}
