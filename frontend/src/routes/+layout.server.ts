export function load({ locals }) {
	return {
		usuario: locals.usuarioAuth
			? {
					email: locals.usuarioAuth.email ?? null
				}
			: null
	};
}
