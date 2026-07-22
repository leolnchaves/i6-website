## Trocar imagem do hero V4 por versão achatada

1. Criar asset pointer via `lovable-assets` a partir de `/mnt/user-uploads/ChatGPT_Image_22_de_jul._de_2026_18_26_06.png` → `src/assets/hero-decisao-panorama-wide.png.asset.json`.
2. Em `src/components/hometeste/HeroDecisaoV4.tsx`:
   - Trocar o import de `hero-decisao-panorama.png` pelo novo asset pointer (usar `.url`).
   - Redimensionar guiado pela largura: wrapper `w-[min(100vw,1750px)] h-auto`, imagem `w-full h-auto`.
   - Centralizar verticalmente entre o título e o bloco texto+CTA usando `top-1/2 -translate-y-1/2` (em vez do `top-[18vh]` fixo), mantendo z-index e máscara radial atuais.
3. Preservar tudo mais intacto: título, descrição, CTA, halo, glow do "antes".

Resultado: imagem panorâmica achatada ocupando a largura total sem esticar, centralizada no vale entre título e CTA.
