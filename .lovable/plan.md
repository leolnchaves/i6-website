## Objetivo

No demo de Personalização + Descoberta Preditiva (`/kiosk`), aumentar os cards de produtos do painel esquerdo (e-commerce) para que o bloco esquerdo cresça verticalmente e se alinhe com a altura do painel direito (Raciocínio do modelo). Aplica-se aos 4 cenários: **products anônimo**, **products logado**, **fashion anônimo**, **fashion logado**.

## O que muda

Arquivo único: `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`

1. **Catálogo (fase `list`)** — grid de 6 SKUs
   - Aumentar a altura da imagem de cada card (hoje pequena e quadrada) para uma proporção mais alta (~`aspect-[4/5]` em vez de `aspect-square`).
   - Manter grid `grid-cols-3` para produtos e fashion (mesmo número de cards), apenas com tiles maiores.

2. **Recomendações / Look (fase `pdp`)**
   - Produtos: manter `grid-cols-4` mas aumentar a altura da imagem dos tiles.
   - Fashion: manter `grid-cols-3`, também com tiles maiores.
   - Aumentar levemente tipografia (nome/preço) para acompanhar.

3. **Card do produto selecionado (hero PDP)**
   - Aumentar a área da imagem principal (de `9vmin` para ~`14vmin`) para dar mais peso visual e ajudar o alinhamento vertical.

4. **Ajuste no `SkuTile` (variante `small`)**
   - Trocar o contêiner de imagem de altura fixa/quadrada para proporção retangular vertical, e aumentar o padding/tipografia interna proporcionalmente.

## Guardrails

- Sem mexer em lógica de fases, tracking, dados ou textos.
- Manter tokens semânticos e cores atuais (coral #F4845F, `bg-white/[0.03]`, borda `white/10`).
- Sem alterar o painel direito (Raciocínio) — o alinhamento vem do lado esquerdo crescer.
- Sem alterar outros demos (Pricing, Forecast).
- PT e ENG: mudança é puramente visual, sem strings.

## Verificação

- Typecheck.
- Rodar Playwright em `/kiosk`, escolher Growth → Personalização, e capturar screenshot dos 4 cenários (produto/fashion × anônimo/logado) na fase `list` e `pdp` para confirmar que a altura do painel esquerdo passa a bater com o direito.
