---
phase: 01
slug: project-foundation
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-05-04
---

# Phase 01 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | NestJS generated test stack, SvelteKit/Vitest, npm scripts, Docker Compose config validation |
| **Config file** | `backend/package.json`, `frontend/package.json`, `compose.yaml`, root `package.json` |
| **Quick run command** | `npm run verify` |
| **Full suite command** | `npm run verify; docker compose --env-file .env.example config` |
| **Estimated runtime** | ~120 seconds after dependencies are installed |

---

## Sampling Rate

- **After every task commit:** Run the task's `<verify>` commands.
- **After every plan wave:** Run the full suite command.
- **Before `$gsd-verify-work`:** Full suite must be green.
- **Max feedback latency:** 120 seconds once dependencies are cached.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-T1 | 01 | 1 | SETUP-01 | local tooling | Generated backend builds and tests without secrets | build/unit | `npm --prefix backend run build; npm --prefix backend test` | yes after task | pending |
| 01-01-T2 | 01 | 1 | SETUP-01, SETUP-03 | local tooling | Backend lint/format checks fail on invalid code | lint/format/build/unit | `npm --prefix backend run lint; npm --prefix backend run format; npm --prefix backend run build; npm --prefix backend test` | yes after task | pending |
| 01-02-T1 | 02 | 1 | SETUP-02 | local tooling | Generated frontend checks and tests without secrets | check/unit | `npm --prefix frontend run check; npm --prefix frontend test` | yes after task | pending |
| 01-02-T2 | 02 | 1 | SETUP-02, SETUP-03 | local tooling | Frontend lint/format checks fail on invalid code | check/lint/format/unit | `npm --prefix frontend run check; npm --prefix frontend run lint; npm --prefix frontend run format; npm --prefix frontend test` | yes after task | pending |
| 01-03-T1 | 03 | 2 | SETUP-01, SETUP-02, SETUP-03 | command integrity | Root scripts fail when child checks fail | script integration | `npm run verify` | yes after task | pending |
| 01-03-T2 | 03 | 2 | SETUP-03 | local config | Docker config validates using placeholders, not secrets | config validation | `docker compose --env-file .env.example config` | yes after task | pending |
| 01-03-T3 | 03 | 2 | SETUP-01, SETUP-02, SETUP-03 | documentation | README documents safe local setup and checks | docs grep | `Select-String -Path README.md -Pattern "npm run verify"` | yes after task | pending |

*Status: pending, green, red, flaky*

---

## Wave 0 Requirements

Existing plan task verification covers all phase requirements. No separate Wave 0 test scaffold is needed because the phase creates the test/check infrastructure itself.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Developer readability of README | SETUP-01, SETUP-02, SETUP-03 | Automated grep confirms sections exist, but humans judge clarity. | Read README after execution and confirm a teammate can install, run, use Docker, and run checks from it. |

---

## Validation Sign-Off

- [x] All tasks have automated verify commands.
- [x] Sampling continuity: no 3 consecutive tasks without automated verify.
- [x] No watch-mode flags are used in verification commands.
- [x] Feedback latency target is under 120 seconds after dependency cache is warm.
- [x] `nyquist_compliant: true` set in frontmatter.

**Approval:** approved 2026-05-04
