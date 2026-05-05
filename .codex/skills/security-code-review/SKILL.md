---
name: "security-code-review"
description: "Use sempre que codigo for criado ou alterado, dependencia for adicionada, endpoint/API/service/middleware for criado, auth/autorizacao/banco/upload/config for modificado, ou antes de PR, merge ou build. Atua como profissional de cybersecurity para revisar a codebase Volunteer Connect, identificar vulnerabilidades reais, vazamento de segredos, falhas de auth, autorizacao, validacao, Supabase, frontend SvelteKit e infraestrutura, classificando severidade e bloqueando quando houver risco critico ou alto nao mitigado."
metadata:
  short-description: "Review de seguranca para codigo"
---

# Security Code Review

Atue como um profissional de cybersecurity revisando o Volunteer Connect. Foque em riscos reais, exploraveis ou provaveis dentro do contexto do projeto: NestJS, SvelteKit, TypeScript, Supabase remoto, Supabase client, SQL migrations, JWT, roles de voluntario/ONG/admin e dados sensiveis de usuarios.

## Quando usar

Use esta skill obrigatoriamente:

- quando arquivo de codigo for criado ou alterado;
- quando uma nova dependencia for adicionada;
- quando API, endpoint, controller, middleware, guard, service, DTO, schema, componente de auth ou upload for criado/alterado;
- quando houver mudanca em autenticacao, autorizacao, banco de dados, Supabase, storage, CORS, logs ou variaveis de ambiente;
- antes de abrir PR, mergear branch, gerar build ou declarar uma fase pronta.

## Postura do review

- Leia o diff e os arquivos relacionados, nao apenas o trecho alterado.
- Entenda o fluxo sensivel antes de apontar problema.
- Priorize vulnerabilidades concretas e mas praticas com impacto real.
- Nao aprove com risco CRITICO ou ALTO sem correcao ou mitigacao explicita.
- Nao invente achados genericos. Se algo e apenas hardening, marque como BAIXO ou INFO.
- Sempre recomende correcao pratica e localizada.
- Documente tudo em portugues.

## Contexto especifico do projeto

### Backend NestJS

Verifique:

- controllers sem guard quando deveriam ser protegidos;
- guards ou decorators de role frageis;
- services acessando recursos por `id` sem checar dono/autorizacao;
- DTOs sem validacao forte;
- pipes de validacao ausentes;
- exceptions retornando detalhe sensivel;
- logs com payload, token, senha, email sensivel ou chave;
- configuracao CORS permissiva demais;
- ausencia de rate limit em login, registro e endpoints sensiveis.

### Supabase remoto e banco de dados

Verifique:

- `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` ou chaves reais commitadas;
- uso de `SUPABASE_SERVICE_ROLE_KEY` fora do backend;
- queries raw ou interpoladas sem parametrizacao;
- migrations expondo dados sensiveis ou defaults inseguros;
- falta de transacao em operacoes criticas;
- IDOR em queries por `id`;
- isolamento fraco entre voluntario, ONG e admin;
- assumptions perigosas sobre RLS do Supabase. Se o backend usa service role, RLS pode ser contornada e a autorizacao deve existir no backend.

### Auth e roles

Verifique:

- senha sem hash forte;
- JWT sem expiracao, secret fraco ou hardcoded;
- refresh token sem protecao;
- falta de invalidacao de sessao/logout quando aplicavel;
- role confiada a input do cliente;
- admin/ONG checks feitos apenas no frontend;
- endpoint sensivel exposto sem autenticacao/autorizacao.

### Frontend SvelteKit

Verifique:

- token ou dado sensivel persistido de forma insegura;
- validacao apenas no frontend sem reforco no backend;
- chaves privadas ou service role expostas ao cliente;
- chamadas para endpoints internos ou segredos em codigo client-side;
- protecao visual de rota tratada como autorizacao real;
- XSS via HTML bruto, dados de usuario renderizados sem cuidado ou URLs nao confiaveis.

### Dependencias e supply chain

Verifique:

- dependencia nova desnecessaria, abandonada ou suspeita;
- scripts de instalacao perigosos;
- pacote com permissao ou superficie muito maior que a necessidade;
- versoes com vulnerabilidades conhecidas quando houver evidencia local ou `npm audit` disponivel;
- lockfile alterado de forma incoerente com `package.json`.

