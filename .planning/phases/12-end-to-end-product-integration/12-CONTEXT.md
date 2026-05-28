---
phase: "12"
name: "End-To-End Product Integration"
status: "ready-for-planning"
created: "2026-05-27"
source: "Review tecnico local apos fases 1-10"
---

# Phase 12: End-To-End Product Integration - Context

## Phase Boundary

Esta fase transforma as telas protegidas em fluxos reais. Ela depende da fase 11 para schema e CI estaveis.

Inclui:

- candidatura real de voluntario;
- listagem/status real de inscricoes e presencas;
- CRUD/gestao real de oportunidades da ONG;
- avaliacao real de inscricoes pela ONG;
- registro real de presencas;
- analise real de ONGs por admin;
- redirects e blocked states por sessao, papel, status de ONG e conta suspensa.

Nao inclui E2E completo nem suite ampla de testes; isso fica na Fase 13, embora cada tarefa tenha verificacao local.

## UX Direction

Aplicar a skill `volunteer-connect-design` se houver alteracao visual relevante:

- discovery publica com base Airbnb, cards claros e foco em oportunidade;
- areas logadas com estilo operacional inspirado em Notion/Cal.com;
- nada de dados demo em telas protegidas quando API real falhar: mostrar erro/estado vazio acionavel.

## Security Constraints

- Frontend guards sao UX e reducao de exposicao; autorizacao real permanece no backend.
- Nunca expor CPF/CNPJ em telas publicas.
- Tokens devem continuar em cookies/Supabase SSR, sem `localStorage`.
- Service role nunca deve aparecer no frontend.
