# Conventions

**Analysis Date:** 2026-05-27

## Language And Style

- Use TypeScript for backend and frontend code.
- Use Svelte 5 single-file components for UI routes.
- Keep existing Portuguese domain naming for user-facing and business concepts: `ong`, `oportunidade`, `inscricao`, `presenca`, `usuario`.
- Use ASCII in new code unless editing a file that already uses Portuguese accents consistently.
- Run Prettier through package scripts before committing code changes.

## Backend Conventions

**Nest module structure:**
- Every backend domain module should follow the pattern in `backend/src/oportunidades/`, `backend/src/inscricoes/`, and `backend/src/presencas/`.
- Register new modules in `backend/src/app.module.ts`.
- Export services only when another module needs them, as `OportunidadesModule` does for `InscricoesService`.

**Controllers:**
- Keep controllers thin. They should parse route inputs and call services.
- Use `@HttpCode()` explicitly on routes, matching existing controllers such as `backend/src/oportunidades/oportunidades.controller.ts`.
- Use `ParseUUIDPipe` for path UUIDs.
- Protected routes currently extract bearer tokens locally with `extrairBearerToken()`. If adding new protected routes, either follow the local pattern or migrate consistently to the existing guards in `backend/src/auth/guards/`.

**Services:**
- Put business rules, authorization checks, and Supabase queries in services.
- Validate role and account state before privileged database operations.
- Use helper methods for repeated checks, following `obterUsuarioAtual()`, `usuarioEstaSuspenso()`, `obterOngAprovada()`, and `garantirVoluntarioAtivo()`.
- Map database rows to API response objects with dedicated helpers instead of returning raw Supabase rows directly.
- Use Nest HTTP exceptions for expected user/domain failures.

**DTOs:**
- Use classes with `class-validator` decorators under `backend/src/<domain>/dto/`.
- Use `@IsIn()` for enum-like string values.
- Use `@IsOptional()` only when the service can handle absence.
- Use length limits for free text, following `backend/src/oportunidades/dto/*.ts`, `backend/src/inscricoes/dto/*.ts`, and `backend/src/presencas/dto/*.ts`.
- Global validation in `backend/src/main.ts` strips unknown fields and rejects non-whitelisted fields.

**Supabase access:**
- Inject `SupabaseService` and use `adminClient` for backend domain queries that need to bypass RLS after service-level authorization.
- Keep the service role key isolated to `backend/src/supabase/supabase.service.ts`.
- Prefer explicit `.select()` column lists for public payloads.
- Use `.maybeSingle()` when zero or one row is expected.
- Convert Supabase errors to stable Portuguese user-facing messages.

## Frontend Conventions

**Routes:**
- Keep route-specific UI in `+page.svelte`.
- Use `+page.server.ts` for server actions and cookie/session-sensitive operations.
- Use `+page.ts` for public load functions that can run with route fetch.
- Keep role-based areas under existing route groups: `admin`, `ong`, `minhas-inscricoes`, and `minhas-presencas`.

**Server actions:**
- Use SvelteKit `fail()` for validation errors, following `frontend/src/routes/cadastro/+page.server.ts` and `frontend/src/routes/login/+page.server.ts`.
- Normalize form inputs in server actions before calling backend APIs.
- Preserve submitted values in failure payloads when the form should remain filled.
- Return field-level errors through a `campos` object where a page already uses that pattern.

**Backend calls:**
- Use `PUBLIC_BACKEND_URL` from `$env/dynamic/public`, with the established fallback `http://localhost:3000`.
- Public load functions may provide local fallback data for academic/demo usability, as in `frontend/src/routes/oportunidades/+page.ts`.
- Protected server calls should use the active Supabase session access token when calling backend endpoints.

**Supabase SSR:**
- Use `locals.supabase` from `frontend/src/hooks.server.ts` for auth actions.
- Do not write auth tokens to `localStorage`.
- Keep Supabase service role credentials out of frontend code and public route data.

**UI style:**
- Public discovery UI follows the warm, simple marketplace direction documented in `DESIGN_AIRBNB.md`.
- Logged-in/admin/ONG operational screens should stay clean and task-focused, consistent with `DESIGN_NOTION.md`.
- Existing Svelte route files include route-local CSS rather than a centralized component library.

## Database Conventions

- Add SQL migrations under `supabase/migrations/` with ordered numeric prefixes.
- Use Portuguese table and column naming where established: `usuarios`, `perfis_ongs`, `oportunidades`, `inscricoes`, `presencas`.
- Keep operational warnings in migration comments when scripts are local contracts rather than auto-run production migrations.
- Use constraints and indexes for integrity, following `supabase/migrations/0004_inscricoes.sql` and `supabase/migrations/0005_presencas.sql`.
- Use database RPC for concurrency-sensitive operations, as with `aprovar_inscricao_com_vaga()`.

## Error Handling

- Use `BadRequestException` for validation or recoverable domain failures.
- Use `UnauthorizedException` when bearer token/session is absent or invalid.
- Use `ForbiddenException` when the user is authenticated but lacks the required role/state.
- Use `NotFoundException` when the requested row is missing or hidden by public visibility rules.
- Use `ConflictException` for uniqueness conflicts that are expected user actions, such as duplicate applications.
- Avoid plain `Error` for HTTP controller/service responses in new code; prefer Nest HTTP exceptions.

## Type Conventions

- Backend service row types are often local interfaces or `Record<string, any>` aliases because Supabase generated types are not present.
- Keep aliases close to the service that uses them.
- Prefer explicit response mapping helpers to contain `any` usage.
- If generated Supabase types are introduced, update `SupabaseService` and domain services together.

## Documentation Conventions

- Keep academic/delivery evidence in `docs/delivery/` and `docs/verification/`.
- Keep database operational notes in `docs/database/`.
- Keep auth-specific notes in `docs/auth/`.
- Keep GSD phase planning and summaries under `.planning/phases/`.
