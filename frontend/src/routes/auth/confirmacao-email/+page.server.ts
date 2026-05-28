import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const code = url.searchParams.get('code');

	if (code && locals.supabase) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			redirect(303, '/');
		}
	}

	return {};
};
