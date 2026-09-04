## Detalhes técnicos

Arquivos tocados:

1. `src/data/comunidade/placeholders.ts`
   - `OPENING_IMAGES`: aumento das dimensões em `place` (ex.: retrato principal para ~`h-[330px] w-[225px]`, paisagens para ~`h-[165px] w-[250px]`, quadrada ~`h-[180px]`), e redistribuição de `right`/`top`/`bottom` em três faixas (topo ~`top-10`, meio ~`top-[42%]`, base ~`bottom-6`), alternando com os cartões de código.
   - `OPENING_CODE_CARDS`: larguras maiores (~`w-[260px]`/`w-[240px]`/`w-[250px]`) e posições nas mesmas três faixas.
2. `src/components/comunidade/CommunityOpening.tsx`
   - Fonte dos cartões de `text-[11px]` para `text-[12px]`, cabeçalho `text-[11px]`, padding levemente maior.
   - Faixa mobile: alturas de `h-32/h-24/h-28` para `h-40/h-32/h-36`, mantendo `lg:hidden`, sem overflow.

Sem alterações em texto, rota, SEO, formulário ou outras seções. Verificação: typecheck, build e capturas desktop 1440 e mobile 390 em PT, confirmando que nenhuma peça cobre título, subtítulo, botão ou aviso de rolagem.
