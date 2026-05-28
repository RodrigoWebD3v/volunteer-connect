---
phase: 12
slug: end-to-end-product-integration
status: approved
shadcn_initialized: false
preset: volunteer-connect
created: 2026-05-27
---

# Phase 12 - UI Design Contract

> Visual and interaction contract for connecting the remaining Volunteer Connect product journeys to real backend APIs.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | Volunteer Connect public + operational |
| Component library | none |
| Icon library | none currently; use lucide icons if an icon package is added later |
| Font | Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif |

Phase 12 must preserve the existing token direction in `frontend/src/routes/+layout.svelte` and formalize it across integrated screens. Public discovery and opportunity detail follow the Airbnb-inspired Volunteer Connect direction. Authenticated dashboards use a Notion/Cal.com operational direction.

---

## Experience Split

| Area | Visual reference | Contract |
|------|------------------|----------|
| Public marketplace and opportunity detail | Airbnb marketplace | Warm, clear, card-based discovery with strong practical facts and one primary CTA. |
| Volunteer area | Operational but friendly | Compact list of applications/presences, visible status labels, direct path back to opportunities. |
| ONG dashboard | Notion/Cal.com | Work-focused tables/forms for opportunities, applications and presences. No hero layout. |
| Admin ONG review | Notion/Cal.com | Dense review list/detail, clear approval actions, CNPJ visible only in admin context. |

Protected pages must not fall back to demo rows. If backend data is unavailable, render an error or empty state with a next action.

---

## Spacing Scale

Declared values must stay multiples of 4.

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon/text micro gaps, table helper copy |
| sm | 8px | Inline gaps, label to input spacing |
| md | 16px | Default field/card/table spacing |
| lg | 24px | Section internal padding, form group gaps |
| xl | 32px | Page section gaps, detail layout gaps |
| 2xl | 48px | Major page blocks on desktop |
| 3xl | 64px | Large public page bottom spacing |

Exceptions:

- Sticky topbar keeps existing `76px` minimum height.
- Pill buttons may use horizontal padding from `14px` to `20px` when needed for label fit.
- Tables may use `14px` cell padding where already established, but new dense tables should prefer `12px` or `16px`.

---

## Typography

Do not scale font size directly with viewport width except existing public page display headings already using `clamp`. Do not use negative letter spacing. Keep dashboard headings smaller and tighter than marketplace headings.

| Role | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Body | 16px | 400 | 1.5 | Paragraphs, table content, form body copy |
| Small body | 14px | 400-600 | 1.43 | Helper text, metadata, secondary facts |
| Label | 14px | 700-800 | 1.3 | Form labels, filters, table labels |
| Table header | 12px | 800-900 | 1.3 | Uppercase table headers and status headings |
| Dashboard heading | 28px-32px | 700-800 | 1.15 | ONG/admin/volunteer page titles |
| Public display | 40px-56px max | 700-800 | 1.05 | Marketplace/detail primary title only |
| Button | 14px-16px | 700-900 | 1.25 | Primary and secondary commands |

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#ffffff` / existing `--color-canvas` | Page background and primary canvas |
| Secondary (30%) | `#f7f7f7` / existing `--color-surface-soft` | Empty states, notices, filter bands, muted dashboard areas |
| Surface | `#ffffff` / existing `--color-surface` | Cards, tables, forms, side panels |
| Text ink | `#222222` / existing `--color-ink` | Primary text |
| Body text | `#3f3f3f` / existing `--color-body` | Paragraphs and descriptive copy |
| Muted | `#6a6a6a` / existing `--color-muted` | Metadata and secondary hints |
| Hairline | `#dddddd` / existing `--color-hairline` | Borders and table rules |
| Accent (10%) | `#ff385c` / existing `--color-primary` | Primary CTA, active filters, selected status emphasis |
| Accent strong | `#e00b41` / existing `--color-primary-strong` | Hover/active primary state, important links |
| Focus | existing `--color-focus` | Keyboard outline only |
| Destructive | `#c13515` | Rejection, cancellation, destructive confirmation |
| Success | `#147d3f` | Approved/present status text with label |
| Warning | `#8a5a00` | Pending/review states with label |

Accent reserved for:

