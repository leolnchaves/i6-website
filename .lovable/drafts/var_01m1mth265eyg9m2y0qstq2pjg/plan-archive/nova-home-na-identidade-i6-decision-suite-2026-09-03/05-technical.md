## Detalhes técnicos

- **Tokens**: adiciono ao `src/index.css` um escopo de tema `.theme-sand` com os tokens da Decision Suite convertidos para HSL (formato exigido pelo Tailwind v3 deste projeto): background, foreground, card, muted, border, `--primary` terracota, `--secondary` areia, e as sombras `--shadow-ds-sm/md/lg`. O escopo é aplicado no wrapper da home, então nenhuma outra página muda de aparência.
- **Fontes**: `Sora` e `Manrope` via Google Fonts no `index.html`, registradas em `tailwind.config.ts` como `font-display` e `font-sans` — a home usa essas famílias; o resto do site segue com Rubik.
- **Componentes**: novo diretório `src/components/home-v3/` com `HeroSuite`, `ClientProof`, `WhyInfinity6`, `AnticipateGrid`, `HowItWorks` (adaptação da animação atual), `ProofAndVoices`, `InsightsRow`, `FinalCTA`. `src/pages/HomeTeste.tsx` passa a compor esses blocos dentro do wrapper `.theme-sand`.
- **Conteúdo e dados**: reaproveito os hooks e fontes existentes (`usePartnersContent`, `useTestimonialsMarkdown`, `useHomeSuccessStories`, `solutionsContent`, `realResults`, insights). Nenhuma alteração em Markdown, em rotas ou em captura de leads.
- **Textos**: copy em PT dentro dos componentes com a mesma estrutura bilíngue por `language` já usada no projeto, deixando o slot EN pronto para a etapa seguinte.
- **Componentes antigos**: os arquivos de `src/components/hometeste/` que deixarem de ser usados na home ficam no lugar (são referenciados por outras telas) e são limpos só depois da validação.
- **Memória do projeto**: a regra de tema escuro navy/coral passa a registrar exceção explícita para a home, que segue a identidade Terracotta Sand.
- **Sem publicação automática**: nenhum release ou deploy é disparado; publico só quando você pedir.
