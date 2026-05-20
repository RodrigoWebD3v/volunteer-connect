-- Volunteer Connect - proposta local para rastreabilidade de analise de ONG.
-- Nao execute no Supabase remoto sem revisao e autorizacao explicita.

alter table if exists public.perfis_ongs
  add column if not exists status_analise text not null default 'pendente',
  add column if not exists motivo_reprovacao text,
  add column if not exists analisado_por_usuario_id uuid references public.usuarios(id) on delete set null,
  add column if not exists analisado_em timestamptz,
  add column if not exists reenviado_em timestamptz;

alter table if exists public.perfis_ongs
  drop constraint if exists perfis_ongs_status_analise_valido;

alter table if exists public.perfis_ongs
  add constraint perfis_ongs_status_analise_valido
  check (status_analise in ('pendente', 'aprovado', 'reprovado'));

alter table if exists public.perfis_ongs
  drop constraint if exists perfis_ongs_motivo_reprovacao_tamanho;

alter table if exists public.perfis_ongs
  add constraint perfis_ongs_motivo_reprovacao_tamanho
  check (motivo_reprovacao is null or char_length(motivo_reprovacao) <= 2000);

alter table if exists public.perfis_ongs
  drop constraint if exists perfis_ongs_reprovacao_exige_motivo;

alter table if exists public.perfis_ongs
  add constraint perfis_ongs_reprovacao_exige_motivo
  check (
    status_analise <> 'reprovado'
    or nullif(btrim(motivo_reprovacao), '') is not null
  );

create index if not exists idx_perfis_ongs_status_analise
  on public.perfis_ongs (status_analise);

create index if not exists idx_perfis_ongs_analisado_por_usuario_id
  on public.perfis_ongs (analisado_por_usuario_id);
