# Stack Research: Volunteer Connect

## Recommendation

- **Frontend**: SvelteKit with TypeScript for the web app.
- **Backend**: NestJS with TypeScript for HTTP APIs, validation, auth guards, and modular domain boundaries.
- **Database access**: Prisma ORM with migrations.
- **Database**: Supabase remoto, usando PostgreSQL gerenciado para integridade relacional entre usuários, ONGs, oportunidades, candidaturas, eventos e histórico de participação.
- **Auth**: JWT access tokens with role-based guards for volunteer, NGO, and admin capabilities.
- **Quality**: ESLint, Prettier, unit tests for services, and integration tests for core API flows.

## Rationale

This stack matches the existing GitHub issues and gives the project a clear split: SvelteKit owns user workflows and NestJS owns domain rules, authentication, and persistence. Prisma keeps the schema readable for academic documentation and makes migrations explicit. Supabase remoto reduces local setup friction while preserving PostgreSQL semantics.

## Avoid For v1

- Real-time infrastructure for chat.
- Mobile app frameworks.
- Microservices.
- Recommendation engines.
