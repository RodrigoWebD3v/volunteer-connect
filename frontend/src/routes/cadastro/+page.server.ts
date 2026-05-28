import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

const tiposDeConta = ['voluntario', 'ong'] as const;
const backendUrl = env.PUBLIC_BACKEND_URL ?? 'http://localhost:3000';

type CampoCadastro =
	| 'tipo_conta'
	| 'email'
	| 'nome_completo'
	| 'cpf'
	| 'cnpj'
	| 'nome_fantasia'
	| 'logo'
	| 'senha'
	| 'confirmar_senha'
	| 'cidade'
	| 'estado'
	| 'telefone'
	| 'descricao_ong'
	| 'site_url';

type ErrosCampos = Partial<Record<CampoCadastro, string>>;

function montarValores(values: Record<string, string>) {
	return {
		tipo_conta: values.tipo_conta,
		email: values.email,
		nome_completo: values.nome_completo,
		cpf: values.cpf,
		telefone: values.telefone,
		cidade: values.cidade,
		estado: values.estado,
		nome_fantasia: values.nome_fantasia,
		cnpj: values.cnpj,
		descricao_ong: values.descricao_ong,
		site_url: values.site_url
	};
}

function falhaCadastro(
	status: number,
	values: Record<string, string>,
	erro: string,
	campos: ErrosCampos
) {
	return fail(status, {
		...montarValores(values),
		erro,
		campos
	});
}

function campoPorMensagem(mensagem: string): CampoCadastro | null {
	const normalizada = mensagem.toLowerCase();

	if (normalizada.includes('email')) return 'email';
	if (normalizada.includes('senha') || normalizada.includes('password')) return 'senha';
	if (normalizada.includes('cnpj')) return 'cnpj';
	if (normalizada.includes('cpf')) return 'cpf';
	if (normalizada.includes('logo') || normalizada.includes('bucket')) return 'logo';
	if (normalizada.includes('nome fantasia')) return 'nome_fantasia';
	if (normalizada.includes('nome completo') || normalizada.includes('responsavel')) {
		return 'nome_completo';
	}

	return null;
}

async function extrairMensagemErro(response: Response) {
	try {
		const payload = await response.json();
		const message = payload?.message;

		if (Array.isArray(message)) {
			return message.join(' ');
		}

		if (typeof message === 'string' && message.trim()) {
			return message;
		}
	} catch {
		return null;
	}

	return null;
}

