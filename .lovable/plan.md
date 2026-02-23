

# Reduzir espaco entre titulo e cards na pagina Solutions

## Problema

Ha muito espaco vertical entre o titulo/subtitulo do hero e os primeiros cards da grid, impedindo que os dois primeiros cards sejam totalmente visiveis sem scroll.

## Mudancas

### 1. `src/components/solutions/SolutionsHero.tsx` (linha 11)

- Reduzir `pb-4` para `pb-0` (remover padding inferior do hero)
- Reduzir `mb-8` da descricao para `mb-4` (linha 28)
- Reduzir `mb-6` do h1 para `mb-3` (linha 15)

### 2. `src/components/solutions/StaticSolutionsGrid.tsx` (linha 41)

- Reduzir `py-20` para `pt-6 pb-20` (diminuir drasticamente o padding superior da grid, manter o inferior)

Essas mudancas devem eliminar o espaco morto entre o hero e os cards, garantindo que os dois primeiros cards fiquem integralmente visiveis na viewport inicial.

