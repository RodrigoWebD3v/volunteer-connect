-- Volunteer Connect - adiciona controle de suspensao de conta.

alter table if exists public.usuarios
  add column if not exists conta_suspensa boolean not null default false;

create index if not exists idx_usuarios_conta_suspensa
  on public.usuarios (conta_suspensa);
