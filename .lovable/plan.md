## Problemas
1. **Espaço excessivo** entre título↔imagem e imagem↔CTA (pior no mobile).
2. **Fundo da imagem** (azul escuro do PNG) não bate exatamente com o `#0B1224` do site — cria borda visível.

## Correções

### 1. `src/components/hometeste/HeroDecisaoV4.tsx` — apertar o layout
- Zona 1 (título): `pt-[10vh] md:pt-[12vh]` → `pt-[6vh] md:pt-[10vh]`, e reduzir margem inferior implícita (bloco já é `flex-shrink-0`).
- Zona 3 (descrição+CTA): `pb-[2vh] md:pb-[3vh]` mantém, mas remover gap extra da zona 2.
- Zona 2 (guardrail da imagem): remover `px-4` (o padding lateral também empurra a imagem, faz ela encolher em altura para caber na largura reduzida — e sobra vazio vertical). Trocar por `px-0`. No mobile a imagem passa a ocupar 100% da largura, o que puxa mais altura útil.
- Adicionar `-my-[2vh] md:-my-[3vh]` no wrapper da imagem para "colar" ela nos blocos de cima e baixo (compensação negativa fina), reduzindo o gap percebido.

### 2. Fundo transparente sem perder resolução
As duas artes atuais (`hero-decisao-panorama-v3.png` e `hero-decisao-mobile-v2.png`) têm fundo `#0B1224`-ish mas não exato. Vamos gerar versões `-transparent` usando `imagegen--edit_image` com `transparent_background: true` a partir dos originais em `/mnt/user-uploads/fundosite.png` e `/mnt/user-uploads/fundositemobile.png` — o pipeline preserva as dimensões originais (não passamos width/height), garantindo a resolução intacta. Prompt: manter todos os traços, glows, textos e cores idênticos, apenas isolar sobre fundo branco sólido para o pipeline então extrair transparência.

- Upload via `lovable-assets` dos dois PNGs transparentes resultantes:
  - `src/assets/hero-decisao-panorama-v3-transparent.png.asset.json`
  - `src/assets/hero-decisao-mobile-v2-transparent.png.asset.json`
- Atualizar imports em `HeroDecisaoV4.tsx` para as versões transparent.
- Com transparência real, a imagem funde 100% com o `#0B1224` da `<section>` — sem borda visível independente do dispositivo.

## Fora de escopo
- Sem alterações em tamanhos de fonte, animações, CTA, cópia ou i18n.
- Sem regenerar a arte do zero (só remover fundo preservando pixels).
