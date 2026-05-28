<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Analise pendente | Volunteer Connect</title>
</svelte:head>

<section class="state-page">
	<p class="eyebrow">ONG</p>
	{#if data.bloqueio}
		<h1>Esta area nao esta disponivel para o seu perfil.</h1>
		<p>{data.bloqueio}</p>
	{:else}
		<h1>Seu perfil esta em analise.</h1>
		<p>
			Um admin precisa aprovar {data.ong?.nomeFantasia ?? 'a ONG'} antes da publicacao de oportunidades.
			Enquanto isso, voce pode navegar no marketplace como visitante.
		</p>
	{/if}
</section>

<style>
	.state-page {
		max-width: 720px;
		padding: 64px clamp(16px, 5vw, 72px);
	}

	.eyebrow {
		color: var(--color-primary-strong);
		font-weight: 900;
		text-transform: uppercase;
	}

	h1 {
		font-size: clamp(2rem, 5vw, 3.5rem);
		line-height: 1.05;
	}

	p {
		color: var(--color-body);
		line-height: 1.6;
	}
</style>
