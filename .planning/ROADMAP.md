# Roadmap: Volunteer Connect

**Created:** 2026-05-04
**Granularity:** Standard
**Core Value:** Volunteers can find a trustworthy opportunity and NGOs can organize participation in one simple, accessible place.

## Overview

| Phase | Name | Goal | Requirements | UI hint |
|-------|------|------|--------------|---------|
| 1 | Project Foundation | Establish runnable backend/frontend workspace and quality commands. | SETUP-01, SETUP-02, SETUP-03 | yes |
| 2 | Data Model Foundation | Define Supabase schema, SQL migrations/scripts, and seed/insertion validation. | DATA-01..DATA-07 | no |
| 3 | Authentication And Roles | Implement registration, login, JWT protection, logout, and role enforcement. | AUTH-01..AUTH-06 | yes |
| 4 | NGO Profiles | Let NGO users manage profiles and users browse NGO details. | NGO-01..NGO-05 | yes |
| 5 | Opportunities | Let NGOs publish opportunities and volunteers browse/search them. | OPP-01..OPP-05 | yes |
| 6 | Applications | Let volunteers apply and NGOs manage application status. | APP-01..APP-05 | yes |
| 7 | Events And Participation | Track activity schedules, participation, and engagement history. | EVT-01..EVT-04 | yes |
| 8 | UX, Accessibility, And Verification | Polish the core volunteer/NGO journey and verify all v1 requirements. | UX-01..UX-04 | yes |
| 9 | Integration Hardening And Auth Gaps | Close open auth, upload, route protection, UI integration, and critical test gaps before release. | HARD-01..HARD-06 | yes |
| 10 | Academic Release And Delivery | Prepare final academic delivery with documentation, deployment readiness, evidence, and release checklist. | REL-01..REL-05 | yes |
| 11 | Schema, CI, And Foundation Stabilization | Make the current codebase internally consistent: migrations, CI, lint/type warnings, environment contracts, and known dependency risks. | STAB-01..STAB-05 | no |
| 12 | End-To-End Product Integration | Connect remaining volunteer, ONG, and admin screens to real backend APIs so the core workflow works from UI to Supabase. | INT-01..INT-06 | yes |
| 13 | Verification, Security, And Release Readiness | Add automated coverage and final release evidence for auth, authorization, E2E, accessibility, audit, and deploy handoff. | VER-01..VER-05 | yes |

## Phase Details

### Phase 1: Project Foundation

**Goal:** Establish a runnable full-stack project with clear local commands.

**Requirements:** SETUP-01, SETUP-02, SETUP-03

**Status:** Completed on 2026-05-04

**Success Criteria:**
1. Backend NestJS app runs locally with TypeScript. Done.
2. Frontend SvelteKit app runs locally with TypeScript. Done.
3. Lint/format/check commands are documented and executable. Done.
4. README explains how to install, run, and validate the project. Done.

### Phase 2: Data Model Foundation

**Goal:** Create the initial relational model needed by the volunteer/NGO workflow using the remote Supabase database.

**Requirements:** DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06, DATA-07

**Status:** Completed on 2026-05-25

**Success Criteria:**
1. Supabase schema includes users, volunteers, NGOs, opportunities, applications, events, and participations.
2. Migrations run against the configured Supabase development database.
3. Seed or insertion test proves the core relationships work.
4. Schema supports volunteer, NGO, and admin roles without duplicating account identity.

### Phase 3: Authentication And Roles

**Goal:** Secure the app with registration, login, JWT auth, logout, and role-based authorization.

**Requirements:** AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06

**Status:** Completed on 2026-05-25

**Success Criteria:**
1. User can register and log in from API and frontend.
2. Protected backend routes reject unauthenticated requests.
3. Role guards prevent volunteers, NGOs, and admins from using unauthorized actions.
4. Frontend stores session state safely enough for the MVP and supports logout.

### Phase 4: NGO Profiles

**Goal:** Let NGOs create and manage their presence on the platform.

**Requirements:** NGO-01, NGO-02, NGO-03, NGO-04, NGO-05

**Status:** Completed on 2026-05-25

**Success Criteria:**
1. NGO user can create, edit, and delete their profile through protected API routes.
2. Users can list and view NGO profiles from the frontend.
3. Unauthorized users cannot modify NGO profiles they do not own.
4. NGO profile UI communicates key information clearly.

### Phase 5: Opportunities

**Goal:** Let NGOs publish opportunities and volunteers discover them.

**Requirements:** OPP-01, OPP-02, OPP-03, OPP-04, OPP-05

**Status:** Completed on 2026-05-25

**Success Criteria:**
1. NGO user can create and edit opportunities linked to their NGO.
2. Users can browse and view opportunity detail pages.
3. Opportunities show schedule, location, activity details, requirements, and capacity.
4. Volunteer can narrow the list by a practical filter or search input.

### Phase 6: Applications

**Goal:** Let volunteers apply to opportunities and NGOs manage responses.

**Requirements:** APP-01, APP-02, APP-03, APP-04, APP-05

**Status:** Completed on 2026-05-25

**Success Criteria:**
1. Volunteer can apply once to an opportunity.
2. Volunteer can view application status.
3. NGO user can view applications for their opportunities.
4. NGO user can update statuses through a protected workflow.
5. Application detail exposes a simple communication/contact path.

