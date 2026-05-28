<script lang="ts">
	import { resolve } from '$app/paths';

	type Oportunidade = {
		id: string;
		titulo: string;
		status: string;
		dataInicio?: string | null;
		dataFim?: string | null;
		quantidadeVagas?: number | null;
	};

	let { data } = $props();
	let oportunidades = $derived((data.oportunidades ?? []) as Oportunidade[]);

	const statusLabel: Record<string, string> = {
		rascunho: 'Rascunho',
		publicada: 'Publicada',
		encerrada: 'Encerrada',
		cancelada: 'Cancelada'
	};

	function dataCurta(valor?: string | null) {
		if (!valor) return '';
		return new Intl.DateTimeFormat('pt-BR', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		}).format(new Date(valor));
	}
</script>

<svelte:head>
	<title>Oportunidades da ONG | Volunteer Connect</title>
</svelte:head>

<section class="dashboard">
	<header>
		<div>
			<p class="eyebrow">ONG</p>
			<h1>Oportunidades</h1>
		</div>
		<a href={resolve('/ong/oportunidades/nova')}>Nova oportunidade</a>
	</header>

	{#if data.bloqueio}
		<div class="empty" role="alert">
			<h2>Esta area nao esta disponivel para o seu perfil.</h2>
			<p>{data.bloqueio}</p>
		</div>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Titulo</th>
					<th>Status</th>
					<th>Periodo</th>
					<th>Vagas</th>
					<th>Acoes</th>
				</tr>
			</thead>
			<tbody>
				{#if oportunidades.length === 0}
					<tr>
						<td colspan="5">
							<div class="empty">
								<h2>Nenhuma oportunidade cadastrada.</h2>
								<p>Crie a primeira oportunidade para receber candidaturas.</p>
								<a href={resolve('/ong/oportunidades/nova')}>Criar oportunidade</a>
							</div>
						</td>
					</tr>
				{:else}
					{#each oportunidades as oportunidade (oportunidade.id)}
						<tr>
							<td>{oportunidade.titulo}</td>
							<td>
								<span class={`status ${oportunidade.status}`}>
									{statusLabel[oportunidade.status] ?? oportunidade.status}
								</span>
							</td>
							<td>{dataCurta(oportunidade.dataInicio)} a {dataCurta(oportunidade.dataFim)}</td>
							<td>{oportunidade.quantidadeVagas}</td>
							<td class="links">
								<a href={resolve(`/ong/oportunidades/${oportunidade.id}/editar`)}>Editar</a>
								<a href={resolve(`/ong/oportunidades/${oportunidade.id}/inscricoes`)}>Inscricoes</a>
								<a href={resolve(`/ong/oportunidades/${oportunidade.id}/presencas`)}>Presencas</a>
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
		gap: 22px;
		padding: 40px clamp(16px, 5vw, 72px);
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.eyebrow {
		margin: 0;
		color: var(--color-primary-strong);
		font-weight: 900;
		text-transform: uppercase;
	}

	h1 {
		margin: 4px 0 0;
	}

	header > a {
		border-radius: 999px;
		background: var(--color-primary);
		color: white;
		font-weight: 900;
		padding: 12px 16px;
		text-decoration: none;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid var(--color-hairline);
		background: var(--color-surface);
	}

	th,
	td {
		padding: 14px;
		border-bottom: 1px solid var(--color-hairline);
		text-align: left;
	}

	th {
		color: var(--color-muted);
		font-size: 0.84rem;
		text-transform: uppercase;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.links a,
	.empty a {
		border: 1px solid var(--color-hairline);
		border-radius: 999px;
		padding: 8px 10px;
		font-weight: 900;
		text-decoration: none;
	}

	.status {
		display: inline-flex;
		padding: 6px 10px;
		border-radius: 999px;
		background: var(--color-surface-soft);
		color: var(--color-muted);
		font-weight: 900;
	}

	.publicada {
		background: #ecfdf3;
		color: #147d3f;
	}

	.rascunho {
		background: #fff7e6;
		color: #8a5a00;
	}

	.empty {
		display: grid;
		gap: 10px;
		padding: 18px;
	}

	.empty h2,
	.empty p {
		margin: 0;
	}
</style>
