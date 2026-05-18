# Fase 2 — Execução Futura de Migration e Seed (Supabase remoto)

Este documento define **como executar com segurança** os artefatos locais da Fase 2 em ambiente remoto autorizado.

> Escopo: orientação operacional. Não executa nada automaticamente.

## Pré-condições obrigatórias

1. Ambiente remoto de desenvolvimento/homologação aprovado.
2. Backup/snapshot disponível (quando aplicável ao ambiente).
3. Variáveis validadas no `.env`:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (somente backend)
   - `DATABASE_URL`
4. Revisão técnica concluída para:
   - `supabase/migrations/0001_modelo_inicial.sql`
   - `supabase/seed/0001_dados_exemplo.sql`

## Guardrails de segurança

- Nunca executar em produção sem change management formal.
- Nunca commitar segredos reais, tokens ou connection strings sensíveis.
- Seed deve permanecer com dados fictícios.
- `SUPABASE_SERVICE_ROLE_KEY` deve ficar restrita ao backend e ambientes autorizados.
- Toda execução deve ser rastreável (quem executou, quando e em qual ambiente).

## Ordem recomendada de execução

1. Rodar validação local de qualidade:

```bash
npm run verify
```

2. Validar alvo remoto e credenciais (checagem manual).
3. Aplicar migration inicial:

```bash
# Exemplo: executar 0001_modelo_inicial.sql no ambiente remoto autorizado
# (ajuste para o fluxo oficial adotado pela equipe)
```

4. Validar schema aplicado (tabelas, enums, constraints e índices).
5. Aplicar seed de validação:

```bash
# Exemplo: executar 0001_dados_exemplo.sql apenas em ambiente autorizado
# com dados fictícios
```

6. Validar integridade relacional após seed.
7. Registrar evidências em documento/issue/PR.

## Checklist pós-execução

- [ ] Migration aplicada sem erro.
- [ ] Seed aplicado sem erro.
- [ ] Relações e constraints funcionando.
- [ ] Nenhum segredo exposto em logs/artefatos.
- [ ] Evidência registrada com data, ambiente e responsável.

## Evidência mínima recomendada

- Data e hora da execução.
- Ambiente alvo (dev/hml).
- Hash/commit dos arquivos SQL executados.
- Resultado dos comandos e validações.
- Nome da pessoa responsável pela execução.
