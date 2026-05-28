-- Seed ficticio para validar os relacionamentos atuais do MVP.
-- Nao usar dados reais de pessoas, ONGs, documentos ou credenciais.

truncate table presencas, inscricoes, oportunidades, perfis_ongs, perfis_voluntarios, usuarios
restart identity cascade;

insert into usuarios (id, nome_completo, email, papel, ativo, conta_suspensa) values
  ('11111111-1111-4111-8111-111111111111', 'Ana Voluntaria Demo', 'ana.voluntaria@example.org', 'voluntario', true, false),
  ('22222222-2222-4222-8222-222222222222', 'Bruno Voluntario Demo', 'bruno.voluntario@example.org', 'voluntario', true, false),
  ('33333333-3333-4333-8333-333333333333', 'Carla Gestora Demo', 'carla.gestora@example.org', 'ong', true, false),
  ('44444444-4444-4444-8444-444444444444', 'Diego Gestor Pendente Demo', 'diego.gestor@example.org', 'ong', true, false),
  ('55555555-5555-4555-8555-555555555555', 'Eva Admin Demo', 'eva.admin@example.org', 'admin', true, false);

insert into perfis_voluntarios (id, usuario_id, cpf, telefone, cidade, estado, biografia) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '11111111-1111-4111-8111-111111111111', '00000000001', '+55 48 90000-0001', 'Criciuma', 'SC', 'Voluntaria demo interessada em campanhas comunitarias.'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '22222222-2222-4222-8222-222222222222', '00000000002', '+55 48 90000-0002', 'Icara', 'SC', 'Voluntario demo interessado em educacao.');

insert into perfis_ongs (
  id,
  usuario_gestor_id,
  nome_fantasia,
  cnpj,
  descricao,
  site_url,
  cidade,
  estado,
  verificada,
  logo_storage_path,
  status_analise,
  motivo_reprovacao,
  analisado_por_usuario_id,
  analisado_em
) values
  (
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    '33333333-3333-4333-8333-333333333333',
    'Rede Solidaria Demo',
    '00000000000101',
    'ONG ficticia para validacao de oportunidades e inscricoes.',
    'https://example.org/rede-solidaria-demo',
    'Criciuma',
    'SC',
    true,
    'demo/rede-solidaria-logo.png',
    'aprovado',
    null,
    '55555555-5555-4555-8555-555555555555',
    now()
  ),
  (
    'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
    '44444444-4444-4444-8444-444444444444',
    'Instituto Pendente Demo',
    '00000000000102',
    'ONG ficticia aguardando analise administrativa.',
    null,
    'Icara',
    'SC',
    false,
    'demo/instituto-pendente-logo.png',
    'pendente',
    null,
    null,
    null
  );

insert into oportunidades (
  id,
  perfil_ong_id,
  titulo,
  descricao,
  tipo_atividade,
  cidade,
  estado,
  data_inicio,
  data_fim,
  prazo_inscricao,
  quantidade_vagas,
  status
) values
  (
    'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    'Apoio em campanha de alimentos',
    'Ajude na organizacao, triagem e distribuicao de cestas para familias acompanhadas pela ONG.',
    'Doacoes',
    'Criciuma',
    'SC',
    '2026-06-15 09:00:00+00',
    '2026-06-16 17:00:00+00',
    '2026-06-10 23:59:00+00',
    18,
    'publicada'
  ),
  (
    'ffffffff-ffff-4fff-8fff-ffffffffffff',
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    'Mutirao comunitario concluido',
    'Atividade demo encerrada para validacao de historico de presencas.',
    'Comunidade',
    'Criciuma',
    'SC',
    '2026-01-10 09:00:00+00',
    '2026-01-10 17:00:00+00',
    '2026-01-05 23:59:00+00',
    6,
    'encerrada'
  );

insert into inscricoes (
  id,
  oportunidade_id,
  voluntario_usuario_id,
  status,
  mensagem,
  observacao_ong
) values
  (
    '12121212-1212-4121-8121-121212121212',
    'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
    '11111111-1111-4111-8111-111111111111',
    'pendente',
    'Posso ajudar no turno da tarde.',
    null
  ),
  (
    '13131313-1313-4131-8131-131313131313',
    'ffffffff-ffff-4fff-8fff-ffffffffffff',
    '22222222-2222-4222-8222-222222222222',
    'aprovada',
    'Tenho experiencia com organizacao de mutiroes.',
    'Aprovado para validacao de presenca.'
  );

insert into presencas (
  id,
  inscricao_id,
  oportunidade_id,
  voluntario_usuario_id,
  status,
  observacao,
  registrado_por_usuario_id,
  registrado_em
) values
  (
    '14141414-1414-4141-8141-141414141414',
    '13131313-1313-4131-8131-131313131313',
    'ffffffff-ffff-4fff-8fff-ffffffffffff',
    '22222222-2222-4222-8222-222222222222',
    'presente',
    'Participou da organizacao do mutirao demo.',
    '33333333-3333-4333-8333-333333333333',
    '2026-01-10 18:00:00+00'
  );
