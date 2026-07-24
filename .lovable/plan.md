## Substituir imagens da Hero (PT desktop, PT mobile, EN mobile)

Trocar as três imagens restantes da hero pelas novas versões enviadas, mantendo o mesmo container, `w-[90%]`, `clip-path` e alinhamento já aplicados na versão EN desktop.

### Mapeamento
- Anexo 1 (`ChatGPT_Image_23_de_jul._de_2026_23_46_39.png`) → PT desktop/tablet
- Anexo 2 (`3.png`) → PT mobile
- Anexo 3 (`4-2.png`) → EN mobile

### Passos
1. Upload das 3 imagens via `lovable-assets`, gerando novos pointers em `src/assets/`:
   - `hero-decisao-panorama-pt-v3.png.asset.json`
   - `hero-decisao-mobile-pt-v3.png.asset.json`
   - `hero-decisao-mobile-en-v2.png.asset.json`
2. Em `src/components/hometeste/HeroDecisaoV4.tsx`, atualizar os 3 imports correspondentes (`heroPanoramaPt`, `heroMobilePt`, `heroMobileEn`). Nada mais muda — mesmas classes, mesmo `clip-path`, mesma estrutura `<picture>`.
3. Sem publicação de release; validação apenas no preview.

### Observação
As novas imagens já vêm com fundo dark navy compatível com `#0B1224`, então mantemos o `clip-path` atual. Se aparecer faixa residual, ajusto o inset em um segundo passo.