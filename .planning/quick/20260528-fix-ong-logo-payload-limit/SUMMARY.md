---
status: complete
completed_at: "2026-05-28T13:05:00-03:00"
---

# Summary: Fix ONG Logo Payload Limit

O bootstrap do backend passou a configurar explicitamente `json` e `urlencoded` com limite de `4mb`, suficiente para o cadastro de ONG com logo de ate 2 MB apos conversao base64.

Arquivo alterado:

- `backend/src/main.ts`

Validacoes executadas:

```bash
npm run check
npm --prefix backend test
```

Resultado: comandos passaram.
