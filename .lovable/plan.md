
# Layout dos Cards de Resultados: Grid 2x2

## Problema
Os 4 cards em uma unica linha (4 colunas) continuam com textos apertados e muitas quebras de linha, mesmo apos ajustes de padding e gap.

## Solucao
Mudar o grid de `lg:grid-cols-4` para `lg:grid-cols-2`, criando um layout de 2 cards por linha em 2 linhas. Isso dara o dobro de largura para cada card, eliminando as quebras de linha excessivas.

## Detalhes Tecnicos

Alteracao no arquivo `src/components/hometeste/ResultadosSection.tsx`:

- Mudar a classe do grid de `lg:grid-cols-4` para `lg:grid-cols-2`
- Linha aproximada 94: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5` -> `grid grid-cols-1 sm:grid-cols-2 gap-5`
- Remover `lg:grid-cols-4` pois `sm:grid-cols-2` ja cobre o layout desejado de 2 colunas

Nenhum texto sera alterado. Apenas a classe CSS do grid muda.
