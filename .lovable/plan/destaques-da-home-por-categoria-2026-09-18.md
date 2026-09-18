# Destaques da Home por categoria

## Objetivo
Manter a seção “Últimos insights” com no máximo três cards, sempre um por categoria de conteúdo, e substituir o link geral por links específicos abaixo de cada card.

## Alterações
- Remover o link “Ver todos os insights →” do cabeçalho da seção.
- Organizar os destaques nesta ordem fixa:
  1. conteúdo de `/insights`: tipos `i6 Social` e `i6 on Media`
  2. conteúdo de `/i6-blog`: tipos `i6 Article` e `i6 Blog`
  3. conteúdo de `/i6-intelligence`: tipos `i6 Research` e `i6 eBook`
- Para cada categoria, considerar somente conteúdos marcados como destaque pelo i6 HUB e selecionar o mais recente pela data.
- Omitir por completo a coluna — card e link — quando uma categoria não tiver conteúdo destacado no idioma atual.
- Adicionar abaixo de cada card, no mesmo estilo de texto coral com seta usado hoje:
  - “Mais no i6 On Media →” para `/insights`
  - “Mais no i6 Blog →” para `/i6-blog`
  - “Mais no i6 Deep Research →” para `/i6-intelligence`
- Localizar as três mensagens para PT, EN e ES, preservando os nomes dos produtos.
- Manter intactos os cards, espaçamentos, tipografia, cores e o restante da seção.

## Detalhes técnicos
- Unificar na seleção da Home os conteúdos hoje carregados pelos dois catálogos estáticos (`insights` e `intelligence`).
- Preservar o comportamento atual de links internos/externos de cada card.
- Fazer a grade adaptar o número de colunas ao total de categorias disponíveis, sem espaços vazios.

## Validação
- Confirmar os cenários com zero, um e vários destaques por categoria.
- Verificar que o item mais recente de cada categoria é escolhido.
- Conferir links e textos em PT, EN e ES no desktop e no celular, sem alterar o restante do layout.
