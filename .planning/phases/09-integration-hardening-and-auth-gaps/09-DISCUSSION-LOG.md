# Phase 9: Integration Hardening And Auth Gaps - Discussion Log

**Date:** 2026-05-25
**Mode:** Planejamento solicitado diretamente pelo usuario

## Resumo

A fase 9 foi criada porque, apos planejar/executar fases 3 a 8, ainda existem lacunas importantes nas issues do GitHub: cadastro completo, upload seguro da logo de ONG, recuperacao/redefinicao de senha, redirects por papel/status, guards genericos, integracao real das telas com APIs e testes de regras criticas.

## Decisoes

- A fase 9 e uma fase de hardening e integracao, nao uma nova feature de negocio.
- O foco e transformar scaffolds e contratos em fluxos integrados e testados.
- Issues abertas de auth, ONG, oportunidades e inscricoes devem ser tratadas como entrada principal.
- Segurança e autorizacao sao bloqueantes: IDOR, role bypass, service role exposta e vazamento de CPF/CNPJ impedem conclusao.
- Tudo permanece em portugues e seguindo a identidade visual do Volunteer Connect.

## Proximo passo

Executar `$gsd-execute-phase 9` apos revisar o plano e confirmar que as issues do GitHub foram criadas.
