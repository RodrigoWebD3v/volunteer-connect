# Phase 3: Authentication And Roles - Context

**Gathered:** 2026-05-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Definir o fluxo de autenticacao, cadastro, sessao, logout, recuperacao de senha, confirmacao de email, papeis de usuario e protecao inicial por RLS para o Volunteer Connect. Esta fase deve ser planejada/documentada antes de qualquer implementacao real. A autenticacao sera baseada em Supabase Auth, com backend NestJS centralizando regras de dominio, validacoes e escritas em banco/storage.

</domain>

<decisions>
## Implementation Decisions

### Arquitetura de autenticacao

- **D-01:** Usar Supabase Auth como motor de autenticacao, sessao, confirmacao de email, recuperacao de senha e logout.
- **D-02:** Nao emitir JWT proprio pelo NestJS.
- **D-03:** Nao armazenar `senha_hash` na tabela `usuarios`; senhas e hashes ficam sob responsabilidade do Supabase Auth.
- **D-04:** `auth.users.id` deve ser a identidade real do usuario.
- **D-05:** `usuarios.id` deve ser igual ao UUID de `auth.users.id`.
- **D-06:** `usuarios.papel` sera a fonte de verdade para autorizacao de dominio.
- **D-07:** Nao usar `user_metadata` para autorizacao sensivel.

### Sessao no SvelteKit

- **D-08:** Usar `@supabase/ssr` no SvelteKit para gerenciamento de sessao via cookies.
- **D-09:** Nao usar `localStorage` para token.
- **D-10:** Nao implementar refresh token manualmente; usar o gerenciamento de sessao do Supabase.
- **D-11:** Usar `supabase.auth.getUser()` em contexto server-side para decisoes sensiveis.
- **D-12:** Logout deve usar `supabase.auth.signOut()`.
- **D-13:** Quando a sessao expirar, redirecionar para login com mensagem: `Sua sessão expirou. Faça login novamente.`

### Cadastro por tipo de conta

- **D-14:** O cadastro publico deve comecar pela escolha do tipo de conta: `voluntario` ou `ong`.
- **D-15:** `admin` nao aparece no cadastro publico.
- **D-16:** Voluntario cria conta e `perfis_voluntarios` no mesmo fluxo.
- **D-17:** ONG cria conta e `perfis_ongs` no mesmo fluxo.
- **D-18:** ONG nasce com `status_analise = pendente`.
- **D-19:** Voluntario entra logado apos cadastro, respeitando confirmacao de email.
- **D-20:** ONG entra logada apos cadastro, mas e direcionada para tela de perfil em analise.

### Campos de cadastro

- **D-21:** Cadastro de voluntario pede `email`, `senha`, `confirmar_senha`, `cpf`, `nome_completo`, `telefone`, `cidade` e `estado`.
- **D-22:** Cadastro de ONG pede `email`, `senha`, `confirmar_senha`, `cnpj`, `razao_social` e `logo`.
- **D-23:** `usuarios.email` deve ser unico e normalizado em lowercase.
- **D-24:** `cpf` deve ser `varchar`, conter apenas numeros e ser validado com biblioteca JavaScript.
- **D-25:** `cnpj` deve ser `varchar`, conter apenas numeros e ser validado com biblioteca JavaScript.
- **D-26:** Frontend pede `senha` e `confirmar_senha`; backend valida a senha e nunca persiste senha pura.
- **D-27:** Senha deve ter no minimo 8 caracteres, pelo menos 1 letra e pelo menos 1 numero.

### Logo da ONG

- **D-28:** Logo de ONG e obrigatoria no cadastro de ONG.
- **D-29:** Formatos aceitos: `png`, `jpg` e `webp`.
- **D-30:** Tamanho maximo da logo: 2 MB.
- **D-31:** Frontend envia a logo para o backend.
- **D-32:** Backend valida e envia a logo para o Supabase Storage.
- **D-33:** Frontend nao deve escrever diretamente no Supabase Storage.
- **D-34:** O banco guarda `logo_storage_path`.

### Escritas de dominio pelo backend

