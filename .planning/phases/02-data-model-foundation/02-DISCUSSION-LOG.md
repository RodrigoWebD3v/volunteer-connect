# Phase 2: Data Model Foundation - Discussion Log

**Date:** 2026-05-07
**Mode:** Conversa em portugues, documentacao local apenas

## Resumo

A discussao da fase 2 começou pelo modelo central. O usuario deixou claro que nao queria aplicar nada no banco remoto neste momento, apenas manter tudo documentado localmente. A conversa entao fechou decisoes sobre usuarios, ONGs, voluntarios, marketplace de oportunidades, votos, inscricoes, logo em Supabase Storage, suspensao de conta e reputacao futura.

## Decisoes capturadas

### Execucao local/documental

- O usuario pediu explicitamente para nao aplicar nada agora.
- A fase deve documentar localmente o modelo e o plano antes de qualquer execucao no Supabase.

### Marketplace de oportunidades

- A ideia inicial de postagens estilo Reddit foi refinada para um marketplace de oportunidades.
- Foi decidido que apenas ONGs publicam oportunidades.
- Voluntarios navegam, votam e se inscrevem.

### Usuarios e papeis

- Confirmados os papeis `voluntario`, `ong` e `admin`.
- A flag de suspensao deve ficar em `usuarios.conta_suspensa`, nao duplicada nos perfis.

### Perfil de ONG

- ONG cria conta, fornece dados obrigatorios e envia perfil para analise.
- Como ainda nao ha clareza sobre dados comuns de ONGs, o MVP exigira apenas CNPJ, razao social e logo.
- A logo deve ser armazenada no Supabase Storage em bucket publico.

### Perfil de voluntario

- Campos confirmados: `id`, `usuario_id`, `nome_completo`, `telefone`, `cidade`, `estado`, `criado_em`, `atualizado_em`, `cpf`.

### Reputacao de ONG

- O usuario deseja reputacao no futuro, mas confirmou que nao precisa implementar agora.
- A fase deve deixar o modelo preparado, sem criar sistema de reputacao detalhado.

## Perguntas encerradas

- Quem publica oportunidades? ONGs.
- Qual idioma usar no banco? Portugues.
- Como nomear colunas? `snake_case`, nomes claros, sem abreviacoes desnecessarias.
- Quais papeis existem? `voluntario`, `ong`, `admin`.
- Onde fica suspensao? Em `usuarios.conta_suspensa`.
- Logo de ONG e publica? Sim, bucket publico.

## Pendencias para planejamento

- Definir o SQL local proposto.
- Definir constraints, indices e relacionamentos.
- Definir seed/insertion script local sem execucao remota.
- Definir documentacao de como executar futuramente, quando autorizado.

## Ideias adiadas

- Reputacao detalhada de ONG.
- Avaliacoes com estrelas/comentarios.
- Pessoa fisica publicando oportunidade.
- Multiplos gestores por ONG.
- Execucao real no Supabase remoto.
