import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import type { AtualizarOportunidadeDto } from './dto/atualizar-oportunidade.dto';
import type { CriarOportunidadeDto } from './dto/criar-oportunidade.dto';
import type { FiltrarOportunidadesDto } from './dto/filtrar-oportunidades.dto';

type Papel = 'voluntario' | 'ong' | 'admin';
type StatusOportunidade = 'rascunho' | 'publicada' | 'encerrada' | 'cancelada';

interface UsuarioLocal {
  id: string;
  papel: Papel;
  ativo?: boolean | null;
  conta_suspensa?: boolean | null;
}

interface PerfilOng {
  id: string;
  usuario_gestor_id: string;
  nome_fantasia?: string | null;
  logo_storage_path?: string | null;
  status_analise?: string | null;
  usuarios?: { ativo?: boolean | null; conta_suspensa?: boolean | null } | null;
}

type OportunidadeRow = Record<string, any>;

@Injectable()
export class OportunidadesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async listarPublicas(filtros: FiltrarOportunidadesDto = {}) {
    const hoje = new Date().toISOString();
    const status: StatusOportunidade =
      filtros.historico === 'true' ? 'encerrada' : 'publicada';

    let query = this.supabaseService.adminClient
      .from('oportunidades')
      .select(
        'id,perfil_ong_id,titulo,descricao,tipo_atividade,cidade,estado,data_inicio,data_fim,prazo_inscricao,quantidade_vagas,status,criado_em,perfis_ongs!oportunidades_perfil_ong_id_fkey(id,nome_fantasia,logo_storage_path,status_analise,usuarios!perfis_ongs_usuario_gestor_id_fkey(ativo,conta_suspensa))',
      )
      .eq('status', status)
      .order('data_inicio', { ascending: true });

    if (status === 'publicada') {
      query = query.gte('data_fim', hoje);
    }

    if (filtros.cidade) {
      query = query.ilike('cidade', `%${filtros.cidade}%`);
    }
    if (filtros.estado) {
      query = query.eq('estado', filtros.estado.toUpperCase());
    }
    if (filtros.tipoAtividade) {
      query = query.ilike('tipo_atividade', `%${filtros.tipoAtividade}%`);
    }
    if (filtros.data) {
      query = query.gte('data_inicio', filtros.data);
    }
    if (filtros.busca) {
      const busca = filtros.busca.replaceAll(',', ' ');
      query = query.or(`titulo.ilike.%${busca}%,descricao.ilike.%${busca}%`);
    }

    const { data, error } = await query;

    if (error) {
      throw new BadRequestException('Falha ao listar oportunidades.');
    }

