---
status: complete
created_at: "2026-05-28T12:15:51-03:00"
---

# Quick Task: Admin User Migration

Criar uma migration idempotente para provisionar o registro local do primeiro administrador do Volunteer Connect.

## Plano

- Adicionar migration SQL seguindo a sequencia existente em `supabase/migrations/`.
- Usar o UUID real de `auth.users` para evitar criar administrador sem capacidade de login.
- Manter a criacao de credenciais fora da migration, preservando o Supabase Auth como fonte de autenticacao.
- Verificar build/typecheck com `npm run check`.
