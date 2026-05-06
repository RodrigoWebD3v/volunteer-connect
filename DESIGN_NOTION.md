---
version: alpha
name: Notion / Cal.com
description: Direcao complementar para areas internas do Volunteer Connect. Use a clareza operacional do Notion e a simplicidade objetiva do Cal.com para dashboards de ONG, area logada, gestao de oportunidades, candidaturas, eventos e participacao. A interface deve ser limpa, organizada, facil de entender e menos orientada a marketing.
---

# DESIGN_NOTION

Use este arquivo como referencia secundaria de design para telas logadas e operacionais.

## Principios

- Priorize clareza operacional sobre impacto visual.
- Use layouts densos o suficiente para gestao, mas sem poluicao.
- Prefira listas, tabelas simples, filtros, abas e paineis laterais quando o usuario precisa comparar ou agir repetidamente.
- Use textos curtos, labels claros e estados vazios objetivos.
- Evite composicao de landing page em dashboards.
- Evite hero grande, gradientes decorativos e cards aninhados em area logada.

## Uso no Volunteer Connect

### Dashboards de ONG

- Mostrar oportunidades, candidaturas, eventos e participacoes em listas escaneaveis.
- Usar filtros por status, data, localidade e tipo de atividade.
- Priorizar acoes diretas: criar, editar, pausar, revisar candidatura, registrar participacao.
- Separar metricas importantes em pequenos indicadores, sem transformar tudo em grafico.

### Area do voluntario

- Mostrar candidaturas, proximos eventos e historico de participacao de forma clara.
- Manter CTA principal visivel para descobrir novas oportunidades.
- Evitar excesso de configuracoes ou informacoes administrativas.

### Administracao e configuracoes

- Usar formularios simples, seções curtas e feedback claro.
- Agrupar campos por significado, nao por origem tecnica.
- Mostrar estados de salvamento, erro e sucesso de forma discreta e acessivel.

## Tokens sugeridos

- Canvas: `#ffffff`
- Surface soft: `#f7f7f7`
- Ink: `#222222`
- Body: `#3f3f3f`
- Muted: `#6a6a6a`
- Hairline: `#dddddd`
- Border soft: `#ebebeb`
- Accent: usar o coral principal do Volunteer Connect, derivado da base Airbnb.

## Componentes esperados

- Header interno simples.
- Sidebar ou tabs para areas recorrentes.
- Tabelas simples e responsivas.
- Cards apenas para itens repetidos ou paineis de resumo.
- Filtros visiveis e previsiveis.
- Formularios com labels sempre visiveis.
- Estados vazios com acao clara.

## Nao fazer

- Nao usar visual dark como padrao do produto.
- Nao criar dashboard com aparencia de landing page.
- Nao usar cards dentro de cards.
- Nao depender de cor como unico indicador de status.
- Nao esconder acoes essenciais em menus quando houver espaco para mostra-las.
