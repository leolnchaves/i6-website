O halo residual visível é uma "franja" de pixels perto do fundo `#0B1224` que ainda ficaram com alpha parcial. Vou aplicar um chroma-key mais firme + descontaminação de spill, mantendo os traços laranja intactos:

1. Reprocessar as 4 imagens da hero a partir dos PNGs baixados no /tmp/hero (fontes já disponíveis).
2. Parâmetros: `bg=#0B1224`, `lo=16`, `hi=34` (janela um pouco mais larga e deslocada; corta mais halo sem tocar nos traços laranja, que estão >80 de distância do fundo).
3. Adicionar spill suppression: onde alpha < 255, remover a contribuição do fundo dos canais RGB (unpremultiply → subtrair projeção sobre BG → clamp). Isso elimina o tom navy que "vaza" nas bordas.
4. Salvar em resolução original (1400×500 desktop, 700×500 mobile) sem compressão com perdas.
5. Upload via `lovable-assets` com novos nomes (`-v8-transparent` PT desktop, `-v7-transparent` EN desktop, `-v6-transparent` PT mobile, `-v5-transparent` EN mobile) e atualizar imports em `HeroDecisaoV4.tsx`.

Sem mudanças em layout, tamanho ou clip-path — só troca de assets.