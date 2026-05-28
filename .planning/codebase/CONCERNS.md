# Concerns

**Analysis Date:** 2026-05-27

## High Priority

## Service Role Authorization Burden

**Files:**
- `backend/src/supabase/supabase.service.ts`
- `backend/src/auth/auth.service.ts`
- `backend/src/ongs/ongs.service.ts`
- `backend/src/oportunidades/oportunidades.service.ts`
- `backend/src/inscricoes/inscricoes.service.ts`
- `backend/src/presencas/presencas.service.ts`

**Concern:**
- Backend domain services use Supabase `adminClient`, which bypasses RLS with the service role key.
- This is acceptable only if every service method performs complete authorization and state checks before querying or mutating data.

**Impact:**
- A missing check in any new endpoint can expose or mutate data across users, ONGs, or volunteers.

**Fix approach:**
- Prefer reusable guards and authorization helpers for new protected endpoints.
- Add service tests for role/state checks before extending these modules.
- Keep the service role key backend-only and never serialize it to frontend routes.

## Plain Error Usage In HTTP Paths

**Files:**
- `backend/src/auth/auth.controller.ts`
- `backend/src/auth/auth.service.ts`

**Concern:**
- Some HTTP-facing paths throw plain `Error` instead of Nest HTTP exceptions.
- Examples include missing bearer token in `/auth/me` and Supabase auth failures in `AuthService`.

**Impact:**
- Plain errors can produce inconsistent HTTP statuses and less controlled user-facing responses.

**Fix approach:**
- Replace plain `Error` in controller/service request paths with `UnauthorizedException`, `BadRequestException`, or `InternalServerErrorException` as appropriate.

## Limited Automated Coverage

**Files:**
- `backend/src/app.controller.spec.ts`
- `frontend/src/lib/vitest-examples/greet.spec.ts`
- `backend/src/auth/auth.service.ts`
- `backend/src/ongs/ongs.service.ts`
- `backend/src/oportunidades/oportunidades.service.ts`
- `backend/src/inscricoes/inscricoes.service.ts`
- `backend/src/presencas/presencas.service.ts`

**Concern:**
- Existing automated tests are starter examples and do not cover core MVP business rules.

**Impact:**
- Regressions in auth, role checks, opportunity capacity, application state transitions, and attendance rules may pass local verification unless caught manually.

**Fix approach:**
- Add focused service unit tests around authorization, Supabase error mapping, and state transitions.
- Add SvelteKit server-action tests for registration, login, and recovery flows.

## Medium Priority

## Duplicate Authentication And Role Logic

**Files:**
- `backend/src/auth/guards/supabase-auth.guard.ts`
- `backend/src/auth/guards/roles.guard.ts`
- `backend/src/auth/guards/ong-aprovada.guard.ts`
- `backend/src/ongs/ongs.controller.ts`
- `backend/src/oportunidades/oportunidades.controller.ts`
- `backend/src/inscricoes/inscricoes.controller.ts`
- `backend/src/presencas/presencas.controller.ts`
- `backend/src/*/*.service.ts`

**Concern:**
- Guards and decorators exist, but several controllers extract bearer tokens manually and services repeat current-user/role lookup helpers.

**Impact:**
- Future endpoints can drift in authorization behavior and error messages.

**Fix approach:**
- Standardize on guards plus `@UsuarioAtual()` for protected routes, or extract a shared domain auth helper service.
- Refactor gradually with tests to avoid changing behavior unexpectedly.

## Large Route And Service Files

**Files:**
- `frontend/src/routes/cadastro/+page.svelte` around 530 lines.
- `backend/src/oportunidades/oportunidades.service.ts` around 416 lines.
- `backend/src/ongs/ongs.service.ts` around 395 lines.
- `backend/src/auth/auth.service.ts` around 388 lines.
- `backend/src/inscricoes/inscricoes.service.ts` around 345 lines.
- `backend/src/presencas/presencas.service.ts` around 314 lines.

**Concern:**
- Large files mix validation, data access, mapping, and UI logic.

**Impact:**
- Changes are harder to test and review, especially in auth and domain state transitions.

**Fix approach:**
- Extract pure validation/mapping helpers when adding tests or new behavior.
- Avoid broad refactors without coverage; use incremental extraction around changed behavior.

## Schema Evolution Is Manual

**Files:**
- `supabase/migrations/*.sql`
- `docs/database/README.md`
- `docs/database/execucao-futura-fase2.md`

**Concern:**
- Migrations are documented as local contracts that require manual review/execution in Supabase.
- No automated migration runner or CI drift check is detected.

**Impact:**
- Remote Supabase schema can drift from code expectations, producing runtime failures such as missing columns or RPC functions.

**Fix approach:**
- Add an approved migration execution procedure or Supabase CLI workflow.
- Add a schema verification checklist or automated smoke script for required tables, columns, indexes, and RPCs.

## Inconsistent Status Vocabulary

**Files:**
- `supabase/migrations/0001_modelo_inicial.sql`
- `supabase/migrations/0004_inscricoes.sql`
- `backend/src/inscricoes/dto/filtrar-inscricoes.dto.ts`
- `backend/src/inscricoes/dto/avaliar-inscricao.dto.ts`

**Concern:**
- Initial schema uses `status_inscricao` value `rejeitada`, while later application contracts and backend DTOs use `reprovada`.

**Impact:**
- Applying migrations in the wrong order or retaining old enum-based schema can break application filtering and updates.

**Fix approach:**
- Document the authoritative final schema clearly.
- Add migration checks that confirm the remote `inscricoes.status` accepted values match backend DTOs.

## Low Priority

## No CI Workflow Detected

**Files:**
- `.github/PULL_REQUEST_TEMPLATE.md`
- `package.json`

**Concern:**
- The repo has local quality scripts but no detected `.github/workflows/` automation.

**Impact:**
- Verification depends on each contributor running commands locally.

**Fix approach:**
- Add a CI workflow that runs install, lint/check/build/test for root, backend, and frontend packages.

## Starter Documentation Is Partially Stale

**Files:**
- `backend/README.md`
- `frontend/README.md`

**Concern:**
- Package READMEs still say the package is foundation-only, while the MVP now contains auth, ONG, opportunity, application, and attendance flows.

**Impact:**
- New contributors may misunderstand the current codebase scope.

**Fix approach:**
- Update package READMEs to match current implemented modules and route areas.

## Frontend Fallback Data Can Mask Backend Failures

**Files:**
- `frontend/src/routes/oportunidades/+page.ts`

**Concern:**
- Public opportunity listing returns fallback demo opportunities when backend fetch fails.

**Impact:**
- Useful for academic demos, but it can hide local/backend integration failures during development.

**Fix approach:**
- Keep the `offline` flag visible in UI and avoid copying this fallback pattern to authenticated or state-changing flows.

## Tooling Concern

**Files:**
- `.planning/STATE.md`

**Concern:**
- `gsd-sdk` is currently broken in this workspace because the shim references a stale Windows npm cache path.

**Impact:**
- GSD workflows that expect `gsd-sdk query ...` cannot commit or initialize state through the SDK and need manual fallback.

**Fix approach:**
- Reinstall or repair the GSD CLI/shim in the local environment before relying on SDK-backed workflow automation.
