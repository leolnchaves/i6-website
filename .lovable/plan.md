## Ajustes visuais em /solutions

**1. Cards de soluções (anexo 1) — `src/components/solutions-v2/LeanSolutionCard.tsx`**
- Permitir que o título quebre em múltiplas linhas em vez de truncar (`line-clamp`/`truncate` removidos).
- Reservar altura mínima consistente para o título (ex.: `min-h-[3.5rem]` acomodando 2 linhas) para manter o alinhamento das seções RESOLVE/DELIVER/IMPACT entre cards adjacentes no grid.
- Garantir `items-stretch` no grid pai (se necessário em `TerritorySection.tsx`) para os cards permanecerem com a mesma altura.

**2. Badge "Zero cost through Backtest" (anexo 2) — `src/components/solutions-v2/HowWeImplement.tsx`**
- Melhorar o balanceamento horizontal do texto dentro da pill coral: reduzir padding lateral excessivo e/ou aplicar `mx-auto` com `w-fit` para o badge ficar mais compacto e centralizado, sem sobra de espaço à direita.
- Manter o mesmo texto e cores.

Sem alterações de copy, dados ou lógica.
