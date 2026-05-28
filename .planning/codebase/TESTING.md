# Testing

**Analysis Date:** 2026-05-27

## Test Frameworks

**Backend:**
- Jest 30 is configured in `backend/package.json`.
- `ts-jest` transforms TypeScript tests.
- Unit tests match `.*\.spec\.ts$` under `backend/src/`.
- Coverage output is configured to `backend/coverage`.
- E2E config exists at `backend/test/jest-e2e.json`.

**Frontend:**
- Vitest 4 is configured in `frontend/vite.config.ts`.
- The current Vitest project is named `server` and runs in a Node environment.
- Test files match `src/**/*.{test,spec}.{js,ts}` and exclude Svelte component spec files.
- Svelte type checking is handled by `npm --prefix frontend run check`.

## Existing Tests

**Backend unit:**
- `backend/src/app.controller.spec.ts` verifies the starter `AppController.getHello()` response.

**Backend e2e:**
- `backend/test/app.e2e-spec.ts` exists as a starter e2e test file.

**Frontend unit:**
- `frontend/src/lib/vitest-examples/greet.spec.ts` verifies `frontend/src/lib/vitest-examples/greet.ts`.

**Manual/acceptance evidence:**
- `docs/verification/e2e-flows.md` documents end-to-end flows.
- `docs/verification/accessibility-checklist.md` documents accessibility checks.
- `docs/verification/mvp-checklist.md` documents MVP verification.
- `docs/verification/final-security-review.md` documents final security review.
- `docs/delivery/evidencias-testes.md` collects academic test evidence.

## Quality Commands

**Whole repository:**
- `npm run lint:check`
- `npm run format:check`
- `npm run check`
- `npm test`
- `npm run verify`

**Backend:**
- `npm --prefix backend run lint:check`
- `npm --prefix backend run build`
- `npm --prefix backend test`
- `npm --prefix backend run test:e2e`

**Frontend:**
- `npm --prefix frontend run check`
- `npm --prefix frontend run lint`
- `npm --prefix frontend test`

## Test Gaps

- Domain services under `backend/src/auth/`, `backend/src/ongs/`, `backend/src/oportunidades/`, `backend/src/inscricoes/`, and `backend/src/presencas/` do not have focused unit tests.
- Backend controller auth/role behavior is not covered by current automated tests.
- Supabase query error handling and mapping helpers are not covered by automated tests.
- The RPC-backed approval path in `backend/src/inscricoes/inscricoes.service.ts` lacks automated coverage.
- SvelteKit server actions in `frontend/src/routes/**/+page.server.ts` are not covered by automated tests.
- Svelte route components are not covered by component tests.
- Database migrations have no automated migration test or schema drift check in the repo.
- No CI workflow is detected under `.github/workflows/`.

## Recommended Backend Test Pattern

Use Nest TestingModule for unit tests that mock services or Supabase clients:
- Place service specs next to the service, for example `backend/src/oportunidades/oportunidades.service.spec.ts`.
- Provide a mocked `SupabaseService` with chainable query builders for service tests.
- Test successful paths and each important HTTP exception branch.
- For cross-service dependencies, mock the dependency service as in `InscricoesService` depending on `OportunidadesService`.

High-value backend test targets:
- `AuthService.registrar()` creates Auth user, inserts local records, uploads logo, and deletes Auth user on local failure.
- `OportunidadesService.listarPublicas()` filters unavailable opportunities and suspended/unapproved ONGs.
- `InscricoesService.criar()` rejects non-volunteers, closed opportunities, duplicate applications, and full capacity.
- `InscricoesService.avaliar()` delegates approval to `aprovar_inscricao_com_vaga()`.
- `PresencasService.marcar()` only accepts approved applications on ended opportunities.
- `OngsService.aprovar()` and `OngsService.reprovar()` require active admin users.

## Recommended Frontend Test Pattern

Use Vitest for server-only logic and helper functions:
- Extract complex form validation or data mapping from large `+page.server.ts` files when tests would otherwise require full SvelteKit action plumbing.
- Keep tests under `frontend/src/` with `.spec.ts` or `.test.ts` suffix.
- Mock `fetch` responses for route load/action behavior.
- Use Svelte component tests only after adding an explicit component testing setup.

High-value frontend test targets:
- `frontend/src/routes/cadastro/+page.server.ts` validation for volunteer and ONG registration.
- `frontend/src/routes/login/+page.server.ts` handling of missing Supabase config, missing credentials, unconfirmed email, and invalid credentials.
- Public opportunity load fallbacks in `frontend/src/routes/oportunidades/+page.ts`.
- Auth confirmation and password recovery server actions under `frontend/src/routes/auth/`.

## Manual Verification

Manual checks remain important because the project depends on a remote Supabase project:
- Validate signup, email confirmation, login, logout, password recovery, and session expiry.
- Validate ONG approval/rejection before opportunity publishing.
- Validate volunteer application, ONG application approval/rejection, and capacity limit behavior.
- Validate attendance registration after opportunity completion.
- Validate public discovery without authentication.
- Validate service role key is never exposed in frontend responses.

## Coverage Guidance

- Add tests before changing high-risk domain behavior in services.
- Prefer focused service tests for business rules before adding broad e2e tests.
- Add integration/e2e coverage when changing Supabase schema contracts or multi-step auth flows.
- Keep manual verification docs updated when automated coverage is intentionally deferred for academic/demo constraints.
