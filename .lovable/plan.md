Ajustar posição vertical do vídeo de fundo na hero da home PT (`/pt`), mantendo o arquivo de vídeo e a integração visual inalterados.

## Objetivo
Na screenshot atual o arte do vídeo fica colada no título superior e deixa espaço vazio entre a arte e o texto/CTA abaixo. Queremos descer a arte um pouco e aproximá-la do centro visual entre o título e a descrição.

## Escopo
- Alterar apenas o posicionamento/renderização do vídeo no componente `src/components/hometeste/HeroDecisaoV4.tsx`.
- Não trocar o asset de vídeo (`hero-video-pt-v8.*`).
- Não alterar o título, a descrição, o CTA, nem a lógica do hero.

## Mudanças técnicas
1. **Mobile** — descer o container da faixa de vídeo para reduzir o espaço vazio entre arte e texto:
   - `top-[30svh] h-[34svh]` → `top-[33svh] h-[34svh]` (ou similar que ocupe melhor o espaço entre o título e o CTA).
   - Revisar o gradiente vertical para acompanhar a nova posição.
2. **Desktop** — mover o ponto focal do vídeo para baixo, aproximando o arte do centro:
   - `md:object-[center_58%]` → `md:object-[center_62%]`/`md:object-[center_65%]`.
   - Ajustar ligeiramente o gradiente vertical e o glow radial (`at 50% 60%`) para acompanhar o novo centro visual.
3. **Verificação** — após o build, confirmar via preview que:
   - O arte neon não encosta mais no título.
   - O vídeo fica melhor centralizado entre o título e a descrição.
   - O espaço entre o fim da arte e a descrição/CTA fica mais equilibrado.
