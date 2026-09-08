## Textos das faixas (PT / EN / ES)

**Faixa 1 — I6 DECISION SUITE**
- PT: "Inteligência pronta para decidir" · "Produto pronto para uso que captura sinais, converte em decisões e entrega resultados acelerados direto no seu ecossistema" · "Saiba mais"
- EN: "Intelligence ready to decide" · "Ready-to-use product that captures signals, turns them into decisions and delivers accelerated results directly in your ecosystem" · "Learn more"
- ES: "Inteligencia lista para decidir" · "Producto listo para usar que captura señales, las convierte en decisiones y entrega resultados acelerados directamente en tu ecosistema" · "Saber más"

**Faixa 2 — I6 BUILDER PLATFORM**
- PT: "Inteligência para diferenciar e escalar" · "Capacidade de modelagens proprietárias para criar experiências únicas e ampliar o valor do seu produto" · "Saiba mais"
- EN: "Intelligence to differentiate and scale" · "Proprietary modeling capabilities to create unique experiences and expand your product value" · "Learn more"
- ES: "Inteligencia para diferenciar y escalar" · "Capacidad de modelados propietarios para crear experiencias únicas y ampliar el valor de tu producto" · "Saber más"

## Detalhes técnicos

- `src/components/home-v3/HeroSuite.tsx`: grid passa a `items-start`; remover os dois `<article>` de cartão e o bloco de CTAs (`ctaContact` / `ctaLearn`); manter eyebrow, `h1`, `sub`, lista `proof`, fundo, grade e painel de decisões inalterados. Chaves de copy dos cartões/CTAs migram para o novo componente.
- Novo `src/components/home-v3/SolutionBands.tsx`: `section` full-bleed, `grid md:grid-cols-2` (empilha no mobile), faixa esquerda `bg-secondary/50`, direita `bg-muted/40`, `border-y border-border` e divisória `md:border-l`. Sem sombra e sem `rounded`. Cada faixa: eyebrow uppercase, `h2` semibold, parágrafo curto, e âncora `href="#decision-suite"` / `href="#builder-platform"` com `ArrowDown`, ícones `Gauge` e `Blocks` mantidos.
- `src/pages/HomeTeste.tsx`: dentro do wrapper `flex md:min-h-screen`, ordem `HeroSuite` → `SolutionBands` → `div.md:mt-auto > ClientProof`. Remover `IntelligencePaths` do fluxo e apagar `src/components/home-v3/IntelligencePaths.tsx` (sem outros consumidores — confirmar com busca antes de excluir).
- Seção Decision Suite: bloco de CTAs em `SuiteIntro.tsx` (ou no fim de `ProductSuite.tsx`, onde a composição encaixar) com `SUITE_URL` para "Contratar a i6 Decision Suite →" e `localized('/contact')` para "Falar com especialista"; manter `id="decision-suite"` e `scroll-mt-24`.
- Novo `src/components/home-v3/BuilderSection.tsx` com `id="builder-platform"` e `scroll-mt-24`, renderizada logo depois de `ProductSuite`: abertura tipográfica em areia, três a quatro capacidades curtas (engines, SDKs, toolkits, governança) reaproveitando o vocabulário já usado em `/i6-builders`, e CTAs "Construir com o i6 Builder →" (`/i6-builders`) + "Falar com especialista".
- Trilíngue via o mesmo padrão `copyByLang` + `pickLang` já usado nos componentes da home.
- Verificação: `tsgo --noEmit`, build, e checagem visual em 1440×900 e 1280×800 (faixa de logos ainda visível sem rolagem), mobile 390px, PT/EN/ES, mais rolagem das duas âncoras. Sem release/deploy.
