## Objetivo

Melhorar a visibilidade do botão flutuante "Explorar outra solução" no Kiosk sem que ele cubra os textos abaixo.

## Diagnóstico (verificado)

- `src/pages/Kiosk.tsx` (linhas 180–188): o botão é `fixed top-[3vmin] right-[3vmin]` com `bg-white/10` + `border-white/20`. Como o fundo é semi-transparente, quando o scroll traz títulos claros ("Converse com a camada preditiva.") para trás dele, o contraste cai e o botão "some".
- O botão fica sempre ancorado no canto superior direito (é `fixed`), então qualquer "faixa" atrás dele acompanha naturalmente o movimento do usuário na página. Basta que essa faixa fique restrita à região do canto superior direito para não invadir os textos centrais.

## Mudanças (apenas apresentação, em `src/pages/Kiosk.tsx`)

1) **Compactar o botão**:
   - Reduzir padding vertical: `py-[2vmin]` → `py-[1.2vmin]`, e horizontal `px-[3vmin]` → `px-[2.4vmin]`.
   - Reduzir `min-h-[8vmin]` → `min-h-[6vmin]`.
   - Manter fonte `text-[1.8vmin]` e ícone `RotateCcw` em `w-[2vmin] h-[2vmin]` (levemente menor).

2) **Faixa escura de fundo, ancorada ao botão (não cobre texto central)**:
   - Envolver o `<button>` em um wrapper `fixed top-[2vmin] right-[2vmin] z-20` que contém uma "faixa" (`div` absoluta) atrás do botão.
   - A faixa é um pill mais largo que o botão apenas o suficiente para dar respiro (ex.: `-inset-y-[0.8vmin] -inset-x-[1.2vmin]`), com `rounded-full`, `bg-[#0B1224]/85`, `backdrop-blur-md`, `ring-1 ring-white/10` e `shadow-[0_8px_30px_rgba(0,0,0,0.45)]`.
   - Como o wrapper é `fixed` no canto superior direito e a faixa é dimensionada pelo próprio conteúdo (botão), ela nunca se estende até a coluna central dos textos ("Converse com…", "ESCOLHA UMA PERGUNTA", etc.).

3) **Ajuste do botão em si** para o novo contexto:
   - Trocar `bg-white/10 border-white/20` por `bg-transparent border-white/25` (a legibilidade agora vem da faixa escura de trás), mantendo texto `text-white/90`.
   - Manter comportamento e handler `onClick={reset}` inalterados.

## Fora de escopo

- Nenhuma mudança de lógica, textos, i18n, tracker ou de qualquer outro botão do site.
- Nenhuma mudança em `AttractScreen`, `SimulationLauncher`, `KioskSignalIntelliboard` ou nas demos.

## Arquivos afetados

- `src/pages/Kiosk.tsx` (apenas o bloco do botão flutuante de reset, ~linhas 179–188).
