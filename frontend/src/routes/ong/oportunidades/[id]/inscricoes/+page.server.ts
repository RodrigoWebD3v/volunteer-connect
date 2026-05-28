import { backendRequest, BackendHttpError, formValue, requireRole } from '$lib/server/backend';
import { fail } from '@sveltejs/kit';

export async function load({ locals, params, url }) {
	try {
		await requireRole(locals, url, ['ong']);
		return {
			inscricoes: await backendRequest<Array<Record<string, unknown>>>(
				locals,
				`/inscricoes/oportunidades/${params.id}`
			),
			bloqueio: null
		};
	} catch (error) {
		if (error instanceof BackendHttpError) {
			return { inscricoes: [], bloqueio: error.message };
		}

		throw error;
	}
}

export const actions = {
	avaliar: async ({ locals, request }) => {
		const formData = await request.formData();
		const id = formValue(formData, 'id');
		const status = formValue(formData, 'status');
		const observacaoOng = formValue(formData, 'observacaoOng');

		try {
			await backendRequest(locals, `/inscricoes/${id}/avaliar`, {
				method: 'PATCH',
				body: { status, observacaoOng: observacaoOng || undefined }
			});

			return { sucesso: 'Inscricao atualizada.' };
		} catch (error) {
			if (error instanceof BackendHttpError) {
				return fail(error.status, { erro: error.message });
			}

			return fail(500, { erro: 'Nao foi possivel avaliar a inscricao.' });
		}
	}
};
