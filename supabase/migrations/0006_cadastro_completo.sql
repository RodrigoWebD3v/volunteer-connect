-- Volunteer Connect - complemento local para cadastro completo.
-- Proposta versionada: nao executar remotamente sem revisao e autorizacao explicita.

alter table perfis_voluntarios
  add column if not exists cpf text;

create unique index if not exists idx_perfis_voluntarios_cpf_unico
  on perfis_voluntarios (cpf)
  where cpf is not null;

alter table perfis_ongs
  add column if not exists status_analise text not null default 'pendente',
  add column if not exists logo_storage_path text,
  add column if not exists motivo_reprovacao text,
  add column if not exists analisado_por_usuario_id uuid references usuarios(id) on delete set null,
  add column if not exists analisado_em timestamptz,
  add column if not exists reenviado_em timestamptz;

alter table perfis_ongs
  drop constraint if exists perfis_ongs_status_analise_check;

alter table perfis_ongs
  add constraint perfis_ongs_status_analise_check
  check (status_analise in ('pendente', 'aprovado', 'reprovado'));
