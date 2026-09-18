# Faixa de retroalimentação mais compacta e seta junto ao texto

## O que muda

1. **Altura bem menor**: a faixa do ciclo (rótulo "Retroalimentação" + animação) fica visivelmente mais baixa — menos respiro acima, menos respiro abaixo e a animação com cerca de metade da altura atual.
2. **Seta do traço de baixo mais à esquerda**: o traço inferior e a ponta da seta passam a terminar bem perto do começo do texto "Retreinamento contínuo", sem folga vazia. O traço de cima (o que sai da Ativação) não muda de posição nem de desenho.

## Detalhes técnicos

Arquivo: `src/components/home-v3/HowItWorks.tsx`

**Alinhamento previsível da seta**

Hoje o SVG usa `viewBox="0 0 800 112"` com `preserveAspectRatio` padrão (`xMidYMid meet`), então ele é encaixado com letterbox lateral variável conforme a largura da coluna — é essa folga que afasta a seta do texto (~224px em 1280, ~290px em 1382). Mudança:

- `preserveAspectRatio="none"` no `<svg>`, para o `viewBox` mapear exatamente a caixa da coluna (x=0 passa a ser a borda esquerda real, alinhada ao início de "Retreinamento contínuo").
- `vectorEffect="non-scaling-stroke"` nos três `path` do conduíte, para a espessura dos traços continuar uniforme apesar do escalonamento não uniforme.
- A seta e o fim do traço inferior recuam para `x ≈ 4..30` (ponta em ~4), ficando junto ao texto; a geometria do traço superior (`M 140,24 L 700,24 …`) permanece igual.
- Barras de resultado composto e nós do circuito reposicionados proporcionalmente à nova altura, mantendo o mesmo peso visual.

**Compactação de altura**

- `viewBox` de `0 0 800 112` para `0 0 800 76`, com o trecho superior em `y=18` e o retorno em `y=60`.
- Altura do SVG: `h-[76px] sm:h-[92px]` → `h-[48px] sm:h-[58px]`.
- Faixa: `mt-8 pt-7` → `mt-6 pt-5`; grid `gap-6 md:gap-10` → `gap-4 md:gap-8`.
- Micro-rótulos: `mt-1` → `mt-0.5`.

**Validação**

`tsgo --noEmit`, log de build e Playwright em 768/1024/1280/1382/1536 e mobile 390, em PT/EN/ES, conferindo altura reduzida, seta encostada no texto e ausência de rolagem lateral.
