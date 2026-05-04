# Phase 1: Project Foundation - Research

## RESEARCH COMPLETE

**Phase:** 01 - Project Foundation  
**Date:** 2026-05-04  
**Purpose:** Identify current setup commands and planning constraints for a runnable NestJS + SvelteKit project foundation.

## Findings

### NestJS Backend

- Official NestJS docs recommend creating a project with the Nest CLI and npm installed.
- `nest new project-name` creates the project directory and populates `src/` with the app module, controller, service, test file, and `main.ts`.
- Nest generated projects include linting and formatting scripts.
- `npm run start:dev` is the documented watch-mode command for local development.

Source: https://docs.nestjs.com/first-steps

### SvelteKit Frontend

- Current SvelteKit docs recommend `npx sv create my-app`.
- `sv create` supports non-interactive options for template, TypeScript, add-ons, and npm install.
- Recommended command shape for this project: `npx sv create frontend --template minimal --types ts --add eslint prettier vitest --install npm`.
- The default SvelteKit development server runs on localhost port 5173.

Sources:
- https://svelte.dev/docs/kit/creating-a-project
- https://svelte.dev/docs/cli/sv-create

### Docker Compose

- Docker Compose uses a YAML file to define services.
- `env_file` loads container environment variables from a file path relative to the Compose file's parent folder.
- Services on the same Compose default network can communicate by service name.
- For phase 1, Docker should support local infrastructure without forcing full app containerization before the apps exist.

Sources:
- https://docs.docker.com/compose/
- https://docs.docker.com/reference/compose-file/services/

## Planning Implications

- Use simple top-level `backend` and `frontend` folders.
- Use npm everywhere.
- Let generated app-specific scripts remain in each project.
- Add root-level helper scripts only after both apps exist.
- Prefer `compose.yaml` with a Postgres service for local infrastructure readiness, while keeping schema/modeling in Phase 2.
- Include `.env.example` and README instructions as part of the phase, not cleanup.

## Validation Architecture

Validation should prove:

- `npm --prefix backend run start:dev` is available and backend can build/test/lint.
- `npm --prefix frontend run dev` is available and frontend can check/test/lint.
- Root commands call both app checks.
- Docker Compose config validates and can start/stop the infrastructure service.
- README documents install, run, Docker, ports, and quality commands.

