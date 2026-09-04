## Detalhes técnicos

- `src/pages/HomeTeste.tsx`: remover o import e o uso de `AnticipateGrid`.
- `src/components/home-v3/AnticipateGrid.tsx`: arquivo deletado (é usado somente na home; o bloco i6Signal vive dentro dele).
- `src/components/home-v3/product/suiteContent.ts`: comparar as três alavancas de `src/data/solutionsV2/content.ts` com os seis produtos e, onde houver conteúdo ainda ausente, complementar `body`, `capabilities` ou `flow` do produto correspondente (PT e EN). Sem novos componentes e sem nova faixa.
- CTAs de "Soluções" → i6 Decision Suite: `HeroSuite.tsx` e `FinalCTA.tsx` deixam de usar `localized('/solutions')` e passam a apontar para `SUITE_URL` (`https://www.i6decision.ai`, nova aba, `rel="noopener noreferrer"`), com rótulo do tipo "Conheça o i6 Decision Suite" / "Explore the i6 Decision Suite". Em `hometeste/FooterNovo.tsx`, o item de Soluções passa a "i6 Decision Suite" com o mesmo link externo.
- `ProductSuite.tsx` e `SuiteIntro.tsx`: layout intocado.
- A rota `/solutions` continua existindo; apenas deixa de ser destino de CTA na home e no rodapé. Sem publicação — deploy só quando você pedir.
