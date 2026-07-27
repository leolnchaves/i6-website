## Objetivo

Nas telas de solução do Kiosk (blocos RESOLVE / ENTREGA / IMPACTO), remover a aparência de "botão/card" e deixar apenas linhas textuais.

## Mudança

Em `src/components/kiosk/SimulationLauncher.tsx`, ajustar o `SummaryRow`:

- Remover `rounded-2xl`, `border`, e os fundos (`bg-white/5`, `bg-[#F4845F]/10`).
- Remover o tratamento `highlight` (IMPACTO deixa de ter borda coral).
- Manter apenas: eyebrow em coral (RESOLVE / ENTREGA / IMPACTO) + texto branco abaixo, com `whitespace-pre-line`.
- Ajustar o espaçamento vertical do grupo (`gap` entre linhas) para respirar sem parecerem botões — pequeno padding vertical apenas, sem bordas/fundos.

Também remover, no bloco secundário (combo), a mesma variação `highlight`.

## Fora de escopo

- Nenhuma alteração no card externo (gradient + borda coral do container da solução), no header (ícone + título + tagline), no botão de simulação, no modal, ou nas demos internas.
- Nenhuma mudança nos textos ou i18n.

## Arquivos afetados

- `src/components/kiosk/SimulationLauncher.tsx` (componente `SummaryRow`).
