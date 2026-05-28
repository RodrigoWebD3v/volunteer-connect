import { backendRequest, BackendHttpError, formValue } from '$lib/server/backend';
import { fail } from '@sveltejs/kit';

export async function load({ locals, params }) {
	let inscricaoAtual = null;

	const oportunidade = await backendRequest<Record<string, unknown>>(
		locals,
		`/oportunidades/${params.id}`,
		{ tokenRequired: false }
	);

	if (locals.usuarioAuth) {
		try {
			const inscricoes = await backendRequest<Array<Record<string, unknown>>>(
				locals,
				'/inscricoes/minhas'
			);
			inscricaoAtual =
				inscricoes.find((inscricao) => inscricao.oportunidadeId === params.id) ?? null;
		} catch {
			inscricaoAtual = null;
		}
	}

	return {
		id: params.id,
		oportunidade,
		inscricaoAtual
	};
}

export const actions = {
	aplicar: async ({ locals, params, request }) => {
		const formData = await request.formData();
		const mensagem = formValue(formData, 'mensagem');

		try {
			await backendRequest(locals, `/inscricoes/oportunidades/${params.id}`, {
				method: 'POST',
				body: { mensagem: mensagem || undefined }
			});

			return {
				sucesso: 'Inscricao enviada. A ONG avaliara sua candidatura.'
			};
		} catch (error) {
			if (error instanceof BackendHttpError) {
				return fail(error.status, {
					mensagem,
					erro: error.message
				});
			}

			return fail(500, {
				mensagem,
				erro: 'Nao foi possivel enviar a inscricao. Tente novamente em instantes.'
			});
		}
	}
};
