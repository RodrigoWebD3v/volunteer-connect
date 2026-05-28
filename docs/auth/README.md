# Autenticacao e Supabase

Este documento registra a configuracao inicial de autenticacao do Volunteer Connect.

## Decisao principal

O projeto usa Supabase Auth para cadastro, login, recuperacao de senha, sessao e logout. No MVP academico local, novos cadastros sao criados com email ja confirmado para evitar dependencia de entrega de emails. O backend NestJS nao emite JWT proprio e nao armazena `senha_hash` na tabela `usuarios`.

## Identidade e dominio

- `auth.users.id` e a identidade real do usuario no Supabase.
- `usuarios.id` deve ser igual ao UUID de `auth.users.id`.
- `usuarios.papel` e a fonte de verdade para autorizacao de dominio.
- `user_metadata` nao deve ser usado para autorizacao sensivel.

## Frontend

O frontend SvelteKit usa `@supabase/ssr` para gerenciar sessao com cookies. Tokens nao devem ser gravados em `localStorage`.

Variaveis publicas esperadas:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_AUTH_CONFIRMATION_REDIRECT_URL`
- `PUBLIC_AUTH_PASSWORD_RESET_REDIRECT_URL`

Somente variaveis com prefixo `PUBLIC_` podem ser expostas ao frontend.

## Backend

O backend NestJS centraliza escritas de dominio e upload de arquivos. A `SUPABASE_SERVICE_ROLE_KEY` deve existir apenas no backend e nunca deve aparecer em codigo client-side, logs, documentos com valores reais ou testes.

Variaveis server-side esperadas:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_LOGOS_BUCKET`

## Storage

Logos de ONGs serao armazenadas no Supabase Storage em bucket publico. O frontend envia o arquivo ao backend, e o backend valida tipo, tamanho e caminho antes de enviar ao Supabase.

## RLS

A migration local `supabase/migrations/0002_auth_rls_usuarios.sql` propoe RLS inicial para `usuarios`. Ela nao deve ser executada no Supabase remoto sem revisao e autorizacao explicita.

O helper `usuario_atual_e_admin()` deve ficar no schema `private`, com permissao minima para usuarios autenticados executarem a funcao dentro das policies.

RLS e defesa em profundidade. Como o backend pode usar service role, toda regra sensivel tambem precisa ser validada no NestJS.
