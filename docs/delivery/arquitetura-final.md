# Arquitetura final

## Visao geral

Volunteer Connect usa SvelteKit no frontend, NestJS no backend e Supabase remoto para Auth, Storage e PostgreSQL.

## Frontend

SvelteKit entrega marketplace publico, login, cadastro, areas de voluntario, ONG e admin. O frontend usa cookies SSR do Supabase e nunca deve receber `SUPABASE_SERVICE_ROLE_KEY`.

## Backend

NestJS centraliza escritas de dominio, validacao e autorizacao. Como o backend usa service role, services precisam validar papel, suspensao, ownership e status de analise antes de alterar dados.

Modulos principais:

- `auth`: cadastro, login, recuperacao e guards.
- `ongs`: perfil de ONG e analise administrativa.
- `oportunidades`: publicacao e consulta.
- `inscricoes`: candidatura e avaliacao.
- `presencas`: historico de participacao.

## Supabase

- Auth: contas e tokens.
- PostgreSQL: usuarios, perfis, oportunidades, inscricoes e presencas.
- Storage: logos de ONGs em bucket configurado por `SUPABASE_LOGOS_BUCKET`.

## Seguranca

- Service role somente no backend.
- Cookies SSR no frontend; sem `localStorage` para token.
- CPF/CNPJ nao aparecem em paginas publicas.
- Ownership validado no backend para ONG, oportunidades, inscricoes e presencas.
- Suspensao bloqueia novas acoes sem apagar historico.
