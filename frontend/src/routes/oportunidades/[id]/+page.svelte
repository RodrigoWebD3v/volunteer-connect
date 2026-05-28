<script lang="ts">
	import { resolve } from '$app/paths';

	type Oportunidade = {
		titulo: string;
		descricao: string;
		cidade: string;
		estado: string;
		dataInicio: string;
		dataFim: string;
		quantidadeVagas: number;
		prazoAberto: boolean;
		ong?: { nomeFantasia?: string | null } | null;
	};
	type InscricaoAtual = { status: string };

	let { data, form } = $props();
	let id = $derived(data.id);
	let oportunidade = $derived(data.oportunidade as Oportunidade);
	let inscricaoAtual = $derived(
		(form?.sucesso ? { status: 'pendente' } : data.inscricaoAtual) as InscricaoAtual | null
	);

	function dataCompleta(valor: string) {
		return new Intl.DateTimeFormat('pt-BR', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		}).format(new Date(valor));
	}

	const statusLabel: Record<string, string> = {
		pendente: 'Pendente',
		aprovada: 'Aprovada',
		reprovada: 'Reprovada',
		cancelada: 'Cancelada'
	};
</script>

<svelte:head>
	<title>Detalhe da oportunidade | Volunteer Connect</title>
</svelte:head>

<section class="detail">
	<a class="back" href={resolve('/oportunidades')}>Voltar para oportunidades</a>

	<div class="layout">
		<article>
			<p class="eyebrow">Oportunidade</p>
			<h1>{oportunidade.titulo}</h1>
			<p class="lead">{oportunidade.descricao}</p>

			<div class="facts" aria-label="Informacoes praticas">
				<span>{oportunidade.cidade}, {oportunidade.estado}</span>
				<span>{dataCompleta(oportunidade.dataInicio)} a {dataCompleta(oportunidade.dataFim)}</span>
				<span>{oportunidade.quantidadeVagas} vagas</span>
				<span>{oportunidade.prazoAberto ? 'Inscricoes abertas' : 'Prazo encerrado'}</span>
			</div>

			<h2>Sobre a atividade</h2>
			<p>
				{oportunidade.descricao}
			</p>

			<h2>ONG responsavel</h2>
			<p>{oportunidade.ong?.nomeFantasia ?? 'ONG'} · perfil aprovado no Volunteer Connect.</p>
		</article>

		<aside class="apply">
			<h2>Inscricao</h2>
			<p>A ONG entrara em contato pelos dados informados no cadastro.</p>
			{#if form?.sucesso}
				<p class="success" role="status">{form.sucesso}</p>
			{/if}
			{#if form?.erro}
				<p class="alert" role="alert">{form.erro}</p>
			{/if}

			{#if inscricaoAtual}
				<p class="blocked">
					Sua candidatura esta {statusLabel[inscricaoAtual.status] ?? inscricaoAtual.status}.
				</p>
				<a class="secondary" href={resolve('/minhas-inscricoes')}>Ver minhas inscricoes</a>
			{:else if !oportunidade.prazoAberto}
				<p class="blocked">Inscricoes encerradas para esta oportunidade.</p>
			{:else if !data.usuario}
				<a class="primary" href={resolve(`/login?redirectTo=/oportunidades/${id}`)}
					>Entrar para aplicar</a
				>
				<a class="secondary" href={resolve('/cadastro')}>Criar conta de voluntario</a>
			{:else}
				<form method="POST" action="?/aplicar">
					<label>
						<span>Mensagem para a ONG</span>
						<textarea
							name="mensagem"
							rows="4"
							maxlength="1000"
							placeholder="Conte brevemente por que voce quer participar"
							>{form?.mensagem ?? ''}</textarea
						>
					</label>
					<button class="primary" type="submit">Aplicar agora</button>
				</form>
			{/if}
		</aside>
	</div>
</section>

<style>
	.detail {
		padding: 32px clamp(16px, 5vw, 72px) 72px;
	}

	.back {
		color: var(--color-primary-strong);
		font-weight: 800;
	}

	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 340px;
		gap: 36px;
		margin-top: 28px;
	}

	article,
	.apply {
		padding: clamp(22px, 4vw, 36px);
		border: 1px solid var(--color-hairline);
		border-radius: 14px;
		background: var(--color-surface);
	}

	.eyebrow {
		margin: 0 0 8px;
		color: var(--color-primary-strong);
		font-weight: 900;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 5vw, 3.5rem);
		line-height: 1.05;
	}

	.lead,
	p {
		color: var(--color-body);
		line-height: 1.65;
	}

	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin: 24px 0;
	}

	.facts span {
		padding: 8px 12px;
		border-radius: 999px;
		background: var(--color-surface-soft);
		font-weight: 800;
	}

	.apply {
		position: sticky;
		top: 96px;
		align-self: start;
		display: grid;
		gap: 14px;
	}

	.apply a,
	.apply button {
		min-height: 46px;
		padding: 12px 16px;
		border: 0;
		border-radius: 999px;
		font: inherit;
		font-weight: 900;
		text-align: center;
		text-decoration: none;
	}

	.apply form,
	.apply label {
		display: grid;
		gap: 10px;
	}

	.apply label {
		color: var(--color-body);
		font-size: 0.94rem;
		font-weight: 800;
	}

	textarea {
		width: 100%;
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		font: inherit;
		padding: 12px;
		resize: vertical;
	}

	.primary {
		background: var(--color-primary);
		color: white;
		cursor: pointer;
	}

	.secondary {
		border: 1px solid var(--color-hairline);
	}

	.blocked {
		margin: 0;
		padding: 12px 14px;
		border-radius: 10px;
		background: var(--color-surface-soft);
		font-weight: 800;
	}

	.success,
	.alert {
		margin: 0;
		padding: 12px 14px;
		border-radius: 10px;
		font-weight: 800;
		line-height: 1.45;
	}

	.success {
		background: #ecfdf3;
		color: #147d3f;
	}

	.alert {
		background: #fff4ed;
		color: #c13515;
	}

	@media (max-width: 840px) {
		.layout {
			grid-template-columns: 1fr;
		}

		.apply {
			position: static;
		}
	}
</style>
