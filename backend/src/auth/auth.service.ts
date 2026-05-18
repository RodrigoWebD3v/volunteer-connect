import { Injectable } from '@nestjs/common';
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
  nomeFantasia?: string;
  cnpj?: string;
  descricaoOng?: string;
  siteUrl?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async registrar(input: RegistrarUsuarioInput): Promise<User> {
    const { data, error } =
      await this.supabaseService.adminClient.auth.admin.createUser({
        email: input.email,
        password: input.password,
        email_confirm: false,
        user_metadata: {
          nome_completo: input.nomeCompleto,
          tipo_cadastro: input.tipoCadastro,
        },
      });

    if (error || !data.user) {
      throw new Error(error?.message ?? 'Falha ao registrar usuário');
    }

    await this.criarRegistrosLocaisPosCadastro(data.user.id, input);
    return data.user;
  }

  async obterSessaoAtual(accessToken: string) {
    const { data: authData, error: authError } =
      await this.supabaseService.adminClient.auth.getUser(accessToken);

    if (authError || !authData.user) {
      throw new Error(authError?.message ?? 'Token inválido ou expirado');
    }

    const { data: usuario, error: usuarioError } =
      await this.supabaseService.adminClient
        .from('usuarios')
        .select('id,nome_completo,email,papel,ativo')
        .eq('id', authData.user.id)
        .maybeSingle();

    if (usuarioError) {
      throw new Error(
        `Falha ao consultar usuario local: ${usuarioError.message}`,
      );
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
        throw new Error(
          `Falha ao consultar perfil de voluntario: ${perfilError.message}`,
        );
      }

      return {
        authUser: authData.user,
        usuario,
        perfil: perfilVoluntario,
      };
    }

    const { data: perfilOng, error: perfilError } =
      await this.supabaseService.adminClient
        .from('perfis_ongs')
        .select(
          'id,usuario_gestor_id,nome_fantasia,cnpj,descricao,site_url,cidade,estado,verificada',
        )
        .eq('usuario_gestor_id', usuario.id)
        .maybeSingle();

    if (perfilError) {
      throw new Error(
        `Falha ao consultar perfil de ONG: ${perfilError.message}`,
      );
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
      throw new Error(`Falha ao criar usuario local: ${erroUsuario.message}`);
    }

    if (input.tipoCadastro === 'voluntario') {
      const { error } = await this.supabaseService.adminClient
        .from('perfis_voluntarios')
        .insert({
          usuario_id: userId,
          telefone: input.telefone ?? null,
          cidade: input.cidade ?? null,
          estado: input.estado ?? null,
          biografia: input.biografia ?? null,
        });

      if (error) {
        throw new Error(
          `Falha ao criar perfil de voluntario: ${error.message}`,
        );
      }

      return;
    }

    const { error } = await this.supabaseService.adminClient
      .from('perfis_ongs')
      .insert({
        usuario_gestor_id: userId,
        nome_fantasia: input.nomeFantasia,
        cnpj: input.cnpj,
        descricao: input.descricaoOng ?? null,
        site_url: input.siteUrl ?? null,
        cidade: input.cidade ?? null,
        estado: input.estado ?? null,
      });

    if (error) {
      throw new Error(`Falha ao criar perfil de ONG: ${error.message}`);
    }
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
