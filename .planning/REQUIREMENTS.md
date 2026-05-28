# Requirements: Volunteer Connect

**Defined:** 2026-05-04
**Core Value:** Volunteers can find a trustworthy opportunity and NGOs can organize participation in one simple, accessible place.

## v1 Requirements

### Setup

- [x] **SETUP-01**: Developer can run the backend locally with TypeScript, linting, formatting, and a documented start command.
- [x] **SETUP-02**: Developer can run the SvelteKit frontend locally with TypeScript, linting, formatting, and a documented start command.
- [x] **SETUP-03**: Developer can run project checks for backend and frontend before committing.

### Data Model

- [x] **DATA-01**: System stores users with identity, credentials, role, and timestamps.
- [x] **DATA-02**: System stores volunteer profiles linked to users.
- [x] **DATA-03**: System stores NGO profiles linked to users or NGO managers.
- [x] **DATA-04**: System stores opportunities linked to NGOs.
- [x] **DATA-05**: System stores applications linking volunteers to opportunities.
- [x] **DATA-06**: System stores events and participation records linked to opportunities and volunteers.
- [x] **DATA-07**: Developer can run database migrations and verify seed or insertion data.

### Authentication

- [x] **AUTH-01**: User can register with required account information and a selected role.
- [x] **AUTH-02**: User can log in with valid credentials.
- [x] **AUTH-03**: System issues and validates JWT authentication for protected routes.
- [x] **AUTH-04**: System blocks protected actions when the user is not authenticated.
- [x] **AUTH-05**: System enforces role-based access for volunteer, NGO, and admin actions.
- [x] **AUTH-06**: User can log out from the frontend.

### NGOs

- [x] **NGO-01**: NGO user can create an NGO profile.
- [x] **NGO-02**: NGO user can edit their NGO profile.
- [x] **NGO-03**: User can list available NGO profiles.
- [x] **NGO-04**: User can view NGO profile details.
- [x] **NGO-05**: Authorized NGO user can delete an NGO profile.

### Opportunities

- [x] **OPP-01**: NGO user can create a volunteer opportunity with title, description, location, schedule, requirements, and capacity.
- [x] **OPP-02**: NGO user can edit their opportunity.
- [x] **OPP-03**: User can list volunteer opportunities.
- [x] **OPP-04**: User can view opportunity details.
- [x] **OPP-05**: User can filter or search opportunities by at least one practical criterion such as location, date, or activity type.

### Applications

- [x] **APP-01**: Volunteer can apply to an opportunity.
- [x] **APP-02**: Volunteer can view their applications and statuses.
- [x] **APP-03**: NGO user can view applications for their opportunities.
- [x] **APP-04**: NGO user can update application status.
- [x] **APP-05**: Volunteer and NGO can see basic application-related contact or message information.

### Events And Participation

- [ ] **EVT-01**: NGO user can create an event or activity schedule for an opportunity.
- [ ] **EVT-02**: NGO user can record volunteer participation in an event or activity.
- [ ] **EVT-03**: Volunteer can view participation history.
- [ ] **EVT-04**: NGO user can view engagement history for their opportunities.

### Experience

- [ ] **UX-01**: First-time visitor can understand what the platform does from the first screen.
- [ ] **UX-02**: Volunteer can move from opportunity discovery to application without confusing navigation.
- [ ] **UX-03**: NGO user can move from profile setup to opportunity creation without confusing navigation.
- [ ] **UX-04**: Main pages use accessible labels, keyboard-reachable controls, and responsive layouts.

### Integration Hardening

- [ ] **HARD-01**: Public registration creates complete volunteer and NGO domain records with robust CPF/CNPJ validation, required NGO logo upload, and safe compensation on partial failure.
- [ ] **HARD-02**: Auth frontend supports password recovery, password reset, expired session handling, and role/status redirects without relying on client-controlled authorization.
- [ ] **HARD-03**: Backend exposes reusable auth, role, suspension, ownership, and approved-NGO guards/decorators for protected domain routes.
- [ ] **HARD-04**: Admin, NGO, marketplace, opportunity, application, and presence pages consume real backend APIs and show blocked states for unauthenticated, suspended, or unauthorized users.
- [ ] **HARD-05**: Automated tests cover critical auth, authorization, IDOR, duplicate application, capacity, suspension, and sensitive-data exposure rules.
- [ ] **HARD-06**: Public pages and API responses do not expose CPF, CNPJ, service role keys, internal analysis data, stack traces, or sensitive payloads.

### Release Delivery

- [ ] **REL-01**: README and operational docs explain install, environment variables, Supabase setup, migrations, seed strategy, run commands, tests, and troubleshooting.
- [ ] **REL-02**: Academic delivery includes requirement traceability, architecture overview, database model, core use cases, and implementation evidence.
- [ ] **REL-03**: Demo/deployment instructions define how to run or deploy the MVP without committing secrets or requiring undocumented manual steps.
- [ ] **REL-04**: Final quality package includes lint/build/test/E2E/accessibility/security evidence and known limitations.
- [ ] **REL-05**: Final release notes identify delivered MVP scope, deferred v2 features, open risks, and next recommended maintenance actions.

## v1.1 Stabilization Requirements

### Foundation Stabilization

- [x] **STAB-01**: Supabase migrations define one coherent schema that can be applied to a clean remote development database and matches backend queries.
- [x] **STAB-02**: Seed or setup scripts create non-sensitive demo users, ONGs, opportunities, applications, and presence records needed for manual and automated verification.
- [x] **STAB-03**: Root CI passes with lint, formatting, build, Svelte check, and tests for backend and frontend.
- [x] **STAB-04**: Dependency audit findings at moderate severity or higher are fixed or explicitly documented with accepted mitigation.
- [x] **STAB-05**: Environment examples and setup docs match actual backend/frontend variables, including Supabase Auth, Storage, and backend URL contracts.

