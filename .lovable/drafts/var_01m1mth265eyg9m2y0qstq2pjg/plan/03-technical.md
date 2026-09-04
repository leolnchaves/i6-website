## Detalhes técnicos

- `src/pages/HomeTeste.tsx`: remover o import e o uso de `AnticipateGrid`.
- `src/components/home-v3/AnticipateGrid.tsx`: arquivo deletado (é usado somente na home; o bloco i6Signal vive dentro dele).
- `src/components/home-v3/product/ProductSuite.tsx`: acima do seletor, uma faixa com as três alavancas lidas de `solutionsContent[language].territories` — título, tagline e chips em cartões compactos, mais o link "Ver as soluções desta alavanca" para `/solutions` via `useLocalizedPath`, no estilo areia/terracota já usado (`sand-card`, chips `bg-accent`).
- `src/components/home-v3/product/suiteContent.ts`: acrescentar o eyebrow/curta introdução PT e EN dessa faixa; nenhum texto de produto muda.
- Nada muda em `/solutions`, no header, no footer ou em outras páginas. Sem publicação — deploy só quando você pedir.