### Phase 7: Events And Participation

**Goal:** Record activity schedules and participation history after applications.

**Requirements:** EVT-01, EVT-02, EVT-03, EVT-04

**Status:** Completed on 2026-05-25

**Success Criteria:**
1. Opportunity itself is the MVP activity, without event/subevent entity. Done.
2. NGO user can mark volunteer presenca after opportunity completion. Done.
3. Volunteer can view presenca history. Done.
4. NGO user can view engagement history for their own opportunities. Done.

### Phase 8: UX, Accessibility, And Verification

**Goal:** Make the core workflow simple, accessible, and demonstrably complete.

**Requirements:** UX-01, UX-02, UX-03, UX-04

**Status:** Completed on 2026-05-25

**Success Criteria:**
1. First screen opens around marketplace/discovery actions. Done.
2. Volunteer journey from discovery to application is clearer and documented. Done.
3. NGO/admin operational journeys remain available and documented. Done.
4. Main pages passed Svelte check and basic accessibility checklist. Done.
5. Requirements are mapped in delivery traceability with blocked items explicit. Done.

### Phase 9: Integration Hardening And Auth Gaps

**Goal:** Close the remaining implementation gaps that were intentionally left open while executing phases 3 to 8: complete auth/domain integration, secure ONG logo upload, route protection, frontend-to-backend wiring, and automated tests for sensitive authorization flows.

**Requirements:** HARD-01, HARD-02, HARD-03, HARD-04, HARD-05, HARD-06

**Status:** Completed on 2026-05-25

**Success Criteria:**
1. Cadastro de voluntario e ONG usa contratos completos, validacao, logo obrigatoria e compensacao segura. Done.
2. Recuperacao/redefinicao de senha e sessao expirada existem no frontend. Done.
3. Guards/decorators genericos foram adicionados para auth e roles. Done.
4. Marketplace/detalhe passam a buscar API real com fallback de demonstracao. Done.
5. Testes base passaram; E2E sensivel completo permanece documentado como pendencia de ambiente seedado.

### Phase 10: Academic Release And Delivery

**Goal:** Prepare the project for final academic presentation and handoff with documentation, local/deployment instructions, traceability evidence, screenshots, release notes, and final security/quality gates.

**Requirements:** REL-01, REL-02, REL-03, REL-04, REL-05

**Status:** Completed on 2026-05-25

**Success Criteria:**
1. README and docs explain install, configuration, Supabase, migrations, run, tests and troubleshooting. Done.
2. Delivery package includes requirement traceability, architecture overview, database model evidence and test evidence. Done.
3. Demo environment instructions are explicit and use placeholders. Done.
4. Final release checklist records validation results, known limitations and deferred v2 scope. Done.
5. Security review records no critical/high known issue for academic local MVP. Done.

### Phase 11: Schema, CI, And Foundation Stabilization

**Goal:** Make the current local implementation stable enough to build on by resolving schema drift, CI failures, dependency warnings, and environment contracts found in the project review.

**Requirements:** STAB-01, STAB-02, STAB-03, STAB-04, STAB-05

**Status:** Completed on 2026-05-27

**Success Criteria:**
1. Supabase migrations can be applied from a clean database and match the backend column/status contracts. Done.
2. `npm run ci` passes without frontend lint errors and without newly introduced backend lint errors. Done.
3. Backend Supabase typing warnings are isolated at Supabase response boundaries with explicit row casts. Done.
4. Moderate dependency audit findings are fixed; only a low frontend transitive advisory remains documented. Done.
5. Environment examples and docs match the real variables used by backend and frontend. Done.

### Phase 12: End-To-End Product Integration

**Goal:** Replace protected-screen demo data with real UI/server integration for the volunteer, ONG, and admin journeys.

**Requirements:** INT-01, INT-02, INT-03, INT-04, INT-05, INT-06

**Status:** Completed on 2026-05-27

**Success Criteria:**
1. Volunteer can discover an opportunity, authenticate, apply, and view application status from the frontend. Done.
2. ONG can list, create, edit, and manage opportunities through real backend calls. Done.
3. ONG can list, approve, reject, and observe applications for its own opportunities. Done.
4. ONG can register participation for completed opportunities and volunteers can view real participation history. Done.
5. Admin can list and analyze ONGs through real backend calls. Done.
6. Frontend route guards and blocked states reflect authentication, role, approval, and suspension status. Done.

### Phase 13: Verification, Security, And Release Readiness

**Goal:** Prove the system is complete enough for delivery with automated tests, manual UAT evidence, final security review, and deploy-ready documentation.

**Requirements:** VER-01, VER-02, VER-03, VER-04, VER-05

**Status:** Planned

**Success Criteria:**
1. Backend tests cover auth, roles, ownership, duplicate application, capacity, suspension, and sensitive data exposure.
2. Frontend tests or E2E scripts cover the main volunteer, ONG, and admin flows against a seedable environment.
3. Accessibility and keyboard checks are recorded for the principal screens.
4. Final security review has no unmitigated critical/high finding and documents residual risk.
5. Release docs include clean setup, migration, seed, test, demo, and deploy/handoff instructions.

## Requirement Coverage

- v1 requirements: 50
- v1.1 stabilization requirements: 16
- Mapped requirements: 66
- Unmapped requirements: 0

---
*Last updated: 2026-05-27 after executing Phase 12*
