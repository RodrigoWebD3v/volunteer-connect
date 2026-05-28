import { fail, redirect } from '@sveltejs/kit';

function senhaValida(senha: string) {
	return senha.length >= 8 && /[a-zA-Z]/.test(senha) && /\d/.test(senha);
}

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const senha = String(formData.get('senha') ?? '');
		const confirmarSenha = String(formData.get('confirmar_senha') ?? '');

		if (!locals.supabase) {
			return fail(503, {
				erro: 'Supabase ainda nao esta configurado neste ambiente.'
			});
		}

		if (senha !== confirmarSenha) {
			return fail(400, {
				erro: 'A confirmacao de senha precisa ser igual a senha.'
			});
		}

		if (!senhaValida(senha)) {
			return fail(400, {
				erro: 'A senha deve ter pelo menos 8 caracteres, 1 letra e 1 numero.'
			});
		}

		const { error } = await locals.supabase.auth.updateUser({
			password: senha
		});

		if (error) {
			return fail(400, {
				erro: 'Link expirado ou sessao invalida. Solicite uma nova recuperacao.'
			});
		}

		redirect(303, '/login');
	}
};
