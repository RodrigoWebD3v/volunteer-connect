# Demo local

## Passo 1: instalar dependencias

```powershell
npm install
npm --prefix backend install
npm --prefix frontend install
```

## Passo 2: configurar ambiente

Crie `.env`, `backend/.env` e `frontend/.env` a partir dos exemplos quando necessario.

Valores esperados:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_LOGOS_BUCKET`
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_BACKEND_URL=http://localhost:3000`

Use placeholders nos exemplos. Nunca registre chaves reais no Git.

## Passo 3: revisar banco

As migrations ficam em `supabase/migrations/`. Elas sao contratos locais e devem ser revisadas antes de execucao remota.

Ordem esperada para ambiente de desenvolvimento autorizado:

1. Criar/configurar bucket publico de logos definido por `SUPABASE_LOGOS_BUCKET`.
2. Aplicar migrations em ordem lexicografica.
3. Aplicar `supabase/seed/0001_dados_exemplo.sql` apenas em banco de demo/desenvolvimento.
4. Conferir que a seed nao contem dados reais e usa emails `example.org`.

## Passo 4: rodar aplicacao

```powershell
npm run dev
```

Backend: `http://localhost:3000`

Frontend: `http://localhost:5173`

## Passo 5: fluxo de demonstracao

1. Abrir o marketplace de oportunidades.
2. Abrir detalhe de uma oportunidade.
3. Criar conta de voluntario.
4. Criar conta de ONG com CNPJ e logo.
5. Aprovar ONG em tela administrativa com usuario admin previamente criado.
6. Criar oportunidade como ONG aprovada.
7. Inscrever voluntario.
8. Aprovar inscricao.
9. Encerrar oportunidade e registrar presenca.
10. Ver historico de presencas do voluntario.

## Teste rapido

```powershell
npm run check
npm test
```
