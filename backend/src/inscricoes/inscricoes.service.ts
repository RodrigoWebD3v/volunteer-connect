import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OportunidadesService } from '../oportunidades/oportunidades.service';
import { SupabaseService } from '../supabase/supabase.service';
import type { AvaliarInscricaoDto } from './dto/avaliar-inscricao.dto';
import type { CriarInscricaoDto } from './dto/criar-inscricao.dto';
import type { FiltrarInscricoesDto } from './dto/filtrar-inscricoes.dto';

type Papel = 'voluntario' | 'ong' | 'admin';

interface UsuarioLocal {
  id: string;
  papel: Papel;
  ativo?: boolean | null;
  conta_suspensa?: boolean | null;
}

type InscricaoRow = Record<string, any>;

@Injectable()
export class InscricoesService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly oportunidadesService: OportunidadesService,
  ) {}

  async criar(
    accessToken: string,
    oportunidadeId: string,
    input: CriarInscricaoDto,
  ) {
    const usuario = await this.obterUsuarioAtual(accessToken);
    this.garantirVoluntarioAtivo(usuario);

    const oportunidade =
      await this.oportunidadesService.buscarPublicadaDisponivel(oportunidadeId);
    const aprovadas =
      await this.oportunidadesService.contarInscricoesAprovadas(oportunidadeId);

    if (aprovadas >= Number(oportunidade.quantidade_vagas)) {
      throw new BadRequestException('Nao ha vagas disponiveis.');
    }

    const { data, error } = await this.supabaseService.adminClient
      .from('inscricoes')
      .insert({
        oportunidade_id: oportunidadeId,
        voluntario_usuario_id: usuario.id,
        mensagem: input.mensagem?.trim() || null,
        status: 'pendente',
      })
      .select(
        'id,oportunidade_id,voluntario_usuario_id,status,mensagem,observacao_ong,criado_em,atualizado_em',
      )
      .maybeSingle();

    if (error?.code === '23505') {
      throw new ConflictException('Voce ja se inscreveu nesta oportunidade.');
    }

    if (error || !data) {
      throw new BadRequestException('Falha ao criar inscricao.');
    }

    return this.toVolunteer(this.asInscricaoRow(data));
  }

  async listarMinhas(accessToken: string, filtros: FiltrarInscricoesDto = {}) {
    const usuario = await this.obterUsuarioAtual(accessToken);
    this.garantirVoluntarioAtivo(usuario);

    let query = this.supabaseService.adminClient
      .from('inscricoes')
      .select(
        'id,oportunidade_id,voluntario_usuario_id,status,mensagem,observacao_ong,criado_em,atualizado_em,oportunidades(id,titulo,cidade,estado,data_inicio,data_fim,perfis_ongs(nome_fantasia))',
      )
      .eq('voluntario_usuario_id', usuario.id)
      .order('criado_em', { ascending: false });

    if (filtros.status) {
      query = query.eq('status', filtros.status);
    }

    const { data, error } = await query;

    if (error) {
      throw new BadRequestException('Falha ao listar suas inscricoes.');
    }

    return (data ?? []).map((row) =>
      this.toVolunteer(this.asInscricaoRow(row)),
    );
  }

  async cancelar(accessToken: string, id: string) {
    const usuario = await this.obterUsuarioAtual(accessToken);
    this.garantirVoluntarioAtivo(usuario);

    const { data: inscricao, error: buscaError } =
      await this.supabaseService.adminClient
        .from('inscricoes')
        .select('id,status,voluntario_usuario_id')
        .eq('id', id)
        .eq('voluntario_usuario_id', usuario.id)
        .maybeSingle();

    if (buscaError || !inscricao) {
      throw new NotFoundException('Inscricao nao encontrada.');
    }

    if (inscricao.status !== 'pendente') {
      throw new BadRequestException(
        'Apenas inscricoes pendentes podem ser canceladas.',
      );
    }

    const { data, error } = await this.supabaseService.adminClient
      .from('inscricoes')
      .update({ status: 'cancelada', atualizado_em: new Date().toISOString() })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error || !data) {
      throw new BadRequestException('Falha ao cancelar inscricao.');
    }

    return this.toVolunteer(this.asInscricaoRow(data));
  }

  async listarDaOportunidade(
    accessToken: string,
    oportunidadeId: string,
    filtros: FiltrarInscricoesDto = {},
  ) {
    const { ong } = await this.obterOngAprovada(accessToken);
    await this.oportunidadesService.buscarOportunidadeDaOng(
      oportunidadeId,
      String(ong.id),
    );

    let query = this.supabaseService.adminClient
      .from('inscricoes')
      .select(
        'id,oportunidade_id,voluntario_usuario_id,status,mensagem,observacao_ong,criado_em,atualizado_em,usuarios!inscricoes_voluntario_usuario_id_fkey(id,nome_completo,email)',
      )
      .eq('oportunidade_id', oportunidadeId)
      .order('criado_em', { ascending: true });

    if (filtros.status) {
      query = query.eq('status', filtros.status);
    }

    const { data, error } = await query;

    if (error) {
      throw new BadRequestException('Falha ao listar inscricoes.');
    }

    return (data ?? []).map((row) => this.toOng(this.asInscricaoRow(row)));
  }

  async avaliar(accessToken: string, id: string, input: AvaliarInscricaoDto) {
    const { ong } = await this.obterOngAprovada(accessToken);
    const inscricao = await this.buscarInscricaoParaOng(id, String(ong.id));

    if (inscricao.status !== 'pendente') {
      throw new BadRequestException('Apenas inscricoes pendentes podem mudar.');
    }

    if (input.status === 'aprovada') {
      return this.aprovarComControleDeVaga(id, input.observacaoOng);
    }

    const { data, error } = await this.supabaseService.adminClient
      .from('inscricoes')
      .update({
        status: input.status,
        observacao_ong: input.observacaoOng?.trim() || null,
        atualizado_em: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error || !data) {
      throw new BadRequestException('Falha ao avaliar inscricao.');
    }

    return this.toOng(this.asInscricaoRow(data));
  }

  private async aprovarComControleDeVaga(id: string, observacaoOng?: string) {
    const { data, error } = await this.supabaseService.adminClient.rpc(
      'aprovar_inscricao_com_vaga',
      {
        p_inscricao_id: id,
        p_observacao_ong: observacaoOng?.trim() || null,
      },
    );

    if (error) {
      if (error.message.includes('sem_vagas_disponiveis')) {
        throw new BadRequestException('Nao ha vagas disponiveis.');
      }

      throw new BadRequestException('Falha ao aprovar inscricao.');
    }

    const inscricao = Array.isArray(data) ? data[0] : data;

    if (!inscricao) {
      throw new BadRequestException('Falha ao aprovar inscricao.');
    }

    return this.toOng(this.asInscricaoRow(inscricao));
  }

  private async buscarInscricaoParaOng(id: string, perfilOngId: string) {
    const { data, error } = await this.supabaseService.adminClient
      .from('inscricoes')
      .select(
        'id,oportunidade_id,status,oportunidades!inner(id,perfil_ong_id,quantidade_vagas)',
      )
      .eq('id', id)
      .eq('oportunidades.perfil_ong_id', perfilOngId)
      .maybeSingle();

    if (error || !data) {
      throw new NotFoundException('Inscricao nao encontrada para esta ONG.');
    }

    return data as InscricaoRow;
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

  private garantirVoluntarioAtivo(usuario: UsuarioLocal): void {
    if (usuario.papel !== 'voluntario' || this.usuarioEstaSuspenso(usuario)) {
      throw new ForbiddenException(
        'Apenas voluntario ativo pode gerenciar inscricoes.',
      );
    }
  }

  private usuarioEstaSuspenso(usuario: UsuarioLocal): boolean {
    return usuario.conta_suspensa === true || usuario.ativo === false;
  }

  private asInscricaoRow(row: unknown): InscricaoRow {
    return row as InscricaoRow;
  }

  private toVolunteer(row: InscricaoRow) {
    return {
      id: row.id,
      oportunidadeId: row.oportunidade_id,
      status: row.status,
      mensagem: row.mensagem,
      observacaoOng: row.observacao_ong,
      criadoEm: row.criado_em,
      atualizadoEm: row.atualizado_em,
      contato: 'A ONG entrara em contato pelos dados informados no cadastro.',
      oportunidade: row.oportunidades
        ? {
            id: row.oportunidades.id,
            titulo: row.oportunidades.titulo,
            cidade: row.oportunidades.cidade,
            estado: row.oportunidades.estado,
            dataInicio: row.oportunidades.data_inicio,
            dataFim: row.oportunidades.data_fim,
            ong: row.oportunidades.perfis_ongs?.nome_fantasia,
          }
        : undefined,
    };
  }

  private toOng(row: InscricaoRow) {
    const usuario = Array.isArray(row.usuarios)
      ? row.usuarios[0]
      : row.usuarios;

    return {
      id: row.id,
      oportunidadeId: row.oportunidade_id,
      voluntarioUsuarioId: row.voluntario_usuario_id,
      status: row.status,
      mensagem: row.mensagem,
      observacaoOng: row.observacao_ong,
      criadoEm: row.criado_em,
      atualizadoEm: row.atualizado_em,
      voluntario: usuario
        ? {
            id: usuario.id,
            nomeCompleto: usuario.nome_completo,
            email: usuario.email,
          }
        : null,
    };
  }
}
