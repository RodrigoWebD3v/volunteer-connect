<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<section class="home">
	<div class="intro">
		<p class="eyebrow">Oportunidades de voluntariado</p>
		<h1>Encontre uma forma simples de ajudar.</h1>
		<p class="summary">
			Conectamos voluntarios a ONGs com oportunidades reais, organizadas e faceis de acompanhar.
		</p>

		<div class="actions">
			<a class="primary" href={resolve('/cadastro')}>Criar conta</a>
			<a class="secondary" href={resolve('/login')}>Entrar</a>
		</div>
	</div>

	<div class="preview" aria-label="Resumo da experiencia Volunteer Connect">
		<div>
			<span>01</span>
			<strong>Descubra oportunidades</strong>
			<p>Veja causas, locais e necessidades de forma clara.</p>
		</div>
		<div>
			<span>02</span>
			<strong>Cadastre-se</strong>
			<p>Entre como voluntario ou ONG para continuar o fluxo.</p>
		</div>
		<div>
			<span>03</span>
			<strong>Participe</strong>
			<p>Inscricoes e gestao ficarao conectadas ao seu perfil.</p>
		</div>
	</div>
</section>

<style>
	.home {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
		gap: 48px;
		align-items: center;
		padding: clamp(48px, 8vw, 96px) clamp(20px, 5vw, 72px);
	}

	.eyebrow {
		margin: 0 0 16px;
		color: #ff385c;
		font-weight: 700;
	}

	h1 {
		max-width: 720px;
		margin: 0;
		font-size: clamp(2.5rem, 7vw, 5.5rem);
		line-height: 0.95;
	}

	.summary {
		max-width: 620px;
		margin: 24px 0 0;
		color: #3f3f3f;
		font-size: 1.15rem;
		line-height: 1.6;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: 32px;
	}

	.actions a {
		padding: 13px 20px;
		border-radius: 9999px;
		font-weight: 700;
		text-decoration: none;
	}

	.primary {
		background: #ff385c;
		color: #ffffff;
	}

	.secondary {
		border: 1px solid #dddddd;
		background: #ffffff;
	}

	.preview {
		display: grid;
		gap: 12px;
	}

	.preview div {
		padding: 22px;
		border: 1px solid #dddddd;
		border-radius: 14px;
		background: #ffffff;
		box-shadow: 0 14px 40px rgba(34, 34, 34, 0.07);
	}

	.preview span {
		color: #ff385c;
		font-weight: 800;
	}

	.preview strong {
		display: block;
		margin-top: 8px;
		font-size: 1.1rem;
	}

	.preview p {
		margin: 8px 0 0;
		color: #6a6a6a;
		line-height: 1.5;
	}

	@media (max-width: 860px) {
		.home {
			grid-template-columns: 1fr;
		}
	}
</style>
