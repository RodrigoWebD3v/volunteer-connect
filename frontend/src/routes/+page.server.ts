import { loadCurrentSession } from '$lib/server/backend';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const sessao = await loadCurrentSession(locals);
	const papel = sessao?.usuario?.papel;

	if (papel === 'admin') {
		redirect(303, '/admin/ongs');
	}

	if (papel === 'ong') {
		redirect(303, '/ong/oportunidades');
	}

	redirect(303, '/oportunidades');
}
