# Phase 7: Events And Participation - Discussion Log

**Date:** 2026-05-07
**Mode:** Discussao em portugues antes de implementar

## Resumo

A fase 7 foi simplificada. Em vez de criar eventos/subeventos dentro de uma oportunidade, a oportunidade sera tratada como a atividade principal. A fase deve registrar presenca e historico depois que voluntarios tiverem inscricoes aprovadas.

## Duvida esclarecida

O termo `participacao` gerou confusao. Foi explicado que ele significaria registrar se o voluntario compareceu depois de ser aprovado em uma oportunidade. Para melhorar clareza, o sistema deve usar o termo `presenca`.

## Decisoes capturadas

### Oportunidade como atividade principal

- A oportunidade ja e a postagem/atividade principal.
- Nao criar entidade separada de evento dentro da oportunidade no MVP.
- A ONG usa o conteudo da oportunidade para explicar a atividade.
- A Fase 7 nao altera o modelo de postagem da oportunidade.

### Elegibilidade

- Presenca so pode ser registrada para voluntarios com inscricao `aprovada`.
- ONG so registra presenca em oportunidades proprias.
- Conta suspensa nao deve conseguir executar novas acoes, mas historico existente deve ser preservado.

### Confirmacao

- Apenas a ONG confirma presenca.
- Voluntario nao confirma a propria presenca no MVP.
- A marcacao de presenca acontece depois da oportunidade concluida.

### Status

- Status confirmados:
  - `presente`
  - `ausente`
  - `cancelada`

### Historico

- Voluntario ve apenas o proprio historico.
- Voluntario ve somente oportunidades concluidas.
- ONG ve historico/engajamento das proprias oportunidades.
- Publico/guest nao ve historico de presenca.

### Suspensao

- Se a ONG for suspensa, dados devem ser preservados para auditoria.
- Historico de ONG suspensa nao deve ser exposto publicamente.

### Imagens

- O usuario comentou que oportunidades poderiam ter texto e imagens.
- Isso conflita com a decisao anterior da Fase 5, que removeu imagem propria da oportunidade no MVP.
- Foi decidido nao mexer nisso na Fase 7 e deixar como revisao futura/separada.

## Ideias adiadas

- Subeventos dentro de oportunidade.
- Agenda detalhada com varias datas.
- Confirmacao de presenca pelo voluntario.
- Certificados ou comprovantes.
- Horas voluntarias.
- Imagens proprias de oportunidade.
- Dashboard admin completo de auditoria.

## Proximo passo sugerido

Seguir para `$gsd-plan-phase 7` quando quiser transformar a discussao em plano.