- Primary CTA buttons: `Aplicar`, `Criar oportunidade`, `Aprovar ONG`, `Salvar presenca`.
- Active filter/search submit.
- Status chip emphasis when paired with text.
- Brand mark and important links.

Accent is not a blanket color for every link, table cell, icon, or status.

---

## Component Contracts

### Navigation And Route State

- Topbar remains sticky and accessible with visible skip link.
- Authenticated navigation must adapt by role:
  - volunteer: `Oportunidades`, `Minhas inscricoes`, `Minhas presencas`, `Sair`;
  - ONG approved: `Oportunidades`, `Painel da ONG`, `Sair`;
  - ONG pending/rejected: show analysis status route, not opportunity management;
  - admin: include `Analise de ONGs`.
- Navigation is UX guidance only. Backend remains source of authorization.

### Buttons

| Variant | Shape | Use |
|---------|-------|-----|
| Primary | pill or 8px rounded in dense tables | One main action per view/form row. Coral background, white text. |
| Secondary | 1px hairline, white background | Alternative actions like back, cancel, view detail. |
| Ghost | transparent | Low-risk navigation or logout. |
| Destructive | white or soft red with red text | Reject/cancel/delete flows; never reuse coral primary. |

All buttons need `min-height: 44px` outside dense tables. Dense table action buttons may use `36px` minimum only when a visible label remains readable.

### Status Labels

Statuses must include text, not color alone.

| Status | Label | Visual |
|--------|-------|--------|
| pending analysis/application | `Pendente` | soft surface, warning text |
| approved/published/present | `Aprovada`, `Publicada`, `Presente` | soft surface, success text |
| rejected/absent | `Reprovada`, `Ausente` | soft surface, destructive text |
| cancelled/closed | `Cancelada`, `Encerrada` | soft surface, muted text |

### Tables And Lists

- Use tables for ONG/admin management where comparison matters.
- Use cards/list rows for volunteer application and presence history.
- Tables must have visible headers, empty state rows, and action cells with clear labels.
- On mobile, tables may become horizontally scrollable with `min-width`, or convert to stacked rows if simpler.

### Forms

- Labels are always visible.
- Validation errors appear next to the relevant field and in a page-level summary when submission fails.
- Preserve submitted values on failure.
- Form submit areas must include loading/disabled state copy if implementation supports pending transitions.

### Empty, Loading, Error, And Blocked States

| State | Contract |
|-------|----------|
| Loading | Use plain text `Carregando...` or skeleton rows only if stable dimensions are set. |
| Empty | Heading, one-sentence explanation, and next action. |
| Error | Say what failed and how to retry. Do not expose stack traces or raw backend internals. |
| Unauthorized | Redirect to login or show `Entre para continuar` with login CTA. |
| Forbidden | Explain role/status mismatch: pending ONG, rejected ONG, suspended account, or admin-only area. |
| Offline public marketplace | May show demo fallback with clear label. Protected pages must not use demo fallback. |

---

## Screen Contracts

### Opportunity Detail And Application

- Keep public detail layout with main article and right-side application panel on desktop.
- When authenticated as volunteer and deadline is open, primary CTA is `Aplicar agora`.
- If already applied, panel shows current status and link to `Minhas inscricoes`.
- If unauthenticated, primary CTA is `Entrar para aplicar`; secondary is `Criar conta de voluntario`.
- If ONG/admin is viewing, do not show a misleading volunteer application CTA.
- Application success copy: `Inscricao enviada. A ONG avaliara sua candidatura.`

### Minhas Inscricoes

- Replace static card with real list rows.
- Row content: opportunity title, ONG, city/state, date range, status chip, message/observation if present.
- Empty heading: `Voce ainda nao se inscreveu em oportunidades.`
- Empty body: `Explore oportunidades disponiveis e envie sua primeira candidatura.`
- Empty CTA: `Ver oportunidades`.

### Minhas Presencas

- List real participation history with title, ONG, date, city/state, status, optional observation.
- Empty heading: `Nenhuma presenca registrada ainda.`
- Empty body: `Quando uma ONG registrar sua participacao, o historico aparecera aqui.`

### ONG Oportunidades

- Operational header with title, short helper copy, primary CTA `Nova oportunidade`.
- Table columns: title, status, period, city/state, approved applications if available, actions.
- Empty heading: `Nenhuma oportunidade cadastrada.`
- Empty CTA: `Criar oportunidade`.
- Pending/rejected ONG blocked states must link to analysis status/resubmission flow.

