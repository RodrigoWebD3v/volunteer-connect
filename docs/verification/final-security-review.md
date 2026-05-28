# Revisao final de seguranca

Data: 2026-05-27

## Escopo analisado

- Auth, cadastro, recuperacao de senha e guards.
- Fluxos ONG/admin/oportunidades/inscricoes/presencas.
- Supabase service role, Storage e migrations.
- Documentacao de entrega.
- Fase 11: consolidacao de migrations/seed, exemplos de ambiente, audit de dependencias e casts nas bordas Supabase.
- Fase 12: integracao SSR das telas protegidas com backend real, Bearer token da sessao Supabase, guards de rota por papel/status e acoes de voluntario/ONG/admin.

## Achados

### MEDIO: testes E2E de autorizacao ainda dependem de ambiente seedado

Impacto: bugs de IDOR podem passar sem teste automatizado completo.

Mitigacao: services novos validam ownership no backend; E2E deve ser executado antes de entrega final contra ambiente de teste.

### BAIXO: sem rate limit dedicado em login/cadastro

Impacto: aumenta superficie de abuso em ambiente publico.

Mitigacao: para MVP academico local, risco aceito. Para deploy publico, adicionar rate limiting no backend e protecao no Supabase.

### BAIXO: advisory residual de `cookie` via SvelteKit

Impacto: `npm --prefix frontend audit --audit-level=moderate` passa, mas o audit completo ainda reporta advisory baixo em dependencia transitiva do SvelteKit.

Mitigacao: `npm audit fix` atualizou `@sveltejs/kit` e removeu as vulnerabilidades moderadas. O npm oferece apenas `npm audit fix --force`, que tentaria instalar `@sveltejs/kit@0.0.30` e quebraria o stack atual; risco aceito para MVP local ate existir upgrade seguro.

## Evidencias de 2026-05-27

- `npm run ci`: passou.
- `npm --prefix backend audit --audit-level=moderate`: 0 vulnerabilidades.
- `npm --prefix frontend audit --audit-level=moderate`: passou sem achados moderados ou altos; apenas advisory baixo residual.
- Seed revisado com emails `example.org` e CPFs/CNPJs ficticios numericos.
- Fase 12: `npm run ci`, `npm --prefix backend audit --audit-level=moderate` e `npm --prefix frontend audit --audit-level=moderate` passaram.

## Decisao

APROVADO COM RESSALVAS para MVP academico local. Nao ha segredo real introduzido nas alteracoes desta fase; service role permanece backend-only; CPF/CNPJ ficam restritos ao cadastro/proprio usuario e contexto admin; achados moderados de dependencia foram corrigidos.
