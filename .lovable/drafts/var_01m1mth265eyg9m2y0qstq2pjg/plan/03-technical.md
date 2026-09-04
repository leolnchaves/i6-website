## Detalhes técnicos

- `src/pages/HomeTeste.tsx`: remover o import e o uso de `AnticipateGrid`.
- `src/components/home-v3/AnticipateGrid.tsx`: arquivo deletado (é usado somente na home; o bloco i6Signal vive dentro dele).
- `src/components/home-v3/product/suiteContent.ts`: comparar as três alavancas de `src/data/solutionsV2/content.ts` com os seis produtos e, onde houver conteúdo ainda ausente, complementar `body`, `capabilities` ou `flow` do produto correspondente (PT e EN). Sem novos componentes e sem nova faixa.
- `ProductSuite.tsx` e `SuiteIntro.tsx`: layout intocado.
- Nada muda em `/solutions`, no header, no footer ou em outras páginas. Sem publicação — deploy só quando você pedir.
