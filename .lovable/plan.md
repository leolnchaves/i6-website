## Correção

Em `src/components/kiosk/demos/PriceTurnoverDemo.tsx`:

1. Remover o estado `region` e o `TouchSelect` de "Região / Cluster".
2. `visibleClusters` passa a ser sempre `allClusters` (sem filtro).
3. O `useEffect` que reseta `selectedId` quando o cluster some deixa de ser necessário — remover.
4. Reorganizar os 3 filtros restantes (Produto, Objetivo, Margem mínima) em uma única linha: `grid grid-cols-[1.3fr_1fr_0.9fr] gap-[1vmin]`, com Produto ocupando mais espaço por ter o rótulo mais longo.
5. Opcional em `src/data/kiosk/demos/priceTurnover.ts`: remover `filterOptions.region` (não é usado em mais lugar nenhum).

Nenhuma outra lógica muda; o cálculo continua exibindo os 3 clusters representativos.
