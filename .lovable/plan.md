## Objetivo
Adotar o hero V4 (diagrama Decision) como hero oficial da home nos dois idiomas e remover as rotas experimentais.

## Passos

### 1. Adicionar asset EN
- Upload da imagem anexa (`ChatGPT_Image_22_de_jul._de_2026_19_01_39.png`) via `lovable-assets create` → `src/assets/hero-decisao-transparent-hd-en.png.asset.json` (mesmo tratamento de transparência já validado no PT).

### 2. Internacionalizar o HeroDecisaoV4
Em `src/components/hometeste/HeroDecisaoV4.tsx`:
- Ler o idioma via `useLanguage()`.
- Escolher entre asset PT (`hero-decisao-transparent-hd.png`) e EN pelo idioma.
- Textos por idioma:
  - **H1**: "The Platform for<br/>Decision Advantage" (mantém em ambos, já é a marca) OU traduzir a estrutura? → **Mantém em inglês nos dois idiomas** (é o positioning statement da marca, consistente com o resto do site).
  - **Descrição PT**: mantida atual.
    **EN**: "We turn business, market and behavior signals into decisions that protect margin, accelerate turnover, increase conversion and reduce cost."
  - **CTA PT**: "Decida antes do mercado. Agora." (antes destacado)
    **EN**: "Decide before the market. Now." (before destacado)

### 3. Substituir a home
- `src/pages/HomeTeste.tsx`: trocar `<HeroMovimento />` por `<HeroDecisaoV4 />` (as demais seções permanecem).

### 4. Remover rotas e páginas experimentais
- Deletar arquivos: `src/pages/HomeV1.tsx`, `HomeV2.tsx`, `HomeV3.tsx`, `HomeV4.tsx`.
- Deletar componentes obsoletos: `src/components/hometeste/HeroDecisaoV1.tsx`, `HeroDecisaoV2.tsx`, `HeroDecisaoV3.tsx` (HeroDecisaoV4 permanece pois vira o hero oficial).
- `src/App.tsx`: remover imports e rotas `home-v1..home-v4`.

### 5. Verificar
- Build.
- Confirmar `HeroMovimento` não fica órfão problemático (fica no repo como legado; posso deletar também se quiser — dizer no chat).

## Confirmar antes de executar
1. **H1** ("The Platform for Decision Advantage") permanece em inglês no PT também? (é o que está hoje na V4 PT).
2. Publicar release após aplicar (bump minor `v1.3.0` já que é mudança de home)?
