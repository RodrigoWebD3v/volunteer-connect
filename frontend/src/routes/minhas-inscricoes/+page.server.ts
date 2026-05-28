import { backendRequest, BackendHttpError, requireRole } from '$lib/server/backend';
import { fail } from '@sveltejs/kit';

export async function load({ locals, url }) {
	try {
		await requireRole(locals, url, ['voluntario']);
		return {
			inscricoes: await backendRequest<Array<Record<string, unknown>>>(
				locals,
				'/inscricoes/minhas'
			),
			bloqueio: null
		};
	} catch (error) {
		if (error instanceof BackendHttpError) {
			return {
				inscricoes: [],
				bloqueio: error.message
			};
		}

		throw error;
	}
}

export const actions = {
	cancelar: async ({ locals, request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '');

		try {
			await backendRequest(locals, `/inscricoes/${id}/cancelar`, { method: 'PATCH' });
			return { sucesso: 'Inscricao cancelada.' };
		} catch (error) {
			if (error instanceof BackendHttpError) {
				return fail(error.status, { erro: error.message });
			}

			return fail(500, { erro: 'Nao foi possivel cancelar a inscricao.' });
		}
	}
};