- **D-35:** Escritas de dominio e armazenamento devem passar pelo backend NestJS.
- **D-36:** Frontend nao deve fazer insert/update direto em tabelas de dominio.
- **D-37:** Excecao: fluxos de autenticacao/sessao podem usar o Supabase Auth conforme a integracao oficial exigir.
- **D-38:** `SUPABASE_SERVICE_ROLE_KEY` so pode existir no backend e nunca deve ser exposta ao frontend.
- **D-39:** O metodo exato da API Supabase para criar usuario e disparar confirmacao de email sera pesquisado na implementacao com base na documentacao oficial.

### Confirmacao de email e recuperacao de senha

- **D-40:** Confirmacao de email sera obrigatoria.
- **D-41:** Apos cadastro, mostrar: `Cadastro realizado. Verifique seu email para confirmar sua conta.`
- **D-42:** Se tentar acessar sem confirmar email, mostrar: `Confirme seu email antes de acessar o sistema.`
- **D-43:** Recuperacao de senha usara Supabase Auth.
- **D-44:** O projeto tera telas proprias para recuperacao/redefinicao de senha, usando apenas a logica do Supabase por tras.

### Telas da fase 3

- **D-45:** Planejar telas proprias para:
  - `/login`
  - `/cadastro`
  - `/cadastro/voluntario`
  - `/cadastro/ong`
  - `/auth/confirmacao-email`
  - `/auth/esqueci-senha`
  - `/auth/redefinir-senha`
  - `/auth/sessao-expirada`
  - `/ong/analise-pendente`
  - `/ong/analise-reprovada`
- **D-46:** Telas seguem a identidade visual do Volunteer Connect: base Airbnb para fluxos publicos/cadastro e influencia Notion/Cal.com para estados operacionais.

### Pos-login

- **D-47:** Login usa email e senha pelo Supabase Auth.
- **D-48:** Depois do login, o sistema consulta `usuarios`.
- **D-49:** Se `usuarios.conta_suspensa = true`, encerrar/limpar sessao e mostrar: `Sua conta está suspensa. Entre em contato com o suporte.`
- **D-50:** Suspensao vale para `voluntario`, `ong` e `admin`.
- **D-51:** `voluntario` autenticado vai para marketplace/lista de oportunidades.
- **D-52:** `ong` com `status_analise = pendente` vai para tela de analise pendente.
- **D-53:** `ong` com `status_analise = reprovado` vai para tela de correcao/reenviar analise.
- **D-54:** `ong` com `status_analise = aprovado` vai para dashboard da ONG.
- **D-55:** `admin` vai para area administrativa.

### Regras por papel

- **D-56:** `voluntario` pode acessar marketplace, ver oportunidades, se inscrever e ver as proprias inscricoes.
- **D-57:** `voluntario` nao pode publicar oportunidade, acessar dashboard de ONG ou acessar area admin.
- **D-58:** `ong` pode acessar status do proprio perfil.
- **D-59:** `ong` pendente so ve tela de analise.
- **D-60:** `ong` reprovada pode corrigir e reenviar perfil.
- **D-61:** Apenas `ong` aprovada pode criar/editar oportunidades.
- **D-62:** `ong` nao pode se inscrever como voluntaria.
- **D-63:** `admin` pode aprovar/reprovar ONG, suspender/desuspender contas e acessar area administrativa.
- **D-64:** `admin` nao aparece no cadastro publico.

### RLS inicial

- **D-65:** Usar Supabase Row Level Security como camada de defesa no banco.
- **D-66:** RLS inicial sera aplicado em `usuarios`.
- **D-67:** Usuario autenticado pode ler apenas a propria linha em `usuarios`.
- **D-68:** Usuario comum nao pode alterar `papel` nem `conta_suspensa`.
- **D-69:** Admin pode ler usuarios para moderacao e atualizar `conta_suspensa`.
- **D-70:** Para identificar admin em policies, planejar funcao helper SQL como `usuario_atual_e_admin()`.
- **D-71:** RLS nao substitui validacoes do backend; NestJS tambem deve validar roles e regras de negocio.

### Consistencia do cadastro

- **D-72:** Validar dados antes de criar registros.
- **D-73:** Evitar conta meio criada.
- **D-74:** Criar usuario no Supabase Auth e depois criar `usuarios` e perfil correspondente.
- **D-75:** Se falhar apos criar usuario Auth, tentar remover/invalidar o usuario criado quando possivel.
- **D-76:** Usuario autenticado sem linha em `usuarios` deve ser tratado como invalido.
- **D-77:** Nessa situacao, encerrar sessao e mostrar: `Não foi possível carregar os dados da sua conta. Tente novamente ou entre em contato com o suporte.`

