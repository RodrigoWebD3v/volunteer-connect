<script lang="ts">
	type Inscricao = {
		id: string;
		status: string;
		mensagem?: string | null;
		observacaoOng?: string | null;
		voluntario?: { nomeCompleto?: string | null; email?: string | null } | null;
	};

	let { data, form } = $props();
	let inscricoes = $derived((data.inscricoes ?? []) as Inscricao[]);

	const statusLabel: Record<string, string> = {
		pendente: 'Pendente',
		aprovada: 'Aprovada',
		reprovada: 'Reprovada',
		cancelada: 'Cancelada'
	};
</script>

<svelte:head>
	<title>Inscricoes da oportunidade | Volunteer Connect</title>
</svelte:head>

<section class="dashboard">
	<p class="eyebrow">ONG</p>
	<h1>Inscricoes recebidas</h1>
	{#if form?.sucesso}
		<p class="success" role="status">{form.sucesso}</p>
	{/if}
	{#if form?.erro}
		<p class="alert" role="alert">{form.erro}</p>
	{/if}
	{#if data.bloqueio}
		<div class="empty" role="alert">
			<h2>Esta area nao esta disponivel para o seu perfil.</h2>
			<p>{data.bloqueio}</p>
		</div>
	{:else}
		<table>
			<thead>
				<tr><th>Voluntario</th><th>Status</th><th>Mensagem</th><th>Acoes</th></tr>
			</thead>
			<tbody>
				{#if inscricoes.length === 0}
					<tr>
						<td colspan="4">
							<div class="empty">
								<h2>Nenhuma inscricao recebida.</h2>
								<p>Quando voluntarios se candidatarem, eles aparecerao aqui.</p>
							</div>
						</td>
					</tr>
				{:else}
					{#each inscricoes as inscricao (inscricao.id)}
						<tr>
							<td>
								<strong>{inscricao.voluntario?.nomeCompleto ?? 'Voluntario'}</strong>
								<span>{inscricao.voluntario?.email}</span>
							</td>
							<td>
								<span class={`status ${inscricao.status}`}
									>{statusLabel[inscricao.status] ?? inscricao.status}</span
								>
							</td>
							<td>
								{inscricao.mensagem ?? 'Sem mensagem.'}
								{#if inscricao.observacaoOng}
									<span>Observacao: {inscricao.observacaoOng}</span>
								{/if}
							</td>
							<td>
								{#if inscricao.status === 'pendente'}
									<form class="actions" method="POST" action="?/avaliar">
										<input type="hidden" name="id" value={inscricao.id} />
										<input
											name="observacaoOng"
											placeholder="Observacao opcional"
											maxlength="2000"
										/>
										<button name="status" value="aprovada">Aprovar</button>
										<button class="ghost" name="status" value="reprovada">Reprovar</button>
									</form>
								{:else}
									<span class="muted">Ja avaliada</span>
								{/if}
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	{/if}
</section>

<style>
	.dashboard {
		display: grid;
		gap: 18px;
		padding: 40px clamp(16px, 5vw, 72px);
	}

	.eyebrow {
		margin: 0;
		color: var(--color-primary-strong);
		font-weight: 900;
		text-transform: uppercase;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background: var(--color-surface);
	}

	th,
	td {
		padding: 14px;
		border: 1px solid var(--color-hairline);
		text-align: left;
	}

	td span {
		display: block;
		margin-top: 4px;
		color: var(--color-muted);
	}

	.actions {
		display: grid;
		grid-template-columns: minmax(160px, 1fr) auto auto;
		gap: 8px;
	}

	input {
		min-height: 36px;
		border: 1px solid var(--color-hairline);
		border-radius: 999px;
		font: inherit;
		padding: 8px 12px;
	}

	button {
		min-height: 36px;
		border: 0;
		border-radius: 999px;
		background: var(--color-primary);
		color: white;
		font-weight: 900;
		padding: 8px 12px;
	}

	.ghost {
		border: 1px solid var(--color-hairline);
		background: white;
		color: var(--color-ink);
	}

	.status {
		display: inline-flex;
		margin: 0;
		padding: 6px 10px;
		border-radius: 999px;
		background: var(--color-surface-soft);
		font-weight: 900;
	}

	.pendente {
		color: #8a5a00;
	}

	.aprovada {
		color: #147d3f;
	}

	.reprovada {
		color: #c13515;
	}

	.empty,
	.success,
	.alert {
		padding: 14px;
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

	.muted {
		color: var(--color-muted);
		font-weight: 800;
	}
</style>
