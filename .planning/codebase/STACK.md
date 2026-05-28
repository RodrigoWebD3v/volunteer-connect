# Technology Stack

**Analysis Date:** 2026-05-27

## Languages

**Primary:**
- TypeScript 6.x - backend NestJS code in `backend/src/`, frontend SvelteKit code in `frontend/src/`, and Vite/Svelte config files.
- SQL - Supabase/PostgreSQL migrations in `supabase/migrations/` and seed data in `supabase/seed/`.

**Secondary:**
- Svelte 5 - route components and application UI in `frontend/src/routes/**/*.svelte`.
- Markdown - project, delivery, database, and verification documentation in `README.md`, `docs/`, and `.planning/`.

## Runtime

**Environment:**
- Node.js 20+ is the documented runtime in `README.md`, `backend/README.md`, and `frontend/README.md`.
- npm 10+ is the documented package manager for the root workspace, backend, and frontend.

**Package Manager:**
- npm is used in all package manifests.
- Lockfiles are present at `package-lock.json`, `backend/package-lock.json`, and `frontend/package-lock.json`.
- The root package coordinates backend and frontend commands with `concurrently` in `package.json`.

## Frameworks

**Core:**
- NestJS 11 - HTTP API, dependency injection, modules, controllers, services, and validation in `backend/src/`.
- SvelteKit 2 - frontend routing, server actions, load functions, SSR cookies, and client UI in `frontend/src/`.
- Supabase JS 2 - backend admin/public clients in `backend/src/supabase/supabase.service.ts` and frontend SSR client in `frontend/src/lib/supabase/server.ts`.
- Supabase SSR 0.10 - cookie-backed frontend auth session handling in `frontend/src/hooks.server.ts`.

**Testing:**
- Jest 30 with `ts-jest` - backend unit tests configured in `backend/package.json` and e2e config in `backend/test/jest-e2e.json`.
- Vitest 4 - frontend unit tests configured in `frontend/vite.config.ts`.
- Svelte Check - frontend type and component validation through `npm --prefix frontend run check`.

**Build/Dev:**
- Nest CLI 11 - backend build and dev server commands in `backend/package.json`.
- Vite 8 - SvelteKit dev/build/test runner through `frontend/vite.config.ts`.
- ESLint 10 - backend config in `backend/eslint.config.mjs`, frontend config in `frontend/eslint.config.js`.
- Prettier 3 - format checks are wired through package scripts.

## Key Dependencies

**Critical:**
- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express` - backend API framework in `backend/package.json`.
- `@supabase/supabase-js` - Supabase Auth, database, RPC, and storage access from backend and frontend.
- `@supabase/ssr` - SvelteKit cookie session integration in `frontend/src/lib/supabase/server.ts`.
- `class-validator` and `class-transformer` - DTO validation in `backend/src/**/dto/*.ts` and global validation in `backend/src/main.ts`.
- `svelte`, `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte` - frontend application framework.

**Infrastructure:**
- `ws` - WebSocket transport adapter for Supabase realtime in Node contexts, used in `backend/src/supabase/supabase.service.ts` and `frontend/src/lib/supabase/server.ts`.
- `concurrently` - root `npm run dev` starts backend and frontend together.
- `supertest` - backend e2e test dependency, with starter e2e test in `backend/test/app.e2e-spec.ts`.

## Configuration

**Environment:**
- Root `.env.example` documents local ports, Supabase remote credentials, frontend public Supabase variables, auth redirect URLs, and `DATABASE_URL`.
- Backend-specific example variables live in `backend/.env.example`.
- Frontend-specific public variables live in `frontend/.env.example`.
- Runtime environment files `.env`, `backend/.env`, and `frontend/.env` exist locally and must not be read or committed.
- Backend local env loading is implemented in `backend/src/main.ts` through `loadEnvFile()` candidates for `.env`, `backend/.env`, and `../.env`.

**Required backend variables:**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_LOGOS_BUCKET` is optional and defaults to `logos-ongs`.
- `BACKEND_PORT` or `PORT` controls the NestJS listen port.

**Required frontend variables:**
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_BACKEND_URL` is used by route load/actions and defaults to `http://localhost:3000` in several files.
- `PUBLIC_AUTH_CONFIRMATION_REDIRECT_URL`
- `PUBLIC_AUTH_PASSWORD_RESET_REDIRECT_URL`

**Build:**
- Root orchestration is in `package.json`.
- Backend TypeScript config is in `backend/tsconfig.json` and `backend/tsconfig.build.json`.
- Frontend TypeScript and Svelte config are in `frontend/tsconfig.json`, `frontend/svelte.config.js`, and `frontend/vite.config.ts`.

## Platform Requirements

**Development:**
- Install dependencies separately at root, `backend/`, and `frontend/`.
- Run the full local stack with `npm run dev` from the root.
- Run backend only with `npm run dev:backend`.
- Run frontend only with `npm run dev:frontend`.
- A remote Supabase project is required for real auth, database, storage, and RPC behavior.

**Production:**
- Build backend with `npm --prefix backend run build`.
- Build frontend with `npm --prefix frontend run build`.
- Keep `SUPABASE_SERVICE_ROLE_KEY` only in backend/server environments.
- Configure Supabase migrations manually or via an approved Supabase CLI flow before using the app against a remote database.

## Quality Commands

Use root scripts when validating the whole repository:
- `npm run lint:check`
- `npm run format:check`
- `npm run check`
- `npm test`
- `npm run verify`

Use package-specific commands for narrower checks:
- `npm --prefix backend run lint:check`
- `npm --prefix backend run build`
- `npm --prefix backend test`
- `npm --prefix frontend run check`
- `npm --prefix frontend run lint`
- `npm --prefix frontend test`
