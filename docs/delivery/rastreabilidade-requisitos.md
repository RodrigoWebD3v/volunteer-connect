# Rastreabilidade de requisitos

| Grupo | Requisitos | Fase | Evidencia |
|-------|------------|------|-----------|
| Fundacao | SETUP-01..SETUP-04 | 1 | README, scripts npm, `.env.example` |
| Dados | DATA-01..DATA-06 | 2 | `docs/database/schema-proposto.md`, `supabase/migrations/` |
| Auth | AUTH-01..AUTH-06 | 3, 9 | `backend/src/auth/`, `frontend/src/routes/login`, `frontend/src/routes/cadastro` |
| ONGs | NGO-01..NGO-06 | 4, 9 | `backend/src/ongs/`, `frontend/src/routes/admin/ongs`, `frontend/src/routes/ong` |
| Oportunidades | OPP-01..OPP-06 | 5, 8, 9 | `backend/src/oportunidades/`, `frontend/src/routes/oportunidades` |
| Inscricoes | APP-01..APP-05 | 6, 8, 9 | `backend/src/inscricoes/`, `frontend/src/routes/minhas-inscricoes` |
| Presencas | EVT-01..EVT-04 | 7 | `backend/src/presencas/`, `supabase/migrations/0005_presencas.sql` |
| UX | UX-01..UX-04 | 8 | marketplace, login/cadastro, areas ONG/admin, checklists |
| Hardening | HARD-01..HARD-06 | 9 | guards, cadastro completo, recuperacao de senha, upload de logo |
| Release | REL-01..REL-05 | 10 | `docs/delivery/`, `docs/verification/` |

## Status

- Requisitos centrais do MVP: implementados localmente.
- Validacao remota Supabase: depende de projeto configurado com migrations aplicadas.
- E2E automatizado completo: pendente de ambiente seedado e credenciais de teste sem segredo real.
