## Objetivo
Trocar apenas a imagem do hero da Home no site em **inglês** pela nova arte enviada (infográfico "Anticipated Decision"), mantendo proporções, posicionamento e comportamento responsivo atuais. A versão PT permanece intacta.

## Passos

1. **Preparar a imagem em alta resolução com fundo transparente**
   - Fonte: `user-uploads://ChatGPT_Image_23_de_jul._de_2026_23_12_30.png` (~1700px de largura).
   - Processar com Python/PIL aplicando chroma-key sobre o fundo azul-escuro (`#0B1224` e tons próximos), com tolerância suave nas bordas para preservar o glow coral e as partículas — mesma técnica usada nas versões PT/EN anteriores.
   - Gerar duas variantes preservando resolução máxima do original:
     - **Panorâmica (desktop/tablet)** — usa o próprio arquivo enviado (formato landscape).
     - **Mobile (vertical)** — recorte/recomposição vertical do mesmo asset para caber no `<picture>` mobile atual. Como a nova arte é landscape, faremos um crop centralizado ampliando o núcleo (círculo "Anticipated Decision" + setas principais) para manter legibilidade em telas estreitas, sem esticar.
   - Salvar como PNG transparente e subir via `lovable-assets` gerando dois novos `.asset.json`:
     - `src/assets/hero-decisao-panorama-en-v2-transparent.png.asset.json`
     - `src/assets/hero-decisao-mobile-en-v2-transparent.png.asset.json`

2. **Trocar apenas as referências do idioma EN**
   - Em `src/components/hometeste/HeroDecisaoV4.tsx`, substituir os imports:
     - `heroPanoramaEn` → novo asset panorâmico EN
     - `heroMobileEn` → novo asset mobile EN
   - Manter inalterados `heroPanoramaPt` e `heroMobilePt`.
   - Manter todo o layout: container `container mx-auto px-6`, `w-[90%]`, `clip-path: inset(0 0.5% 2.5% 0.5%)`, paddings do hero, `<picture>` com breakpoint em 768px.

3. **Validação visual**
   - Trocar o preview para inglês (`/en`) e conferir desktop + mobile: bordas sem faixa branca, fundo 100% integrado ao `#0B1224`, sem perda de nitidez.
   - Conferir que `/pt` continua com a arte antiga.

## Fora do escopo
- Nenhuma alteração em copy, CTA, layout, PT, ou em outras seções.
- Sem republicação/tag no GitHub nesta rodada (aguardo seu "publique o patch" após aprovar visualmente).

## Detalhes técnicos
- Chroma-key: converter para RGBA, calcular distância de cada pixel ao fundo alvo em espaço Lab; alpha = 0 quando distância < limiar interno, alpha = 255 quando > limiar externo, transição linear entre eles. Preserva glow laranja e detalhes de partículas.
- Não redimensionar para baixo: manter dimensão nativa do upload (~1700×950) no panorâmico; mobile recebe crop, não downscale.
- Assets antigos (`hero-decisao-panorama-en-transparent`, `hero-decisao-mobile-en-transparent`) permanecem no repo por ora — posso limpar depois com `lovable-assets delete` se aprovar.