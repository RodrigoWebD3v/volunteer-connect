<script lang="ts">
	type OngAnalise = {
		nomeFantasia?: string | null;
		cnpj?: string | null;
		statusAnalise?: string | null;
		cidade?: string | null;
		estado?: string | null;
		siteUrl?: string | null;
		descricao?: string | null;
		motivoReprovacao?: string | null;
	};

	let { data, form } = $props();
	let ong = $derived(data.ong as OngAnalise | null);

	const statusLabel: Record<string, string> = {
		pendente: 'Pendente',
		aprovado: 'Aprovada',
		reprovado: 'Reprovada'
	};
</script>

<svelte:head>
	<title>Detalhe da ONG | Volunteer Connect</title>
</svelte:head>

<section class="admin-detail">
	<p class="eyebrow">Admin</p>
	{#if data.bloqueio}
		<div class="empty" role="alert">
			<h1>Esta area nao esta disponivel para o seu perfil.</h1>
			<p>{data.bloqueio}</p>
		</div>
	{:else if ong}
		<h1>{ong.nomeFantasia}</h1>
		{#if form?.sucesso}
			<p class="success" role="status">{form.sucesso}</p>
		{/if}
		{#if form?.erro}
			<p class="alert" role="alert">{form.erro}</p>
		{/if}
		<dl>
			<div>
				<dt>CNPJ</dt>
				<dd>{ong.cnpj}</dd>
			</div>
			<div>
				<dt>Status</dt>
				<dd>{statusLabel[ong.statusAnalise ?? ''] ?? ong.statusAnalise}</dd>
			</div>
			<div>
				<dt>Cidade</dt>
				<dd>{ong.cidade}, {ong.estado}</dd>
			</div>
			<div>
				<dt>Site</dt>
				<dd>{ong.siteUrl ?? 'Nao informado'}</dd>
			</div>
			<div>
				<dt>Descricao</dt>
				<dd>{ong.descricao ?? 'Nao informada'}</dd>
			</div>
			{#if ong.motivoReprovacao}
				<div>
					<dt>Motivo</dt>
					<dd>{ong.motivoReprovacao}</dd>
				</div>
			{/if}
		</dl>

		<form class="actions" method="POST" action="?/reprovar">
			<label>
				<span>Motivo de reprovacao</span>
				<textarea name="motivoReprovacao" maxlength="2000" rows="5"
					>{form?.motivoReprovacao ?? ''}</textarea
				>
			</label>
			<div>
				<button formaction="?/aprovar" type="submit">Aprovar ONG</button>
				<button class="ghost" type="submit">Reprovar</button>
			</div>
		</form>
	{/if}
</section>

<style>
	.admin-detail {
		display: grid;
		gap: 20px;
		max-width: 860px;
		padding: 40px clamp(16px, 5vw, 72px);
	}

	.eyebrow {
		margin: 0;
		color: var(--color-primary-strong);
		font-weight: 900;
		text-transform: uppercase;
	}

	dl {
		display: grid;
		gap: 10px;
	}

	dl div {
		display: grid;
		grid-template-columns: 160px 1fr;
		padding: 12px;
		border-bottom: 1px solid var(--color-hairline);
	}

	dt {
		color: var(--color-muted);
		font-weight: 900;
	}

	.actions,
	label {
		display: grid;
		gap: 10px;
	}

	textarea {
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		font: inherit;
		padding: 12px;
	}

	button {
		min-height: 42px;
		border: 0;
		border-radius: 999px;
		background: var(--color-primary);
		color: white;
		font-weight: 900;
		padding: 10px 16px;
	}

	.ghost {
		border: 1px solid var(--color-hairline);
		background: white;
		color: var(--color-ink);
	}

	.empty,
	.success,
	.alert {
		padding: 14px;
		border: 1px solid var(--color-hairline);
		border-radius: 10px;
		background: var(--color-surface);
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
</style>
