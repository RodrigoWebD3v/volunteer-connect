# Pitfalls Research: Volunteer Connect

## Pitfalls

- **Role ambiguity**: If volunteers, NGOs, and admins share unclear permissions, later features become brittle.
  - Prevention: Define roles in schema, JWT payloads, guards, and requirements from the beginning.

- **Overbuilding communication**: Real-time chat can consume time before the matching workflow is proven.
  - Prevention: Start with simple application-related messages or contact instructions.

- **Thin data model**: Opportunities, events, applications, and participations are related but not identical.
  - Prevention: Model each concept explicitly and test migrations with seed data.

- **NGO workflow treated as afterthought**: A platform only for volunteer browsing fails if NGOs cannot manage demand.
  - Prevention: Include NGO profile, opportunity creation, and application review in v1.

- **Academic docs drift from implementation**: Requirements, roadmap, and code can diverge quickly.
  - Prevention: Use GSD traceability and update requirements after phase completion.

