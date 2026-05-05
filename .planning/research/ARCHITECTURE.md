# Architecture Research: Volunteer Connect

## Components

- **Frontend app**: SvelteKit routes for public browsing, auth, volunteer dashboard, NGO dashboard, and admin basics.
- **API app**: NestJS modules for auth, users, NGOs, opportunities, applications, events, and participations.
- **Database**: Supabase-managed PostgreSQL schema with SQL migrations/scripts versioned in the repo.
- **Auth layer**: JWT strategy, role guards, password hashing, and route authorization.
- **Shared contracts**: Request/response DTOs and validation rules owned by the backend.

## Data Flow

1. Visitor browses opportunities or signs up.
2. Authenticated user receives a role.
3. NGO user manages NGO profile and creates opportunities/events.
4. Volunteer applies to an opportunity.
5. NGO reviews applications and participation is recorded.
6. Volunteer history and NGO activity records reflect engagement.

## Build Order

1. Project setup and tooling.
2. Supabase schema and SQL migrations/scripts.
3. Auth and roles.
4. NGO management.
5. Opportunities and applications.
6. Events, participations, and dashboards.
7. Accessibility, polish, and verification.