    return (data ?? [])
      .filter((row) => this.ongEstaAprovadaENaoSuspensa(row.perfis_ongs))
      .map((row) => this.toPublic(this.asOportunidadeRow(row)));
  }

  async detalharPublica(id: string) {
    const { data, error } = await this.supabaseService.adminClient
      .from('oportunidades')
      .select(
        'id,perfil_ong_id,titulo,descricao,tipo_atividade,cidade,estado,data_inicio,data_fim,prazo_inscricao,quantidade_vagas,status,criado_em,perfis_ongs!oportunidades_perfil_ong_id_fkey(id,nome_fantasia,logo_storage_path,status_analise,usuarios!perfis_ongs_usuario_gestor_id_fkey(ativo,conta_suspensa))',
      )
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new BadRequestException('Falha ao consultar oportunidade.');
    }

    if (
      !data ||
      !['publicada', 'encerrada'].includes(String(data.status)) ||
      !this.ongEstaAprovadaENaoSuspensa(data.perfis_ongs)
    ) {
      throw new NotFoundException('Oportunidade nao encontrada.');
    }

    return this.toPublic(this.asOportunidadeRow(data));
  }

  async listarMinhas(accessToken: string) {
    const { ong } = await this.obterOngAprovada(accessToken);
    const { data, error } = await this.supabaseService.adminClient
      .from('oportunidades')
      .select(
        'id,perfil_ong_id,titulo,descricao,tipo_atividade,cidade,estado,data_inicio,data_fim,prazo_inscricao,quantidade_vagas,status,criado_em',
      )
      .eq('perfil_ong_id', ong.id)
      .order('criado_em', { ascending: false });

    if (error) {
      throw new BadRequestException('Falha ao listar oportunidades da ONG.');
    }

    return (data ?? []).map((row) => this.toOwn(this.asOportunidadeRow(row)));
  }

  async detalharMinha(accessToken: string, id: string) {
    const { ong } = await this.obterOngAprovada(accessToken);
    const oportunidade = await this.buscarOportunidadeDaOng(id, ong.id);

    return this.toOwn(oportunidade);
  }

  async criar(accessToken: string, input: CriarOportunidadeDto) {
    const { ong } = await this.obterOngAprovada(accessToken);
    this.validarDatas(input.dataInicio, input.dataFim, input.prazoInscricao);

    const { data, error } = await this.supabaseService.adminClient
      .from('oportunidades')
      .insert({
        perfil_ong_id: ong.id,
        titulo: input.titulo.trim(),
        descricao: input.descricao.trim(),
        tipo_atividade: input.tipoAtividade.trim(),
        cidade: input.cidade.trim(),
        estado: input.estado.toUpperCase(),
        data_inicio: input.dataInicio,
        data_fim: input.dataFim,
        prazo_inscricao: input.prazoInscricao,
        quantidade_vagas: input.quantidadeVagas,
        status: input.status ?? 'rascunho',
      })
      .select()
      .maybeSingle();

    if (error || !data) {
      throw new BadRequestException(
        this.mensagemErroCriarOportunidade(error?.message),
      );
    }

    return this.toOwn(this.asOportunidadeRow(data));
  }

  async atualizar(
    accessToken: string,
    id: string,
    input: AtualizarOportunidadeDto,
  ) {
    const { ong } = await this.obterOngAprovada(accessToken);
    const atualizacao = this.montarAtualizacao(input);

    if (
      atualizacao.data_inicio ||
      atualizacao.data_fim ||
      atualizacao.prazo_inscricao
    ) {
      const atual = await this.buscarOportunidadeDaOng(id, ong.id);
      this.validarDatas(
        String(atualizacao.data_inicio ?? atual.data_inicio),
        String(atualizacao.data_fim ?? atual.data_fim),
        String(atualizacao.prazo_inscricao ?? atual.prazo_inscricao),
      );
    }

    const { data, error } = await this.supabaseService.adminClient
      .from('oportunidades')
      .update({ ...atualizacao, atualizado_em: new Date().toISOString() })
      .eq('id', id)
      .eq('perfil_ong_id', ong.id)
      .select()
      .maybeSingle();

    if (error || !data) {
      throw new NotFoundException('Oportunidade nao encontrada para esta ONG.');
    }

    return this.toOwn(this.asOportunidadeRow(data));
  }

  async encerrarExpiradas() {
    const { error, count } = await this.supabaseService.adminClient
      .from('oportunidades')
      .update({
        status: 'encerrada',
        atualizado_em: new Date().toISOString(),
      })
      .eq('status', 'publicada')
      .lt('data_fim', new Date().toISOString());

    if (error) {
      throw new BadRequestException('Falha ao encerrar oportunidades.');
    }

    return { atualizadas: count ?? 0 };
  }

  async buscarPublicadaDisponivel(id: string) {
    const oportunidade = await this.buscarOportunidadePublica(id);

    if (new Date(String(oportunidade.prazo_inscricao)) < new Date()) {
      throw new BadRequestException('Prazo de inscricao encerrado.');
    }

    return oportunidade;
  }

  async buscarOportunidadeDaOng(id: string, perfilOngId: string) {
    const { data, error } = await this.supabaseService.adminClient
      .from('oportunidades')
      .select('*')
      .eq('id', id)
      .eq('perfil_ong_id', perfilOngId)
      .maybeSingle();

    if (error || !data) {
      throw new NotFoundException('Oportunidade nao encontrada para esta ONG.');
    }

    return data as OportunidadeRow;
  }

  private async buscarOportunidadePublica(id: string) {
    const { data, error } = await this.supabaseService.adminClient
      .from('oportunidades')
      .select(
        '*,perfis_ongs!oportunidades_perfil_ong_id_fkey(id,nome_fantasia,status_analise,usuarios!perfis_ongs_usuario_gestor_id_fkey(ativo,conta_suspensa))',
      )
      .eq('id', id)
      .eq('status', 'publicada')
      .maybeSingle();

    if (error || !data || !this.ongEstaAprovadaENaoSuspensa(data.perfis_ongs)) {
      throw new NotFoundException('Oportunidade indisponivel.');
    }

    return data as OportunidadeRow;
  }

  async contarInscricoesAprovadas(oportunidadeId: string) {
    const { count, error } = await this.supabaseService.adminClient
      .from('inscricoes')
      .select('id', { count: 'exact', head: true })
      .eq('oportunidade_id', oportunidadeId)
      .eq('status', 'aprovada');

    if (error) {
      throw new BadRequestException('Falha ao consultar vagas.');
    }

    return count ?? 0;
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

    return { usuario, ong: data as PerfilOng };
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

  private ongEstaAprovadaENaoSuspensa(ong: any): boolean {
    const perfil = Array.isArray(ong) ? ong[0] : ong;
    const usuario = Array.isArray(perfil?.usuarios)
      ? perfil.usuarios[0]
      : perfil?.usuarios;

    return (
      perfil?.status_analise === 'aprovado' &&
      usuario?.conta_suspensa !== true &&
      usuario?.ativo !== false
    );
  }

  private validarDatas(
    dataInicio: string,
    dataFim: string,
    prazoInscricao: string,
  ): void {
    if (new Date(dataFim) < new Date(dataInicio)) {
      throw new BadRequestException(
        'Data final precisa ser igual ou posterior ao inicio.',
      );
    }

    if (new Date(prazoInscricao) > new Date(dataInicio)) {
      throw new BadRequestException(
        'Prazo de inscricao precisa terminar ate a data de inicio.',
      );
    }
  }

  private mensagemErroCriarOportunidade(message?: string): string {
    const normalized = message?.toLowerCase() ?? '';

    if (
      normalized.includes('schema cache') ||
      normalized.includes('column') ||
      normalized.includes('perfil_ong_id') ||
      normalized.includes('tipo_atividade') ||
      normalized.includes('quantidade_vagas') ||
      normalized.includes('prazo_inscricao')
    ) {
      return 'O banco de dados de oportunidades nao esta sincronizado com o backend. Recarregue o schema do Supabase ou aplique a migration mais recente.';
    }

    if (
      normalized.includes('oportunidades_prazo_check') ||
      normalized.includes('oportunidades_datas_check')
    ) {
      return 'Revise as datas: o prazo de inscricao deve terminar ate o inicio, e a data final deve ser igual ou posterior ao inicio.';
    }

    if (
      normalized.includes('foreign key') ||
      normalized.includes('perfil_ong_id')
    ) {
      return 'Nao foi possivel vincular a oportunidade a ONG aprovada. Saia, entre novamente e tente de novo.';
    }

    if (normalized.includes('status')) {
      return 'Status de oportunidade invalido.';
    }

    return 'Falha ao criar oportunidade. Confira os campos e tente novamente.';
  }

  private montarAtualizacao(input: AtualizarOportunidadeDto) {
    return {
      ...(input.titulo !== undefined ? { titulo: input.titulo.trim() } : {}),
      ...(input.descricao !== undefined
        ? { descricao: input.descricao.trim() }
        : {}),
      ...(input.tipoAtividade !== undefined
        ? { tipo_atividade: input.tipoAtividade.trim() }
        : {}),
      ...(input.cidade !== undefined ? { cidade: input.cidade.trim() } : {}),
      ...(input.estado !== undefined
        ? { estado: input.estado.toUpperCase() }
        : {}),
      ...(input.dataInicio !== undefined
        ? { data_inicio: input.dataInicio }
        : {}),
      ...(input.dataFim !== undefined ? { data_fim: input.dataFim } : {}),
      ...(input.prazoInscricao !== undefined
        ? { prazo_inscricao: input.prazoInscricao }
        : {}),
      ...(input.quantidadeVagas !== undefined
        ? { quantidade_vagas: input.quantidadeVagas }
        : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
    };
  }

  private asOportunidadeRow(row: unknown): OportunidadeRow {
    return row as OportunidadeRow;
  }

  private toPublic(row: OportunidadeRow) {
    const ong = Array.isArray(row.perfis_ongs)
      ? row.perfis_ongs[0]
      : row.perfis_ongs;
    const prazoAberto = new Date(String(row.prazo_inscricao)) >= new Date();

    return {
      id: row.id,
      titulo: row.titulo,
      descricao: row.descricao,
      tipoAtividade: row.tipo_atividade,
      cidade: row.cidade,
      estado: row.estado,
      dataInicio: row.data_inicio,
      dataFim: row.data_fim,
      prazoInscricao: row.prazo_inscricao,
      quantidadeVagas: row.quantidade_vagas,
      status: row.status,
      prazoAberto,
      ctaStatus: prazoAberto ? 'inscricao_aberta' : 'prazo_encerrado',
      ong: ong
        ? {
            id: ong.id,
            nomeFantasia: ong.nome_fantasia,
            logoStoragePath: ong.logo_storage_path,
          }
        : null,
    };
  }

  private toOwn(row: OportunidadeRow) {
    return {
      id: row.id,
      titulo: row.titulo,
      descricao: row.descricao,
      tipoAtividade: row.tipo_atividade,
      cidade: row.cidade,
      estado: row.estado,
      dataInicio: row.data_inicio,
      dataFim: row.data_fim,
      prazoInscricao: row.prazo_inscricao,
      quantidadeVagas: row.quantidade_vagas,
      status: row.status,
      criadoEm: row.criado_em,
    };
  }
}
