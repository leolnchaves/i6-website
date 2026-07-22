## Problema
O PNG do diagrama tem fundo azul-escuro próximo (mas não idêntico) ao `#0B1224` da hero. Como a imagem é opaca (com `opacity: 0.93` + máscara radial), a diferença de tom vira uma "moldura" perceptível ao redor do diagrama.

## Solução
Tornar o fundo do PNG **transparente** para que o `#0B1224` da hero apareça atrás dos traços/nós, eliminando qualquer diferença de cor. Aproveitar para descer imagem e bloco Texto+CTA em 4vh.

### Passos
1. **Reprocessar o asset** (`ChatGPT_Image_22_de_jul._de_2026_18_57_20.png`) via Python/PIL:
   - Ler o PNG original em alta resolução.
   - Converter pixels do fundo escuro em alpha 0, preservando traços coral/branco e seu glow.
   - Abordagem: `alpha = max(R,G,B)` normalizado (subtraindo levemente o piso escuro). Áreas pretas/navy viram totalmente transparentes; o glow coral mantém suavidade natural, sem halo retangular.
   - Salvar em 2x (~3832×1642) como PNG com transparência.
2. **Publicar novo asset** via `lovable-assets create` → `src/assets/hero-decisao-transparent-hd.png.asset.json`.
3. **Atualizar `HeroDecisaoV4.tsx`**:
   - Trocar o import para o novo asset transparente.
   - Remover `opacity: 0.93` (deixar 1.0) e remover a `maskImage` radial (a transparência já faz o fade natural).
   - Descer a **imagem em 4vh**: `-translate-y-[calc(50%-4vh)]` → `-translate-y-[calc(50%-8vh)]`.
   - Descer o **bloco Texto+CTA em 4vh**: `bottom-[9vh]` → `bottom-[5vh]`.
   - Manter tamanho e responsividade atuais.
4. **Manter** o halo `radial-gradient` atrás do título (protege legibilidade do H1, não afeta o fundo).

### Resultado esperado
Diagrama flutua sobre o `#0B1224` sem qualquer "retângulo" ou variação tonal visível; imagem e CTA 4vh mais baixos.
