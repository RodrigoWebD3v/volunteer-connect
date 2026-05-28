import { backendRequest, BackendHttpError, requireRole } from '$lib/server/backend';

export async function load({ locals, url }) {
	try {
		await requireRole(locals, url, ['voluntario']);
		return {
			presencas: await backendRequest<Array<Record<string, unknown>>>(locals, '/presencas/minhas'),
			bloqueio: null
		};
	} catch (error) {
		if (error instanceof BackendHttpError) {
			return {
				presencas: [],
				bloqueio: error.message
			};
		}

		throw error;
	}
}
