# Hero PT com o vídeo em alta resolução

O novo anexo (`hero-i6-6.mp4`) tem 3808x2176 a 30 fps e ~3 Mbps (3,7 MB) — muito acima do arquivo anterior (1268x724, ~425 kbps), que era a causa principal do borrão.

## O que fazer

1. **Gerar os arquivos de exibição a partir do novo master**, sem downscale agressivo:
   - MP4/H.264 em 1920x1098, CRF ~20, `+faststart`, sem áudio (fallback Safari/iOS).
   - WebM/VP9 em 1920x1098, CRF ~28, `-deadline good -cpu-used 2`, sem áudio.
   - Reescala com `lanczos` para preservar as linhas finas neon.
   - Poster JPG de alta qualidade do primeiro frame.
   - Alvo de peso: ~1–2,5 MB por arquivo, aceitável para um hero com `preload="metadata"`.
2. **Publicar como assets CDN** `hero-video-pt-v7.webm`, `.mp4` e `-poster.jpg`.
3. **Trocar os três imports** em `src/components/hometeste/HeroDecisaoV4.tsx` (de `v6` para `v7`).
4. **Nitidez na exibição**: remover o `brightness(0.95)` (ou levar a 1.0) se as linhas ficarem apagadas, mantendo `saturate-100 contrast(1.02)`. Nenhuma mudança em layout, gradientes de integração, responsividade ou conteúdo.
5. **Verificar** por screenshot do preview PT em desktop (1366x902) e mobile, confirmando nitidez e a mesma fusão com o navy.

## Técnico

- Codificação com `ffmpeg` no sandbox, partindo direto de `/mnt/user-uploads/hero-i6-6.mp4`.
- Único arquivo de código alterado: `src/components/hometeste/HeroDecisaoV4.tsx`.
- Pointers antigos (`hero-video-pt-v1..v6`) permanecem no repo sem uso.
- Sem release/deploy nesta etapa.
