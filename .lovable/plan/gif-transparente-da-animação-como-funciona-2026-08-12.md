# GIF transparente da animação "Como funciona"

Objetivo: recriar exatamente a animação da seção COMO FUNCIONA (chips → i6 Platform → chips, com as partículas coral percorrendo as curvas) e exportar como GIF com fundo transparente, sem alterar o site.

## Como será feito

1. Capturar a animação real do preview (não recriar do zero), garantindo fidelidade 1:1:
   - abrir `/pt` (e `/en`) em viewport largo (1440px) para renderizar a versão desktop do grafo;
   - injetar CSS **apenas na sessão do navegador** (nada muda no código do site) para: fundo da seção transparente, remover a faixa de gradiente navy, e deixar o card central branco sólido no lugar de `white/40 + backdrop-blur` (blur sobre transparência gera artefatos);
   - esconder cabeçalho da seção (badge/título/subtítulo) para o GIF conter só o diagrama, como na imagem enviada.
2. Congelar o tempo da animação SVG frame a frame com `svg.setCurrentTime()` e tirar um screenshot do elemento do grafo com `omit_background: true`, gerando PNGs transparentes.
   - loop completo = 2.6s (duração dos `animateMotion`); 26 frames a 10fps ou 39 a 15fps para um GIF leve e com loop perfeito.
3. Montar o GIF com ffmpeg (`palettegen`/`paletteuse` com `alpha_threshold`) preservando transparência e loop infinito.
4. Verificar o resultado: inspecionar alguns frames e o GIF final (transparência real, sem borda cinza, sem corte nas pontas das curvas), e ajustar/reencodar se necessário.

## Entregáveis

- `/mnt/documents/como-funciona-pt.gif` (fundo transparente, loop)
- `/mnt/documents/como-funciona-en.gif` (mesma animação em inglês)
- Também um `.webm`/`.png` (APNG) com transparência real, caso queira usar em slides/site — GIF tem transparência binária, então bordas suaves e sombras podem apresentar leve serrilhado.

## Notas técnicas

- Nenhum arquivo do projeto é alterado; scripts ficam em `/tmp/browser/`.
- Textos e chips ficam legíveis em fundo claro; sobre fundo escuro o GIF continuará com textos escuros (posso gerar uma variante em versão escura se precisar).
