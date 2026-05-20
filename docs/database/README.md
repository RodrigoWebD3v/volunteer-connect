# Banco de dados

Esta pasta documenta a proposta local do modelo de dados inicial do Volunteer Connect.

Os arquivos desta fase ainda nao foram aplicados no Supabase remoto. Eles existem para revisao, rastreabilidade academica e preparacao das proximas tarefas da Fase 2.
Nao executar nenhum arquivo SQL contra o Supabase remoto sem autorizacao explicita, revisao tecnica e ambiente de desenvolvimento/homologacao confirmado.

## Arquivos

- `schema-proposto.md`: descricao inicial das entidades, relacionamentos e regras esperadas.
- `entidades-regras-fase2.md`: detalhamento objetivo das entidades e regras de integridade da Fase 2.
- `../../supabase/migrations/0001_modelo_inicial.sql`: proposta local da primeira migration SQL.
- `../../supabase/seed/0001_dados_exemplo.sql`: proposta local de dados ficticios para validar relacionamentos.
- `execucao-futura-fase2.md`: plano operacional e guardrails para execução remota segura de migration e seed.

## Guardrails

- Nunca registrar credenciais reais neste repositorio.
- Nao incluir valores reais de `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` ou `DATABASE_URL`.
- A chave `SUPABASE_SERVICE_ROLE_KEY` deve ficar restrita ao backend.
- Qualquer execucao contra o Supabase remoto depende de revisao e autorizacao explicita.
- O seed deve usar apenas dados ficticios e ambientes autorizados de desenvolvimento.
- Logos de ONGs devem usar Supabase Storage em bucket publico dedicado, por exemplo `SUPABASE_LOGOS_BUCKET=logos-ongs`; o frontend nunca deve receber `SUPABASE_SERVICE_ROLE_KEY`.
- Novas tabelas podem exigir revisao das configuracoes de Data API/GraphQL do Supabase antes de ficarem acessiveis; RLS e autorizacao no backend continuam obrigatorias.

## Fluxo futuro de aplicacao

1. Revisar manualmente cada SQL em `supabase/migrations` e `supabase/seed`.
2. Confirmar variaveis locais sem valores reais versionados: `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY`.
3. Validar ambiente alvo e backup/snapshot quando aplicavel.
4. Aplicar migration e seed somente em ambiente autorizado.
5. Registrar evidencia de execucao em issue ou PR, incluindo commit, ambiente e resultado.

## Status da Fase 2

Esta etapa ja contem uma primeira versao detalhada de schema, migration e seed locais para revisao tecnica. A aplicacao em ambiente remoto continua dependente de revisao e autorizacao explicita.
