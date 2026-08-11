# Trocar o vídeo do hero PT (v8)

Apenas substituir o arquivo de vídeo do hero em PT. Nenhuma mudança de layout, gradientes, filtros ou responsividade.

Novo anexo: 1920x1080, 30 fps, 8,07 s, ~1,28 MB (H.264).

## Passos

1. Converter com `ffmpeg` mantendo 1920x1080, sem áudio: MP4/H.264 (CRF 20, `+faststart`) e WebM/VP9 (CRF 28), além do poster JPG nítido.
2. Publicar como assets CDN `hero-video-pt-v8.mp4`, `.webm` e `-poster.jpg`.
3. Em `src/components/hometeste/HeroDecisaoV4.tsx`, trocar somente os três imports de `hero-video-pt-v7.*` para `hero-video-pt-v8.*`.

## Observações

- `VIDEO_CLASS`, gradientes, glow coral e comportamento mobile/desktop permanecem idênticos.
- EN inalterado. Sem release/deploy nesta etapa.
