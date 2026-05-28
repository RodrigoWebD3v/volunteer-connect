import { backendRequest, BackendHttpError, formValue, requireRole } from '$lib/server/backend';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	try {
		const sessao = await requireRole(locals, url, ['ong']);
		const ong = await backendRequest<Record<string, unknown>>(locals, '/ongs/minha');

		if (sessao.perfil?.status_analise === 'aprovado') {
			redirect(303, '/ong/oportunidades');
		}

		if (sessao.perfil?.status_analise !== 'reprovado') {
			redirect(303, '/ong/analise-pendente');
		}

		return { ong, bloqueio: null };
	} catch (error) {
		if (error instanceof BackendHttpError) {
			return { ong: null, bloqueio: error.message };
		}

		throw error;
	}
}

export const actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData();
		const descricao = formValue(formData, 'descricao');
		const siteUrl = formValue(formData, 'siteUrl');

		try {
			await backendRequest(locals, '/ongs/minha/reenviar-analise', {
				method: 'PATCH',
				body: {
					descricao: descricao || undefined,
					siteUrl: siteUrl || undefined
				}
			});
		} catch (error) {
			if (error instanceof BackendHttpError) {
				return fail(error.status, { descricao, siteUrl, erro: error.message });
			}

			return fail(500, { descricao, siteUrl, erro: 'Nao foi possivel reenviar para analise.' });
		}

		redirect(303, '/ong/analise-pendente');
	}
};
