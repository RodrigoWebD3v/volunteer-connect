# Stack Research: Volunteer Connect

## Recommendation

- **Frontend**: SvelteKit with TypeScript for the web app.
- **Backend**: NestJS with TypeScript for HTTP APIs, validation, auth guards, and modular domain boundaries.
- **Database access**: Supabase client for application access and SQL migrations/scripts for schema evolution.
- **Database**: Supabase remoto, usando PostgreSQL gerenciado para integridade relacional entre usuários, ONGs, oportunidades, candidaturas, eventos e histórico de participação.
- **Auth**: JWT access tokens with role-based guards for volunteer, NGO, and admin capabilities.
- **Quality**: ESLint, Prettier, unit tests for services, and integration tests for core API flows.

## Rationale

This stack gives the project a clear split: SvelteKit owns user workflows and NestJS owns domain rules, authentication, and persistence. Supabase remoto reduces local setup friction while preserving PostgreSQL semantics. SQL migrations/scripts keep schema changes explicit for academic documentation and traceability.

## Avoid For v1

- Real-time infrastructure for chat.
- Mobile app frameworks.
- Microservices.
- Recommendation engines.
