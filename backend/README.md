# Backend - Volunteer Connect

Backend da plataforma Volunteer Connect, criado com NestJS, TypeScript e npm.

## Requisitos

- Node.js 20+
- npm 10+

## Instalação

```bash
npm install
```

## Execução

```bash
# modo desenvolvimento
npm run start:dev

# execução simples
npm run start

# produção local após build
npm run start:prod
```

Por padrão, o NestJS inicia na porta `3000`.

## Qualidade

```bash
npm run lint
npm run format
npm run build
npm run test
```

## Observações de escopo

Esta fase cria apenas a fundação do backend. Autenticação, Prisma, modelagem do banco e módulos de domínio entram nas próximas fases do GSD.
