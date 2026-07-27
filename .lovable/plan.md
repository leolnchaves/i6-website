## Objetivo

Redesenhar a matriz 2×2 de seleção em Personalização + Descoberta como **faixas horizontais por vertical**, eliminando a duplicação do nome (Moda / Bens de consumo) dentro de cada botão.

## Mudanças

**`src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`** (linhas 189–239):

Substituir o grid 3-colunas por duas faixas empilhadas (uma por vertical). Cada faixa contém:
- Label esquerdo grande: nome da vertical em coral uppercase (ex.: `MODA`).
- À direita, 2 botões lado a lado (Usuário anônimo / Usuário logado) — cada botão mostra **apenas** o ícone + rótulo do modo do usuário, sem repetir a vertical.

Estrutura:
```
[ MODA          ]  [ Usuário anônimo ] [ Usuário logado ]
[ BENS DE CONSUMO ] [ Usuário anônimo ] [ Usuário logado ]
```

Layout:
- Container: rounded-2xl border/bg neutros, `flex flex-col gap-[0.8vmin] p-[0.9vmin]`.
- Cada faixa: `grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)] gap-[0.6vmin] items-stretch`, com fundo sutil por faixa (`bg-white/[0.03] rounded-xl px-[1.2vmin] py-[0.8vmin]`).
- Label da vertical: `text-[1.6vmin] tracking-[0.2em] uppercase font-bold text-[#F4845F]` alinhado à esquerda, centralizado verticalmente.
- Botão de modo: mesmo tratamento coral quando ativo, mostrando só `ícone + label do modo` (sem sublinha da vertical).

Remover as strings duplicadas de vertical dentro do botão (linha 230). Preservar handler `startScenario(c.u, r.v)`.

Nenhuma mudança em lógica de estado, cenários ou textos fora deste bloco.
