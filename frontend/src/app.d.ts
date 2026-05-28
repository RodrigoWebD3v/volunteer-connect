// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { SupabaseClient, User } from '@supabase/supabase-js';

type PapelUsuario = 'voluntario' | 'ong' | 'admin';

interface UsuarioDominio {
	id: string;
	nome_completo?: string | null;
	email: string;
	papel: PapelUsuario;
	ativo?: boolean | null;
	conta_suspensa?: boolean | null;
}

interface SessaoAtual {
	authUser: User;
	usuario: UsuarioDominio | null;
	perfil: Record<string, unknown> | null;
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient | null;
			usuarioAuth: User | null;
			sessaoAtual: SessaoAtual | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
