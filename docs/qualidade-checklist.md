# Checklist de Qualidade (Backend e Frontend)

Este documento define um checklist objetivo para validar qualidade técnica local antes de abrir PR.

## Objetivo

Garantir que backend e frontend estejam com:

- lint consistente;
- formatação consistente;
- build/check de tipos sem erros;
- testes mínimos passando.

## Comandos por aplicação

### Backend (NestJS)

```bash
npm --prefix backend run lint:check
npm --prefix backend run format:check
npm --prefix backend run build
npm --prefix backend test
```

### Frontend (SvelteKit)

```bash
npm --prefix frontend run lint
npm --prefix frontend run format:check
npm --prefix frontend run check
npm --prefix frontend test
```

## Comando consolidado no monorepo

```bash
npm run verify
```

## Critério de aceite

Uma entrega está apta para PR quando:

1. `npm run verify` conclui sem falhas.
2. Não há arquivos sensíveis versionados (`.env`, chaves, tokens).
3. Mudanças de documentação refletem o comportamento real do projeto.

## Diagnóstico rápido

- Falha de lint:
  - rode `npm run lint` na raiz para aplicar correções automáticas quando disponíveis.
- Falha de formatação:
  - rode `npm run format` na raiz.
- Falha de build/check:
  - valide primeiro variáveis de ambiente e versões de Node/npm.
- Falha de teste:
  - execute os testes por aplicação para isolar o problema.