function senhaValida(senha: string) {
	return senha.length >= 8 && /[a-zA-Z]/.test(senha) && /\d/.test(senha);
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const tipoConta = String(formData.get('tipo_conta') ?? '');
		const email = String(formData.get('email') ?? '')
			.trim()
			.toLowerCase();
		const senha = String(formData.get('senha') ?? '');
		const confirmarSenha = String(formData.get('confirmar_senha') ?? '');
		const nomeCompleto = String(formData.get('nome_completo') ?? '').trim();
		const cpf = String(formData.get('cpf') ?? '').replace(/\D/g, '');
		const telefone = String(formData.get('telefone') ?? '').trim();
		const cidade = String(formData.get('cidade') ?? '').trim();
		const estado = String(formData.get('estado') ?? '').trim();
		const nomeFantasia = String(formData.get('nome_fantasia') ?? '').trim();
		const cnpj = String(formData.get('cnpj') ?? '').replace(/\D/g, '');
		const descricaoOng = String(formData.get('descricao_ong') ?? '').trim();
		const siteUrl = String(formData.get('site_url') ?? '').trim();
		const logoFile = formData.get('logo');
		const values = {
			tipo_conta: tipoConta,
			email,
			nome_completo: nomeCompleto,
			cpf,
			telefone,
			cidade,
			estado,
			nome_fantasia: nomeFantasia,
			cnpj,
			descricao_ong: descricaoOng,
			site_url: siteUrl
		};

		if (!tiposDeConta.includes(tipoConta as (typeof tiposDeConta)[number])) {
			return falhaCadastro(400, values, 'Escolha se a conta sera de voluntario ou ONG.', {
				tipo_conta: 'Escolha voluntario ou ONG.'
			});
		}

		if (!email || !senha || !confirmarSenha) {
			const campos: ErrosCampos = {};
			if (!email) campos.email = 'Informe um email.';
			if (!senha) campos.senha = 'Informe uma senha.';
			if (!confirmarSenha) campos.confirmar_senha = 'Confirme a senha.';

			return falhaCadastro(400, values, 'Informe email, senha e confirmacao de senha.', campos);
		}

		if (!nomeCompleto) {
			return falhaCadastro(400, values, 'Informe seu nome completo ou o nome do responsavel.', {
				nome_completo: 'Informe o nome completo do responsavel.'
			});
		}

		if (tipoConta === 'voluntario' && cpf.length !== 11) {
			return falhaCadastro(400, values, 'Informe um CPF com 11 digitos.', {
				cpf: 'Use somente numeros e informe 11 digitos.'
			});
		}

		if (tipoConta === 'ong' && (!nomeFantasia || cnpj.length !== 14)) {
			const campos: ErrosCampos = {};
			if (!nomeFantasia) campos.nome_fantasia = 'Informe o nome fantasia da ONG.';
			if (cnpj.length !== 14) campos.cnpj = 'Use somente numeros e informe 14 digitos.';

			return falhaCadastro(400, values, 'Informe nome fantasia e CNPJ com 14 digitos.', campos);
		}

		if (senha !== confirmarSenha) {
			return falhaCadastro(400, values, 'A confirmacao de senha precisa ser igual a senha.', {
				confirmar_senha: 'A confirmacao precisa ser igual a senha.'
			});
		}

		if (!senhaValida(senha)) {
			return falhaCadastro(
				400,
				values,
				'A senha deve ter pelo menos 8 caracteres, 1 letra e 1 numero.',
				{
					senha: 'Use pelo menos 8 caracteres, 1 letra e 1 numero.'
				}
			);
		}

		let logoDataUrl: string | undefined;

		if (tipoConta === 'ong') {
			if (!(logoFile instanceof File) || logoFile.size === 0) {
				return falhaCadastro(400, values, 'Envie a logo da ONG em PNG, JPG ou WebP.', {
					logo: 'Selecione a logo novamente em PNG, JPG ou WebP.'
				});
			}

			if (!['image/png', 'image/jpeg', 'image/webp'].includes(logoFile.type)) {
				return falhaCadastro(400, values, 'A logo precisa ser PNG, JPG ou WebP.', {
					logo: 'Selecione um arquivo PNG, JPG ou WebP.'
				});
			}

			if (logoFile.size > 2 * 1024 * 1024) {
				return falhaCadastro(400, values, 'A logo deve ter no maximo 2 MB.', {
					logo: 'Selecione uma logo com no maximo 2 MB.'
				});
			}

			const buffer = Buffer.from(await logoFile.arrayBuffer());
			logoDataUrl = `data:${logoFile.type};base64,${buffer.toString('base64')}`;
		}

		const response = await fetch(`${backendUrl}/auth/registrar`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				nomeCompleto,
				email,
				password: senha,
				tipoCadastro: tipoConta,
				telefone,
				cidade,
				estado,
				cpf,
				nomeFantasia,
				cnpj,
				descricaoOng,
				siteUrl: siteUrl || undefined,
				logoDataUrl
			})
		});

		if (!response.ok) {
			const detalhe = await extrairMensagemErro(response);
			const erro = detalhe ?? 'Nao foi possivel criar a conta. Confira os dados e tente novamente.';
			const campo = campoPorMensagem(erro);

			return falhaCadastro(400, values, erro, campo ? { [campo]: erro } : {});
		}

		return {
			sucesso: true,
			mensagem: 'Cadastro realizado. Voce ja pode entrar com email e senha.'
		};
	}
};
