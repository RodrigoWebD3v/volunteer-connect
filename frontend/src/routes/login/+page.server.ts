import { fail, redirect } from '@sveltejs/kit';

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
			return fail(400, {
				email,
				erro: 'Email ou senha invalidos.'
			});
		}

		redirect(303, '/');
	}
};
