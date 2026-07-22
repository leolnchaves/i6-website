## Por que "não subiu" no Mac 13"

Hoje a imagem é dimensionada só pela **largura** (`min(112vw, 1550px)`). Em telas curtas (MacBook 13" ≈ 800px de altura), a altura resultante da imagem (~800–820px) ocupa quase toda a hero, então mover o `top` de 12vh → 8vh corta um pouco no topo mas o "vale" do desenho continua caindo em cima do texto/CTA. Visualmente parece que "nada mudou".

## Ajuste em `src/components/hometeste/HeroDecisaoV4.tsx`

Trocar a estratégia de dimensionamento para respeitar a **altura** da hero em telas curtas, mantendo o comportamento panorâmico em telas grandes:

1. No wrapper interno do diagrama:
   - `w-[min(112vw,1550px)] h-auto` → `w-auto max-w-[min(112vw,1550px)] h-[min(62vh,780px)]`
2. Na `<img>`:
   - `w-full h-auto max-w-none` → `h-full w-auto max-w-none`
3. Manter `top-[8vh]`, máscara radial, opacidade e todo o restante (título em `pt-[16vh]`, bloco descrição+CTA em `bottom-[5vh]`) intactos.

Efeito: em telas curtas a imagem encolhe pela altura (largura acompanha proporcionalmente), o `top` volta a ter efeito visível e o vale do gráfico deixa de sobrepor o texto/CTA. Em telas grandes (>1250px de altura), o cap de 780px preserva o visual panorâmico atual.

Se depois ainda houver sobreposição no seu Mac, faço micro-ajuste no cap de altura (ex.: `58vh`) sem mudar arquitetura.