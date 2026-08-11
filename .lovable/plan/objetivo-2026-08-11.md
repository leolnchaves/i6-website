Ajustar posição vertical e nitidez percebida do vídeo de fundo na hero da home PT (`/pt`), mantendo o mesmo conteúdo e a integração visual.

## Objetivo
Na screenshot atual a arte do vídeo fica colada no título superior, deixa espaço vazio entre a arte e o texto/CTA abaixo e aparenta pouca nitidez. Queremos descer a arte, centralizá-la visualmente entre o título e a descrição e priorizar a versão mais nítida.

## Escopo
- Alterar o posicionamento/renderização do vídeo no componente `src/components/hometeste/HeroDecisaoV4.tsx`.
- Manter o mesmo vídeo (`hero-video-pt-v8`), sem trocar seu conteúdo.
- Não alterar o título, a descrição, o CTA, nem a lógica do hero.

## Mudanças técnicas
1. **Mobile** — descer o container da faixa de vídeo para reduzir o espaço vazio entre arte e texto:
   - `top-[30svh] h-[34svh]` → `top-[33svh] h-[34svh]` (ou similar que ocupe melhor o espaço entre o título e o CTA).
   - Revisar o gradiente vertical para acompanhar a nova posição.
2. **Desktop** — mover o ponto focal do vídeo para baixo, aproximando o arte do centro:
   - `md:object-[center_58%]` → `md:object-[center_62%]`/`md:object-[center_65%]`.
   - Ajustar ligeiramente o gradiente vertical e o glow radial (`at 50% 60%`) para acompanhar o novo centro visual.
3. **Nitidez** — o navegador atualmente recebe primeiro o WebM de 450 KB, enquanto o MP4 equivalente tem 969 KB. Priorizar o MP4 como primeira fonte para reduzir os artefatos da versão mais comprimida e manter filtros que preservem definição, sem blur ou ampliação adicional.
4. **Verificação** — após o build, confirmar via preview que:
   - O arte neon não encosta mais no título.
   - O vídeo fica melhor centralizado entre o título e a descrição.
   - O espaço entre o fim da arte e a descrição/CTA fica mais equilibrado.
   - Textos e linhas do vídeo aparecem mais definidos em desktop e mobile.
