Em `PredictivePersonalizationDemo.tsx` (bloco do fashion, linhas ~316-351):

1. **Look complementar em linhas**: trocar o grid de 3 colunas por uma lista vertical. Cada item vira uma linha com `[thumbnail pequena] [nome/descrição] [preço à direita]` — botão flex row com aspect-ratio menor (ex: thumb 6vmin quadrada ou 3/4), descrição no meio ocupando o espaço, preço à direita. Manter clique para trocar o produto âncora.

2. **Total dentro do quadro**: mover a linha "Total do look" (atualmente fora, linhas 347-351) para dentro do card "Look completo recomendado", logo abaixo da lista de itens, com um separador sutil (border-top). Remover o bloco externo.

Nenhuma outra seção é afetada.