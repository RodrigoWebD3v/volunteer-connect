import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';

export type TipoCadastro = 'voluntario' | 'ong';

export interface RegistrarUsuarioInput {
  nomeCompleto: string;
  email: string;
  password: string;
  tipoCadastro: TipoCadastro;
  telefone?: string;
  cidade?: string;
  estado?: string;
  biografia?: string;
  cpf?: string;
  nomeFantasia?: string;
  cnpj?: string;
  descricaoOng?: string;
  siteUrl?: string;
  logoDataUrl?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async registrar(input: RegistrarUsuarioInput): Promise<User> {
    const normalizedInput = this.normalizarCadastro(input);
    const { data, error } =
      await this.supabaseService.adminClient.auth.admin.createUser({
        email: normalizedInput.email,
        password: normalizedInput.password,
        email_confirm: true,
        user_metadata: {
          nome_completo: normalizedInput.nomeCompleto,
          tipo_cadastro: normalizedInput.tipoCadastro,
        },
      });

    if (error || !data.user) {
      throw new BadRequestException(this.mensagemCadastroAuth(error?.message));
    }

    try {
      await this.criarRegistrosLocaisPosCadastro(data.user.id, normalizedInput);
    } catch (erro) {
      await this.supabaseService.adminClient.auth.admin.deleteUser(
        data.user.id,
      );
      throw erro;
    }

    return data.user;
  }

  async obterSessaoAtual(accessToken: string) {
    const { data: authData, error: authError } =
      await this.supabaseService.adminClient.auth.getUser(accessToken);

    if (authError || !authData.user) {
      throw new UnauthorizedException('Token invalido ou expirado.');
    }

    const { data: usuario, error: usuarioError } =
      await this.supabaseService.adminClient
        .from('usuarios')
        .select('id,nome_completo,email,papel,ativo,conta_suspensa')
        .eq('id', authData.user.id)
        .maybeSingle();

    if (usuarioError) {
      throw new BadRequestException('Falha ao consultar usuario local.');
    }

    if (!usuario) {
      return {
        authUser: authData.user,
        usuario: null,
        perfil: null,
      };
    }

    if (usuario.papel === 'voluntario') {
      const { data: perfilVoluntario, error: perfilError } =
        await this.supabaseService.adminClient
          .from('perfis_voluntarios')
          .select('id,usuario_id,telefone,cidade,estado,biografia')
          .eq('usuario_id', usuario.id)
          .maybeSingle();

      if (perfilError) {
        throw new BadRequestException(
          'Falha ao consultar perfil de voluntario.',
        );
      }

      return {
        authUser: authData.user,
        usuario,
        perfil: perfilVoluntario,
      };
    }

    if (usuario.papel === 'admin') {
      return {
        authUser: authData.user,
        usuario,
        perfil: null,
      };
    }

    const { data: perfilOng, error: perfilError } =
      await this.supabaseService.adminClient
        .from('perfis_ongs')
        .select(
          'id,usuario_gestor_id,nome_fantasia,cnpj,descricao,site_url,cidade,estado,verificada,logo_storage_path,status_analise,motivo_reprovacao,analisado_em,reenviado_em',
        )
        .eq('usuario_gestor_id', usuario.id)
        .maybeSingle();

    if (perfilError) {
      throw new BadRequestException('Falha ao consultar perfil de ONG.');
    }

    return {
      authUser: authData.user,
      usuario,
      perfil: perfilOng,
    };
  }

  private async criarRegistrosLocaisPosCadastro(
    userId: string,
    input: RegistrarUsuarioInput,
  ): Promise<void> {
    const { error: erroUsuario } = await this.supabaseService.adminClient
      .from('usuarios')
      .insert({
        id: userId,
        nome_completo: input.nomeCompleto,
        email: input.email,
        papel: input.tipoCadastro,
        ativo: true,
      });

    if (erroUsuario) {
      throw new BadRequestException(
        this.mensagemCadastroDominio('usuario', erroUsuario.message),
      );
    }

    if (input.tipoCadastro === 'voluntario') {
      const { error } = await this.supabaseService.adminClient
        .from('perfis_voluntarios')
        .insert({
          usuario_id: userId,
          cpf: input.cpf ?? null,
          telefone: input.telefone ?? null,
          cidade: input.cidade ?? null,
          estado: input.estado ?? null,
          biografia: input.biografia ?? null,
        });

      if (error) {
        throw new BadRequestException(
          this.mensagemCadastroDominio('voluntario', error.message),
        );
      }

      return;
    }

    const logoStoragePath = await this.salvarLogoOng(userId, input.logoDataUrl);

    const { error } = await this.supabaseService.adminClient
      .from('perfis_ongs')
      .insert({
        usuario_gestor_id: userId,
        nome_fantasia: input.nomeFantasia,
        cnpj: input.cnpj,
        logo_storage_path: logoStoragePath,
        status_analise: 'pendente',
        descricao: input.descricaoOng ?? null,
        site_url: input.siteUrl ?? null,
        cidade: input.cidade ?? null,
        estado: input.estado ?? null,
      });

    if (error) {
      throw new BadRequestException(
        this.mensagemCadastroDominio('ong', error.message),
      );
    }
  }

