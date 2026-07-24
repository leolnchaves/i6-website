## Ajustes finais das imagens da Hero

Dois problemas a resolver, mantendo total resolução das imagens:

### 1. Fundo visível dos PNGs (todos os idiomas + mobile)
As 4 novas imagens (PT desktop, PT mobile, EN desktop, EN mobile) têm um dark navy ligeiramente diferente do `#0B1224` do site, então aparece um retângulo de fundo em volta.

**Correção**: reprocessar os 4 PNGs em Python (mesma técnica usada nas versões anteriores) — chroma-key nos pixels de fundo escuro (tolerância baixa) → alpha 0, preservando os traços laranja e brancos em resolução original. Fazer upload das versões `-transparent` via `lovable-assets` e trocar os 4 imports em `HeroDecisaoV4.tsx`.

### 2. Imagem PT desktop maior que EN
A imagem PT (Anexo 1 anterior) tem proporção mais larga, então ocupa mais altura no container `max-h-[50vh] md:max-h-[48vh]` do que a EN.

**Correção**: aplicar `max-h` ligeiramente menor apenas para a variante PT desktop (via classe condicional por idioma), para bater com o tamanho visual da EN. Não mexer em EN nem em mobile.

### Arquivos afetados
- `src/components/hometeste/HeroDecisaoV4.tsx` — imports novos + classe condicional PT/EN no `<picture>`.
- 4 novos `.asset.json` em `src/assets/`.

### Não muda
- Container `w-[90%]`, `container mx-auto px-6`, alinhamento, `clip-path`, título e CTA.
- Imagens em resolução nativa (só canal alpha adicionado, sem resize).