import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '')
			.trim()
			.toLowerCase();

		if (!email) {
			return fail(400, {
				email,
				erro: 'Informe o email cadastrado.'
			});
		}

		if (locals.supabase) {
			await locals.supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${url.origin}/auth/redefinir-senha`
			});
		}

		return {
			sucesso: true,
			mensagem: 'Se o email estiver cadastrado, enviaremos as instrucoes de recuperacao.'
		};
	}
};
