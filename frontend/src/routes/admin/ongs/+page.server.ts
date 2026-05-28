import { backendRequest, BackendHttpError, requireRole } from '$lib/server/backend';

export async function load({ locals, url }) {
	const status = url.searchParams.get('status');
	const query = status ? `?status=${encodeURIComponent(status)}` : '';

	try {
		await requireRole(locals, url, ['admin']);
		return {
			ongs: await backendRequest<Array<Record<string, unknown>>>(
				locals,
				`/ongs/admin/analises${query}`
			),
			status,
			bloqueio: null
		};
	} catch (error) {
		if (error instanceof BackendHttpError) {
			return { ongs: [], status, bloqueio: error.message };
		}

		throw error;
	}
}
