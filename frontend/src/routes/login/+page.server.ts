import { fail, redirect } from '@sveltejs/kit';

export function load({ locals, url }) {
	if (locals.usuarioAuth) {
		redirect(303, safeRedirect(url.searchParams.get('redirectTo')) ?? '/');
	}

	return {
		redirectTo: safeRedirect(url.searchParams.get('redirectTo'))
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '')
			.trim()
			.toLowerCase();
		const senha = String(formData.get('senha') ?? '');

		if (!locals.supabase) {
			return fail(503, {
				email,
				erro: 'Supabase ainda nao esta configurado neste ambiente.'
			});
		}

		if (!email || !senha) {
			return fail(400, {
				email,
				erro: 'Informe email e senha.'
			});
		}

		const { error } = await locals.supabase.auth.signInWithPassword({
			email,
			password: senha
		});

		if (error) {
			if (error.message.toLowerCase().includes('email not confirmed')) {
				return fail(400, {
					email,
					erro: 'Esta conta antiga ainda esta aguardando confirmacao. Solicite a liberacao do acesso ou crie a conta novamente.'
				});
			}

			return fail(400, {
				email,
				erro: 'Email ou senha invalidos.'
			});
		}

		redirect(303, safeRedirect(new URL(request.url).searchParams.get('redirectTo')) ?? '/');
	}
};

function safeRedirect(value: string | null): string | null {
	if (!value?.startsWith('/') || value.startsWith('//')) {
		return null;
	}

	if (value === '/login' || value.startsWith('/login?')) {
		return null;
	}

	return value;
}
