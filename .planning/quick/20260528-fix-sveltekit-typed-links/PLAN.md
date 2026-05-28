---
status: complete
created_at: "2026-05-28T18:53:05-03:00"
---

# Quick Task: Fix SvelteKit Typed Links

Corrigir falhas de `svelte-check` causadas por chamadas a `resolve(...)` com rotas que nao estao na uniao de rotas tipadas usada no CI.

## Plano

- Remover o uso de `resolve(...)` nos links reportados pelo CI.
- Usar `href` direto para a pagina de recuperacao de senha e para detalhes de oportunidade.
- Rodar `npm --prefix frontend run check`.
- Fazer review de seguranca do diff.
