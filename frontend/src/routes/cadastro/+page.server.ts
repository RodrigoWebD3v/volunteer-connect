import { fail } from '@sveltejs/kit';

const tiposDeConta = ['voluntario', 'ong'] as const;

function senhaValida(senha: string) {
	return senha.length >= 8 && /[a-zA-Z]/.test(senha) && /\d/.test(senha);
}

export const actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const tipoConta = String(formData.get('tipo_conta') ?? '');
		const email = String(formData.get('email') ?? '')
			.trim()
			.toLowerCase();
		const senha = String(formData.get('senha') ?? '');
		const confirmarSenha = String(formData.get('confirmar_senha') ?? '');

		if (!locals.supabase) {
			return fail(503, {
				email,
				tipo_conta: tipoConta,
				erro: 'Supabase ainda nao esta configurado neste ambiente.'
			});
		}

		if (!tiposDeConta.includes(tipoConta as (typeof tiposDeConta)[number])) {
			return fail(400, {
				email,
				tipo_conta: tipoConta,
				erro: 'Escolha se a conta sera de voluntario ou ONG.'
			});
		}

		if (!email || !senha || !confirmarSenha) {
			return fail(400, {
				email,
				tipo_conta: tipoConta,
				erro: 'Informe email, senha e confirmacao de senha.'
			});
		}

		if (senha !== confirmarSenha) {
			return fail(400, {
				email,
				tipo_conta: tipoConta,
				erro: 'A confirmacao de senha precisa ser igual a senha.'
			});
		}

		if (!senhaValida(senha)) {
			return fail(400, {
				email,
				tipo_conta: tipoConta,
				erro: 'A senha deve ter pelo menos 8 caracteres, 1 letra e 1 numero.'
			});
		}

		const { error } = await locals.supabase.auth.signUp({
			email,
			password: senha,
			options: {
				emailRedirectTo: `${url.origin}/auth/confirmacao-email`,
				data: {
					tipo_conta: tipoConta
				}
			}
		});

		if (error) {
			return fail(400, {
				email,
				tipo_conta: tipoConta,
				erro: 'Nao foi possivel criar a conta. Confira os dados e tente novamente.'
			});
		}

		return {
			sucesso: true,
			mensagem: 'Cadastro realizado. Verifique seu email para confirmar sua conta.'
		};
	}
};
