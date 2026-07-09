Ajuste de hover nos cards de soluções da página `/pt/solutions-v2`.

- No componente `src/components/solutions-v2/LeanSolutionCard.tsx`, remover a faixa laranja que cresce no topo do card ao fazer hover (linha com `absolute top-0 left-0 w-0 h-1 bg-[#F4845F] group-hover:w-full`).
- Manter a borda laranja no hover (`hover:border-[#F4845F]/50`) como está.
- Não alterar os cards de alavancas (`TerritoriesBlock.tsx`).
- Verificar build após a alteração.