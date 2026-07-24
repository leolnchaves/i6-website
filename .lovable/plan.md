## Objetivo
Substituir as imagens panorâmicas (desktop) da hero da home nos dois idiomas usando os dois anexos, que têm proporções idênticas. Como as proporções são iguais entre EN e PT, o dimensionamento passa a ser igual (removendo o override específico de PT). Mobile permanece intocado.

## Passos

1. **Processar as duas novas imagens (chroma-key)**
   - Anexo 1 (`user-uploads://1.png`) → nova hero panorama EN.
   - Anexo 2 (`user-uploads://2-2.png`) → nova hero panorama PT.
   - Aplicar o mesmo tratamento já usado: remover o fundo `#0B1224` (chroma-key + alpha feather), preservando a resolução original. Sem redimensionar/reamostrar.

2. **Publicar como assets CDN** via `lovable-assets create`:
   - `src/assets/hero-decisao-panorama-en-v4-transparent.png.asset.json`
   - `src/assets/hero-decisao-panorama-pt-v5-transparent.png.asset.json`

3. **Atualizar `src/components/hometeste/HeroDecisaoV4.tsx`**
   - Trocar somente os imports das panorâmicas EN e PT para os novos `.asset.json`.
   - Como as novas EN e PT são idênticas em proporção, unificar a largura: `heroImageWidth = 'w-[90%]'` (padrão EN atual) para ambos idiomas.
   - Manter tudo o mais: `max-h`, `clip-path`, container, título, CTA, mobile (imports mobile EN/PT permanecem inalterados).

4. **Validação**
   - Verificar visualmente `/en` e `/pt` em desktop: mesmo tamanho, sem fundo aparente, CTA acima da dobra.
   - Mobile: garantir que nada mudou (mesmos assets mobile, mesma classe).

## Detalhes técnicos
- Nenhuma mudança de layout/estrutura. Só troca de 2 assets + simplificação de uma variável de largura.
- Sem edição do mobile (imports `heroMobilePt` e `heroMobileEn` permanecem).
- Sem release/tag — usuário publica quando pedir.
