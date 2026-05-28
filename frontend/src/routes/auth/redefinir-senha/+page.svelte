<script lang="ts">
	let { form } = $props();
</script>

<svelte:head>
	<title>Redefinir senha | Volunteer Connect</title>
</svelte:head>

<section class="auth-page">
	<form class="auth-card" method="POST" aria-label="Formulario de redefinicao de senha">
		<p class="eyebrow">Senha</p>
		<h1>Defina uma nova senha</h1>
		<p>Use pelo menos 8 caracteres com letras e numeros.</p>

		{#if form?.erro}
			<p class="alert" role="alert">{form.erro}</p>
		{/if}

		<label>
			<span>Nova senha</span>
			<input name="senha" type="password" autocomplete="new-password" minlength="8" required />
		</label>

		<label>
			<span>Confirmar nova senha</span>
			<input
				name="confirmar_senha"
				type="password"
				autocomplete="new-password"
				minlength="8"
				required
			/>
		</label>

		<button type="submit">Salvar nova senha</button>
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

	.alert {
		padding: 12px 14px;
		border-radius: 12px;
		background: oklch(96% 0.035 18);
		color: oklch(38% 0.16 18);
		line-height: 1.45;
	}
</style>
