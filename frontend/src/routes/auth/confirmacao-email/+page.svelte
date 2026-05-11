<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Confirmacao de email | Volunteer Connect</title>
</svelte:head>

<section class="status-page">
	<div>
		<p class="eyebrow">Email confirmado</p>
		<h1>Sua conta esta pronta para continuar.</h1>
		<p>Entre com seu email e senha para acessar o Volunteer Connect.</p>
		<a href={resolve('/login')}>Entrar</a>
	</div>
</section>

<style>
	.status-page {
		display: grid;
		place-items: center;
		min-height: 60vh;
		padding: 40px 20px;
		text-align: center;
	}

	.status-page div {
		max-width: 560px;
	}

	.eyebrow {
		margin: 0 0 14px;
		color: #ff385c;
		font-weight: 800;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.25rem, 5vw, 4rem);
		line-height: 1;
	}

	p {
		margin: 20px 0 28px;
		color: #3f3f3f;
		font-size: 1.08rem;
		line-height: 1.6;
	}

	a {
		display: inline-flex;
		padding: 13px 20px;
		border-radius: 9999px;
		background: #ff385c;
		color: #ffffff;
		font-weight: 800;
		text-decoration: none;
	}
</style>
