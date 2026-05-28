---
status: complete
completed_at: "2026-05-28T13:36:24-03:00"
---

# Summary: Diagnose Opportunity Create Failure

As regras do banco foram validadas com uma insercao em transacao com rollback para a ONG aprovada `zueiroyoda@gmail.com`. A insercao valida passou, entao as constraints principais estao coerentes.

Foi enviado `notify pgrst, 'reload schema'` para atualizar o schema cache do Supabase/PostgREST apos a correcao da tabela `oportunidades`.

O backend agora retorna mensagens mais especificas quando a criacao falha por schema cache, migration pendente, constraint de datas, FK ou status invalido.

Arquivo alterado:

- `backend/src/oportunidades/oportunidades.service.ts`

Validacoes executadas:

```bash
npm --prefix backend run build
npm --prefix backend test
curl -i http://localhost:3000/oportunidades
```

Resultado: build/test passaram e `GET /oportunidades` retornou `200 OK`.
