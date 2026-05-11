# Banco de dados

Esta pasta documenta a proposta local do modelo de dados inicial do Volunteer Connect.

Os arquivos desta fase ainda nao foram aplicados no Supabase remoto. Eles existem para revisao, rastreabilidade academica e preparacao das proximas tarefas da Fase 2.

## Arquivos

- `schema-proposto.md`: descricao inicial das entidades, relacionamentos e regras esperadas.
- `../../supabase/migrations/0001_modelo_inicial.sql`: proposta local da primeira migration SQL.
- `../../supabase/seed/0001_dados_exemplo.sql`: proposta local de dados ficticios para validar relacionamentos.

## Guardrails

- Nunca registrar credenciais reais neste repositorio.
- Nao incluir valores reais de `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` ou `DATABASE_URL`.
- A chave `SUPABASE_SERVICE_ROLE_KEY` deve ficar restrita ao backend.
- Qualquer execucao contra o Supabase remoto depende de revisao e autorizacao explicita.
- O seed deve usar apenas dados ficticios e ambientes autorizados de desenvolvimento.

## Status da Fase 2

Esta etapa cria apenas a estrutura local de documentacao e SQL. A escrita detalhada do schema, da migration e do seed sera refinada nas proximas tarefas da Fase 2.
