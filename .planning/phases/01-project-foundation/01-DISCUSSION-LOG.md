# Phase 1: Project Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-05-04
**Phase:** 1-Project Foundation
**Areas discussed:** Repository Structure, Package Manager And Scripts, Quality Baseline, Local Development Experience

---

## Repository Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Simple folders | Use top-level `backend` and `frontend` folders for easier navigation. | yes |
| Formal monorepo | Use package workspaces like `apps/backend` and `apps/frontend`. | |

**User's choice:** "pasta mais simples"
**Notes:** This locks the repo toward simple top-level folders instead of a more abstract monorepo layout.

---

## Package Manager And Scripts

| Option | Description | Selected |
|--------|-------------|----------|
| npm | Default Node package manager, easiest for team members to run without extra setup. | yes |
| pnpm | Faster and stricter package manager, but requires one more tool choice. | |
| Other | Any other package manager. | |

**User's choice:** "npm"
**Notes:** Root scripts should be clear, but backend/frontend should remain independently runnable.

---

## Quality Baseline

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal | Only scaffold generated defaults. | |
| Balanced | Basic lint/format/check scripts. | |
| Full coverage | Configure TypeScript checks, ESLint, Prettier, and test scaffolding from the start. | yes |

**User's choice:** "Cobrir totalmente"
**Notes:** Planning should treat quality commands as first-class phase 1 deliverables.

---

## Local Development Experience

| Option | Description | Selected |
|--------|-------------|----------|
| Local npm only | Run all processes directly on the host machine. | |
| Docker preferred | Use Docker where useful for a smoother local environment. | yes |
| Full containers | Containerize every app process immediately. | |

**User's choice:** "Experiencia local com docker de preferencia"
**Notes:** Docker support is preferred, but the implementation may keep a pragmatic split where app processes run with `npm` and Docker Compose handles infrastructure services.

---

## the agent's Discretion

- Exact scaffolding commands.
- Exact root script names.
- Whether Docker Compose starts only infrastructure or also includes app containers in phase 1.

## Deferred Ideas

- Database schema/modeling is deferred to Phase 2.
- Authentication is deferred to Phase 3.
