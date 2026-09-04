## Mudanças no header

- **Decision Platform** substitui "Soluções" no lugar atual e passa a ser link externo para `https://www.i6decision.ai`, abrindo em nova aba. A página interna `/solutions` continua existindo e acessível por links internos; ela só sai do menu principal.
- **IA Proprietária** deixa de ser item de primeiro nível e passa a ser o primeiro submenu de "Inteligência Aplicada" (apontando para `/our-ai`, sem mudança de rota).
- **Development Partners** é um novo dropdown, no mesmo padrão visual do atual, com três submenus: i6 Builder Platform, Comunidade de Parceiros e Documentação. Como as telas serão construídas depois, os três entram com o selo "Em breve" já existente e sem link ativo — quando as páginas existirem, basta trocar por rota.
- Tudo replicado no menu mobile e nos dois idiomas (PT e EN).

## Ordem final do menu

Início · Decision Platform · Inteligência Aplicada · Development Partners · Cases de Sucesso · Contato

## Detalhes técnicos

- Nova pasta `src/components/home-v3/product/` com `SuiteIntro.tsx` e `ProductSuite.tsx`, mais um arquivo de conteúdo bilíngue (`suiteContent.ts`) com pilares, produtos, capacidades e fluxo. Montados em `src/pages/HomeTeste.tsx` entre `ClientProof` e `WhyInfinity6`, usando os tokens `.theme-sand` já criados.
- Seletor de produto com `useState`, `aria-pressed` nos botões e transição de opacidade curta respeitando `prefers-reduced-motion`.
- `src/components/hometeste/HeaderNovo.tsx`: item externo com `<a target="_blank" rel="noopener noreferrer">`, novo array `partnersMenu` e segundo dropdown com o mesmo controle de clique-fora já usado.
- Novas chaves em `src/data/translations/pt.ts` e `en.ts` (`header.decisionPlatform`, `header.partners.*`, `home.suite.*`); as chaves de "Soluções" que deixam de aparecer no header permanecem para outras telas.
- Nada é publicado; deploy só quando você pedir.
