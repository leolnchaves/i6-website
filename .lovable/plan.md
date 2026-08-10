# Trocar o fundo do hero (PT) pelo vídeo anexo

## Objetivo
Usar o `hero-i6.mp4` enviado (1268x724, 30 fps, 10 s, ~890 KB) como fundo do hero em PT, com o quadro do vídeo imperceptível contra o navy do site.

## O que fazer

1. **Preparar e publicar o vídeo**
   - Reencode leve: `WebM/VP9` (alvo ~400–700 KB) para navegadores compatíveis + `MP4/H.264 faststart` como fallback (Safari/iOS), sem áudio, mantendo 1268x724 e 30 fps.
   - Extrair um poster JPG do frame inicial (usado em mobile, conexões lentas e `prefers-reduced-motion`).
   - Publicar os três como assets de CDN (`hero-video-pt-v2.webm`, `.mp4`, `-poster.jpg`), no mesmo padrão atual.

2. **Fundir o quadro com o fundo da tela**
   - Manter `mix-blend-mode: lighten` sobre o navy `#0B1224`: todo pixel do vídeo mais escuro que o navy é descartado, então o retângulo escuro deixa de existir.
   - Máscara de borda (feather radial + linear nas quatro direções) com transição longa, para não haver nenhuma linha reta perceptível.
   - Manter as vinhetas navy laterais e o glow coral no núcleo.
   - Manter o véu fino sem blur (`bg-[#0B1224]/10`) e os filtros já aprovados (`saturate(0.72) brightness(0.9) contrast(1.03)`), ajustando levemente se o novo vídeo ficar mais claro/escuro.

3. **Enquadramento**
   - Manter a faixa centrada entre título e descrição com `object-contain`, ajustando a altura para a proporção 1268x724 sem cortar o núcleo "Decisão Antecipada" nem encostar nos textos.

4. **Performance e acessibilidade**
   - `autoplay muted loop playsinline preload="metadata"`, poster imediato, `aria-hidden`, `pointer-events-none`.
   - Mobile e `prefers-reduced-motion`: apenas o poster (comportamento atual).

5. **Verificação**
   - Screenshot do preview PT confirmando ausência de retângulo e boa legibilidade do título/CTA.
   - EN inalterado. Sem release/deploy nesta etapa.

## Técnico
- Arquivo alterado: `src/components/hometeste/HeroDecisaoV4.tsx` (imports dos novos assets, altura da faixa, máscara).
- Novos pointers em `src/assets/`; os pointers antigos (`hero-video-pt-v1*`, `hero-decisao-neon-pt-v1`) permanecem no repo sem uso.
- Codificação com `ffmpeg` no sandbox (`libvpx-vp9` CRF ~34 e `libx264` CRF ~26, `-an`, `+faststart`).
