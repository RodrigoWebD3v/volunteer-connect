<script lang="ts">
	import { resolve } from '$app/paths';

	type OportunidadeCard = {
		ong?: string | { nomeFantasia?: string | null } | null;
	};

	let { data } = $props();
	let oportunidades = $derived(data.oportunidades ?? []);

	function nomeOng(oportunidade: OportunidadeCard) {
		if (typeof oportunidade.ong === 'string') {
			return oportunidade.ong;
		}

		return oportunidade.ong?.nomeFantasia ?? 'ONG';
	}

	function dataCurta(valor: string) {
		return new Intl.DateTimeFormat('pt-BR', {
			day: '2-digit',
			month: 'short'
		}).format(new Date(valor));
	}
</script>

<svelte:head>
	<title>Oportunidades | Volunteer Connect</title>
</svelte:head>

<section class="marketplace">
	<div class="heading">
		<p class="eyebrow">Marketplace</p>
		<h1>Encontre oportunidades reais e organizadas.</h1>
		<p>Busque por causa, cidade ou data e abra os detalhes antes de se inscrever.</p>
	</div>

	<form class="filters" aria-label="Filtros de oportunidades">
		<label>
			<span>Busca</span>
			<input name="busca" placeholder="Causa, ONG ou atividade" />
		</label>
		<label>
			<span>Cidade</span>
			<input name="cidade" placeholder="Ex.: Criciuma" />
		</label>
		<label>
			<span>Tipo</span>
			<input name="tipoAtividade" placeholder="Ex.: Educacao" />
		</label>
		<button type="submit">Filtrar</button>
	</form>

	{#if data.offline}
		<p class="offline" role="status">
			Exibindo dados de demonstracao porque a API local nao respondeu.
		</p>
	{/if}

	<div class="grid" aria-label="Lista de oportunidades">
		{#each oportunidades as oportunidade (oportunidade.id)}
			<a class="card" href={resolve(`/oportunidades/${oportunidade.id}` as '/oportunidades')}>
				<div class="logo" aria-hidden="true">{nomeOng(oportunidade).slice(0, 2)}</div>
				<div>
					<p class="tag">{oportunidade.tipoAtividade}</p>
					<h2>{oportunidade.titulo}</h2>
					<p>{nomeOng(oportunidade)}</p>
					<span
						>{oportunidade.cidade}, {oportunidade.estado} · {dataCurta(oportunidade.dataInicio)} · {oportunidade.quantidadeVagas}
						vagas</span
					>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	.marketplace {
		display: grid;
		gap: 28px;
		padding: 40px clamp(16px, 5vw, 72px) 72px;
	}

	.heading {
		max-width: 760px;
	}

	.eyebrow,
	.tag {
		margin: 0 0 8px;
		color: var(--color-primary-strong);
		font-size: 0.78rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 5vw, 4rem);
		line-height: 1.05;
	}

	.heading p:not(.eyebrow) {
		color: var(--color-body);
		line-height: 1.6;
	}

	.filters {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 12px;
		padding: 16px;
		border: 1px solid var(--color-hairline);
		border-radius: 16px;
		background: var(--color-surface);
	}

	label {
		display: grid;
		gap: 6px;
		font-weight: 800;
	}

	input,
	button {
		min-height: 44px;
		border-radius: 999px;
		font: inherit;
	}

	.offline {
		margin: 0;
		padding: 12px 14px;
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		background: var(--color-surface-soft);
		color: var(--color-body);
		font-weight: 700;
	}

	input {
		border: 1px solid var(--color-hairline);
		padding: 10px 14px;
	}

	button {
		align-self: end;
		border: 0;
		background: var(--color-primary);
		color: white;
		font-weight: 900;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 16px;
	}

	.card {
		display: grid;
		grid-template-columns: 64px 1fr;
		gap: 16px;
		padding: 18px;
		border: 1px solid var(--color-hairline);
		border-radius: 14px;
		background: var(--color-surface);
		text-decoration: none;
		box-shadow: var(--shadow-soft);
	}

	.logo {
		display: grid;
		width: 64px;
		height: 64px;
		place-items: center;
		border-radius: 14px;
		background: var(--color-primary-soft);
		color: var(--color-primary-strong);
		font-weight: 900;
	}

	h2 {
		margin: 0 0 8px;
		font-size: 1.1rem;
	}

	.card p:not(.tag),
	.card span {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.45;
	}

	.card span {
		display: block;
		margin-top: 10px;
		font-weight: 700;
	}

	@media (max-width: 780px) {
		.filters {
			grid-template-columns: 1fr;
		}
	}
</style>
