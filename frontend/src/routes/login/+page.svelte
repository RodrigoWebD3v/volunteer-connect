<script lang="ts">
	import { resolve } from '$app/paths';

	let { form } = $props();
</script>

<svelte:head>
	<title>Entrar | Volunteer Connect</title>
</svelte:head>

<section class="auth-page">
	<form class="auth-card" method="POST" aria-label="Formulario de login">
		<div class="form-heading">
			<p class="eyebrow">Acesso</p>
			<h1>Entre na sua conta</h1>
			<p>Acompanhe oportunidades, candidaturas e proximas etapas em um so lugar.</p>
		</div>

		{#if form?.erro}
			<p class="alert" role="alert">{form.erro}</p>
		{/if}

		<label>
			<span>Email</span>
			<input name="email" type="email" autocomplete="email" value={form?.email ?? ''} required />
		</label>

		<label>
			<span>Senha</span>
			<input name="senha" type="password" autocomplete="current-password" required />
		</label>

		<button type="submit">Entrar</button>

		<p class="helper">
			Ainda nao tem conta?
			<a href={resolve('/cadastro')}>Criar conta</a>
		</p>
	</form>

	<aside class="story-panel" aria-label="Contexto do Volunteer Connect">
		<img
			src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80"
			alt="Grupo de voluntarios organizando doacoes em uma mesa"
		/>
		<div class="story-copy">
			<p class="eyebrow">Impacto local</p>
			<h2>O proximo passo de ajuda precisa ser facil de encontrar.</h2>
			<p>O Volunteer Connect aproxima pessoas, ONGs e oportunidades reais sem confusao.</p>
		</div>
	</aside>
</section>

<style>
	.auth-page {
		display: grid;
		grid-template-columns: minmax(0, 520px);
		gap: 32px;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - 76px);
		padding: 32px clamp(16px, 5vw, 72px);
	}

	h1,
	h2,
	p {
		margin-top: 0;
	}

	.form-heading {
		display: grid;
		gap: 10px;
	}

	.eyebrow {
		margin: 0;
		color: var(--color-primary-strong);
		font-size: 0.78rem;
		font-weight: 900;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h1 {
		margin-bottom: 0;
		font-size: 2rem;
		line-height: 1.1;
		letter-spacing: 0;
		text-wrap: balance;
	}

	.form-heading p:not(.eyebrow),
	.story-copy p:not(.eyebrow) {
		margin-bottom: 0;
		color: var(--color-body);
		line-height: 1.55;
	}

	.auth-card {
		display: grid;
		gap: 20px;
		width: 100%;
		padding: clamp(24px, 4vw, 36px);
		border: 1px solid var(--color-hairline);
		border-radius: 18px;
		background: var(--color-surface);
		box-shadow: var(--shadow-soft);
	}

	label {
		display: grid;
		gap: 8px;
		color: var(--color-body);
		font-size: 0.94rem;
		font-weight: 700;
	}

	input {
		width: 100%;
		min-height: 48px;
		padding: 12px 14px;
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		background: var(--color-canvas);
		color: var(--color-ink);
		font: inherit;
		transition:
			border-color 180ms ease-out,
			box-shadow 180ms ease-out;
	}

	input:focus-visible {
		border-color: var(--color-primary);
		outline: 3px solid oklch(72% 0.18 18 / 0.3);
		outline-offset: 2px;
	}

	button {
		min-height: 50px;
		padding: 14px 18px;
		border: 0;
		border-radius: 999px;
		background: var(--color-primary);
		color: var(--color-canvas);
		font: inherit;
		font-weight: 800;
		cursor: pointer;
		transition:
			background-color 180ms ease-out,
			transform 180ms ease-out;
	}

	button:hover {
		background: var(--color-primary-strong);
		transform: translateY(-1px);
	}

	button:focus-visible {
		outline: 3px solid var(--color-focus);
		outline-offset: 3px;
	}

	.alert {
		margin-bottom: 0;
		padding: 12px 14px;
		border: 1px solid oklch(82% 0.08 18);
		border-radius: 12px;
		background: oklch(96% 0.035 18);
		color: oklch(38% 0.16 18);
		line-height: 1.45;
	}

	.helper {
		margin: 0;
		color: var(--color-muted);
		text-align: center;
	}

	.helper a {
		color: var(--color-primary-strong);
		font-weight: 800;
		text-decoration-thickness: 2px;
		text-underline-offset: 4px;
	}

	.story-panel {
		display: none;
	}

	@media (min-width: 920px) {
		.auth-page {
			grid-template-columns: minmax(380px, 470px) minmax(420px, 620px);
			gap: clamp(40px, 6vw, 76px);
			justify-content: space-between;
		}

		.story-panel {
			position: relative;
			display: grid;
			align-content: end;
			min-height: 620px;
			overflow: hidden;
			border-radius: 28px;
			background: var(--color-surface-soft);
		}

		.story-panel img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.story-panel::after {
			position: absolute;
			inset: 0;
			content: '';
			background: linear-gradient(to top, oklch(20% 0.02 35 / 0.78), oklch(20% 0.02 35 / 0.08) 58%);
		}

		.story-copy {
			position: relative;
			z-index: 1;
			display: grid;
			gap: 12px;
			max-width: 440px;
			padding: 36px;
			color: var(--color-canvas);
		}

		.story-copy .eyebrow,
		.story-copy p:not(.eyebrow) {
			color: oklch(96% 0.01 35);
		}

		.story-copy h2 {
			margin: 0;
			font-size: 2rem;
			line-height: 1.12;
			text-wrap: balance;
		}
	}
</style>
