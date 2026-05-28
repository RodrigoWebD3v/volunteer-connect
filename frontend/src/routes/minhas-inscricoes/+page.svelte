<script lang="ts">
	import { resolve } from '$app/paths';

	type Inscricao = {
		id: string;
		status: string;
		mensagem?: string | null;
		observacaoOng?: string | null;
		oportunidade?: {
			titulo?: string | null;
			ong?: string | null;
			cidade?: string | null;
			estado?: string | null;
			dataInicio?: string | null;
		} | null;
	};

	let { data, form } = $props();
	let inscricoes = $derived((data.inscricoes ?? []) as Inscricao[]);

	const statusLabel: Record<string, string> = {
		pendente: 'Pendente',
		aprovada: 'Aprovada',
		reprovada: 'Reprovada',
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
	<title>Minhas inscricoes | Volunteer Connect</title>
</svelte:head>

<section class="workspace">
	<header>
		<p class="eyebrow">Voluntario</p>
		<h1>Minhas inscricoes</h1>
		<p>Acompanhe status e proximas etapas das oportunidades em que voce se inscreveu.</p>
	</header>

	{#if data.bloqueio}
		<div class="empty" role="alert">
			<h2>Esta area nao esta disponivel para o seu perfil.</h2>
			<p>{data.bloqueio}</p>
		</div>
	{:else}
		{#if form?.sucesso}
			<p class="success" role="status">{form.sucesso}</p>
		{/if}
		{#if form?.erro}
			<p class="alert" role="alert">{form.erro}</p>
		{/if}

		<div class="list">
			{#if inscricoes.length === 0}
				<div class="empty">
					<h2>Voce ainda nao se inscreveu em oportunidades.</h2>
					<p>Explore oportunidades disponiveis e envie sua primeira candidatura.</p>
					<a href={resolve('/oportunidades')}>Ver oportunidades</a>
				</div>
			{:else}
				{#each inscricoes as inscricao (inscricao.id)}
					<article>
						<div>
							<strong>{inscricao.oportunidade?.titulo ?? 'Oportunidade'}</strong>
							<span>
								{inscricao.oportunidade?.ong ?? 'ONG'} · {inscricao.oportunidade?.cidade},
								{inscricao.oportunidade?.estado} · {dataCurta(inscricao.oportunidade?.dataInicio)}
							</span>
							{#if inscricao.mensagem}
								<p>{inscricao.mensagem}</p>
							{/if}
							{#if inscricao.observacaoOng}
								<p><strong>Retorno da ONG:</strong> {inscricao.observacaoOng}</p>
							{/if}
						</div>
						<div class="actions">
							<p class={`status ${inscricao.status}`}>
								{statusLabel[inscricao.status] ?? inscricao.status}
							</p>
							{#if inscricao.status === 'pendente'}
								<form method="POST" action="?/cancelar">
									<input type="hidden" name="id" value={inscricao.id} />
									<button type="submit">Cancelar</button>
								</form>
							{/if}
						</div>
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
	}

	header p:not(.eyebrow),
	article span,
	article p {
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
		padding: 18px;
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		background: var(--color-surface);
	}

	article span {
		display: block;
		margin-top: 6px;
	}

	.actions {
		display: grid;
		gap: 10px;
		justify-items: end;
	}

	.status {
		margin: 0;
		padding: 6px 10px;
		border-radius: 999px;
		font-weight: 900;
		white-space: nowrap;
	}

	.pendente {
		background: #fff7e6;
		color: #8a5a00;
	}

	.aprovada {
		background: #ecfdf3;
		color: #147d3f;
	}

	.reprovada {
		background: #fff4ed;
		color: #c13515;
	}

	.cancelada {
		background: var(--color-surface-soft);
		color: var(--color-muted);
	}

	button,
	.empty a {
		min-height: 40px;
		border: 1px solid var(--color-hairline);
		border-radius: 999px;
		background: white;
		color: var(--color-ink);
		font: inherit;
		font-weight: 900;
		padding: 8px 12px;
		text-decoration: none;
	}

	.empty,
	.success,
	.alert {
		padding: 18px;
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		background: var(--color-surface);
	}

	.empty {
		display: grid;
		gap: 10px;
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

	@media (max-width: 640px) {
		article {
			grid-template-columns: 1fr;
		}

		.actions {
			justify-items: start;
		}
	}
</style>
