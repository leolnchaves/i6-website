# Hero home — nova arte + guardrail vertical + versão mobile

## Objetivo
Substituir a arte central do hero (`HeroDecisaoV4`) pelas duas novas versões enviadas — anexo 1 (panorâmica, desktop/tablet) e anexo 2 (quadrada, mobile) — e reescrever o layout para que a arte **sempre ocupe apenas a faixa entre o título e o bloco de descrição+CTA**, preenchendo esse espaço ao máximo em qualquer viewport, sem nunca esticar/comprimir e sem invadir título ou CTA.

## O problema atual
Hoje a imagem é posicionada com `absolute` + `top-1/2 -translate-y-[calc(50%-8vh)]` e o CTA fica em `bottom-[5vh]`. Em telas grandes sobra espaço e tudo funciona; em telas menores (laptops 13", tablets em paisagem), a imagem sobrepõe o headline no topo e/ou o parágrafo/CTA no rodapé porque ela não conhece os limites deles.

## Solução — flex column com "guardrail" central

Reestruturar a seção como um flex vertical em 3 zonas fixas:

```text
┌────────────────────────────────┐
│  1. Título (altura natural)    │  ← topo, padding-top ~ 10–12vh
├────────────────────────────────┤
│                                │
│  2. GUARDRAIL — imagem aqui    │  ← flex-1, min-h-0, overflow hidden
│     (contain, MAX fit)         │     imagem: max-h-full max-w-full
│                                │
├────────────────────────────────┤
│  3. Descrição + CTA (natural)  │  ← rodapé, padding-bottom ~ 5–6vh
└────────────────────────────────┘
```

Chaves:
- Seção principal: `min-h-screen flex flex-col`, sem mais `absolute` para a arte.
- Bloco 1 (headline) e bloco 3 (descrição+CTA) ficam em fluxo normal com `flex-shrink-0`.
- Bloco 2 é `flex-1 min-h-0` com `overflow-hidden` e centraliza a imagem.

## Preenchimento máximo do guardrail (sem esticar/comprimir)

Este é o comportamento crítico pedido: a imagem sempre **ocupa o máximo possível do guardrail**, preservando a proporção original.

- A imagem usa **`className="h-full w-full object-contain"`** dentro de um wrapper `flex items-center justify-center` de `flex-1 min-h-0`.
- `object-contain` faz a imagem crescer até tocar a menor das duas bordas (altura OU largura), preservando o aspect ratio original — nunca estica nem comprime, e sempre "abraça" o guardrail pelo maior lado disponível.
- Isso substitui a lógica atual de `w-[min(100vw,1750px)]` que fixa uma largura arbitrária: agora a arte se dimensiona pelo espaço real disponível entre título e CTA em cada viewport.
- Em telas curtas: encolhe pela altura (limitada pelo guardrail).
- Em telas estreitas: encolhe pela largura (limitada pelo container).
- Em telas grandes: cresce até bater no maior lado do guardrail — sem `max-w` fixa que a impeça.

## Duas artes por breakpoint

- **Desktop/tablet (`≥ md`)**: anexo 1 — versão panorâmica horizontal (`hero-decisao-panorama-v2.png`).
- **Mobile (`< md`)**: anexo 2 — versão compacta quadrada (`hero-decisao-mobile.png`).
- Renderizadas via `<picture>` com `<source media="(min-width: 768px)">` + `<img>` fallback: 1 nó no DOM, sem duplicar carregamento, troca sem JS. Ambas herdam as mesmas classes `h-full w-full object-contain` — o guardrail vale para as duas.

## Uploads necessários

Publicar os dois anexos como Lovable Assets a partir de `/mnt/user-uploads/` e gerar dois novos `.asset.json` em `src/assets/`:
- `src/assets/hero-decisao-panorama-v2.png.asset.json`
- `src/assets/hero-decisao-mobile.png.asset.json`

Os `.asset.json` antigos (`hero-decisao-transparent-hd.png.asset.json`, `-en`, etc.) ficam órfãos — deixamos parados por segurança nesta iteração (podemos limpar depois).

## Ajustes finos

- `pt-[10vh] md:pt-[12vh]` no bloco do título e `pb-[5vh] md:pb-[6vh]` no bloco do CTA — dá respiro para a arte sem alterar tamanhos de fonte.
- Mantém o gradiente radial atual de fade-out para continuidade visual com o fundo `#0B1224`.
- Sem alteração de i18n, rota, textos ou componente do CTA — puramente layout e assets.

## Arquivo tocado
`src/components/hometeste/HeroDecisaoV4.tsx` — hero oficial da Home (importado por `Home.tsx` / `HomeTeste.tsx`).

## Detalhes técnicos
- Sem mudanças em animação, gradiente coral do CTA, glow ou classes semânticas — só o wrapper da arte e a estrutura de 3 zonas.
- `object-contain` = zero distorção, máximo aproveitamento do espaço.
- `<picture>` faz a troca desktop/mobile automaticamente por media query.
