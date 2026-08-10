# Remover o retângulo preto do vídeo no hero (PT)

## Problema
O vídeo tem fundo preto sólido. Como ele é apenas atenuado por filtros e um véu navy, esse preto aparece como um bloco retangular mais escuro que o navy do site (#0B1224), criando uma moldura visível atrás do título e da arte.

## Solução
Fazer o preto do vídeo desaparecer por composição, em vez de tentar escondê-lo com camadas:

1. Aplicar `mix-blend-mode: screen` no vídeo (e no `<img>` de fallback). Com screen, o preto puro fica invisível e apenas os traços/glows luminosos são somados sobre o navy — o retângulo desaparece por completo.
2. Reequilibrar a atenuação para o novo modo: como screen clareia, aumentar levemente o contraste e reduzir o brilho (`saturate(0.7) brightness(0.85) contrast(1.05)`), mantendo cores discretas e traço nítido.
3. Remover o véu navy plano sobre o vídeo — ele deixa de ser necessário e só reduziria a luminosidade dos traços.
4. Manter a máscara radial das bordas, as vinhetas navy e o glow coral como estão.

Resultado esperado: a arte parece nascer do próprio fundo do site, sem nenhum bloco escuro perceptível.

## Detalhes técnicos
Arquivo: `src/components/hometeste/HeroDecisaoV4.tsx`, bloco `isPt` do fundo em vídeo. Adicionar `mixBlendMode: 'screen'` ao `style` do `<video>` e do `<img>`, ajustar `filter`, e remover o div do véu `rgba(11,18,36,0.12)`. O container do vídeo já é isolado por `z-0` + máscara, então o blend não afeta o texto (que está em `z-10`).
