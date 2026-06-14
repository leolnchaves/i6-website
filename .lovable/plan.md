
# Preview ao vivo de 3 fundos animados para a hero

As prévias estáticas do design tool não mostram animação — por isso nenhuma das opções "se mexeu" pra você. A solução é montar uma página temporária no próprio projeto, onde os 3 fundos rodam de verdade (CSS/SVG animados), você compara, escolhe, e aí aplico na hero da home.

## O que vou fazer

1. Criar uma rota temporária `/motion-preview` (sem header/footer, fora do menu) com 3 painéis full-screen empilhados, cada um com:
   - Fundo navy `#0B1224`
   - Um dos 3 backgrounds animados rodando
   - O título "Movement Intelligence" + subtítulo + CTA no centro (apenas para você sentir como fica com o conteúdo real)
   - Um rótulo discreto no canto identificando a opção

2. As 3 opções (todas suaves, minimalistas, sem clichê de IA, somente CSS/SVG, leves):

   **Opção A — Aurora Drift**  
   2–3 "blobs" de coral muito desfocados (`blur-3xl`, opacidade ~8%) flutuando devagar pelo fundo (loop de 20–30s). Sensação: névoa coral respirando. Zero linhas, zero ruído visual.

   **Opção B — Constelação de Dados**  
   Pontos coral minúsculos espalhados, conectados por linhas finíssimas (opacidade ~10–15%). Cada nó pulsa devagar; algumas linhas têm um "traço de luz" percorrendo (stroke-dashoffset). Sensação: rede neural sutil. Movimento quase imperceptível.

   **Opção C — Linhas de Fluxo Horizontais**  
   3–4 linhas horizontais finíssimas (1px, opacidade ~8%) atravessando a tela, com pequenos pontos coral deslizando ao longo delas em velocidades diferentes (loop infinito). Sensação: dados fluindo lateralmente — alinhado direto com "Data moves". Bem mais minimalista que as ondas atuais.

3. Substituo a `<WaveBackground />` atual apenas nessa página de preview — a home fica intacta até você escolher.

4. Você abre `/motion-preview`, role pelas 3, me diz "quero a B", e aí eu:
   - Substituo o conteúdo de `src/components/hometeste/WaveBackground.tsx` pela opção escolhida (ou crio um novo componente)
   - Removo a rota `/motion-preview` e arquivos temporários

## Arquivos

- **Criar**: `src/pages/MotionPreview.tsx` (página temporária)
- **Criar**: `src/components/hometeste/motion-options/MotionAuroraDrift.tsx`, `MotionConstellation.tsx`, `MotionFlowLines.tsx`
- **Editar**: `src/App.tsx` — adicionar rota `/motion-preview` (sem layout, sem i18n)
- **Não tocar**: `HeroMovimento.tsx`, `WaveBackground.tsx`, nenhuma outra página

Tudo CSS/SVG puro (keyframes Tailwind + animações SMIL do SVG quando necessário) — sem libs novas, sem impacto de build.

## Próximo passo depois da escolha

Quando você disser qual opção escolheu, eu aplico na home e limpo os arquivos temporários em um único passo.