### Nova/Editar Oportunidade

- Use one-column form with grouped schedule/location/capacity fields.
- Primary CTA: `Publicar oportunidade` or `Salvar alteracoes`.
- Secondary CTA: `Salvar rascunho` if backend supports draft, otherwise omit.
- Date errors must reference the exact relationship: deadline before start, end after start.

### Inscricoes Da Oportunidade

- Table/list of applicants with name, email, status, message, ONG observation, actions.
- Approval and rejection actions must be distinct:
  - `Aprovar`
  - `Reprovar`
- Rejection should allow/require observation if backend requires it.
- Capacity errors use copy: `Nao ha vagas disponiveis para aprovar mais voluntarios.`

### Presencas Da Oportunidade

- Only available for completed opportunities.
- Row content: volunteer name/email, current presence status, observation, save action.
- Primary row action: `Salvar presenca`.
- Blocked copy for not completed: `Presencas ficam disponiveis apos a conclusao da oportunidade.`

### Admin Analise De ONGs

- Dense operational table with filters by status.
- CNPJ can be shown in this admin context only.
- Detail page shows institution data, status, logo if available, analysis history, approve/reject actions.
- Rejection requires reason and uses destructive styling.
- Success copy: `Analise registrada.`

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary volunteer CTA | `Aplicar agora` |
| Unauthenticated CTA | `Entrar para aplicar` |
| Opportunity management CTA | `Nova oportunidade` |
| Application review CTA | `Aprovar` / `Reprovar` |
| Presence CTA | `Salvar presenca` |
| Admin approval CTA | `Aprovar ONG` |
| Empty state heading | Context-specific, starts with the missing object: `Nenhuma oportunidade cadastrada.` |
| Empty state body | One sentence explaining why the list is empty and the next step. |
| Error state | `Nao foi possivel carregar os dados. Tente novamente em instantes.` |
| Forbidden state | `Esta area nao esta disponivel para o seu perfil.` plus exact role/status reason. |
| Destructive confirmation | `Reprovar ONG: informe o motivo antes de confirmar.` |

Avoid technical words in UI copy: `endpoint`, `payload`, `token`, `schema`, `service role`, `stack trace`.

---

## Accessibility Contract

- Every input has a visible label.
- Every form error is reachable by screen reader text and visually associated with the field.
- Every interactive control has at least 44px target size outside dense data tables.
- Focus outline remains visible using `--color-focus`.
- Status is never color-only.
- Tables include semantic `table`, `thead`, `tbody`, `th`, `td` unless converted to cards on mobile.
- Empty/error/blocked states use `role="status"` when they are the result of a user action or load state.
- Page titles are unique and in Portuguese.
- `frontend/src/app.html` should use `lang="pt-BR"` before release.

---

## Responsive Contract

| Breakpoint | Behavior |
|------------|----------|
| <= 720px | Topbar wraps; forms become single column; action buttons fill row width if needed. |
| <= 840px | Opportunity detail side panel stacks below content. |
| Tables on mobile | Use horizontal scroll with stable min-width or convert to stacked rows. Do not allow text overlap. |
| Public cards | Minimum card width around 260px; preserve title, ONG, date and location. |

Do not use viewport-width font scaling for dashboard text. Public display headings may keep existing `clamp` but must not overflow.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not required |
| third-party registry | none | not allowed in Phase 12 without explicit review |

No new component registry is required for Phase 12. If a package is added for icons or UI primitives, it must be justified in the phase summary and pass dependency/security review.

---

## Verification Checklist For Implementation

- [ ] Protected pages no longer show demo data as primary content.
- [ ] Volunteer can apply from opportunity detail and see status.
- [ ] ONG dashboard uses real lists/forms with empty/error/blocked states.
- [ ] Admin analysis uses real data and keeps CNPJ restricted to admin context.
- [ ] All principal forms preserve input and show field-level errors.
- [ ] Mobile layouts do not overlap or clip long labels.
- [ ] Keyboard focus is visible through main flows.
- [ ] `npm --prefix frontend run lint` passes.
- [ ] `npm --prefix frontend run check` passes.

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-05-27
