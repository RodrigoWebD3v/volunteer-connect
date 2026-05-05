<!-- GSD:project-start source:PROJECT.md -->
## Project

**Volunteer Connect**

Volunteer Connect is a web platform for connecting volunteers with NGOs that need help. It centralizes volunteer opportunities, NGO profiles, events, applications, participation records, and basic communication so people who want to help can find real opportunities without confusion.

The project is currently at initialization: the repository has only a README, while GitHub issues and project documents define the intended MVP around NestJS, SvelteKit, Prisma, authentication, NGO CRUD, and an initial volunteer opportunity data model.

**Core Value:** Volunteers can find a trustworthy opportunity and NGOs can organize participation in one simple, accessible place.

### Constraints

- **Tech stack**: NestJS backend, SvelteKit frontend, TypeScript, Prisma ORM - already expressed in GitHub issues.
- **Project type**: Academic software engineering project - documentation, requirements, and traceability matter alongside implementation.
- **Scope**: MVP should prioritize the core matching and participation flow before advanced social features.
- **UX**: Interface must be simple, intuitive, and accessible for volunteers and NGO users with different technical comfort levels.
- **Data integrity**: Roles, applications, opportunities, events, and participation history need a coherent relational model from the start.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommendation
- **Frontend**: SvelteKit with TypeScript for the web app.
- **Backend**: NestJS with TypeScript for HTTP APIs, validation, auth guards, and modular domain boundaries.
- **Database access**: Prisma ORM with migrations.
- **Database**: Supabase remoto, usando PostgreSQL gerenciado para integridade relacional entre usuários, ONGs, oportunidades, candidaturas, eventos e histórico de participação.
- **Auth**: JWT access tokens with role-based guards for volunteer, NGO, and admin capabilities.
- **Quality**: ESLint, Prettier, unit tests for services, and integration tests for core API flows.
## Rationale
## Avoid For v1
- Real-time infrastructure for chat.
- Mobile app frameworks.
- Microservices.
- Recommendation engines.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

- `.codex/skills/po-business-rule-analyst/SKILL.md`: use para demandas de regra de negocio, refinamento funcional ou criacao de issue. A skill atua como P.O./analista de negocio, cria historia de usuario, separa analise de negocio e tecnica, identifica padroes/funcoes existentes reutilizaveis e registra a issue no GitHub em portugues.
- `.codex/skills/security-code-review/SKILL.md`: use sempre que codigo, dependencia, endpoint, auth, autorizacao, banco, Supabase, Prisma, upload ou configuracao sensivel for criado/alterado, e antes de PR/merge/build. A skill atua como profissional de cybersecurity, classifica severidade, recomenda correcao pratica e bloqueia riscos criticos ou altos nao mitigados.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
