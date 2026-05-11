<script lang="ts">
	import { resolve } from '$app/paths';

	let { form } = $props();

	let tipoSelecionado = $derived(form?.tipo_conta ?? 'voluntario');
</script>

<svelte:head>
	<title>Criar conta | Volunteer Connect</title>
</svelte:head>

<section class="auth-page">
	<form class="auth-card" method="POST" aria-label="Formulario de cadastro">
		<div class="form-heading">
			<p class="eyebrow">Cadastro</p>
			<h1>Crie sua conta</h1>
			<p>Escolha como quer participar agora. Depois completamos os dados do perfil.</p>
		</div>

		{#if form?.sucesso}
			<p class="success" role="status">{form.mensagem}</p>
		{:else if form?.erro}
			<p class="alert" role="alert">{form.erro}</p>
		{/if}

		<fieldset>
			<legend>Tipo de conta</legend>
			<label class="radio-option">
				<input
					type="radio"
					name="tipo_conta"
					value="voluntario"
					checked={tipoSelecionado !== 'ong'}
				/>
				<span class="radio-copy">
					<strong>Voluntario</strong>
					<small>Encontrar oportunidades e se inscrever.</small>
				</span>
			</label>
			<label class="radio-option">
				<input type="radio" name="tipo_conta" value="ong" checked={tipoSelecionado === 'ong'} />
				<span class="radio-copy">
					<strong>ONG</strong>
					<small>Publicar oportunidades apos analise.</small>
				</span>
			</label>
		</fieldset>

		<label>
			<span>Email</span>
			<input name="email" type="email" autocomplete="email" value={form?.email ?? ''} required />
		</label>

		<label>
			<span>Senha</span>
			<input name="senha" type="password" autocomplete="new-password" minlength="8" required />
		</label>

		<label>
			<span>Confirmar senha</span>
			<input
				name="confirmar_senha"
				type="password"
				autocomplete="new-password"
				minlength="8"
				required
			/>
		</label>

		<button type="submit">Criar conta</button>

		<p class="helper">
			Ja tem conta?
			<a href={resolve('/login')}>Entrar</a>
		</p>
	</form>

	<aside class="story-panel" aria-label="Contexto de cadastro">
		<img
			src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
			alt="Pessoas voluntarias reunidas em uma atividade comunitaria"
		/>
		<div class="story-copy">
			<p class="eyebrow">Comece simples</p>
			<h2>Uma conta abre o caminho para participar ou organizar ajuda.</h2>
			<p>Voluntarios descobrem vagas. ONGs enviam perfil para analise antes de publicar.</p>
		</div>
	</aside>
</section>

<style>
	.auth-page {
		display: grid;
		grid-template-columns: minmax(0, 540px);
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

	fieldset {
		display: grid;
		gap: 10px;
		margin: 0;
		padding: 0;
		border: 0;
	}

	legend {
		margin-bottom: 0;
		color: var(--color-body);
		font-size: 0.94rem;
		font-weight: 800;
	}

	label {
		display: grid;
		gap: 8px;
		color: var(--color-body);
		font-size: 0.94rem;
		font-weight: 700;
	}

	.radio-option {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 14px;
		border: 1px solid var(--color-hairline);
		border-radius: 14px;
		background: var(--color-canvas);
		cursor: pointer;
		transition:
			border-color 180ms ease-out,
			background-color 180ms ease-out,
			box-shadow 180ms ease-out;
	}

	.radio-option:hover,
	.radio-option:has(input:checked) {
		border-color: var(--color-primary);
		background: var(--color-primary-soft);
	}

	.radio-option:has(input:focus-visible) {
		outline: 3px solid var(--color-focus);
		outline-offset: 3px;
	}

	.radio-option input {
		margin-top: 3px;
		accent-color: var(--color-primary);
	}

	.radio-copy {
		display: grid;
		gap: 3px;
	}

	.radio-copy small {
		color: var(--color-muted);
		font-size: 0.84rem;
		font-weight: 500;
		line-height: 1.35;
	}

	input[type='email'],
	input[type='password'] {
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

	input[type='email']:focus-visible,
	input[type='password']:focus-visible {
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

	.alert,
	.success {
		margin-bottom: 0;
		padding: 12px 14px;
		border-radius: 12px;
		line-height: 1.45;
	}

	.alert {
		border: 1px solid oklch(82% 0.08 18);
		background: oklch(96% 0.035 18);
		color: oklch(38% 0.16 18);
	}

	.success {
		border: 1px solid oklch(82% 0.08 145);
		background: oklch(96% 0.045 145);
		color: oklch(35% 0.12 145);
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

	@media (min-width: 580px) {
		fieldset {
			grid-template-columns: 1fr 1fr;
		}

		legend {
			grid-column: 1 / -1;
		}
	}

	@media (min-width: 960px) {
		.auth-page {
			grid-template-columns: minmax(410px, 500px) minmax(420px, 620px);
			gap: clamp(40px, 6vw, 76px);
			justify-content: space-between;
		}

		.story-panel {
			position: relative;
			display: grid;
			align-content: end;
			min-height: 680px;
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
			max-width: 470px;
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
