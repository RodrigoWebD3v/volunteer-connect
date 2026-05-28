<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Sessao expirada | Volunteer Connect</title>
</svelte:head>

<section class="state-page">
	<div class="panel">
		<p class="eyebrow">Acesso</p>
		<h1>Sua sessao expirou</h1>
		<p>Entre novamente para continuar usando as areas protegidas do Volunteer Connect.</p>
		<a href={resolve('/login')}>Entrar novamente</a>
	</div>
</section>

<style>
	.state-page {
		display: grid;
		place-items: center;
		min-height: calc(100vh - 76px);
		padding: 32px clamp(16px, 5vw, 72px);
	}

	.panel {
		display: grid;
		gap: 16px;
		width: min(100%, 520px);
		padding: clamp(24px, 4vw, 36px);
		border: 1px solid var(--color-hairline);
		border-radius: 18px;
		background: var(--color-surface);
		box-shadow: var(--shadow-soft);
	}

	.eyebrow,
	h1,
	p {
		margin: 0;
	}

	.eyebrow {
		color: var(--color-primary-strong);
		font-weight: 900;
		text-transform: uppercase;
	}

	a {
		display: inline-grid;
		min-height: 46px;
		align-items: center;
		justify-self: start;
		padding: 12px 18px;
		border-radius: 999px;
		background: var(--color-primary);
		color: white;
		font-weight: 900;
		text-decoration: none;
	}
</style>
