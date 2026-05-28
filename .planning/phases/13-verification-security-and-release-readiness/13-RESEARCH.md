---
phase: "13"
status: "complete"
created: "2026-05-27"
---

# Phase 13 Research

## Test Strategy

- Backend: unit/integration tests around services and controllers with Supabase mocked or test doubles.
- Frontend: prefer Playwright if a seedable Supabase/dev backend path exists; otherwise Vitest/Svelte tests plus documented manual UAT.
- Security: project skill `security-code-review` is mandatory before final release.

## High-Risk Behaviors To Cover

- Auth token missing/invalid/expired.
- Role mismatch: volunteer using ONG/admin action, ONG using admin action.
- IDOR: ONG accessing opportunity/application/presence owned by another ONG.
- Duplicate application and capacity race path.
- Suspended account blocked.
- Public responses not exposing CPF/CNPJ/service role/internal analysis.

## Evidence Strategy

- Store commands and results in `docs/delivery/evidencias-testes.md`.
- Store UAT/accessibility in `docs/verification/`.
- Update release checklist with exact status and residual risks.
