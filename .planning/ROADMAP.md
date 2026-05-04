# Roadmap: Volunteer Connect

**Created:** 2026-05-04
**Granularity:** Standard
**Core Value:** Volunteers can find a trustworthy opportunity and NGOs can organize participation in one simple, accessible place.

## Overview

| Phase | Name | Goal | Requirements | UI hint |
|-------|------|------|--------------|---------|
| 1 | Project Foundation | Establish runnable backend/frontend workspace and quality commands. | SETUP-01, SETUP-02, SETUP-03 | yes |
| 2 | Data Model Foundation | Define Prisma schema, migrations, and seed/insertion validation. | DATA-01..DATA-07 | no |
| 3 | Authentication And Roles | Implement registration, login, JWT protection, logout, and role enforcement. | AUTH-01..AUTH-06 | yes |
| 4 | NGO Profiles | Let NGO users manage profiles and users browse NGO details. | NGO-01..NGO-05 | yes |
| 5 | Opportunities | Let NGOs publish opportunities and volunteers browse/search them. | OPP-01..OPP-05 | yes |
| 6 | Applications | Let volunteers apply and NGOs manage application status. | APP-01..APP-05 | yes |
| 7 | Events And Participation | Track activity schedules, participation, and engagement history. | EVT-01..EVT-04 | yes |
| 8 | UX, Accessibility, And Verification | Polish the core volunteer/NGO journey and verify all v1 requirements. | UX-01..UX-04 | yes |

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

**Goal:** Create the initial relational model needed by the volunteer/NGO workflow.

**Requirements:** DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06, DATA-07

**Success Criteria:**
1. Prisma schema includes users, volunteers, NGOs, opportunities, applications, events, and participations.
2. Migrations run from a clean database.
3. Seed or insertion test proves the core relationships work.
4. Schema supports volunteer, NGO, and admin roles without duplicating account identity.

### Phase 3: Authentication And Roles

**Goal:** Secure the app with registration, login, JWT auth, logout, and role-based authorization.

**Requirements:** AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06

**Success Criteria:**
1. User can register and log in from API and frontend.
2. Protected backend routes reject unauthenticated requests.
3. Role guards prevent volunteers, NGOs, and admins from using unauthorized actions.
4. Frontend stores session state safely enough for the MVP and supports logout.

### Phase 4: NGO Profiles

**Goal:** Let NGOs create and manage their presence on the platform.

**Requirements:** NGO-01, NGO-02, NGO-03, NGO-04, NGO-05

**Success Criteria:**
1. NGO user can create, edit, and delete their profile through protected API routes.
2. Users can list and view NGO profiles from the frontend.
3. Unauthorized users cannot modify NGO profiles they do not own.
4. NGO profile UI communicates key information clearly.

### Phase 5: Opportunities

**Goal:** Let NGOs publish opportunities and volunteers discover them.

**Requirements:** OPP-01, OPP-02, OPP-03, OPP-04, OPP-05

**Success Criteria:**
1. NGO user can create and edit opportunities linked to their NGO.
2. Users can browse and view opportunity detail pages.
3. Opportunities show schedule, location, activity details, requirements, and capacity.
4. Volunteer can narrow the list by a practical filter or search input.

### Phase 6: Applications

**Goal:** Let volunteers apply to opportunities and NGOs manage responses.

**Requirements:** APP-01, APP-02, APP-03, APP-04, APP-05

**Success Criteria:**
1. Volunteer can apply once to an opportunity.
2. Volunteer can view application status.
3. NGO user can view applications for their opportunities.
4. NGO user can update statuses through a protected workflow.
5. Application detail exposes a simple communication/contact path.

### Phase 7: Events And Participation

**Goal:** Record activity schedules and participation history after applications.

**Requirements:** EVT-01, EVT-02, EVT-03, EVT-04

**Success Criteria:**
1. NGO user can create activity/event records for opportunities.
2. NGO user can mark volunteer participation.
3. Volunteer can view participation history.
4. NGO user can view engagement history for their opportunities.

### Phase 8: UX, Accessibility, And Verification

**Goal:** Make the core workflow simple, accessible, and demonstrably complete.

**Requirements:** UX-01, UX-02, UX-03, UX-04

**Success Criteria:**
1. First screen clearly explains the platform and offers relevant actions.
2. Volunteer journey from discovery to application is usable without guidance.
3. NGO journey from profile setup to opportunity creation is usable without guidance.
4. Main pages pass responsive and keyboard navigation checks.
5. All v1 requirements in `.planning/REQUIREMENTS.md` are verified or explicitly marked blocked.

## Requirement Coverage

- v1 requirements: 39
- Mapped requirements: 39
- Unmapped requirements: 0

---
*Last updated: 2026-05-04 after Phase 1 execution*
