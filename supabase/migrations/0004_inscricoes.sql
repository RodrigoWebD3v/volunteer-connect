-- Volunteer Connect - contrato local para inscricoes.
-- Proposta versionada: nao executar remotamente sem revisao e autorizacao explicita.

create table if not exists inscricoes (
  id uuid primary key default gen_random_uuid(),
  oportunidade_id uuid not null references oportunidades(id) on delete cascade,
  voluntario_usuario_id uuid not null references usuarios(id) on delete cascade,
  status text not null default 'pendente',
  mensagem text,
  observacao_ong text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint inscricoes_status_check check (
    status in ('pendente', 'aprovada', 'reprovada', 'cancelada')
  ),
  constraint inscricoes_unica_por_oportunidade unique (
    oportunidade_id,
    voluntario_usuario_id
  )
);

create index if not exists idx_inscricoes_oportunidade_id
  on inscricoes (oportunidade_id);

create index if not exists idx_inscricoes_voluntario_usuario_id
  on inscricoes (voluntario_usuario_id);

create index if not exists idx_inscricoes_status
  on inscricoes (status);

create index if not exists idx_inscricoes_oportunidade_status
  on inscricoes (oportunidade_id, status);

create or replace function aprovar_inscricao_com_vaga(
  p_inscricao_id uuid,
  p_observacao_ong text default null
)
returns setof inscricoes
language plpgsql
as $$
declare
  v_oportunidade_id uuid;
  v_quantidade_vagas integer;
  v_aprovadas integer;
begin
  select i.oportunidade_id, o.quantidade_vagas
    into v_oportunidade_id, v_quantidade_vagas
  from inscricoes i
  join oportunidades o on o.id = i.oportunidade_id
  where i.id = p_inscricao_id
    and i.status = 'pendente'
  for update of o, i;

  if v_oportunidade_id is null then
    raise exception 'inscricao_pendente_nao_encontrada';
  end if;

  select count(*)::integer
    into v_aprovadas
  from inscricoes
  where oportunidade_id = v_oportunidade_id
    and status = 'aprovada';

  if v_aprovadas >= v_quantidade_vagas then
    raise exception 'sem_vagas_disponiveis';
  end if;

  return query
    update inscricoes
       set status = 'aprovada',
           observacao_ong = nullif(trim(p_observacao_ong), ''),
           atualizado_em = now()
     where id = p_inscricao_id
     returning *;
end;
$$;

revoke execute on function aprovar_inscricao_com_vaga(uuid, text) from anon;
revoke execute on function aprovar_inscricao_com_vaga(uuid, text) from authenticated;
