<script lang="ts">
	import { resolve } from '$app/paths';

	let { form } = $props();
</script>

<svelte:head>
	<title>Recuperar senha | Volunteer Connect</title>
</svelte:head>

<section class="auth-page">
	<form class="auth-card" method="POST" aria-label="Formulario de recuperacao de senha">
		<p class="eyebrow">Senha</p>
		<h1>Recupere seu acesso</h1>
		<p>Informe seu email e enviaremos instrucoes, caso exista uma conta ativa.</p>

		{#if form?.sucesso}
			<p class="success" role="status">{form.mensagem}</p>
		{:else if form?.erro}
			<p class="alert" role="alert">{form.erro}</p>
		{/if}

		<label>
			<span>Email</span>
			<input name="email" type="email" autocomplete="email" value={form?.email ?? ''} required />
		</label>

		<button type="submit">Enviar instrucoes</button>
		<a class="helper" href={resolve('/login')}>Voltar para login</a>
	</form>
</section>

<style>
	.auth-page {
		display: grid;
		place-items: center;
		min-height: calc(100vh - 76px);
		padding: 32px clamp(16px, 5vw, 72px);
	}

	.auth-card {
		display: grid;
		gap: 18px;
		width: min(100%, 500px);
		padding: clamp(24px, 4vw, 36px);
		border: 1px solid var(--color-hairline);
		border-radius: 18px;
		background: var(--color-surface);
		box-shadow: var(--shadow-soft);
	}

	.eyebrow {
		margin: 0;
		color: var(--color-primary-strong);
		font-weight: 900;
		text-transform: uppercase;
	}

	h1,
	p {
		margin: 0;
	}

	label {
		display: grid;
		gap: 8px;
		font-weight: 800;
	}

	input,
	button {
		min-height: 48px;
		border-radius: 12px;
		font: inherit;
	}

	input {
		border: 1px solid var(--color-hairline);
		padding: 12px 14px;
	}

	button {
		border: 0;
		background: var(--color-primary);
		color: white;
		font-weight: 900;
	}

	.helper {
		color: var(--color-primary-strong);
		font-weight: 800;
		text-align: center;
	}

	.alert,
	.success {
		padding: 12px 14px;
		border-radius: 12px;
		line-height: 1.45;
	}

	.alert {
		background: oklch(96% 0.035 18);
		color: oklch(38% 0.16 18);
	}

	.success {
		background: oklch(96% 0.045 145);
		color: oklch(35% 0.12 145);
	}
</style>
