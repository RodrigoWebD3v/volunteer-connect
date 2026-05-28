import { backendRequest, BackendHttpError, requireRole } from '$lib/server/backend';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	try {
		const sessao = await requireRole(locals, url, ['ong']);
		const ong = await backendRequest<Record<string, unknown>>(locals, '/ongs/minha');

		if (sessao.perfil?.status_analise === 'aprovado') {
			redirect(303, '/ong/oportunidades');
		}

		if (sessao.perfil?.status_analise === 'reprovado') {
			redirect(303, '/ong/analise-reprovada');
		}

		return { ong, bloqueio: null };
	} catch (error) {
		if (error instanceof BackendHttpError) {
			return { ong: null, bloqueio: error.message };
		}

		throw error;
	}
}
