import { env } from '$env/dynamic/public';
import { redirect, type RequestEvent } from '@sveltejs/kit';

type Locals = RequestEvent['locals'];

export class BackendHttpError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}

const backendUrl = env.PUBLIC_BACKEND_URL || 'http://localhost:3000';

export async function getAccessToken(locals: Locals): Promise<string | null> {
	if (!locals.supabase) {
		return null;
	}

	const {
		data: { session }
	} = await locals.supabase.auth.getSession();

	return session?.access_token ?? null;
}

export async function backendRequest<T>(
	locals: Locals,
	path: string,
	options: { method?: string; body?: unknown; tokenRequired?: boolean } = {}
): Promise<T> {
	const token = await getAccessToken(locals);

	if (!token && options.tokenRequired !== false) {
		throw new BackendHttpError(401, 'Entre para continuar.');
	}

	const response = await fetch(`${backendUrl}${path}`, {
		method: options.method ?? 'GET',
		headers: {
			...(token ? { authorization: `Bearer ${token}` } : {}),
			...(options.body !== undefined ? { 'content-type': 'application/json' } : {})
		},
		body: options.body !== undefined ? JSON.stringify(options.body) : undefined
	});

	if (!response.ok) {
		throw new BackendHttpError(response.status, await extractErrorMessage(response));
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return (await response.json()) as T;
}

export async function loadCurrentSession(locals: Locals): Promise<App.Locals['sessaoAtual']> {
	try {
		return await backendRequest<App.Locals['sessaoAtual']>(locals, '/auth/me');
	} catch {
		return null;
	}
}

export function redirectToLogin(url: URL): never {
	const target = `${url.pathname}${url.search}`;
	redirect(303, `/login?redirectTo=${encodeURIComponent(target)}`);
}

export async function requireCurrentSession(locals: Locals, url: URL) {
	const sessao = await loadCurrentSession(locals);

	if (!sessao?.usuario) {
		redirectToLogin(url);
	}

	return sessao;
}

export async function requireRole(locals: Locals, url: URL, roles: string[]) {
	const sessao = await requireCurrentSession(locals, url);
	const usuario = sessao.usuario;

	if (!usuario) {
		redirectToLogin(url);
	}

	if (!roles.includes(usuario.papel)) {
		throw new BackendHttpError(403, 'Esta area nao esta disponivel para o seu perfil.');
	}

	if (usuario.ativo === false || usuario.conta_suspensa === true) {
		throw new BackendHttpError(403, 'Sua conta esta suspensa ou inativa.');
	}

	return sessao;
}

export function formValue(formData: FormData, name: string): string {
	return String(formData.get(name) ?? '').trim();
}

export function dateTimeFromDateInput(value: string, endOfDay = false): string {
	return `${value}T${endOfDay ? '23:59:00' : '09:00:00'}-03:00`;
}

async function extractErrorMessage(response: Response): Promise<string> {
	try {
		const payload = (await response.json()) as { message?: unknown; error?: unknown };
		const message = Array.isArray(payload.message) ? payload.message.join(' ') : payload.message;

		if (typeof message === 'string' && message.trim()) {
			return message;
		}

		if (typeof payload.error === 'string' && payload.error.trim()) {
			return payload.error;
		}
	} catch {
		// Keep a generic public-facing message below.
	}

	return 'Nao foi possivel concluir a operacao. Tente novamente em instantes.';
}
