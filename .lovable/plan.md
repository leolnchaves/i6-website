# Novo vídeo no hero PT em tela cheia (estilo success stories)

## Objetivo
Trocar o vídeo do hero PT pelo novo arquivo enviado (`hero-i6-3.mp4`, 1268x724, 30 fps, 10 s, ~680 KB) e voltar à integração usada na tela de detalhe de success stories: vídeo cobrindo todo o fundo, fundido ao navy por camadas de gradiente.

## Implementação
1. Converter o vídeo com `ffmpeg` (WebM/VP9 + MP4/H.264 faststart, sem áudio) e extrair um poster JPG; publicar como assets CDN `hero-video-pt-v4.*`.
2. Em `src/components/hometeste/HeroDecisaoV4.tsx`:
   - vídeo como fundo real: `absolute inset-0 w-full h-full object-cover` — sem faixa de altura, sem `object-contain`, sem máscara radial, sem `mix-blend-mode`;
   - filtro no vídeo: `brightness(0.7) saturate(0.85) contrast(1.05)`;
   - camadas de integração idênticas ao success stories: navy plano `#0B1224/35`, gradiente vertical `transparent → #0B1224/40 → #0B1224` e gradiente horizontal `#0B1224/50 → transparent → #0B1224/50`;
   - manter o glow coral sutil e o conteúdo (título, descrição, CTA) em `z-10`.
3. Manter `autoplay muted loop playsinline preload="metadata"`, poster imediato e fallback só-poster em `prefers-reduced-motion`.

## Validação
- Screenshot do preview PT confirmando ausência de retângulo/bordas e boa legibilidade do título e do CTA.
- EN inalterado. Sem release/deploy nesta etapa.
