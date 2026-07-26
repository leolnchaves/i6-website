# Reposicionar subtítulo nas telas de conclusão do /kiosk

## Objetivo
Mover o parágrafo "Explore o exemplo de aplicação abaixo." (e sua variante para combo) do topo da tela de resultados para ficar **abaixo do grid de soluções** e **acima do bloco da demo interativa**.

## Alteração

**Arquivo:** `src/pages/Kiosk.tsx` (bloco `stage === 'results'`, linhas ~202–240)

1. Remover as linhas 211–213 do cabeçalho:
   ```tsx
   <p className="text-[2.2vmin] text-white/65">
     {isCombo ? kContent.results.tieSubtitle : kContent.results.subtitle}
   </p>
   ```
   O cabeçalho passa a exibir apenas eyebrow + título.

2. Inserir esse mesmo parágrafo entre `<SolutionsGrid ... />` e a `<div id="kiosk-solution-demo">`, centralizado, com um respiro vertical consistente com o resto da tela (`mt-[5vmin] text-center`).

## Escopo
- Vale para todas as soluções (Price-to-Conversion, Personalization+Discovery, Demand Forecasting, Propensity Campaign, fallback genérico) porque o subtítulo mora no `Kiosk.tsx`, acima do `SolutionDemoBlock`.
- Nenhuma mudança nos componentes de demo em si.
- Nenhuma mudança de cópia — apenas reposicionamento.
