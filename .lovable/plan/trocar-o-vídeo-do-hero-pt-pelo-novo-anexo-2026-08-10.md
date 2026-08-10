# Trocar o vídeo do hero PT pelo novo anexo

Substituir apenas o arquivo de vídeo do hero em PT (`hero-i6-4.mp4`, 1280x720, 24 fps, 10 s, ~1,5 MB). Nenhuma mudança de layout, gradientes, filtros, responsividade ou conteúdo.

## Passos

1. Converter com `ffmpeg`: WebM/VP9 (CRF ~34) + MP4/H.264 (CRF ~26, `+faststart`), sem áudio, e extrair poster JPG.
2. Publicar como assets CDN `hero-video-pt-v5.webm`, `.mp4` e `-poster.jpg`.
3. Em `src/components/hometeste/HeroDecisaoV4.tsx`, trocar somente os três imports de `hero-video-pt-v4.*` para `hero-video-pt-v5.*`.
4. Validar por screenshot do preview PT (desktop e mobile) para confirmar que a integração com o navy segue igual.

## Observações

- Nenhuma outra classe, gradiente ou filtro é alterado.
- EN inalterado. Sem release/deploy nesta etapa.
