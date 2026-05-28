import { backendRequest, BackendHttpError, formValue, requireRole } from '$lib/server/backend';
import { fail } from '@sveltejs/kit';

export async function load({ locals, params, url }) {
	try {
		await requireRole(locals, url, ['ong']);
		return {
			linhas: await backendRequest<Array<Record<string, unknown>>>(
				locals,
				`/presencas/oportunidades/${params.id}`
			),
			bloqueio: null
		};
	} catch (error) {
		if (error instanceof BackendHttpError) {
			return { linhas: [], bloqueio: error.message };
		}

		throw error;
	}
}

export const actions = {
	marcar: async ({ locals, params, request }) => {
		const formData = await request.formData();
		const inscricaoId = formValue(formData, 'inscricaoId');
		const status = formValue(formData, 'status');
		const observacao = formValue(formData, 'observacao');

		try {
			await backendRequest(locals, `/presencas/oportunidades/${params.id}`, {
				method: 'PATCH',
				body: { inscricaoId, status, observacao: observacao || undefined }
			});

			return { sucesso: 'Presenca registrada.' };
		} catch (error) {
			if (error instanceof BackendHttpError) {
				return fail(error.status, { erro: error.message });
			}

			return fail(500, { erro: 'Nao foi possivel registrar presenca.' });
		}
	}
};
