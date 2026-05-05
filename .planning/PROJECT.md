# Volunteer Connect

## What This Is

Volunteer Connect is a web platform for connecting volunteers with NGOs that need help. It centralizes volunteer opportunities, NGO profiles, events, applications, participation records, and basic communication so people who want to help can find real opportunities without confusion.

The project is currently at initialization: the repository has only a README, while GitHub issues and project documents define the intended MVP around NestJS, SvelteKit, Supabase remoto, authentication, NGO CRUD, and an initial volunteer opportunity data model.

## Core Value

Volunteers can find a trustworthy opportunity and NGOs can organize participation in one simple, accessible place.

## Requirements

### Validated

(None yet - ship to validate)

### Active

- [ ] Users can access a working web application with frontend, backend, TypeScript, linting, formatting, and local development scripts.
- [ ] The system has an initial relational data model for users, volunteers, NGOs, opportunities, applications, events, and participations.
- [ ] Users can register, log in, keep an authenticated session, and act according to their role: volunteer, NGO, or admin.
- [ ] NGOs can create, edit, list, view, and delete their organization profile.
- [ ] NGOs can publish volunteer opportunities with clear activity, schedule, location, and requirement information.
- [ ] Volunteers can browse opportunities and apply to participate.
- [ ] The system records applications, event participation, and engagement history.
- [ ] Volunteers and NGOs can use a simple communication path around an opportunity or application.
- [ ] The interface is simple, intuitive, and accessible enough for first-time users.

### Out of Scope

- Native mobile apps - web-first keeps the initial scope manageable.
- Real-time chat - useful later, but a simple communication path is enough for v1.
- Payments, donations, and fundraising - not part of the core volunteer matching flow.
- Complex recommendation algorithms - manual browsing/filtering is enough until real usage exists.
- Multi-tenant enterprise administration - the first milestone should validate the volunteer/NGO workflow.

## Context

- Source documents:
  - `circulo dourado.pdf` describes the project through Simon Sinek's golden circle: connect volunteers and NGOs, list opportunities, manage activities/events, enable direct communication, and record participation/engagement.
  - `relatorio semanal final(1).docx` identifies the academic project context for Engenharia de Software II, the team roles, and immediate next tasks: requirements, use cases, database modeling, development environment setup, and documentation.
- GitHub issues already created:
  - #1 `[SETUP] Configurar ambiente inicial do projeto`: backend NestJS, frontend SvelteKit, TypeScript, lint, Prettier.
  - #2 `[AUTH] Implementar autenticação com JWT`: registration, login, JWT, auth middleware, roles.
  - #3 `[DB] Modelar banco de dados inicial`: users, volunteers, NGOs, opportunities, applications, events, participations, Supabase remoto e migrations/scripts SQL.
  - #4 `[ONG] CRUD de ONGs`: backend endpoints and frontend NGO profile screen.
  - #5 `[SETUP] Inicializar frontend com SvelteKit`: SvelteKit, TypeScript, local run.
  - #6 `[DB] Criar tabela users`: user fields, migration, data insertion test.
- Intended audience:
  - Volunteers who want to help but do not know where to start.
  - NGOs that need to organize opportunities, volunteers, schedules, and participation.
- Main pain:
  - The current volunteer process is disorganized, information is scattered, and participation is harder than it should be.

## Constraints

- **Tech stack**: NestJS backend, SvelteKit frontend, TypeScript, Supabase remoto, Supabase client e migrations/scripts SQL.
- **Project type**: Academic software engineering project - documentation, requirements, and traceability matter alongside implementation.
- **Scope**: MVP should prioritize the core matching and participation flow before advanced social features.
- **UX**: Interface must be simple, intuitive, and accessible for volunteers and NGO users with different technical comfort levels.
- **Data integrity**: Roles, applications, opportunities, events, and participation history need a coherent relational model from the start.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use NestJS for the backend | Existing GitHub setup issue names NestJS as the backend direction and it fits role-based APIs well. | - Pending |
| Use SvelteKit for the frontend | Existing GitHub setup issue names SvelteKit and it supports a focused web MVP. | - Pending |
| Use Supabase remoto for the database | The project should avoid local database setup friction; Supabase provides a managed PostgreSQL target for development. | - Active |
| Build web-first | The project documents describe a digital/web app and mobile is not required to validate the core flow. | - Pending |
| Keep communication simple in v1 | Direct communication matters, but real-time chat would expand scope before matching is validated. | - Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-04 after Supabase decision*
