---
phase: "11"
name: "Schema, CI, And Foundation Stabilization"
status: "ready-for-planning"
created: "2026-05-27"
source: "Review tecnico local apos fases 1-10"
---

# Phase 11: Schema, CI, And Foundation Stabilization - Context

## Phase Boundary

Esta fase estabiliza a base antes de novas funcionalidades. O foco e corrigir inconsistencias estruturais encontradas no review:

- migrations Supabase divergentes do contrato usado pelo backend;
- CI/lint/check/test ainda sensiveis a erros simples;
- warnings de tipagem Supabase no backend;
- vulnerabilidades moderadas de dependencias;
- documentacao de ambiente e seed ainda insuficiente para validacao remota.

Nao pertence a esta fase integrar todas as telas de produto. Isso fica na Fase 12.

## Locked Decisions

- O banco alvo continua sendo Supabase remoto com migrations SQL versionadas.
- O backend pode usar service role, mas autorizacao de dominio continua obrigatoria no NestJS.
- Dados de seed devem ser demonstrativos e nao podem conter CPF/CNPJ real.
- Esta fase deve terminar com `npm run ci` passando.
- Qualquer risco de audit moderado ou maior precisa ser corrigido ou documentado com justificativa explicita.

## Relevant Review Findings

- `supabase/migrations/0001_modelo_inicial.sql` cria tabelas com colunas antigas que conflitam com `0003_oportunidades.sql` e com services NestJS.
- `frontend` ja foi parcialmente corrigido, mas a validacao raiz deve ser reexecutada apos consolidacao.
- `backend/src/inscricoes`, `oportunidades` e `presencas` mantem warnings `no-unsafe-argument`.
- `npm audit` encontrou vulnerabilidades moderadas em dependencias backend/frontend.

## Success Definition

Um desenvolvedor deve conseguir configurar ambiente limpo, aplicar migrations revisadas, carregar seed seguro, rodar checks, e ter uma base confiavel para integrar as telas reais na fase seguinte.
