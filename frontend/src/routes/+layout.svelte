<script lang="ts">
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a class="skip-link" href="#conteudo-principal">Ir para o conteudo</a>

<div class="app-shell">
	<header class="topbar">
		<a class="brand" href={resolve('/')} aria-label="Volunteer Connect, pagina inicial">
			<span class="brand-mark" aria-hidden="true">VC</span>
			<span>Volunteer Connect</span>
		</a>

		<nav class="nav" aria-label="Navegacao principal">
			<a href={resolve('/')}>Oportunidades</a>
			{#if data.usuario}
				<span class="user-email">{data.usuario.email}</span>
				{#if data.usuario.papel === 'voluntario'}
					<a href={resolve('/minhas-inscricoes')}>Minhas inscricoes</a>
					<a href={resolve('/minhas-presencas')}>Minhas presencas</a>
				{:else if data.usuario.papel === 'ong'}
					{#if data.usuario.perfil?.status_analise === 'aprovado'}
						<a href={resolve('/ong/oportunidades')}>Painel da ONG</a>
					{:else if data.usuario.perfil?.status_analise === 'reprovado'}
						<a href={resolve('/ong/analise-reprovada')}>Analise da ONG</a>
					{:else}
						<a href={resolve('/ong/analise-pendente')}>Analise da ONG</a>
					{/if}
				{:else if data.usuario.papel === 'admin'}
					<a href={resolve('/admin/ongs')}>Painel admin</a>
				{/if}
				<form method="POST" action="/sair">
					<button class="ghost-action" type="submit">Sair</button>
				</form>
			{:else}
				<a href={resolve('/login')}>Entrar</a>
				<a class="primary-link" href={resolve('/cadastro')}>Criar conta</a>
			{/if}
		</nav>
	</header>

	<main id="conteudo-principal">
		{@render children()}
	</main>
</div>

<style>
	:global(:root) {
		--color-canvas: oklch(99% 0.006 25);
		--color-surface: oklch(100% 0.004 25);
		--color-surface-soft: oklch(97.5% 0.01 35);
		--color-ink: oklch(24% 0.012 35);
		--color-body: oklch(36% 0.012 35);
		--color-muted: oklch(52% 0.012 35);
		--color-hairline: oklch(88% 0.012 35);
		--color-primary: oklch(62% 0.23 15);
		--color-primary-strong: oklch(54% 0.24 15);
		--color-primary-soft: oklch(95% 0.04 16);
		--color-focus: oklch(72% 0.18 18);
		--shadow-soft: 0 18px 48px oklch(24% 0.012 35 / 0.08);
	}

	:global(body) {
		margin: 0;
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		color: var(--color-ink);
		background: var(--color-canvas);
		font-kerning: normal;
	}

	:global(a) {
		color: inherit;
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	.app-shell {
		min-height: 100vh;
	}

	.skip-link {
		position: fixed;
		top: 12px;
		left: 12px;
		z-index: 30;
		padding: 10px 14px;
		border-radius: 999px;
		background: var(--color-ink);
		color: var(--color-canvas);
		font-weight: 800;
		text-decoration: none;
		transform: translateY(-160%);
		transition: transform 180ms ease-out;
	}

	.skip-link:focus-visible {
		transform: translateY(0);
		outline: 3px solid var(--color-focus);
		outline-offset: 3px;
	}

	.topbar {
		position: sticky;
		top: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		min-height: 76px;
		padding: 14px clamp(16px, 4vw, 56px);
		border-bottom: 1px solid var(--color-hairline);
		background: var(--color-surface);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		min-height: 44px;
		font-weight: 800;
		text-decoration: none;
		color: var(--color-ink);
		white-space: nowrap;
	}

	.brand-mark {
		display: inline-grid;
		width: 38px;
		height: 38px;
		place-items: center;
		border-radius: 999px;
		background: var(--color-primary);
		color: var(--color-canvas);
		font-size: 0.78rem;
		font-weight: 900;
	}

	.nav {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.95rem;
		font-weight: 700;
	}

	.nav a,
	.nav button {
		min-height: 44px;
		padding: 10px 14px;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: var(--color-ink);
		font: inherit;
		text-decoration: none;
		cursor: pointer;
		transition:
			background-color 180ms ease-out,
			color 180ms ease-out,
			transform 180ms ease-out;
	}

	.nav a:hover,
	.nav button:hover {
		background: var(--color-surface-soft);
		color: var(--color-primary-strong);
	}

	.nav a:focus-visible,
	.nav button:focus-visible,
	.brand:focus-visible {
		outline: 3px solid var(--color-focus);
		outline-offset: 3px;
	}

	.nav .primary-link {
		background: #ff385c;
		color: var(--color-canvas) !important;
		box-shadow: 0 10px 24px oklch(62% 0.23 15 / 0.22);
	}

	.nav .primary-link:hover {
		background: var(--color-primary-strong) !important;
		color: var(--color-canvas) !important;
		transform: translateY(-1px);
	}

	.ghost-action {
		font-weight: 700;
	}

	.user-email {
		max-width: 220px;
		padding: 8px 10px;
		overflow: hidden;
		color: var(--color-muted);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@media (max-width: 720px) {
		.topbar {
			align-items: stretch;
			flex-direction: column;
			min-height: auto;
		}

		.nav {
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.nav a,
		.nav button {
			flex: 1 1 auto;
			text-align: center;
		}
	}
</style>
