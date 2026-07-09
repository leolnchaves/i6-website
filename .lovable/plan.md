Ajustar o alinhamento dos badges (chips) dentro dos cards de "Alavancas Preditivas de Valor" em `/pt/solutions-v2`.

### Problema
Os cards de território (`TerritoriesBlock`) têm títulos e taglines de tamanhos variados, fazendo com que a lista de badges (chips) inicie em alturas diferentes entre os três cards. A screenshot mostra o desalinhamento visual.

### Solução
Normalizar a altura ocupada pelo título e pela tagline em cada card, para que o bloco de badges sempre comece na mesma altura:

1. Em `src/components/solutions-v2/TerritoriesBlock.tsx`:
   - Aplicar `line-clamp-2` + `min-h-[2lh]` no título (`h3`), garantindo espaço para até 2 linhas.
   - Aplicar `line-clamp-3` + `min-h-[3lh]` no subtítulo/tagline (`p`), garantindo espaço para até 3 linhas.
   - Manter a lista de badges logo abaixo, sem empurrá-la para baixo com `mt-auto`.
   - (Opcional) Garantir `min-h` consistente no bloco de badges caso a quebra de linha varie entre cards.

### Escopo
Apenas ajuste de layout no componente `TerritoriesBlock`. Nenhuma alteração de conteúdo ou funcionalidade.

### Validação
- Visualizar `/pt/solutions-v2` e confirmar que os badges dos 3 cards iniciam na mesma altura horizontal.
- Rodar `bun run build` para garantir que não há erros.