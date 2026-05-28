import { loadCurrentSession } from '$lib/server/backend';

export async function load({ locals }) {
	const sessao = await loadCurrentSession(locals);
	locals.sessaoAtual = sessao;

	const usuario = sessao?.usuario
		? {
				email: sessao.usuario.email,
				papel: sessao.usuario.papel,
				ativo: sessao.usuario.ativo,
				contaSuspensa: sessao.usuario.conta_suspensa,
				perfil: sessao.perfil
			}
		: locals.usuarioAuth
			? {
					email: locals.usuarioAuth.email ?? null,
					papel: null,
					ativo: null,
					contaSuspensa: null,
					perfil: null
				}
			: null;

	return { usuario };
}
