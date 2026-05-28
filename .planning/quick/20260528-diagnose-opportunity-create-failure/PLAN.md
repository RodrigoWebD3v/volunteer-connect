---
status: complete
created_at: "2026-05-28T13:36:24-03:00"
---

# Quick Task: Diagnose Opportunity Create Failure

Validar regras de criacao de oportunidade e melhorar retorno de erro quando o Supabase recusar a insercao.

## Plano

- Conferir status da ONG e constraints da tabela `oportunidades` no Supabase remoto.
- Testar insercao valida com rollback para separar regra de negocio de problema de schema/cache.
- Recarregar schema cache do PostgREST.
- Ajustar mensagem do backend para erros comuns de schema, constraint, FK e status.
- Rodar build/test backend.
