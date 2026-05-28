---
status: complete
completed_at: "2026-05-28T18:56:00-03:00"
---

# Summary: Fix SvelteKit Typed Links

As chamadas a `resolve(...)` reportadas pelo CI foram substituidas por `href` direto em links internos, removendo a dependencia da uniao de rotas tipadas nesses pontos.

Arquivos alterados:

- `frontend/src/routes/login/+page.svelte`
- `frontend/src/routes/oportunidades/+page.svelte`

Validacao executada:

```bash
npm --prefix frontend run check
```

Resultado: comando passou com 0 erros e 0 warnings.
