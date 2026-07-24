## Trocar imagem do Hero (apenas EN)

Substituir a imagem panorâmica em inglês da hero da Home pela nova imagem enviada, mantendo tudo o resto igual (dimensões do container, `w-[90%]`, `clip-path`, alinhamento, versão PT intocada).

### Passos
1. Fazer upload da imagem enviada (`user-uploads://ChatGPT_Image_23_de_jul._de_2026_23_27_55.png`) via `lovable-assets` como `hero-decisao-panorama-en-v2.png`, gerando `src/assets/hero-decisao-panorama-en-v2.png.asset.json`.
2. Em `src/components/hometeste/HeroDecisaoV4.tsx`:
   - Trocar o import `hero-decisao-panorama-en-transparent.png.asset.json` por `hero-decisao-panorama-en-v2.png.asset.json`.
   - Manter `heroMobileEn` (mobile EN) como está.
3. Não mexer em PT, layout, classes ou clip-path.

### Observações
- A imagem nova já tem fundo dark navy compatível com `#0B1224`, então mantemos o mesmo `clip-path` atual — se aparecer faixa residual na borda inferior, ajusto o inset num segundo passo.
- Sem publicação de release; só fazemos o teste no preview.
