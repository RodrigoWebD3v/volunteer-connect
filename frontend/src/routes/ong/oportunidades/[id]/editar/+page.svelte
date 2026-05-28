<script lang="ts">
	type Oportunidade = {
		titulo?: string | null;
		descricao?: string | null;
		tipoAtividade?: string | null;
		cidade?: string | null;
		estado?: string | null;
		dataInicio?: string | null;
		dataFim?: string | null;
		prazoInscricao?: string | null;
		quantidadeVagas?: number | null;
		status?: string | null;
	};

	let { data, form } = $props();
	let oportunidade = $derived((data.oportunidade ?? {}) as Oportunidade);

	function dateInput(valor?: string | null) {
		return valor ? valor.slice(0, 10) : '';
	}
</script>

<svelte:head>
	<title>Editar oportunidade | Volunteer Connect</title>
</svelte:head>

<section class="form-page">
	<p class="eyebrow">ONG</p>
	<h1>Editar oportunidade</h1>
	<p>Atualize dados, status e prazo respeitando as regras de publicacao do MVP.</p>
	{#if data.bloqueio}
		<p class="alert" role="alert">{data.bloqueio}</p>
	{:else}
		{#if form?.erro}
			<p class="alert" role="alert">{form.erro}</p>
		{/if}
		<form method="POST">
			<label
				><span>Titulo</span><input
					name="titulo"
					value={form?.titulo ?? oportunidade.titulo}
				/></label
			>
			<label
				><span>Descricao</span><textarea name="descricao" rows="5"
					>{form?.descricao ?? oportunidade.descricao}</textarea
				></label
			>
			<label
				><span>Tipo de atividade</span><input
					name="tipoAtividade"
					value={form?.tipoAtividade ?? oportunidade.tipoAtividade}
				/></label
			>
			<div class="row">
				<label
					><span>Cidade</span><input
						name="cidade"
						value={form?.cidade ?? oportunidade.cidade}
					/></label
				>
				<label
					><span>Estado</span><input
						name="estado"
						maxlength="2"
						value={form?.estado ?? oportunidade.estado}
					/></label
				>
			</div>
			<div class="row">
				<label
					><span>Inicio</span><input
						name="dataInicio"
						type="date"
						value={form?.dataInicio ?? dateInput(oportunidade.dataInicio)}
					/></label
				>
				<label
					><span>Fim</span><input
						name="dataFim"
						type="date"
						value={form?.dataFim ?? dateInput(oportunidade.dataFim)}
					/></label
				>
				<label
					><span>Prazo</span><input
						name="prazoInscricao"
						type="date"
						value={form?.prazoInscricao ?? dateInput(oportunidade.prazoInscricao)}
					/></label
				>
			</div>
			<label
				><span>Vagas</span><input
					name="quantidadeVagas"
					type="number"
					min="1"
					value={form?.quantidadeVagas ?? oportunidade.quantidadeVagas}
				/></label
			>
			<label
				><span>Status</span><select name="status"
					><option
						value="publicada"
						selected={(form?.status ?? oportunidade.status) === 'publicada'}>Publicada</option
					><option value="rascunho" selected={(form?.status ?? oportunidade.status) === 'rascunho'}
						>Rascunho</option
					><option
						value="encerrada"
						selected={(form?.status ?? oportunidade.status) === 'encerrada'}>Encerrada</option
					><option
						value="cancelada"
						selected={(form?.status ?? oportunidade.status) === 'cancelada'}>Cancelada</option
					></select
				></label
			>
			<button type="submit">Salvar alteracoes</button>
		</form>
	{/if}
</section>

<style>
	.form-page {
		display: grid;
		gap: 16px;
		max-width: 760px;
		padding: 40px clamp(16px, 5vw, 72px);
	}

	.eyebrow {
		margin: 0;
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
	select,
	textarea {
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
