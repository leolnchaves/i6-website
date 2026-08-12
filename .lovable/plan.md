# Hero: vídeo em desktop/tablet, imagem estática no mobile

## Problema
1. **Tablet (768–1023px)**: o vídeo entra na regra `md:` com `object-cover` + `object-[center_58%]`/`translate-y-[4vh]`. Em proporção retrato o `cover` amplia e corta a arte, então o mapa neon aparece cortado/desproporcional (anexo 1).
2. **Mobile (<768px)**: o vídeo está confinado numa faixa (`top-[33svh] h-[34svh]`) com `object-contain`, ocupando só um pedaço pequeno da tela.

## Solução

### Mobile (< 768px)
- Não renderizar o vídeo.
- Exibir a imagem estática do mapa neon, escolhida por idioma:
  - PT: anexo 2 (`4-3.png`)
  - EN: anexo 3 (`6.png`)
- Ambas viram assets de CDN (`lovable-assets create`), em resolução original (1920px de largura), sem recompressão.
- Tratamento do fundo para não aparecer emenda com o navy da home:
  - A arte é `object-contain`, centralizada no espaço central do hero.
  - Máscara/fade nas quatro bordas via `mask-image` (linear vertical + horizontal) para a arte dissolver no `#0B1224`.
  - Overlay leve de navy nas bordas e `mix-blend-mode: lighten` para o preto de fundo da imagem somar com o navy (se alterar a cor do neon, mantém só a máscara).
  - Glow coral radial atrás do núcleo, como já existe hoje.
- A imagem ocupa a faixa central entre título e descrição, com largura total e altura confortável (aprox. `max-h-[38svh]`), sem corte lateral.

### Tablet (768–1023px)
- Vídeo mantido, mas com enquadramento sem corte: `object-contain` nessa faixa (em vez de `cover`), centralizado, ocupando toda a largura, sem `translate-y` agressivo.
- Gradientes verticais/laterais ajustados para essa faixa.

### Desktop (≥ 1024px)
- Nada muda: `object-cover`, tela cheia, `object-[center_58%]` (ou o valor atual), gradientes e glow como estão.

## Técnico
- Arquivo alterado: `src/components/hometeste/HeroDecisaoV4.tsx`.
- Novos pointers: `src/assets/hero-mapa-mobile-pt-v9.png.asset.json` e `src/assets/hero-mapa-mobile-en-v9.png.asset.json`.
- Estrutura: a camada de vídeo passa a ser `hidden md:block`; a camada de imagem mobile é `md:hidden` e vale para PT e EN.
- Sem mudança de copy, CTA, rotas, i18n ou lógica.
- Verificação nos três breakpoints (393px, 820px, 1440px) antes de publicar.

## Publicação
Sem release nesta etapa — só preview. Publico o patch depois que você aprovar o resultado visual.
