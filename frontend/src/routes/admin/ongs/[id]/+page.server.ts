import { backendRequest, BackendHttpError, formValue, requireRole } from '$lib/server/backend';
import { fail } from '@sveltejs/kit';

export async function load({ locals, params, url }) {
	try {
		await requireRole(locals, url, ['admin']);
		return {
			ong: await backendRequest<Record<string, unknown>>(
				locals,
				`/ongs/admin/analises/${params.id}`
			),
			bloqueio: null
		};
	} catch (error) {
		if (error instanceof BackendHttpError) {
			return { ong: null, bloqueio: error.message };
		}

		throw error;
	}
}

export const actions = {
	aprovar: async ({ locals, params }) => {
		try {
			await backendRequest(locals, `/ongs/admin/analises/${params.id}/aprovar`, {
				method: 'PATCH'
			});

			return { sucesso: 'Analise registrada.' };
		} catch (error) {
			if (error instanceof BackendHttpError) {
				return fail(error.status, { erro: error.message });
			}

			return fail(500, { erro: 'Nao foi possivel aprovar a ONG.' });
		}
	},
	reprovar: async ({ locals, params, request }) => {
		const formData = await request.formData();
		const motivoReprovacao = formValue(formData, 'motivoReprovacao');

		if (!motivoReprovacao) {
			return fail(400, {
				motivoReprovacao,
				erro: 'Reprovar ONG: informe o motivo antes de confirmar.'
			});
		}

		try {
			await backendRequest(locals, `/ongs/admin/analises/${params.id}/reprovar`, {
				method: 'PATCH',
				body: { motivoReprovacao }
			});

			return { sucesso: 'Analise registrada.' };
		} catch (error) {
			if (error instanceof BackendHttpError) {
				return fail(error.status, { motivoReprovacao, erro: error.message });
			}

			return fail(500, { motivoReprovacao, erro: 'Nao foi possivel reprovar a ONG.' });
		}
	}
};
