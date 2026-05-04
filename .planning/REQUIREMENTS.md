# Requirements: Volunteer Connect

**Defined:** 2026-05-04
**Core Value:** Volunteers can find a trustworthy opportunity and NGOs can organize participation in one simple, accessible place.

## v1 Requirements

### Setup

- [ ] **SETUP-01**: Developer can run the backend locally with TypeScript, linting, formatting, and a documented start command.
- [ ] **SETUP-02**: Developer can run the SvelteKit frontend locally with TypeScript, linting, formatting, and a documented start command.
- [ ] **SETUP-03**: Developer can run project checks for backend and frontend before committing.

### Data Model

- [ ] **DATA-01**: System stores users with identity, credentials, role, and timestamps.
- [ ] **DATA-02**: System stores volunteer profiles linked to users.
- [ ] **DATA-03**: System stores NGO profiles linked to users or NGO managers.
- [ ] **DATA-04**: System stores opportunities linked to NGOs.
- [ ] **DATA-05**: System stores applications linking volunteers to opportunities.
- [ ] **DATA-06**: System stores events and participation records linked to opportunities and volunteers.
- [ ] **DATA-07**: Developer can run database migrations and verify seed or insertion data.

### Authentication

- [ ] **AUTH-01**: User can register with required account information and a selected role.
- [ ] **AUTH-02**: User can log in with valid credentials.
- [ ] **AUTH-03**: System issues and validates JWT authentication for protected routes.
- [ ] **AUTH-04**: System blocks protected actions when the user is not authenticated.
- [ ] **AUTH-05**: System enforces role-based access for volunteer, NGO, and admin actions.
- [ ] **AUTH-06**: User can log out from the frontend.

### NGOs

- [ ] **NGO-01**: NGO user can create an NGO profile.
- [ ] **NGO-02**: NGO user can edit their NGO profile.
- [ ] **NGO-03**: User can list available NGO profiles.
- [ ] **NGO-04**: User can view NGO profile details.
- [ ] **NGO-05**: Authorized NGO user can delete an NGO profile.

### Opportunities

- [ ] **OPP-01**: NGO user can create a volunteer opportunity with title, description, location, schedule, requirements, and capacity.
- [ ] **OPP-02**: NGO user can edit their opportunity.
- [ ] **OPP-03**: User can list volunteer opportunities.
- [ ] **OPP-04**: User can view opportunity details.
- [ ] **OPP-05**: User can filter or search opportunities by at least one practical criterion such as location, date, or activity type.

### Applications

- [ ] **APP-01**: Volunteer can apply to an opportunity.
- [ ] **APP-02**: Volunteer can view their applications and statuses.
- [ ] **APP-03**: NGO user can view applications for their opportunities.
- [ ] **APP-04**: NGO user can update application status.
- [ ] **APP-05**: Volunteer and NGO can see basic application-related contact or message information.

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
| SETUP-01 | Phase 1 | Pending |
| SETUP-02 | Phase 1 | Pending |
| SETUP-03 | Phase 1 | Pending |
| DATA-01 | Phase 2 | Pending |
| DATA-02 | Phase 2 | Pending |
| DATA-03 | Phase 2 | Pending |
| DATA-04 | Phase 2 | Pending |
| DATA-05 | Phase 2 | Pending |
| DATA-06 | Phase 2 | Pending |
| DATA-07 | Phase 2 | Pending |
| AUTH-01 | Phase 3 | Pending |
| AUTH-02 | Phase 3 | Pending |
| AUTH-03 | Phase 3 | Pending |
| AUTH-04 | Phase 3 | Pending |
| AUTH-05 | Phase 3 | Pending |
| AUTH-06 | Phase 3 | Pending |
| NGO-01 | Phase 4 | Pending |
| NGO-02 | Phase 4 | Pending |
| NGO-03 | Phase 4 | Pending |
| NGO-04 | Phase 4 | Pending |
| NGO-05 | Phase 4 | Pending |
| OPP-01 | Phase 5 | Pending |
| OPP-02 | Phase 5 | Pending |
| OPP-03 | Phase 5 | Pending |
| OPP-04 | Phase 5 | Pending |
| OPP-05 | Phase 5 | Pending |
| APP-01 | Phase 6 | Pending |
| APP-02 | Phase 6 | Pending |
| APP-03 | Phase 6 | Pending |
| APP-04 | Phase 6 | Pending |
| APP-05 | Phase 6 | Pending |
| EVT-01 | Phase 7 | Pending |
| EVT-02 | Phase 7 | Pending |
| EVT-03 | Phase 7 | Pending |
| EVT-04 | Phase 7 | Pending |
| UX-01 | Phase 8 | Pending |
| UX-02 | Phase 8 | Pending |
| UX-03 | Phase 8 | Pending |
| UX-04 | Phase 8 | Pending |

**Coverage:**
- v1 requirements: 39 total
- Mapped to phases: 39
- Unmapped: 0

---
*Requirements defined: 2026-05-04*
*Last updated: 2026-05-04 after initial definition*
