## Substituir chuva de gotas por ondas coral sutis no Hero

**Arquivo:** `src/components/hometeste/HeroMovimento.tsx` (+ asset da imagem)

### Passos

1. **Subir a imagem via Lovable Assets** (sem AI edit, preserva shape/estilo exatos):
   - `lovable-assets create --file /mnt/user-uploads/fundo_site.png --filename hero-waves.png > src/assets/hero-waves.png.asset.json`

2. **Remover a chuva de gotas** do `HeroMovimento.tsx`:
   - Remover `import MotionVerticalRain` e o `<MotionVerticalRain />`.
   - Arquivo `MotionVerticalRain.tsx` fica no repo (não excluído sem pedido).

3. **Adicionar a imagem como fundo do hero, recolorindo apenas via CSS** (mantém traços/design 100% iguais):
   - `<img>` `absolute inset-0 w-full h-full object-cover pointer-events-none select-none` `aria-hidden`.
   - Recolorir para o coral padrão `#F4845F` usando filtro CSS que preserva a forma:
     - `filter: brightness(0) saturate(100%) invert(64%) sepia(48%) saturate(1100%) hue-rotate(330deg) brightness(96%) contrast(92%)` (equivalente ao coral do site; ajusto no build se necessário validando visualmente).
   - Opacidade sutil: `opacity: 0.18` (bem baixa, integra ao navy sem competir com o conteúdo).
   - `mix-blend-mode: screen` para as ondas se fundirem no `#0B1224` sem virarem manchas escuras.

4. **Posicionamento do conteúdo entre as ondas**:
   - A imagem tem ondas concentradas no topo e no rodapé com faixa limpa no meio; o bloco central (título/sub/descrição/CTA) já usa `flex items-center justify-center` — cai naturalmente na faixa livre. `z-10` no conteúdo garante que fica acima da imagem.

### Fora de escopo
- Não altero copy, cores do título/CTA, scroll indicator, nem outras seções.
- Não uso AI para editar a imagem — a recoloração é 100% via filtro CSS para preservar shape/estilo/design.
