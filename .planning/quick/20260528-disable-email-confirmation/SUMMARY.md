---
status: complete
completed_at: "2026-05-28T13:21:50-03:00"
---

# Summary: Disable Email Confirmation

Novos cadastros agora sao criados com `email_confirm: true` no Supabase Auth. As mensagens de cadastro/login foram atualizadas para nao depender de caixa de entrada.

Tambem foram confirmados os usuarios ja existentes que estavam com `email_confirmed_at` nulo no Supabase remoto de desenvolvimento.

Arquivos alterados:

- `backend/src/auth/auth.service.ts`
- `frontend/src/routes/cadastro/+page.server.ts`
- `frontend/src/routes/login/+page.server.ts`
- `README.md`
- `docs/auth/README.md`

Validacoes executadas:

```bash
npm run check
npm test
```

Resultado: comandos passaram.
