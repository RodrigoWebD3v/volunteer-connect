# Checklist de release

## Ambiente

- [ ] `.env` local criado a partir de exemplos.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` existe apenas no backend.
- [x] `PUBLIC_BACKEND_URL` documentado nos exemplos e aponta para backend local por padrao.
- [ ] Bucket de logos configurado no Supabase remoto.

## Banco

- [x] Migrations revisadas antes de execucao remota.
- [x] Seed sem dados reais.
- [x] Constraints de status e unicidade aplicadas.

## Qualidade

- [x] Backend build executado.
- [x] Frontend check executado.
- [x] `npm run ci` executado em 2026-05-27.
- [ ] Testes automatizados completos executados contra Supabase remoto seedado.
- [ ] E2E principal executado.

## UX e acessibilidade

- [x] Marketplace publico abre como primeira experiencia util.
- [x] Login/cadastro possuem labels e mensagens em portugues.
- [x] Areas operacionais evitam excesso de marketing.
- [ ] Teste manual de teclado em todas as telas principais.

## Seguranca

- [x] Service role restrita ao backend.
- [x] Guards reutilizaveis adicionados.
- [x] Upload de logo valida tipo, tamanho e path controlado.
- [x] `npm audit --audit-level=moderate` sem achados moderados/altos em backend e frontend.
- [ ] Revisao final em ambiente completo.

## GitHub

- [x] Fases 7 a 10 possuem issues-mae.
- [x] Tarefas das fases 7 a 10 possuem issues.
- [ ] Issues devem ser fechadas apos validacao final e merge.
