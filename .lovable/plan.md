# Trocar o vídeo do hero (PT) pela animação do GIF anexo

## Objetivo
Usar a animação enviada (`hero-i6.gif`, 1097x627, 25 fps, ~9,6 s) como fundo do hero em PT, com o quadro do GIF imperceptível contra o navy do site.

## O que fazer

1. **Converter o GIF em vídeo, não usar o GIF cru**
   - O GIF tem 5,9 MB e paleta de 256 cores (o que cria banding no fundo escuro, justamente o que torna o quadro visível).
   - Gerar `WebM/VP9` (alvo ~400–700 KB) + `MP4/H.264 faststart` como fallback, 1097x627 a 25 fps, sem áudio, loop perfeito, além de um poster JPG do frame inicial.
   - Publicar os três como assets de CDN (`hero-gif-pt-v1.webm/.mp4/-poster.jpg`), no mesmo padrão atual.

2. **Fundir o quadro com o fundo da tela**
   - O fundo do GIF é quase preto (mais escuro que `#0B1224`), então o retângulo aparece. Correção em duas frentes:
     - **Blend**: manter `mix-blend-mode: lighten` — com o navy da seção por baixo, todo pixel do GIF mais escuro que `#0B1224` é descartado e apenas os traços/glows aparecem. O quadro deixa de existir.
     - **Máscara de borda ampliada**: feather radial + linear nas quatro bordas com transição longa, para que nenhuma linha reta apareça mesmo em traços que cheguem perto da borda.
   - Manter o glow coral no núcleo e as vinhetas navy laterais.
   - Manter o véu fino sem blur (`bg-[#0B1224]/10`) para as cores não ficarem vibrantes demais — nível já aprovado.

3. **Enquadramento**
   - Manter a faixa atual (centrada entre título e descrição, `object-contain`), ajustando altura para a proporção 1097x627 sem cortar o núcleo "Decisão Antecipada".

4. **Performance / acessibilidade**
   - `autoplay muted loop playsinline preload="metadata"`, poster imediato.
   - Mobile e `prefers-reduced-motion`: só o poster (comportamento atual mantido).

5. **Verificação**
   - Screenshot do preview PT confirmando ausência de retângulo e legibilidade do título/CTA.
   - EN inalterado. Sem release/deploy nesta etapa.

## Técnico
- Arquivo alterado: `src/components/hometeste/HeroDecisaoV4.tsx` (troca dos imports de asset e ajuste da faixa/máscara).
- Novos pointers em `src/assets/`; os pointers do vídeo antigo permanecem no repo, sem uso.
- Codificação com `ffmpeg` no sandbox (`libvpx-vp9` CRF ~34 e `libx264` CRF ~26, `-an`, `+faststart`).
