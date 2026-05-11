# Phase 4: NGO Profiles - Discussion Log

**Date:** 2026-05-07
**Mode:** Discussao em portugues antes de implementar

## Resumo

A fase 4 discutiu o ciclo do perfil de ONG depois do cadastro: analise por admin, motivo de reprovacao, rastreabilidade, reenvio, bloqueio de alteracoes apos aprovacao, visibilidade publica e suspensao. A conversa consolidou que o marketplace e publico, mas interacoes dependem de papel/status.

## Decisoes capturadas

### Aprovacao/reprovacao

- Somente admin pode aprovar ou reprovar ONG.
- Admin revisa CNPJ, razao social e logo.
- ONG nasce como pendente.
- ONG aprovada pode acessar dashboard e publicar oportunidades.
- ONG reprovada pode corrigir e reenviar, se nao estiver suspensa.

### Motivo e rastreabilidade

- Reprovacao exige motivo obrigatorio.
- Motivo de reprovacao aceita ate 2.000 caracteres.
- Registrar admin responsavel pela analise.
- Registrar data da analise.
- Registrar data de reenvio.

### Edicao

- ONG aprovada nao pode editar CNPJ, razao social ou logo pelo sistema.
- Alteracao futura dependeria de suporte/admin, fora do MVP.
- ONG reprovada pode corrigir e reenviar.
- ONG suspensa nao pode editar nem reenviar.

### Publicidade dos dados

- CPF nao aparece publicamente.
- CNPJ nao aparece publicamente.
- Perfil publico de ONG mostra logo, razao social, indicador de aprovada/verificada e oportunidades publicadas.
- ONG pendente, reprovada ou suspensa nao aparece publicamente.

### Marketplace e papeis

- Marketplace e visivel para guests.
- Guest nao pode interagir.
- ONG pendente/reprovada navega como guest, mesmo autenticada.
- ONG aprovada nao interage como voluntario.
- Conta ONG publica/gerencia; conta voluntario interage/se inscreve.

### Exclusao

- ONG nao exclui proprio perfil no MVP.
- Suspensao via `usuarios.conta_suspensa` substitui delete no fluxo inicial.
- Dados sao preservados para auditoria.

## Ideias adiadas

- Suporte para alterar dados de ONG aprovada.
- Historico completo de analises em tabela propria.
- Exclusao fisica.
- Multiplos gestores por ONG.

## Proximo passo sugerido

Seguir para `$gsd-plan-phase 4` quando quiser planejar a fase, ou continuar com `$gsd-discuss-phase 5` para discutir oportunidades antes de implementar.