### Rate limit e erros

- **D-78:** Login, cadastro e recuperacao de senha devem ter rate limit documentado como obrigatorio no backend.
- **D-79:** Mensagem de login invalido deve ser generica: `Email ou senha inválidos.`
- **D-80:** Nao informar se o email existe ou nao.
- **D-81:** Logs nunca devem registrar senha, token, hash, CPF, CNPJ completo ou payload sensivel.

### the agent's Discretion

- Escolher bibliotecas exatas de validacao de CPF/CNPJ durante pesquisa tecnica, desde que sejam mantidas e adequadas ao Node/TypeScript.
- Escolher a forma exata de configurar Supabase Auth Admin para cadastro com confirmacao de email obrigatoria.
- Escolher estrutura de services/controllers no NestJS conforme padroes do projeto.
- Escolher detalhes visuais finos das telas, respeitando a skill de design do Volunteer Connect.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Projeto e fases anteriores

- `.planning/PROJECT.md` — contexto do produto, restricoes e stack.
- `.planning/REQUIREMENTS.md` — requisitos AUTH-01..AUTH-06.
- `.planning/ROADMAP.md` — objetivo e criterios de sucesso da fase 3.
- `.planning/STATE.md` — estado atual do projeto.
- `.planning/phases/02-data-model-foundation/02-CONTEXT.md` — decisoes sobre `usuarios`, `perfis_voluntarios`, `perfis_ongs`, `conta_suspensa`, `status_analise`, Storage e papeis.

### Regras locais do projeto

- `AGENTS.md` — instrucoes do projeto, portugues por padrao, stack e skills locais.
- `.codex/skills/security-code-review/SKILL.md` — obrigatoria para auth, autorizacao, Supabase, banco, Storage e configuracao sensivel.
- `.codex/skills/volunteer-connect-design/SKILL.md` — direcao visual das telas publicas, cadastro e area logada.

### Documentacao oficial que deve guiar a implementacao

- `https://supabase.com/docs/guides/auth` — Supabase Auth.
- `https://supabase.com/docs/guides/auth/server-side` — autenticacao server-side/SSR.
- `https://supabase.com/docs/guides/auth/server-side/sveltekit` — integracao Supabase SSR com SvelteKit.
- `https://supabase.com/docs/guides/database/postgres/row-level-security` — RLS e policies.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `.env.example` ja documenta variaveis Supabase com placeholders.
- Backend NestJS e frontend SvelteKit existem como fundacao, mas ainda sem modulos de auth.
- Skills locais de seguranca e design ja existem e devem guiar a implementacao futura.

### Established Patterns

- Documentacao e termos de negocio devem ser em portugues.
- Estrutura do repo permanece simples: `backend` e `frontend`.
- Escritas sensiveis devem passar pelo backend.
- Supabase remoto e Supabase Auth serao usados em vez de auth propria.

### Integration Points

- Backend NestJS devera expor endpoints/servicos de cadastro por tipo de conta.
- SvelteKit devera integrar `@supabase/ssr` para sessao e rotas protegidas.
- Supabase Storage sera usado para logo de ONG via backend.
- RLS inicial sera documentado/aplicado na tabela `usuarios` quando a fase for implementada.

</code_context>

<specifics>
## Specific Ideas

- O usuario quer discutir e planejar todas as fases antes de implementar.
- O usuario confirmou Supabase Auth, `@supabase/ssr`, RLS inicial em `usuarios` e escritas de dominio passando pelo backend.
- O usuario quer confirmacao de email porque o Supabase ja oferece isso praticamente pronto.
- O usuario quer telas proprias do Volunteer Connect, usando a logica do Supabase por tras.

</specifics>

<deferred>
## Deferred Ideas

- Autenticacao propria com JWT emitido pelo NestJS.
- Hash proprio com Argon2id, porque Supabase Auth passa a gerenciar senha/hash.
- RLS completo em todas as tabelas logo no inicio; sera expandido conforme fases de dominio.
- Refresh token manual.
- UI pronta do Supabase.

</deferred>

---

*Phase: 03-authentication-and-roles*
*Context gathered: 2026-05-07*
