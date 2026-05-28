<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Analise reprovada | Volunteer Connect</title>
</svelte:head>

<section class="state-page">
	<p class="eyebrow">ONG</p>
	{#if data.bloqueio}
		<h1>Esta area nao esta disponivel para o seu perfil.</h1>
		<p>{data.bloqueio}</p>
	{:else}
		<h1>Seu perfil precisa de ajustes.</h1>
		<p>
			Revise os dados informados e envie novamente para analise. Contas suspensas nao podem reenviar
			perfil.
		</p>
		{#if data.ong?.motivoReprovacao}
			<p class="alert">Motivo informado pelo admin: {data.ong.motivoReprovacao}</p>
		{/if}
		{#if form?.erro}
			<p class="alert" role="alert">{form.erro}</p>
		{/if}
		<form method="POST">
			<label>
				<span>Descricao atualizada</span>
				<textarea name="descricao" rows="5">{form?.descricao ?? data.ong?.descricao ?? ''}</textarea
				>
			</label>
			<label>
				<span>Site</span>
				<input name="siteUrl" value={form?.siteUrl ?? data.ong?.siteUrl ?? ''} />
			</label>
			<button type="submit">Reenviar para analise</button>
		</form>
	{/if}
</section>

<style>
	.state-page {
		display: grid;
		gap: 18px;
		max-width: 760px;
		padding: 48px clamp(16px, 5vw, 72px);
	}

	.eyebrow {
		margin: 0;
		color: var(--color-primary-strong);
		font-weight: 900;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 5vw, 3.2rem);
	}

	p {
		color: var(--color-body);
		line-height: 1.6;
	}

	form,
	label {
		display: grid;
		gap: 10px;
	}

	textarea,
	input {
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		font: inherit;
		padding: 12px;
	}

	.alert {
		padding: 12px 14px;
		border-radius: 10px;
		background: #fff4ed;
		color: #c13515;
		font-weight: 800;
	}

	button {
		justify-self: start;
		min-height: 44px;
		border: 0;
		border-radius: 999px;
		background: var(--color-primary);
		color: white;
		font-weight: 900;
		padding: 10px 16px;
	}
</style>
