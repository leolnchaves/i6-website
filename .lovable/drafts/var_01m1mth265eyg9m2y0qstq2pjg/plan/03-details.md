## Detalhes técnicos

### Elemento
`src/components/comunidade/CommunityMural.tsx` — `<img>` do slot de índice 7 ("Pesquisa aplicada"), que pelo mapa `SLOT_IMAGE` resolve para a entrada `m4` (`/images/comunidade/mural-whiteboard.jpg`).

### Mudança
- Em `src/data/comunidade/placeholders.ts`, adicionar `objectPosition: 'center 20%'` à entrada `m4`.
- O suporte a `objectPosition` já existe na interface `MuralImage` e já é aplicado pelo componente nas duas variantes (colagem `md+` e pilha mobile). Nenhuma alteração de componente é necessária.

Justificativa do valor: a foto tem proporção mais alta que o recorte, então o corte é vertical; o rosto está a cerca de 20% da altura da imagem, e `center 20%` traz essa faixa para dentro do recorte.

### O que NÃO muda
Classes de recorte, `tilt`, `ratio`, `offset`, opacidade, borda, grid e textos. Nenhuma outra entrada de `MURAL_IMAGES`.

### Validação
1. `bunx tsgo --noEmit -p tsconfig.app.json`
2. `bun run build`
3. Screenshot do recorte em PT, EN e ES, desktop e mobile, confirmando o rosto inteiro.