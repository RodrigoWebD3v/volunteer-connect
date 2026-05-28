---
status: complete
completed_at: "2026-05-28T13:05:24-03:00"
---

# Summary: Fix Cadastro Tipo Conta Toggle

O formulario de cadastro agora alterna imediatamente entre campos de voluntario e ONG ao clicar no tipo de conta.

Arquivo alterado:

- `frontend/src/routes/cadastro/+page.svelte`

Validacoes executadas:

```bash
npm --prefix frontend run check
npm --prefix frontend test
```

Resultado: comandos passaram.
