-- Volunteer Connect - contrato local para presencas.
-- Proposta versionada: nao executar remotamente sem revisao e autorizacao explicita.

create table if not exists presencas (
  id uuid primary key default gen_random_uuid(),
  inscricao_id uuid not null references inscricoes(id) on delete cascade,
  oportunidade_id uuid not null references oportunidades(id) on delete cascade,
  voluntario_usuario_id uuid not null references usuarios(id) on delete restrict,
  status text not null,
  observacao text,
  registrado_por_usuario_id uuid not null references usuarios(id) on delete restrict,
  registrado_em timestamptz not null default now(),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint presencas_status_check check (
    status in ('presente', 'ausente', 'cancelada')
  ),
  constraint presencas_inscricao_unica unique (inscricao_id)
);

create index if not exists idx_presencas_oportunidade_id
  on presencas (oportunidade_id);

create index if not exists idx_presencas_voluntario_usuario_id
  on presencas (voluntario_usuario_id);

create index if not exists idx_presencas_status
  on presencas (status);

create index if not exists idx_presencas_registrado_em
  on presencas (registrado_em);
