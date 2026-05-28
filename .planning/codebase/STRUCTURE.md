# Structure

**Analysis Date:** 2026-05-27

## Root Layout

- `package.json` - root orchestration scripts for dev, lint, format, build/check, test, and verify.
- `package-lock.json` - root npm lockfile.
- `.env.example` - combined local environment template.
- `README.md` - setup, environment, local execution, quality commands, MVP flows, and delivery docs.
- `SECURITY.md` - repository security guidance.
- `PRODUCT.md` - product context.
- `DESIGN.md`, `DESIGN_AIRBNB.md`, `DESIGN_NOTION.md` - design direction docs.
- `dev.sh` - local developer helper script.
- `backend/` - NestJS API package.
- `frontend/` - SvelteKit app package.
- `supabase/` - SQL migrations and seed data.
- `docs/` - database, auth, quality, delivery, and verification docs.
- `.planning/` - GSD project state, roadmap, phase plans, and generated codebase map.

## Backend Directory

- `backend/package.json` - backend scripts and dependencies.
- `backend/nest-cli.json` - Nest CLI config.
- `backend/tsconfig.json` - backend TypeScript config.
- `backend/tsconfig.build.json` - backend build TypeScript config.
- `backend/eslint.config.mjs` - backend ESLint and Prettier integration.
- `backend/.env.example` - backend-only environment template.
- `backend/test/app.e2e-spec.ts` - starter e2e test.
- `backend/test/jest-e2e.json` - e2e Jest config.

## Backend Source Layout

- `backend/src/main.ts` - Nest bootstrap, env loading, global validation pipe, port binding.
- `backend/src/app.module.ts` - root module imports.
- `backend/src/app.controller.ts` and `backend/src/app.service.ts` - starter health/root endpoint.
- `backend/src/app.controller.spec.ts` - starter unit test.

**Shared Supabase module:**
- `backend/src/supabase/supabase.module.ts`
- `backend/src/supabase/supabase.service.ts`

**Auth module:**
- `backend/src/auth/auth.module.ts`
- `backend/src/auth/auth.controller.ts`
- `backend/src/auth/auth.service.ts`
- `backend/src/auth/dto/auth.dto.ts`
- `backend/src/auth/decorators/roles.decorator.ts`
- `backend/src/auth/decorators/usuario-atual.decorator.ts`
- `backend/src/auth/guards/supabase-auth.guard.ts`
- `backend/src/auth/guards/roles.guard.ts`
- `backend/src/auth/guards/ong-aprovada.guard.ts`

**ONG module:**
- `backend/src/ongs/ongs.module.ts`
- `backend/src/ongs/ongs.controller.ts`
- `backend/src/ongs/ongs.service.ts`
- `backend/src/ongs/dto/analisar-ong.dto.ts`
- `backend/src/ongs/dto/reenviar-analise-ong.dto.ts`
- `backend/src/ongs/dto/suspender-conta.dto.ts`

**Opportunities module:**
- `backend/src/oportunidades/oportunidades.module.ts`
- `backend/src/oportunidades/oportunidades.controller.ts`
- `backend/src/oportunidades/oportunidades.service.ts`
- `backend/src/oportunidades/dto/criar-oportunidade.dto.ts`
- `backend/src/oportunidades/dto/atualizar-oportunidade.dto.ts`
- `backend/src/oportunidades/dto/filtrar-oportunidades.dto.ts`
- `backend/src/oportunidades/jobs/encerrar-oportunidades.job.ts`

**Applications module:**
- `backend/src/inscricoes/inscricoes.module.ts`
- `backend/src/inscricoes/inscricoes.controller.ts`
- `backend/src/inscricoes/inscricoes.service.ts`
- `backend/src/inscricoes/dto/criar-inscricao.dto.ts`
- `backend/src/inscricoes/dto/avaliar-inscricao.dto.ts`
- `backend/src/inscricoes/dto/filtrar-inscricoes.dto.ts`

**Attendance module:**
- `backend/src/presencas/presencas.module.ts`
- `backend/src/presencas/presencas.controller.ts`
- `backend/src/presencas/presencas.service.ts`
- `backend/src/presencas/dto/marcar-presenca.dto.ts`
- `backend/src/presencas/dto/filtrar-presencas.dto.ts`

## Frontend Directory

- `frontend/package.json` - frontend scripts and dependencies.
- `frontend/svelte.config.js` - SvelteKit config.
- `frontend/vite.config.ts` - Vite and Vitest config.
- `frontend/tsconfig.json` - frontend TypeScript config.
- `frontend/eslint.config.js` - frontend ESLint/Svelte config.
- `frontend/.env.example` - frontend public environment template.
- `frontend/static/robots.txt` - static robots file.
- `frontend/src/app.html` - SvelteKit HTML template.
- `frontend/src/app.d.ts` - SvelteKit app types.
- `frontend/src/hooks.server.ts` - request lifecycle and Supabase SSR locals.
- `frontend/src/lib/supabase/client.ts` - browser Supabase client helper.
- `frontend/src/lib/supabase/server.ts` - server Supabase client helper.
- `frontend/src/lib/vitest-examples/` - starter Vitest example.
- `frontend/src/lib/assets/favicon.svg` - frontend favicon asset.

