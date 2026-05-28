-- Volunteer Connect - provisionamento local do primeiro administrador.
-- Antes de executar, crie no Supabase Auth um usuario com o email abaixo.
-- Esta migration usa o UUID real de auth.users para manter login e dominio alinhados.

do $$
declare
  admin_email constant text := 'rodrigocrizinba@gmail.com';
  admin_nome constant text := 'Rodrigo Administrador';
  admin_auth_user_id uuid;
begin
  select id
    into admin_auth_user_id
  from auth.users
  where lower(email) = lower(admin_email)
  limit 1;

  if admin_auth_user_id is null then
    raise exception
      'Usuario admin % nao encontrado em auth.users. Crie o usuario no Supabase Auth antes de aplicar esta migration.',
      admin_email;
  end if;

  insert into public.usuarios (
    id,
    nome_completo,
    email,
    papel,
    ativo,
    conta_suspensa,
    atualizado_em
  )
  values (
    admin_auth_user_id,
    admin_nome,
    lower(admin_email),
    'admin',
    true,
    false,
    now()
  )
  on conflict (id) do update
    set nome_completo = excluded.nome_completo,
        email = excluded.email,
        papel = 'admin',
        ativo = true,
        conta_suspensa = false,
        atualizado_em = now();
end $$;
