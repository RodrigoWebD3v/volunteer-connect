import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';
import type { WebSocketLikeConstructor } from '@supabase/realtime-js';
import { env } from '$env/dynamic/public';
import type { Cookies } from '@sveltejs/kit';
import WebSocket from 'ws';

const websocketTransport = WebSocket as unknown as WebSocketLikeConstructor;

export function createSupabaseServerClient(cookies: Cookies) {
	if (!env.PUBLIC_SUPABASE_URL || !env.PUBLIC_SUPABASE_ANON_KEY) {
		return null;
	}

	return createServerClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
		realtime: {
			transport: websocketTransport
		},
		cookies: {
			getAll() {
				return cookies.getAll();
			},
			setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
				cookiesToSet.forEach(({ name, value, options }) => {
					cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});
}
