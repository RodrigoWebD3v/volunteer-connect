# Phase 6: Applications - Discussion Log

**Date:** 2026-05-07
**Mode:** Discussao em portugues antes de implementar

## Resumo

A fase 6 definiu o fluxo de inscricoes: voluntario se inscreve em oportunidade, ONG gerencia inscricoes das proprias oportunidades, status seguem um conjunto simples e vagas sao consumidas apenas por inscricoes aprovadas.

## Decisoes capturadas

### Campos

- Campos confirmados:
  - `oportunidade_id`
  - `voluntario_usuario_id`
  - `status`
  - `mensagem`
  - `criado_em`
  - `atualizado_em`
- `mensagem` e opcional.

### Status

- Status confirmados:
  - `pendente`
  - `aprovada`
  - `reprovada`
  - `cancelada`

### Cancelamento

- Voluntario pode cancelar enquanto a inscricao estiver pendente.
- Cancelamento de inscricao aprovada fica fora do MVP.

### Resposta da ONG

- ONG aprova/reprova.
- ONG pode adicionar observacao opcional.
- Motivo obrigatorio de reprovacao nao entra no MVP.

### Vagas

- Apenas inscricao aprovada consome vaga.
- Pendente nao consome vaga.

### Contato

- Sem chat no MVP.
- Mostrar orientacao de que a ONG entrara em contato pelos dados informados no cadastro.

### Visibilidade

- Voluntario ve proprias inscricoes.
- ONG ve inscricoes das proprias oportunidades.
- Guest nao ve inscricoes.
- Admin pode auditar no futuro.

## Ideias adiadas

- Chat em tempo real.
- Notificacoes avancadas.
- Cancelamento de inscricao aprovada.
- Motivo obrigatorio na reprovacao.
- Area admin completa para auditoria.

## Proximo passo sugerido

Seguir para `$gsd-plan-phase 6` quando quiser transformar a discussao em plano, ou continuar com `$gsd-discuss-phase 7` para eventos e participacao.
