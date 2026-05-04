# Volunteer Connect

Volunteer Connect é uma plataforma para conectar organizações, oportunidades de voluntariado e pessoas voluntárias.

Esta fase do projeto entrega apenas a fundação local: backend NestJS, frontend SvelteKit, scripts npm de qualidade e infraestrutura local com PostgreSQL via Docker Compose. A modelagem do banco, Prisma, autenticação e fluxos de produto começam na Fase 2.

## Pré-requisitos

- Node.js 20+
- npm 10+
- Docker com Docker Compose, para a infraestrutura local

## Instalação

Instale as dependências do projeto raiz, backend e frontend:

```powershell
npm install
npm --prefix backend install
npm --prefix frontend install
```

## Ambiente local

Crie o arquivo `.env` a partir do exemplo:

```powershell
Copy-Item .env.example .env
```

Os valores padrão de desenvolvimento usam:

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`
- PostgreSQL: `localhost:5432`

## Docker

Valide a configuração:

```powershell
npm run docker:config
```

Suba o PostgreSQL local:

```powershell
npm run docker:up
```

Pare os serviços:

```powershell
npm run docker:down
```

O Compose desta fase cria apenas a infraestrutura local. Schema, migrations e dados iniciais serão tratados na Fase 2.

## Desenvolvimento

Rodar backend e frontend juntos:

```powershell
npm run dev
```

Rodar apenas o backend:

```powershell
npm run dev:backend
```

Rodar apenas o frontend:

```powershell
npm run dev:frontend
```

## Qualidade

Antes de commitar, rode a verificação completa:

```powershell
npm run verify
```

Comandos individuais:

```powershell
npm run lint
npm run format
npm run check
npm test
```

O backend e o frontend também continuam executáveis de forma independente com `npm --prefix backend ...` e `npm --prefix frontend ...`.
