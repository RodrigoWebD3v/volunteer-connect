<script lang="ts">
	import { resolve } from '$app/paths';

	type OngAnalise = {
		id: string;
		nomeFantasia?: string | null;
		cnpj?: string | null;
		statusAnalise: string;
	};

	let { data } = $props();
	let ongs = $derived((data.ongs ?? []) as OngAnalise[]);

	const statusLabel: Record<string, string> = {
		pendente: 'Pendente',
		aprovado: 'Aprovada',
		reprovado: 'Reprovada'
	};
</script>

<svelte:head>
	<title>Analise de ONGs | Volunteer Connect</title>
</svelte:head>

<section class="admin">
	<header>
		<p class="eyebrow">Admin</p>
		<h1>Analise de ONGs</h1>
		<p>Aprove ou reprove perfis institucionais antes da publicacao de oportunidades.</p>
	</header>

	<nav class="filters" aria-label="Filtros de status">
		<a class:active={!data.status} href={resolve('/admin/ongs')}>Todas</a>
		<a class:active={data.status === 'pendente'} href={resolve('/admin/ongs?status=pendente')}
			>Pendentes</a
		>
		<a class:active={data.status === 'aprovado'} href={resolve('/admin/ongs?status=aprovado')}
			>Aprovadas</a
		>
		<a class:active={data.status === 'reprovado'} href={resolve('/admin/ongs?status=reprovado')}
			>Reprovadas</a
		>
	</nav>

	{#if data.bloqueio}
		<div class="empty" role="alert">
			<h2>Esta area nao esta disponivel para o seu perfil.</h2>
			<p>{data.bloqueio}</p>
		</div>
	{:else}
		<table>
			<thead>
				<tr><th>ONG</th><th>CNPJ</th><th>Status</th><th>Acao</th></tr>
			</thead>
			<tbody>
				{#if ongs.length === 0}
					<tr>
						<td colspan="4">
							<div class="empty">
								<h2>Nenhuma ONG encontrada.</h2>
								<p>Altere o filtro ou aguarde novos cadastros institucionais.</p>
							</div>
						</td>
					</tr>
				{:else}
					{#each ongs as ong (ong.id)}
						<tr>
							<td>{ong.nomeFantasia}</td>
							<td>{ong.cnpj}</td>
							<td>
								<span class={`status ${ong.statusAnalise}`}>
									{statusLabel[ong.statusAnalise] ?? ong.statusAnalise}
								</span>
							</td>
							<td><a href={resolve(`/admin/ongs/${ong.id}`)}>Analisar</a></td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	{/if}
</section>

<style>
	.admin {
		display: grid;
		gap: 22px;
		padding: 40px clamp(16px, 5vw, 72px);
	}

	.eyebrow {
		margin: 0;
		color: var(--color-primary-strong);
		font-weight: 900;
		text-transform: uppercase;
	}

	h1 {
		margin: 4px 0;
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

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.filters a,
	td a {
		border: 1px solid var(--color-hairline);
		border-radius: 999px;
		padding: 8px 12px;
		font-weight: 900;
		text-decoration: none;
	}

	.filters .active {
		background: var(--color-primary);
		color: white;
	}

	.status {
		display: inline-flex;
		padding: 6px 10px;
		border-radius: 999px;
		background: var(--color-surface-soft);
		font-weight: 900;
	}

	.pendente {
		color: #8a5a00;
	}

	.aprovado {
		color: #147d3f;
	}

	.reprovado {
		color: #c13515;
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
