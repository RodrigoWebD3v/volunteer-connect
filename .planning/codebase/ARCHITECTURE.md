# Architecture

**Analysis Date:** 2026-05-27

## System Shape

Volunteer Connect is a two-app TypeScript system:
- `backend/` is a NestJS HTTP API that owns domain writes, authorization checks, Supabase Admin access, and API-facing DTO validation.
- `frontend/` is a SvelteKit web app that owns public discovery pages, authenticated page flows, SSR cookie sessions, and browser UI.
- `supabase/` contains versioned SQL contracts for the remote Supabase PostgreSQL database and seed data.
- `docs/` and `.planning/` contain academic delivery, verification, and GSD planning artifacts.

## Backend Pattern

**Module boundaries:**
- `backend/src/app.module.ts` composes the application modules:
  - `SupabaseModule`
  - `AuthModule`
  - `OngsModule`
  - `OportunidadesModule`
  - `InscricoesModule`
  - `PresencasModule`
- Each domain has a Nest module, controller, service, and DTOs where needed.

**Entry point:**
- `backend/src/main.ts` loads local env files, creates the Nest app, installs a global `ValidationPipe`, and listens on `BACKEND_PORT`, `PORT`, or `3000`.
- Validation uses `{ whitelist: true, forbidNonWhitelisted: true }`, so DTOs define the accepted request contract.

**Controller pattern:**
- Controllers in `backend/src/*/*.controller.ts` expose REST routes and delegate business rules to services.
- Controllers use `@Body()`, `@Query()`, `@Param('id', new ParseUUIDPipe())`, and `@Headers('authorization')`.
- Protected controllers currently extract bearer tokens with private `extrairBearerToken()` helpers.

**Service pattern:**
- Services in `backend/src/*/*.service.ts` implement domain rules and Supabase queries.
- Services throw Nest HTTP exceptions such as `BadRequestException`, `UnauthorizedException`, `ForbiddenException`, `NotFoundException`, and `ConflictException`.
- Services convert Supabase snake_case rows into API-friendly camelCase objects through `toPublic`, `toOwn`, `toOng`, or similar mapping helpers.

## Frontend Pattern

**Routing:**
- SvelteKit routes live under `frontend/src/routes/`.
- Public discovery pages include `frontend/src/routes/+page.svelte`, `frontend/src/routes/oportunidades/+page.svelte`, and `frontend/src/routes/oportunidades/[id]/+page.svelte`.
- Auth pages live under `frontend/src/routes/login/`, `frontend/src/routes/cadastro/`, and `frontend/src/routes/auth/`.
- Role-focused areas live under `frontend/src/routes/ong/`, `frontend/src/routes/admin/`, `frontend/src/routes/minhas-inscricoes/`, and `frontend/src/routes/minhas-presencas/`.

**Server integration:**
- SvelteKit server actions call the backend or Supabase SSR client from `+page.server.ts` files.
- SvelteKit load functions call backend public endpoints from `+page.ts` files, with offline fallback data in `frontend/src/routes/oportunidades/+page.ts`.
- `frontend/src/hooks.server.ts` initializes the Supabase SSR client and current auth user for each request.

**Layout:**
- Root layout state is loaded in `frontend/src/routes/+layout.server.ts`.
- Root UI navigation and shared page shell are in `frontend/src/routes/+layout.svelte`.

## Data Flow

**Signup:**
1. User submits `frontend/src/routes/cadastro/+page.svelte`.
2. Server action in `frontend/src/routes/cadastro/+page.server.ts` validates form data, converts ONG logo file to a data URL, and posts to backend `/auth/registrar`.
3. `backend/src/auth/auth.controller.ts` delegates to `AuthService.registrar()`.
4. `backend/src/auth/auth.service.ts` creates a Supabase Auth user, inserts `usuarios`, inserts volunteer or ONG profile data, uploads NGO logo when applicable, and cleans up the Auth user if local profile creation fails.

**Login/session:**
1. `frontend/src/routes/login/+page.server.ts` calls `locals.supabase.auth.signInWithPassword()`.
2. `frontend/src/hooks.server.ts` reads the cookie-backed Supabase user on later requests.
3. Backend endpoints verify access tokens with Supabase Auth Admin before accessing local user rows.

**Public discovery:**
1. SvelteKit load functions request backend public endpoints such as `/oportunidades` and `/oportunidades/:id`.
2. `OportunidadesService` reads from Supabase with `adminClient`, filters only published/ended opportunities from approved, active ONGs, and maps rows to public DTOs.

**ONG workflow:**
1. ONG account is created with `status_analise = 'pendente'`.
2. Admin review endpoints in `backend/src/ongs/ongs.controller.ts` call `OngsService.aprovar()` or `OngsService.reprovar()`.
3. Approved ONG users can create, update, and list opportunities through `OportunidadesService`.
4. ONG users review applications through `InscricoesService` and register attendance through `PresencasService`.

**Volunteer workflow:**
1. Volunteer browses public opportunities.
2. Volunteer applies through `InscricoesService.criar()`.
3. Volunteer can list/cancel own applications.
4. Volunteer can list own attendance history through `PresencasService.listarMinhas()`.

## Database Model

**Core entities:**
- `usuarios`
- `perfis_voluntarios`
- `perfis_ongs`
- `oportunidades`
- `inscricoes`
- `presencas`

**Legacy/planned entities in initial schema:**
- `eventos`
- `participacoes`

**Important contracts:**
- `supabase/migrations/0004_inscricoes.sql` defines `aprovar_inscricao_com_vaga()` to avoid overbooking approved applications.
- `supabase/migrations/0005_presencas.sql` stores one attendance record per approved application.
- `supabase/migrations/0006_cadastro_completo.sql` aligns signup-oriented fields such as CPF, CNPJ, logo, and analysis status.

## Authorization Model

**Roles:**
- User roles are `voluntario`, `ong`, and `admin`.
- Role checks are repeated inside domain services through helper methods such as `garantirVoluntarioAtivo()`, `garantirUsuarioOng()`, `garantirUsuarioAdmin()`, and `obterOngAprovada()`.

**Guards:**
- Reusable decorators and guards exist in `backend/src/auth/decorators/` and `backend/src/auth/guards/`.
- `backend/src/auth/guards/supabase-auth.guard.ts` validates bearer tokens and attaches `request.usuario`.
- Some controllers do not yet use the guards and perform token extraction/service-level checks directly.

## Error Handling

- Backend uses Nest HTTP exceptions for user-facing domain failures.
- Some auth methods still throw plain `Error` in `backend/src/auth/auth.controller.ts` and `backend/src/auth/auth.service.ts`.
- Frontend server actions usually catch failed backend/Supabase responses and return SvelteKit `fail()` payloads with field-specific messages.

## Extension Guidance

- Add backend domain behavior as a module under `backend/src/<domain>/` with `<domain>.module.ts`, `<domain>.controller.ts`, `<domain>.service.ts`, and `dto/`.
- Add public SvelteKit routes under `frontend/src/routes/<feature>/`.
- Add authenticated volunteer routes under `frontend/src/routes/minhas-*` or another clear volunteer-owned path.
- Add ONG routes under `frontend/src/routes/ong/`.
- Add admin routes under `frontend/src/routes/admin/`.
- Add database changes as ordered SQL files in `supabase/migrations/` and update `docs/database/` when operational instructions change.
