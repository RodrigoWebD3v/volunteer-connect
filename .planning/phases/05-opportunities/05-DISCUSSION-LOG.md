# Phase 5: Opportunities - Discussion Log

**Date:** 2026-05-07
**Mode:** Discussao em portugues antes de implementar

## Resumo

A fase 5 discutiu o comportamento central das oportunidades no marketplace: campos obrigatorios, uso da logo da ONG, filtros, status, encerramento automatico, visibilidade para guests e suspensao de publicacoes quando a ONG for suspensa.

## Decisoes capturadas

### Campos

- Campos obrigatorios confirmados:
  - `titulo`
  - `descricao`
  - `tipo_atividade`
  - `cidade`
  - `estado`
  - `data_inicio`
  - `data_fim`
  - `prazo_inscricao`
  - `quantidade_vagas`
- Se for necessario, novos campos podem ser adicionados depois.

### Imagem

- Oportunidade nao tera imagem propria no MVP.
- Cards usam a logo da ONG.

### Inscricao

- Voluntario pode se inscrever ate o prazo e enquanto houver vaga.
- Guest visualiza, mas ao tentar se inscrever vai para login/cadastro.
- Implementacao completa de inscricao fica para Fase 6.

### Filtros

- Marketplace deve ter busca por texto.
- Filtros por cidade/estado, tipo de atividade e data.

### Status

- Status confirmados:
  - `rascunho`
  - `publicada`
  - `encerrada`
  - `cancelada`
- Encerradas aparecem como historico separado.

### Encerramento

- Encerramento automatico pelo sistema.
- Se a ONG precisar da oportunidade de novo, publica uma nova.

### Suspensao

- Publicacoes de ONGs suspensas ficam suspensas tambem.
- Nao podem ser visualizadas por ninguem no marketplace.
- Continuam existindo para auditoria.

## Ideias adiadas

- Imagem propria de oportunidade.
- Reabrir oportunidade encerrada.
- Publicacao por pessoa fisica.
- Ranking/reputacao detalhada.
- Recomendacoes automaticas.

## Proximo passo sugerido

Seguir para `$gsd-plan-phase 5` quando quiser transformar a discussao em plano, ou continuar com `$gsd-discuss-phase 6` para discutir inscricoes.
