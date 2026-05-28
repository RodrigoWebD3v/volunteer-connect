import { backendRequest, BackendHttpError, requireRole } from '$lib/server/backend';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	try {
		const sessao = await requireRole(locals, url, ['ong']);
		const statusAnalise = String(sessao.perfil?.status_analise ?? '');

		if (statusAnalise === 'pendente') {
			redirect(303, '/ong/analise-pendente');
		}

		if (statusAnalise === 'reprovado') {
			redirect(303, '/ong/analise-reprovada');
		}

		return {
			oportunidades: await backendRequest<Array<Record<string, unknown>>>(
				locals,
				'/oportunidades/minhas'
			),
			bloqueio: null
		};
	} catch (error) {
		if (error instanceof BackendHttpError) {
			return { oportunidades: [], bloqueio: error.message };
		}

		throw error;
	}
}
