<script lang="ts">
	type Presenca = {
		id: string;
		status: string;
		observacao?: string | null;
		oportunidade?: {
			titulo?: string | null;
			ong?: string | null;
			cidade?: string | null;
			estado?: string | null;
			dataFim?: string | null;
		} | null;
	};

	let { data } = $props();
	let presencas = $derived((data.presencas ?? []) as Presenca[]);

	const statusLabel: Record<string, string> = {
		presente: 'Presente',
		ausente: 'Ausente',
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
	<title>Minhas presencas | Volunteer Connect</title>
</svelte:head>

<section class="workspace">
	<header>
		<p class="eyebrow">Voluntario</p>
		<h1>Historico de presencas</h1>
		<p>Veja sua participacao registrada em oportunidades concluidas.</p>
	</header>

	{#if data.bloqueio}
		<div class="empty" role="alert">
			<h2>Esta area nao esta disponivel para o seu perfil.</h2>
			<p>{data.bloqueio}</p>
		</div>
	{:else}
		<div class="list" aria-label="Historico de presencas">
			{#if presencas.length === 0}
				<div class="empty">
					<h2>Nenhuma presenca registrada ainda.</h2>
					<p>Quando uma ONG registrar sua participacao, o historico aparecera aqui.</p>
				</div>
			{:else}
				{#each presencas as item (item.id)}
					<article>
						<div>
							<strong>{item.oportunidade?.titulo ?? 'Oportunidade'}</strong>
							<span>
								{item.oportunidade?.ong ?? 'ONG'} · {item.oportunidade?.cidade},
								{item.oportunidade?.estado} · {dataCurta(item.oportunidade?.dataFim)}
							</span>
							{#if item.observacao}
								<span>{item.observacao}</span>
							{/if}
						</div>
						<p class={`status ${item.status}`}>{statusLabel[item.status] ?? item.status}</p>
					</article>
				{/each}
			{/if}
		</div>
	{/if}
</section>

<style>
	.workspace {
		display: grid;
		gap: 24px;
		padding: 40px clamp(16px, 5vw, 72px);
	}

	header {
		max-width: 720px;
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
	article span {
		color: var(--color-muted);
		line-height: 1.5;
	}

	.list {
		display: grid;
		gap: 12px;
	}

	article {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 12px;
		align-items: start;
		padding: 18px;
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		background: var(--color-surface);
	}

	article span {
		display: block;
		margin-top: 6px;
	}

	.status {
		margin: 0;
		padding: 6px 10px;
		border-radius: 999px;
		font-weight: 900;
		white-space: nowrap;
	}

	.presente {
		background: #ecfdf3;
		color: #067647;
	}

	.ausente {
		background: #fff4ed;
		color: #b93815;
	}

	.cancelada {
		background: var(--color-surface-soft);
		color: var(--color-muted);
	}

	.empty {
		display: grid;
		gap: 10px;
		padding: 18px;
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		background: var(--color-surface);
	}

	.empty h2,
	.empty p {
		margin: 0;
	}

	@media (max-width: 640px) {
		article {
			grid-template-columns: 1fr;
		}

		.status {
			justify-self: start;
		}
	}
</style>
