---
status: complete
created_at: "2026-05-28T13:05:00-03:00"
---

# Quick Task: Fix ONG Logo Payload Limit

Corrigir erro `PayloadTooLargeError: request entity too large` ao cadastrar conta ONG com logo.

## Plano

- Ajustar o limite do body parser do backend para comportar logo de ate 2 MB convertida para base64.
- Manter o limite restrito o suficiente para nao aceitar payloads grandes desnecessarios.
- Verificar build/typecheck e teste backend.
