# Ajustes após o redesenho do i6 HUB

Li o documento e conferi cada ponto no código real. Alguns itens já estão resolvidos, outros mudaram de diagnóstico. O que encontrei:

**Já feito, nada a fazer**
- Item 2 (i6 Blog invisível): a listagem do blog já aceita `i6 Article` e `i6 Blog`.
- Item 3 (tema cru no card): o card já mostra o rótulo, com o slug só como reserva.
- Parte do item 1: a geração de research já grava tipo, setor e os dois campos de conteúdo relacionado.

**Bug real que o documento não pegou**
O conteúdo do tipo **i6 Blog nunca chega ao site**: o passo que traduz os dados do HUB em arquivos descarta esse tipo antes de gravar (a lista de tipos aceitos tem "Article", "eBook", "on Media" e "Social", mas não "Blog"). Por isso a página fica sem esses itens mesmo com a listagem já preparada.

**O que falta de verdade**
- Campos novos que o HUB envia e o conversor ainda joga fora: rótulo do tema (em research), título e descrição de busca, palavras-chave, resposta rápida, nome e cargo do autor — nos três tipos de conteúdo e também nos cases.
- Filtro do blog por etiquetas, que ficou vazio: trocar por Tipo + Tema.
- Página de pesquisa usando um mapa de temas fixo no código, que não conhece temas novos.
- Autoria em nenhum lugar do site.
- Alavancas dos cases ainda apontando para uma página que será descontinuada.
