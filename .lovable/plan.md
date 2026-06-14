# Waves apenas no hero da home

Hoje as side waves vivem em `DarkLayout` como camada `fixed` que cobre todas as rotas. Vamos restringir a presença **somente ao hero da home** e aproveitar o confinamento para escalar e afastar das bordas.

## Mudanças

### 1) `DarkLayout.tsx`

- Remover `import` e render de `<WaveBackground />` e a lógica `hideWaves`.
- Demais páginas ficam com navy puro (`#0B1224`).

### 2) `HeroMovimento.tsx`

- Importar `WaveBackground` e renderizá-lo dentro da `<section>` do hero, como **camada `absolute`** confinada à seção (não mais `fixed`).
- A `<section>` já é `relative ... overflow-hidden`, então o wave fica recortado nos limites do hero — some assim que o usuário rola para a próxima seção.

### 3) `WaveBackground.tsx` — redimensionar e afastar da borda

Com o wave restrito ao hero, podemos torná-lo mais imponente:

- Trocar `fixed left-0 top-0 h-full w-[72px]` por `absolute inset-y-0 left-0 h-full w-[180px]` (cerca de 2,5× a largura atual).
- Adicionar um espelhamento à direita: render duas cópias, uma em `left-0` e outra em `right-0 scale-x-[-1]` (ou via prop) para equilibrar visualmente o hero.
- Ajustar o `viewBox` para `0 0 180 1200` e redesenhar os paths para ocuparem a faixa maior, **afastando as curvas da borda**: âncoras horizontais deslocadas em ~40–60px para o miolo (curva principal por volta de `x=80–100`, em vez de `x=19`).
- Aumentar `strokeWidth` proporcionalmente (~1.4–2.2) e manter as opacidades coral atuais.
- Manter o `linear-gradient mask` para suavizar o lado interno, agora com transição mais longa (`black 35% → transparent 100%`) já que há mais espaço.

### 4) Memória `mem://style/global/vertical-waves`

Reescrever para refletir que as waves agora vivem **apenas no hero da home** (lado esquerdo + direito), confinadas à seção. Remover a regra antiga "shown on all pages except /privacy-policy and /ethics-policy".

## Fora de escopo

- Animações (`curve-flow-*`) permanecem.
- Cores do design system (`#F4845F`) permanecem.
- Outras seções da home (Tese, Sinais, etc.) ficam sem waves, com navy puro.

Confirma que sigo?
