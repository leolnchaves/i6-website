## Objetivo
Evitar quebra de linha nos itens do submenu "Soluções" do header, fazendo o dropdown ajustar sua largura dinamicamente ao texto mais longo.

## Mudanças propostas
No componente `src/components/hometeste/HeaderNovo.tsx`, no elemento `<ul>` do dropdown de Soluções:

1. Substituir `min-w-[260px]` por `w-max` (ou `min-w-max`) para permitir crescimento dinâmico da largura.
2. Adicionar `whitespace-nowrap` na classe do `<Link>` de cada item do submenu para impedir quebra de linha.

## Resultado esperado
Todos os textos do submenu ficarão em uma única linha e o container do dropdown expandirá automaticamente para acomodar o item mais longo (ex: "Estratégia de Monetização de Dados").