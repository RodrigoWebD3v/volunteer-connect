# Integrations

**Analysis Date:** 2026-05-27

## External Services

## Supabase

**Purpose:**
- Authentication provider for user signup, login, logout, password recovery, and session lookup.
- PostgreSQL database for users, volunteer profiles, NGO profiles, opportunities, applications, attendance, and audit-oriented status fields.
- Storage provider for NGO logos.
- RPC host for application approval with capacity control.

**Backend usage:**
- `backend/src/supabase/supabase.service.ts` creates two clients:
  - `publicClient` with `SUPABASE_ANON_KEY`
  - `adminClient` with `SUPABASE_SERVICE_ROLE_KEY`
- Backend domain services use `adminClient` for database reads/writes and Auth Admin operations.
- Auth account creation and cleanup are in `backend/src/auth/auth.service.ts`.
- Token verification uses `adminClient.auth.getUser()` in `backend/src/auth/auth.service.ts`, `backend/src/auth/guards/supabase-auth.guard.ts`, and domain services.
- NGO logo upload uses Supabase Storage in `backend/src/auth/auth.service.ts` with bucket name from `SupabaseService.getLogosBucket()`.
- Application approval uses Supabase RPC `aprovar_inscricao_com_vaga` from `backend/src/inscricoes/inscricoes.service.ts`.

**Frontend usage:**
- `frontend/src/lib/supabase/server.ts` creates a cookie-backed SSR client with `@supabase/ssr`.
- `frontend/src/hooks.server.ts` attaches `event.locals.supabase` and `event.locals.usuarioAuth`.
- `frontend/src/routes/login/+page.server.ts` signs in with Supabase Auth directly through the SSR client.
- `frontend/src/routes/sair/+server.ts` signs out through the SSR client.
- Auth recovery and confirmation pages live under `frontend/src/routes/auth/`.

**Database contracts:**
- Base relational model is in `supabase/migrations/0001_modelo_inicial.sql`.
- Auth/RLS user-policy contract is in `supabase/migrations/0002_auth_rls_usuarios.sql`.
- NGO analysis, suspension, and logo storage columns are in `supabase/migrations/0002_campos_analise_ong.sql`, `supabase/migrations/0002_00_conta_suspensa_usuarios.sql`, `supabase/migrations/0002_01_logo_storage_path_ongs.sql`, and `supabase/migrations/0006_cadastro_completo.sql`.
- Opportunities are in `supabase/migrations/0003_oportunidades.sql`.
- Applications and approval RPC are in `supabase/migrations/0004_inscricoes.sql`.
- Attendance records are in `supabase/migrations/0005_presencas.sql`.
- Example data is in `supabase/seed/0001_dados_exemplo.sql`.

**Security boundaries:**
- The service role key is backend-only. Documentation repeats this in `README.md`, `SECURITY.md`, `docs/auth/README.md`, and `docs/database/README.md`.
- Frontend variables use `PUBLIC_` only for public Supabase URL and anon key.
- Backend service-role access means authorization checks in Nest services are mandatory before every privileged operation.

## HTTP API Between Frontend And Backend

**Base URL:**
- Frontend server actions and load functions use `PUBLIC_BACKEND_URL` or default to `http://localhost:3000`.
- Examples include `frontend/src/routes/cadastro/+page.server.ts`, `frontend/src/routes/oportunidades/+page.ts`, and opportunity/registration pages under `frontend/src/routes/`.

**Backend API modules:**
- `backend/src/auth/auth.controller.ts` exposes `/auth/registrar`, `/auth/me`, `/auth/login`, `/auth/logout`, and `/auth/recuperar-senha`.
- `backend/src/ongs/ongs.controller.ts` exposes public NGO listing/details, own NGO management, and admin analysis endpoints under `/ongs`.
- `backend/src/oportunidades/oportunidades.controller.ts` exposes public opportunity listing/details and ONG-owned create/update/list endpoints under `/oportunidades`.
- `backend/src/inscricoes/inscricoes.controller.ts` exposes volunteer application and ONG review endpoints under `/inscricoes`.
- `backend/src/presencas/presencas.controller.ts` exposes attendance registration and history endpoints under `/presencas`.

**Authentication transport:**
- Backend protected endpoints generally expect an `Authorization: Bearer <token>` header.
- Controllers currently extract the bearer token locally with private `extrairBearerToken()` helpers.
- Frontend pages should pass the active Supabase access token when calling protected backend endpoints.

## Email And Redirects

**Provider:**
- Supabase Auth handles email confirmation and password recovery email delivery.

**Redirect variables:**
- `PUBLIC_AUTH_CONFIRMATION_REDIRECT_URL` is documented in `.env.example` and `frontend/.env.example`.
- `PUBLIC_AUTH_PASSWORD_RESET_REDIRECT_URL` is documented in `.env.example` and `frontend/.env.example`.
- Password recovery action lives in `frontend/src/routes/auth/esqueci-senha/+page.server.ts`.
- Password reset handling lives in `frontend/src/routes/auth/redefinir-senha/+page.server.ts`.
- Confirmation handling lives in `frontend/src/routes/auth/confirmacao-email/+page.server.ts`.

## Supabase Storage

**Bucket:**
- `SUPABASE_LOGOS_BUCKET` defaults to `logos-ongs` in `backend/src/supabase/supabase.service.ts`.

**Flow:**
- ONG registration receives a base64 data URL from `frontend/src/routes/cadastro/+page.server.ts`.
- Backend validates and uploads logo data in `backend/src/auth/auth.service.ts`.
- Public listing/detail payloads expose `logo_storage_path` through ONG and opportunity services.

## Not Detected

- No third-party payment provider integration.
- No external maps/geocoding provider.
- No real-time chat integration.
- No webhook endpoints.
- No CI provider workflow files were detected under `.github/workflows/`.
- No Docker Compose or container deployment config is present.

## Integration Guidance

- Add new external APIs behind Nest services and modules under `backend/src/<domain>/`.
- Keep public browser secrets limited to `PUBLIC_*` variables in `frontend/.env.example`.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to SvelteKit client code or serialized route data.
- Prefer backend-owned writes for domain state because the current architecture centralizes authorization in Nest services.
- Keep SQL changes versioned in `supabase/migrations/` and describe operational execution in `docs/database/`.
