# 3 novas opções de movimento — foco lateral esquerda, fluxo vertical

Vou substituir as 3 opções atuais (Aurora Drift, Silk Streams, Flow Lines) por 3 novas variações, todas centradas na **faixa lateral esquerda** com movimento **vertical suave** (cima→baixo ou baixo→cima). Tudo continua em SVG/CSS puro, sem libs, navy `#0B1224` + coral `#F4845F`.

A página `/motion-preview` continua mostrando os 3 painéis empilhados para você comparar lado a lado antes de aplicarmos no hero.

## Opção A — Vertical Rain (Chuva de Dados)

Faixa de ~30% da largura na esquerda. Linhas verticais finíssimas (1px) caindo lentamente de cima para baixo, com pequenos pontos coral brilhantes deslizando dentro delas, deixando rastro vertical curto. Velocidades e delays diferentes em cada linha → sensação de fluxo contínuo de dados. Fade suave nas bordas superior e inferior.

## Opção B — Aurora Vertical (Coluna de Luz)

Coluna lateral esquerda com 2–3 "blobs" coral muito difusos (`blur` alto, opacidade ~20–30%) subindo lentamente em loop, como uma aurora boreal vertical. Sem linhas, só luz. Movimento muito lento (40–60s) — extremamente sutil, moderno e premium. Inspirado na referência tipo "ambient glow".

## Opção C — Ascending Streams (Fluxo Ascendente)

3–4 curvas verticais bezier finas, partindo da base e subindo até o topo, ocupando a faixa esquerda. Pontos de luz coral sobem ao longo das curvas (`animateMotion`) com rastro brilhante. As próprias curvas pulsam de leve (`stroke-dasharray` shimmer). Sensação de "sinais" subindo — inteligência emergindo dos dados.

## Detalhes técnicos

- Cria: `MotionVerticalRain.tsx`, `MotionAuroraVertical.tsx`, `MotionAscendingStreams.tsx` em `src/components/hometeste/motion-options/`
- Remove: `MotionAuroraDrift.tsx`, `MotionSilkStreams.tsx`, `MotionFlowLines.tsx`
- Atualiza: `src/pages/MotionPreview.tsx` com os 3 novos imports e labels
- Não toca em: `HeroMovimento.tsx`, `WaveBackground.tsx`, ou qualquer outro arquivo
- Faixa lateral: container absoluto `left-0 top-0 h-full w-[35%]` com `mask-image` lateral pra fade suave na borda direita

Depois que você escolher uma, faço a aplicação no hero e limpo os arquivos temporários em um único passo.