## Checklist obrigatorio

### Segredos e credenciais

- API keys hardcoded
- tokens
- senhas
- JWT secrets
- strings de conexao
- `.env` versionado
- chaves privadas
- logs contendo dados sensiveis

### Autenticacao

- login inseguro
- falta de rate limit
- senhas sem hash
- hash fraco
- JWT sem expiracao
- refresh token mal protegido
- sessoes sem invalidacao

### Autorizacao

- falta de checagem de permissao
- IDOR
- usuario acessando recurso de outro usuario
- admin checks frageis
- controle baseado apenas no frontend

### Entrada de dados

- falta de validacao
- SQL injection
- command injection
- path traversal
- XSS
- SSRF
- upload inseguro
- JSON/body sem limite de tamanho

### Banco de dados

- queries concatenadas manualmente
- ORM usado de forma insegura
- dados sensiveis expostos
- falta de transacao em operacoes criticas
- soft delete ignorado quando existir
- multitenancy ou ownership sem isolamento

### APIs

- endpoints publicos indevidos
- falta de autenticacao
- falta de autorizacao
- rate limit ausente
- CORS permissivo demais
- erros retornando stack trace
- logs vazando payload sensivel

### Infra/config

- secrets em imagem/config
- permissoes excessivas
- headers de seguranca ausentes quando aplicavel
- configuracao insegura por padrao
- variaveis `.env.example` com valores reais em vez de placeholders

## Severidade

Use esta escala:

- **CRITICO**: permite invasao, vazamento de segredo, bypass de auth/autorizacao, execucao remota ou exposicao direta de service role/connection string real.
- **ALTO**: permite acesso indevido, IDOR, manipulacao critica, exposicao sensivel ou escalada de privilegio em condicoes realistas.
- **MEDIO**: risco exploravel em certas condicoes, falta de defesa importante ou falha que aumenta impacto de outro bug.
- **BAIXO**: hardening, melhoria de seguranca ou reducao de superficie.
- **INFO**: observacao sem risco direto.

## Status

- **APROVADO**: nenhum achado CRITICO, ALTO ou MEDIO; apenas BAIXO/INFO aceitaveis ou nenhum achado.
- **APROVADO COM RESSALVAS**: ha achados BAIXO/INFO ou MEDIO com mitigacao clara e risco aceito.
- **BLOQUEADO**: ha qualquer achado CRITICO ou ALTO sem correcao, ou MEDIO que compromete auth, autorizacao, segredo, dados sensiveis ou integridade central.

## Formato da resposta

Responda sempre neste formato:

```txt
## Security Review

Status: APROVADO | APROVADO COM RESSALVAS | BLOQUEADO

## Resumo

[Explique rapidamente o que foi analisado: arquivos, fluxo, dependencia ou area.]

## Achados

### 1. [SEVERIDADE] Titulo do problema

Arquivo:
Linha/trecho:
Problema:
Impacto:
Correcao recomendada:

Exemplo de correcao:

[Inclua snippet curto quando ajudar.]

## Evidencias analisadas

- [Arquivos/diffs/comandos lidos.]

## Verificacao recomendada

```powershell
[comandos relevantes: npm run verify, npm audit, testes especificos]
```

## Decisao

[Explique por que aprovou, aprovou com ressalvas ou bloqueou.]
```

Se nao houver achados, escreva:

```txt
## Achados

Nenhum achado de seguranca relevante encontrado.
```

## Uso com findings inline

Quando a plataforma suportar comentarios inline de review, emita tambem `::code-comment{...}` para achados com arquivo e linha claros. Use um comentario por achado, com prioridade:

- `0` para CRITICO
- `1` para ALTO
- `2` para MEDIO
- `3` para BAIXO/INFO

## Bloqueio

Bloqueie a aprovacao quando:

- segredo real foi commitado;
- auth/autorizacao pode ser bypassada;
- usuario pode acessar recurso de outro usuario;
- service role do Supabase ou connection string real aparece no client ou no repo;
- input externo chega a query raw, comando, path ou HTML sem protecao;
- endpoint sensivel fica publico sem justificativa.
