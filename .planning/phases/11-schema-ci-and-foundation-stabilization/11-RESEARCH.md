---
phase: "11"
status: "complete"
created: "2026-05-27"
---

# Phase 11 Research

## Current Code Patterns

- Backend usa Supabase client diretamente por dominio em services NestJS.
- Autorizacao e ownership sao checados em service/guard, nao dependem exclusivamente de RLS.
- Migrations sao contratos locais e algumas foram adicionadas depois do schema inicial.
- Frontend usa SvelteKit SSR para auth e `PUBLIC_BACKEND_URL` para API NestJS.

## Technical Risks

1. `create table if not exists` mascara divergencia de schema se `0001` ja criou uma tabela antiga.
2. A funcao RPC `aprovar_inscricao_com_vaga` depende de colunas atuais de `oportunidades` e `inscricoes`; schema antigo quebra o fluxo.
3. Corrigir lockfiles com `npm audit fix` pode atualizar dependencias em cascata; deve ser verificado com build/check/test.
4. Warnings de `any` em services podem esconder erro real de shape Supabase, mas corrigir tudo com tipos rigidos pode ser maior que a fase. Priorizar casts localizados e helpers de row mapping.

## Recommended Approach

- Criar uma migration corretiva idempotente ou consolidar `0001` se o projeto ainda puder resetar o banco academico.
- Preferir um seed SQL seguro e documentado para ambiente de validacao.
- Rodar `npm audit fix` separadamente em backend e frontend, revisar lockfiles e executar verificacao completa.
- Resolver warnings de lint com tipos locais pequenos, sem introduzir camada ORM.
