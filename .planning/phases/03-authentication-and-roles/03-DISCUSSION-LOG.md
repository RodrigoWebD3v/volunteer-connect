# Phase 3: Authentication And Roles - Discussion Log

**Date:** 2026-05-07
**Mode:** Conversa em portugues, planejamento antes de implementar

## Resumo

A fase 3 foi discutida com foco em cadastro, login, sessao, papeis, Supabase Auth, RLS inicial, confirmacao de email, recuperacao de senha e guardrails de seguranca. A decisao mais importante foi trocar a ideia inicial de JWT proprio/Argon2id para Supabase Auth como motor de autenticacao. Com isso, a tabela `usuarios` deixa de armazenar `senha_hash`.

## Decisoes capturadas

### Cadastro

- Cadastro por tipo de conta: voluntario ou ONG.
- Admin nao aparece no cadastro publico.
- Voluntario cria conta e perfil no mesmo fluxo.
- ONG cria conta e perfil no mesmo fluxo, com `status_analise = pendente`.
- CPF e CNPJ devem ser `varchar`, conter somente numeros e ser validados.
- Email deve ser unico e normalizado em lowercase.

### Supabase Auth

- Supabase Auth sera usado para autenticacao.
- Nao havera JWT proprio emitido pelo NestJS.
- Nao havera `senha_hash` proprio em `usuarios`.
- `usuarios.id` deve ser igual a `auth.users.id`.
- Confirmacao de email sera obrigatoria.
- Recuperacao de senha usara Supabase Auth com telas proprias.

### Sessao

- Usar `@supabase/ssr` no SvelteKit.
- Sessao gerenciada por cookies via Supabase.
- Nao usar `localStorage`.
- Nao implementar refresh token manual.
- Logout usa `supabase.auth.signOut()`.

### Backend como camada de escrita

- Escritas de dominio e Storage passam pelo backend NestJS.
- Frontend nao escreve diretamente em tabelas de dominio nem no Storage.
- Excecao apenas para autenticacao/sessao conforme fluxo oficial do Supabase.
- Logo de ONG vai do frontend para backend, e do backend para Supabase Storage.

### Roles e acesso

- `usuarios.papel` e a fonte de verdade: `voluntario`, `ong`, `admin`.
- Voluntario acessa marketplace, detalhes e inscricoes.
- ONG pendente/reprovada tem acesso limitado.
- Apenas ONG aprovada cria/edita oportunidades.
- Admin aprova/reprova ONG e suspende/desuspende contas.
- Conta suspensa bloqueia qualquer papel.

### RLS

- Usar RLS como defesa no banco.
- Comecar por `usuarios`.
- Usuario le apenas a propria linha.
- Admin tem permissao administrativa via helper SQL planejado.
- RLS nao substitui validacoes do backend.

### Segurança

- Rate limit em login, cadastro e recuperacao.
- Mensagem generica para login invalido: `Email ou senha inválidos.`
- Conta suspensa recebe mensagem propria.
- Logs nao devem registrar segredos ou dados sensiveis.

## Ideias adiadas

- JWT proprio do NestJS.
- Argon2id proprio para senha, pois Supabase Auth gerencia senha/hash.
- RLS completo em todas as tabelas no primeiro passo.
- Refresh token manual.
- UI pronta do Supabase.

## Proximo passo sugerido

Planejar a Fase 3 com base neste contexto ou continuar a discussao da Fase 4: NGO Profiles.
