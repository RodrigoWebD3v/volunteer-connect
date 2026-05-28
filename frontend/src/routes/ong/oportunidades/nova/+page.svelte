<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Nova oportunidade | Volunteer Connect</title>
</svelte:head>

<section class="form-page">
	<p class="eyebrow">ONG</p>
	<h1>Nova oportunidade</h1>
	{#if data.bloqueio}
		<p class="alert" role="alert">{data.bloqueio}</p>
	{:else}
		{#if form?.erro}
			<p class="alert" role="alert">{form.erro}</p>
		{/if}
		<form method="POST">
			<label><span>Titulo</span><input name="titulo" value={form?.titulo ?? ''} required /></label>
			<label
				><span>Descricao</span><textarea name="descricao" rows="5" required
					>{form?.descricao ?? ''}</textarea
				></label
			>
			<label
				><span>Tipo de atividade</span><input
					name="tipoAtividade"
					value={form?.tipoAtividade ?? ''}
					required
				/></label
			>
			<div class="row">
				<label><span>Cidade</span><input name="cidade" value={form?.cidade ?? ''} required /></label
				>
				<label
					><span>Estado</span><input
						name="estado"
						value={form?.estado ?? ''}
						maxlength="2"
						required
					/></label
				>
			</div>
			<div class="row">
				<label><span>Inicio</span><input name="dataInicio" type="date" required /></label>
				<label><span>Fim</span><input name="dataFim" type="date" required /></label>
				<label><span>Prazo</span><input name="prazoInscricao" type="date" required /></label>
			</div>
			<label
				><span>Vagas</span><input
					name="quantidadeVagas"
					type="number"
					min="1"
					value={form?.quantidadeVagas ?? ''}
					required
				/></label
			>
			<label
				><span>Status</span><select name="status">
					<option value="publicada">Publicar agora</option>
					<option value="rascunho">Salvar como rascunho</option>
				</select></label
			>
			<button type="submit">Publicar oportunidade</button>
		</form>
	{/if}
</section>

<style>
	.form-page {
		max-width: 860px;
		padding: 40px clamp(16px, 5vw, 72px);
	}

	.eyebrow {
		color: var(--color-primary-strong);
		font-weight: 900;
		text-transform: uppercase;
	}

	form,
	label {
		display: grid;
		gap: 10px;
	}

	form {
		gap: 16px;
	}

	.row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}

	input,
	textarea,
	select {
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		font: inherit;
		padding: 12px;
	}

	button {
		justify-self: start;
		border: 0;
		border-radius: 999px;
		background: var(--color-primary);
		color: white;
		font-weight: 900;
		padding: 13px 18px;
	}

	.alert {
		padding: 12px 14px;
		border-radius: 10px;
		background: #fff4ed;
		color: #c13515;
		font-weight: 800;
	}

	@media (max-width: 720px) {
		.row {
			grid-template-columns: 1fr;
		}
	}
</style>