### Product Integration

- [x] **INT-01**: Volunteer can apply to a real opportunity from the frontend and receives clear authenticated/unauthenticated/closed-deadline states.
- [x] **INT-02**: Volunteer can view real application status and participation history from the frontend.
- [x] **INT-03**: ONG can list, create, edit, and manage its opportunities from the frontend using real backend APIs.
- [x] **INT-04**: ONG can list, approve, reject, and observe applications from the frontend using real backend APIs.
- [x] **INT-05**: ONG can mark presence for approved volunteers after opportunity completion using real backend APIs.
- [x] **INT-06**: Admin can list, inspect, approve, and reject ONGs from the frontend using real backend APIs.

### Verification And Release Readiness

- [ ] **VER-01**: Backend automated tests cover auth, role enforcement, ownership, duplicate application, capacity control, suspension, and sensitive-data exposure.
- [ ] **VER-02**: Frontend or E2E tests cover the main volunteer, ONG, and admin workflows against a seedable environment.
- [ ] **VER-03**: Manual UAT, keyboard navigation, and accessibility evidence are recorded for the principal screens.
- [ ] **VER-04**: Final security review has no unmitigated critical/high finding and records residual risks.
- [ ] **VER-05**: Release documentation gives a reproducible path for setup, migrations, seed, verification, demo, and deploy/handoff.

## v2 Requirements

### Communication

- **COMM-01**: Volunteer and NGO can exchange real-time chat messages.
- **COMM-02**: User receives notifications for application status changes.

### Trust And Discovery

- **TRUST-01**: NGO profiles can show verification or trust indicators.
- **DISC-01**: System recommends opportunities based on volunteer preferences.

### Platforms

- **MOB-01**: User can access a native mobile application.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Native mobile app | Web-first MVP is enough to validate the workflow. |
| Donations/payments | Not part of the core volunteer matching flow. |
| Real-time chat | Simple application-related contact is enough for v1. |
| Algorithmic recommendations | Requires usage data and is not necessary for initial validation. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | Phase 1 | Done |
| SETUP-02 | Phase 1 | Done |
| SETUP-03 | Phase 1 | Done |
| DATA-01 | Phase 2 | Done |
| DATA-02 | Phase 2 | Done |
| DATA-03 | Phase 2 | Done |
| DATA-04 | Phase 2 | Done |
| DATA-05 | Phase 2 | Done |
| DATA-06 | Phase 2 | Done |
| DATA-07 | Phase 2 | Done |
| AUTH-01 | Phase 3 | Done |
| AUTH-02 | Phase 3 | Done |
| AUTH-03 | Phase 3 | Done |
| AUTH-04 | Phase 3 | Done |
| AUTH-05 | Phase 3 | Done |
| AUTH-06 | Phase 3 | Done |
| NGO-01 | Phase 4 | Done |
| NGO-02 | Phase 4 | Done |
| NGO-03 | Phase 4 | Done |
| NGO-04 | Phase 4 | Done |
| NGO-05 | Phase 4 | Done |
| OPP-01 | Phase 5 | Done |
| OPP-02 | Phase 5 | Done |
| OPP-03 | Phase 5 | Done |
| OPP-04 | Phase 5 | Done |
| OPP-05 | Phase 5 | Done |
| APP-01 | Phase 6 | Done |
| APP-02 | Phase 6 | Done |
| APP-03 | Phase 6 | Done |
| APP-04 | Phase 6 | Done |
| APP-05 | Phase 6 | Done |
| EVT-01 | Phase 7 | Pending |
| EVT-02 | Phase 7 | Pending |
| EVT-03 | Phase 7 | Pending |
| EVT-04 | Phase 7 | Pending |
| UX-01 | Phase 8 | Pending |
| UX-02 | Phase 8 | Pending |
| UX-03 | Phase 8 | Pending |
| UX-04 | Phase 8 | Pending |
| HARD-01 | Phase 9 | Pending |
| HARD-02 | Phase 9 | Pending |
| HARD-03 | Phase 9 | Pending |
| HARD-04 | Phase 9 | Pending |
| HARD-05 | Phase 9 | Pending |
| HARD-06 | Phase 9 | Pending |
| REL-01 | Phase 10 | Pending |
| REL-02 | Phase 10 | Pending |
| REL-03 | Phase 10 | Pending |
| REL-04 | Phase 10 | Pending |
| REL-05 | Phase 10 | Pending |
| STAB-01 | Phase 11 | Done |
| STAB-02 | Phase 11 | Done |
| STAB-03 | Phase 11 | Done |
| STAB-04 | Phase 11 | Done |
| STAB-05 | Phase 11 | Done |
| INT-01 | Phase 12 | Done |
| INT-02 | Phase 12 | Done |
| INT-03 | Phase 12 | Done |
| INT-04 | Phase 12 | Done |
| INT-05 | Phase 12 | Done |
| INT-06 | Phase 12 | Done |
| VER-01 | Phase 13 | Pending |
| VER-02 | Phase 13 | Pending |
| VER-03 | Phase 13 | Pending |
| VER-04 | Phase 13 | Pending |
| VER-05 | Phase 13 | Pending |

**Coverage:**
- v1 requirements: 50 total
- v1.1 requirements: 16 total
- Mapped to phases: 66
- Unmapped: 0

---
*Requirements defined: 2026-05-04*
*Last updated: 2026-05-27 after executing Phase 12*
