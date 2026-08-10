# Por que o vídeo do hero parece desfocado

## Causas confirmadas

1. **O arquivo original já é de baixa qualidade.** `hero-i6-5.mp4` tem 1268x724 e apenas ~425 kbps (541 KB para 10 s). Nessa taxa, um vídeo com muitas linhas finas e brilho neon perde nitidez logo na origem.
2. **A conversão reduziu ainda mais.** Os arquivos publicados ficaram em ~193 KB (MP4) e ~206 KB (WebM), ou seja cerca de 155 kbps — menos da metade do bitrate do original. Compressão em cima de compressão amplifica o borrão.
3. **A imagem é ampliada na tela.** No desktop o vídeo usa `object-cover` em tela cheia: num viewport de 1366x902 os 1268x724 são esticados ~1,25x e recortados, então cada pixel do vídeo cobre mais de um pixel da tela.
4. **Filtro de brilho.** O hero aplica `brightness(0.95)`, que reduz levemente o contraste das linhas neon e reforça a sensação de suavidade.

## O que fazer

1. **Reencodar sem perda visível**: gerar novamente WebM/VP9 e MP4/H.264 com qualidade alta (CRF ~20 no H.264 e ~28 no VP9, com `-deadline good -cpu-used 2`), aceitando arquivos maiores (~1–2 MB) — ainda leves para um hero.
2. **Upscale controlado no encode**: renderizar a 1904x1088 (1,5x) com filtro de nitidez suave (`lanczos` + `unsharp` leve), para que a exibição em tela cheia não precise esticar pixels.
3. **Ajustar a exibição**: manter `object-cover` no desktop e reduzir/remover o `brightness(0.95)` se as linhas continuarem apagadas, sem mexer em gradientes, layout ou responsividade.
4. **Verificar** com screenshot do preview PT em desktop (1366x902) e mobile, comparando a nitidez do núcleo da arte.

## Observação importante

Como o arquivo enviado já nasce com pouca informação, o reencode melhora bastante mas não recupera detalhe que não existe. Se o resultado ainda não satisfizer, o caminho definitivo é exportar o vídeo da origem em maior resolução/bitrate (ex.: 1920x1080 a 4–8 Mbps) e reenviar.

## Técnico

- Novos assets CDN `hero-video-pt-v7.webm`, `.mp4` e `-poster.jpg`.
- Único arquivo de código alterado: `src/components/hometeste/HeroDecisaoV4.tsx` (imports dos assets e, se necessário, o filtro de brilho).
- Sem release/deploy nesta etapa.
