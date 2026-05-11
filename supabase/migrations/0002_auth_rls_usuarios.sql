-- Volunteer Connect - proposta local de RLS inicial para autenticacao.
-- Nao execute no Supabase remoto sem revisao e autorizacao explicita.

alter table if exists public.usuarios enable row level security;

create schema if not exists private;

create or replace function private.usuario_atual_e_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.usuarios
    where id = auth.uid()
      and papel = 'admin'
      and conta_suspensa = false
  );
$$;

revoke all on function private.usuario_atual_e_admin() from public;
grant usage on schema private to authenticated;
grant execute on function private.usuario_atual_e_admin() to authenticated;

drop policy if exists "usuarios podem ler propria conta" on public.usuarios;
create policy "usuarios podem ler propria conta"
on public.usuarios
for select
to authenticated
using (id = auth.uid());

drop policy if exists "admins podem ler usuarios" on public.usuarios;
create policy "admins podem ler usuarios"
on public.usuarios
for select
to authenticated
using (private.usuario_atual_e_admin());

drop policy if exists "admins podem atualizar suspensao" on public.usuarios;
create policy "admins podem atualizar suspensao"
on public.usuarios
for update
to authenticated
using (private.usuario_atual_e_admin())
with check (private.usuario_atual_e_admin());

-- Regras complementares:
-- - O helper de admin fica no schema private, nao no public exposto.
-- - Usuarios comuns nao devem atualizar papel nem conta_suspensa.
-- - O backend NestJS tambem deve validar papel, suspensao e ownership.
-- - O uso de service role no backend pode contornar RLS; portanto RLS nao
--   substitui autorizacao de dominio na aplicacao.
