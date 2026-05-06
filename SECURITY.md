# Política de Segurança

## Como reportar vulnerabilidades

Se encontrar uma vulnerabilidade, não abra uma issue pública com detalhes exploráveis.

Use uma das opções:

- Abra uma issue privada/security advisory no GitHub, se disponível.
- Entre em contato diretamente com o mantenedor do projeto.

Inclua:

- descrição do problema;
- impacto provável;
- passos mínimos de reprodução;
- arquivos/rotas afetados;
- sugestão de correção, se houver.

## Escopo inicial

Estão no escopo:

- backend NestJS;
- frontend SvelteKit;
- integração com Supabase;
- autenticação e autorização;
- exposição de segredos;
- dependências npm;
- GitHub Actions e configuração do repositório.

## Regras do projeto

- Nunca commitar `.env` real.
- Nunca expor `SUPABASE_SERVICE_ROLE_KEY` no frontend.
- Todo PR que altere auth, autorização, banco, Supabase, endpoints ou dependências deve passar por revisão de segurança.
- Risco crítico ou alto bloqueia merge até correção ou mitigação explícita.
