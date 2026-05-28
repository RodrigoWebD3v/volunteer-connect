# Checklist do MVP

| Fluxo | Status | Evidencia |
|-------|--------|-----------|
| Guest descobre oportunidade | Verificado localmente | `frontend/src/routes/oportunidades` |
| Voluntario cria conta | Verificado localmente | `frontend/src/routes/cadastro`, `backend/src/auth` |
| ONG cria conta e envia analise | Verificado localmente | cadastro com CNPJ/logo e `status_analise=pendente` |
| Admin aprova ONG | Verificado localmente | `backend/src/ongs`, `frontend/src/routes/admin/ongs` |
| ONG cria oportunidade | Verificado localmente | `backend/src/oportunidades` |
| Voluntario se inscreve | Verificado localmente | `backend/src/inscricoes` |
| ONG avalia inscricao | Verificado localmente | `backend/src/inscricoes` |
| ONG registra presenca | Verificado localmente | `backend/src/presencas` |
| Voluntario ve historico | Verificado localmente | `frontend/src/routes/minhas-presencas` |

## Bloqueios

- Execucao contra Supabase remoto exige migrations aplicadas e variaveis reais locais.
- Testes E2E completos precisam de fixtures e contas de teste.
