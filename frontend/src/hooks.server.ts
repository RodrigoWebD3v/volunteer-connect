import { createSupabaseServerClient } from '$lib/supabase/server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(event.cookies);
	event.locals.usuarioAuth = null;
	event.locals.sessaoAtual = null;

	if (event.locals.supabase) {
		const {
			data: { user }
		} = await event.locals.supabase.auth.getUser();

		event.locals.usuarioAuth = user;
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};
