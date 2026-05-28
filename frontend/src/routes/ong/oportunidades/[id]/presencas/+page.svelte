<script lang="ts">
	type LinhaPresenca = {
		inscricaoId: string;
		voluntario?: { nomeCompleto?: string | null; email?: string | null } | null;
		presenca?: { status?: string | null; observacao?: string | null } | null;
	};

	let { data, form } = $props();
	let linhas = $derived((data.linhas ?? []) as LinhaPresenca[]);

	const statusOptions = [
		{ value: 'presente', label: 'Presente' },
		{ value: 'ausente', label: 'Ausente' },
		{ value: 'cancelada', label: 'Cancelada' }
	];
</script>

<svelte:head>
	<title>Presencas da oportunidade | Volunteer Connect</title>
</svelte:head>

<section class="workspace">
	<header>
		<p class="eyebrow">ONG</p>
		<h1>Registrar presencas</h1>
		<p>Marque a participacao de voluntarios aprovados depois que a oportunidade for concluida.</p>
	</header>

	<div class="notice" role="status">
		Acoes ficam bloqueadas para ONG pendente, reprovada ou suspensa, e para oportunidades ainda nao
		concluidas.
	</div>

	{#if form?.sucesso}
		<p class="success" role="status">{form.sucesso}</p>
	{/if}
	{#if form?.erro}
		<p class="alert" role="alert">{form.erro}</p>
	{/if}

	{#if data.bloqueio}
		<div class="empty" role="alert">
			<h2>Presencas ficam disponiveis apos a conclusao da oportunidade.</h2>
			<p>{data.bloqueio}</p>
		</div>
	{:else}
		<div class="table" aria-label="Voluntarios aprovados">
			<div class="row head">
				<span>Voluntario</span>
				<span>Status</span>
				<span>Observacao</span>
				<span>Acao</span>
			</div>

			{#if linhas.length === 0}
				<div class="empty">
					<h2>Nenhum voluntario aprovado.</h2>
					<p>Aprove inscricoes antes de registrar presencas.</p>
				</div>
			{:else}
				{#each linhas as linha (linha.inscricaoId)}
					<form class="row" method="POST" action="?/marcar">
						<div>
							<strong>{linha.voluntario?.nomeCompleto ?? 'Voluntario'}</strong>
							<small>{linha.voluntario?.email}</small>
						</div>

						<label>
							<span class="sr-only">Status de presenca de {linha.voluntario?.nomeCompleto}</span>
							<select name="status" value={linha.presenca?.status ?? 'presente'}>
								{#each statusOptions as option (option.value)}
									<option value={option.value}>{option.label}</option>
								{/each}
							</select>
						</label>

						<label>
							<span class="sr-only">Observacao de {linha.voluntario?.nomeCompleto}</span>
							<input name="observacao" value={linha.presenca?.observacao ?? ''} maxlength="1000" />
						</label>

						<input type="hidden" name="inscricaoId" value={linha.inscricaoId} />
						<button type="submit">Salvar presenca</button>
					</form>
				{/each}
			{/if}
		</div>
	{/if}
</section>

<style>
	.workspace {
		display: grid;
		gap: 22px;
		padding: 40px clamp(16px, 5vw, 72px);
	}

	header {
		max-width: 760px;
	}

	.eyebrow {
		margin: 0 0 8px;
		color: var(--color-primary-strong);
		font-weight: 900;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
		line-height: 1.15;
	}

	header p:not(.eyebrow),
	small {
		color: var(--color-muted);
		line-height: 1.5;
	}

	.notice {
		padding: 14px 16px;
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		background: var(--color-surface-soft);
		color: var(--color-body);
		font-weight: 700;
	}

	.empty,
	.success,
	.alert {
		padding: 14px 16px;
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		background: var(--color-surface);
	}

	.empty h2,
	.empty p {
		margin: 0;
	}

	.success {
		background: #ecfdf3;
		color: #147d3f;
		font-weight: 800;
	}

	.alert {
		background: #fff4ed;
		color: #c13515;
		font-weight: 800;
	}

	.table {
		display: grid;
		overflow: auto;
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		background: var(--color-surface);
	}

	.row {
		display: grid;
		grid-template-columns: minmax(220px, 1.4fr) minmax(150px, 0.8fr) minmax(220px, 1fr) auto;
		gap: 12px;
		align-items: center;
		min-width: 760px;
		padding: 14px 16px;
		border-bottom: 1px solid var(--color-hairline);
	}

	.row:last-child {
		border-bottom: 0;
	}

	.head {
		background: var(--color-surface-soft);
		color: var(--color-muted);
		font-size: 0.82rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	small {
		display: block;
		margin-top: 4px;
	}

	select,
	input,
	button {
		width: 100%;
		min-height: 42px;
		border-radius: 8px;
		font: inherit;
	}

	select,
	input {
		border: 1px solid var(--color-hairline);
		padding: 9px 11px;
		background: white;
	}

	button {
		border: 0;
		background: var(--color-primary);
		color: white;
		font-weight: 900;
		cursor: pointer;
	}

	select:focus-visible,
	input:focus-visible,
	button:focus-visible {
		outline: 3px solid var(--color-focus);
		outline-offset: 2px;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}
</style>