## Frontend Routes

**Public and layout:**
- `frontend/src/routes/+layout.server.ts`
- `frontend/src/routes/+layout.svelte`
- `frontend/src/routes/+page.svelte`
- `frontend/src/routes/oportunidades/+page.ts`
- `frontend/src/routes/oportunidades/+page.svelte`
- `frontend/src/routes/oportunidades/[id]/+page.ts`
- `frontend/src/routes/oportunidades/[id]/+page.svelte`

**Auth:**
- `frontend/src/routes/login/+page.server.ts`
- `frontend/src/routes/login/+page.svelte`
- `frontend/src/routes/cadastro/+page.server.ts`
- `frontend/src/routes/cadastro/+page.svelte`
- `frontend/src/routes/sair/+server.ts`
- `frontend/src/routes/auth/confirmacao-email/+page.server.ts`
- `frontend/src/routes/auth/confirmacao-email/+page.svelte`
- `frontend/src/routes/auth/esqueci-senha/+page.server.ts`
- `frontend/src/routes/auth/esqueci-senha/+page.svelte`
- `frontend/src/routes/auth/redefinir-senha/+page.server.ts`
- `frontend/src/routes/auth/redefinir-senha/+page.svelte`
- `frontend/src/routes/auth/sessao-expirada/+page.svelte`

**Volunteer:**
- `frontend/src/routes/minhas-inscricoes/+page.svelte`
- `frontend/src/routes/minhas-presencas/+page.svelte`

**ONG:**
- `frontend/src/routes/ong/analise-pendente/+page.svelte`
- `frontend/src/routes/ong/analise-reprovada/+page.svelte`
- `frontend/src/routes/ong/oportunidades/+page.svelte`
- `frontend/src/routes/ong/oportunidades/nova/+page.svelte`
- `frontend/src/routes/ong/oportunidades/[id]/editar/+page.svelte`
- `frontend/src/routes/ong/oportunidades/[id]/inscricoes/+page.svelte`
- `frontend/src/routes/ong/oportunidades/[id]/presencas/+page.svelte`

**Admin:**
- `frontend/src/routes/admin/ongs/+page.svelte`
- `frontend/src/routes/admin/ongs/[id]/+page.svelte`

## Supabase Directory

- `supabase/migrations/0001_modelo_inicial.sql` - initial relational MVP model.
- `supabase/migrations/0002_auth_rls_usuarios.sql` - auth/RLS user policies.
- `supabase/migrations/0002_campos_analise_ong.sql` - ONG analysis fields.
- `supabase/migrations/0002_00_conta_suspensa_usuarios.sql` - account suspension field.
- `supabase/migrations/0002_01_logo_storage_path_ongs.sql` - ONG logo storage path.
- `supabase/migrations/0003_oportunidades.sql` - opportunities contract.
- `supabase/migrations/0004_inscricoes.sql` - applications contract and approval RPC.
- `supabase/migrations/0005_presencas.sql` - attendance contract.
- `supabase/migrations/0006_cadastro_completo.sql` - completed registration contract.
- `supabase/seed/0001_dados_exemplo.sql` - sample data.

## Where To Add New Code

- New backend domains: create `backend/src/<domain>/<domain>.module.ts`, controller, service, and DTO folder.
- New backend request contracts: add DTO classes under `backend/src/<domain>/dto/` with `class-validator` decorators.
- New shared backend infrastructure: add a module under `backend/src/<shared-name>/` and export providers through its module.
- New frontend public pages: add route folders under `frontend/src/routes/`.
- New frontend server-only form handling: use `+page.server.ts` next to the route component.
- New frontend public data loading: use `+page.ts` next to the route component.
- New SQL schema changes: add ordered migration files under `supabase/migrations/` and keep example data in `supabase/seed/`.
- New delivery or operational docs: add focused Markdown files under `docs/`.

## Naming Conventions

- Backend domain files use Portuguese domain names where established: `ongs`, `oportunidades`, `inscricoes`, `presencas`.
- Backend DTO files use kebab-case and Portuguese action names, such as `criar-oportunidade.dto.ts`.
- Backend class names use PascalCase, such as `OportunidadesService` and `CriarOportunidadeDto`.
- Frontend SvelteKit files follow route conventions: `+page.svelte`, `+page.ts`, `+page.server.ts`, and `+server.ts`.
- Database files use zero-padded numeric prefixes and Portuguese descriptions, such as `0004_inscricoes.sql`.