  private mensagemCadastroAuth(message?: string): string {
    const normalized = message?.toLowerCase() ?? '';

    if (normalized.includes('already') || normalized.includes('registered')) {
      return 'Este email ja esta cadastrado. Tente entrar ou recuperar a senha.';
    }

    if (normalized.includes('password')) {
      return 'A senha nao atende aos requisitos do provedor de autenticacao.';
    }

    return 'Nao foi possivel criar a conta no Supabase Auth. Verifique email, senha e configuracao do projeto.';
  }

  private mensagemCadastroDominio(
    tipo: 'usuario' | 'voluntario' | 'ong',
    message: string,
  ): string {
    const normalized = message.toLowerCase();

    if (normalized.includes('duplicate') || normalized.includes('unique')) {
      if (normalized.includes('cnpj')) {
        return 'Ja existe uma ONG cadastrada com este CNPJ.';
      }

      if (normalized.includes('cpf')) {
        return 'Ja existe um voluntario cadastrado com este CPF.';
      }

      return 'Ja existe uma conta cadastrada com estes dados.';
    }

    if (
      normalized.includes('column') ||
      normalized.includes('schema cache') ||
      normalized.includes('status_analise') ||
      normalized.includes('logo_storage_path')
    ) {
      return 'O banco de dados nao esta atualizado para cadastro completo de ONG. Revise e aplique a migration `0006_cadastro_completo.sql` no Supabase remoto.';
    }

    if (normalized.includes('violates foreign key')) {
      return 'Nao foi possivel vincular os registros da conta. Verifique se as migrations base foram aplicadas.';
    }

    if (tipo === 'ong') {
      return 'Nao foi possivel criar o perfil da ONG. Verifique CNPJ, logo e migrations do Supabase.';
    }

    if (tipo === 'voluntario') {
      return 'Nao foi possivel criar o perfil de voluntario. Verifique CPF e migrations do Supabase.';
    }

    return 'Nao foi possivel criar o registro local do usuario. Verifique as migrations do Supabase.';
  }

  private normalizarCadastro(input: RegistrarUsuarioInput) {
    const email = input.email.trim().toLowerCase();
    const cpf = input.cpf?.replace(/\D/g, '');
    const cnpj = input.cnpj?.replace(/\D/g, '');

    if (input.tipoCadastro === 'voluntario' && cpf?.length !== 11) {
      throw new BadRequestException('CPF deve conter 11 digitos.');
    }

    if (input.tipoCadastro === 'ong' && cnpj?.length !== 14) {
      throw new BadRequestException('CNPJ deve conter 14 digitos.');
    }

    if (input.tipoCadastro === 'ong' && !input.logoDataUrl) {
      throw new BadRequestException('Logo da ONG e obrigatoria.');
    }

    return {
      ...input,
      email,
      cpf,
      cnpj,
      nomeCompleto: input.nomeCompleto.trim(),
      nomeFantasia: input.nomeFantasia?.trim(),
      telefone: input.telefone?.trim(),
      cidade: input.cidade?.trim(),
      estado: input.estado?.trim().toUpperCase(),
      biografia: input.biografia?.trim(),
      descricaoOng: input.descricaoOng?.trim(),
      siteUrl: input.siteUrl?.trim(),
    };
  }

  private async salvarLogoOng(
    userId: string,
    logoDataUrl?: string,
  ): Promise<string | null> {
    if (!logoDataUrl) {
      return null;
    }

    const match = logoDataUrl.match(
      /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/,
    );

    if (!match) {
      throw new BadRequestException('Logo deve ser PNG, JPEG ou WebP.');
    }

    const mimeType = match[1];
    const buffer = Buffer.from(match[2], 'base64');
    const maxBytes = 2 * 1024 * 1024;

    if (buffer.byteLength > maxBytes) {
      throw new BadRequestException('Logo deve ter no maximo 2 MB.');
    }

    const extensionByMime: Record<string, string> = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/webp': 'webp',
    };
    const path = `${userId}/logo.${extensionByMime[mimeType]}`;

    const { error } = await this.supabaseService.adminClient.storage
      .from(this.supabaseService.getLogosBucket())
      .upload(path, buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      throw new BadRequestException(this.mensagemUploadLogo(error.message));
    }

    return path;
  }

  private mensagemUploadLogo(message: string): string {
    const normalized = message.toLowerCase();

    if (normalized.includes('bucket') || normalized.includes('not found')) {
      return 'Nao foi possivel salvar a logo porque o bucket de logos nao existe. Crie o bucket definido em `SUPABASE_LOGOS_BUCKET` no Supabase.';
    }

    if (
      normalized.includes('permission') ||
      normalized.includes('not allowed')
    ) {
      return 'Nao foi possivel salvar a logo por permissao do Supabase Storage. Verifique a service role do backend e o bucket de logos.';
    }

    return 'Nao foi possivel salvar a logo da ONG. Verifique o arquivo e a configuracao do Supabase Storage.';
  }

  async login(input: LoginInput) {
    const { data, error } =
      await this.supabaseService.publicClient.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });

    if (error || !data.session) {
      throw new Error(error?.message ?? 'Falha no login');
    }

    return data;
  }

  async logout(accessToken: string): Promise<void> {
    const { error } =
      await this.supabaseService.adminClient.auth.admin.signOut(accessToken);

    if (error) {
      throw new Error(error.message);
    }
  }

  async enviarRecuperacaoSenha(
    email: string,
    redirectTo?: string,
  ): Promise<void> {
    const { error } =
      await this.supabaseService.publicClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo,
        },
      );

    if (error) {
      throw new Error(error.message);
    }
  }
}
