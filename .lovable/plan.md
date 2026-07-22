Em telas curtas, o container do diagrama está fixando a altura (`h-[min(78vh,980px)]`) com `w-auto`, o que faz a imagem encolher pela altura e perder largura lateral.

## Ajuste

Em `src/components/hometeste/HeroDecisaoV4.tsx`, trocar o dimensionamento para ser guiado pela largura, mantendo o `top-[18vh]` intacto:

- Wrapper interno: `w-[min(112vw,1550px)] h-auto` (remover a restrição de altura).
- Imagem: `w-full h-auto` (em vez de `h-full w-auto`).

Assim a imagem sempre usa a largura panorâmica disponível, e a altura acompanha proporcionalmente — sem alterar posição vertical nem o topo do gráfico.