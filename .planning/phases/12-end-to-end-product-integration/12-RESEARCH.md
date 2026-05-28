---
phase: "12"
status: "complete"
created: "2026-05-27"
---

# Phase 12 Research

## Current Integration State

- Marketplace e detalhe de oportunidade tentam buscar backend real e usam fallback demonstrativo.
- Cadastro/login ja existem, mas as telas protegidas de ONG/admin/voluntario ainda usam dados estaticos em varios pontos.
- SvelteKit actions existem para auth, mas nao para aplicacao, oportunidade, inscricao, presenca e analise admin.

## Recommended Integration Pattern

- Usar `+page.server.ts` para telas que precisam de token/cookie e chamadas autenticadas ao backend.
- Usar actions de servidor para mutacoes: apply, create/update opportunity, evaluate application, mark presence, approve/reject ONG.
- Reutilizar `PUBLIC_BACKEND_URL` no server load/action ate existir cliente API dedicado.
- Normalizar resposta de erro do backend em mensagens portuguesas por tela.

## Risk Notes

- Fallback demo em tela protegida pode mascarar erro de autorizacao; substituir por empty/error states.
- Se `/auth/me` nao retorna papel/status suficiente, ajustar antes dos guards.
- Formularios devem preservar valores em falha e nao vazar stack/message interna.
