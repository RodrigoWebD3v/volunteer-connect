---
phase: "05"
status: passed
verified_at: "2026-05-25"
requirements: [OPP-01, OPP-02, OPP-03, OPP-04, OPP-05]
---

# Verificacao da Fase 05

## Resultado

Status: `passed`

O backend protege criacao/edicao por papel, ownership e status da ONG. O marketplace publico expõe oportunidades sem CNPJ/CPF e as telas seguem a direcao visual publica do projeto.

## Evidencias

- `backend/src/oportunidades/oportunidades.service.ts`
- `backend/src/oportunidades/oportunidades.controller.ts`
- `supabase/migrations/0003_oportunidades.sql`
- `frontend/src/routes/oportunidades/+page.svelte`
- `frontend/src/routes/oportunidades/[id]/+page.svelte`
- `npm run lint:check`
- `npm test`
- `npm run check`
