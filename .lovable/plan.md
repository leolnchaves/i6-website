## Problema
Na conclusão de "Personalização + Descoberta Preditiva", quando o usuário escolhe **Moda**, o quadro de resultados (produto selecionado + Look) fica visivelmente mais alto que o quadro equivalente de **Bens de Consumo**.

A causa está em `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`:
- Fashion (linhas 273-325): card à esquerda usa imagem em `aspect-[3/4]` (retrato grande) → domina a altura; o card do Look à direita cresce por `items-stretch` para acompanhar.
- Bens de Consumo (linhas 328-348): card único horizontal com miniatura `14vmin × 14vmin` → altura bem menor.

## Ajuste
Reescrever o bloco Moda para ter a mesma "moldura" compacta do CG, mantendo o Look ao lado:

1. **Card do produto selecionado (Moda)**: trocar layout retrato por horizontal, espelhando o do CG — miniatura `14vmin × 14vmin`, categoria/nome/preço à direita. Remove o `aspect-[3/4]` que estava esticando a coluna.
2. **Card do Look (direita)**: manter grid `0.85fr / 1.7fr` e `items-stretch`, mas como o card da esquerda passa a ter altura compacta, o Look encolhe junto. Reduzir também o número de itens visíveis para 3 (já é o caso) e diminuir a miniatura de `11vmin` para ~`9vmin` para não estourar a altura alvo.
3. Garantir que a altura resultante do bloco Moda seja igual à do card horizontal do CG (aprox. `14vmin` + paddings), sem alterar o restante da tela (KPIs, timeline, etc.).

Nenhuma outra tela/demo é afetada.

## Arquivos
- `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx` — reescrever apenas o ramo `vertical === 'fashion' && phase === 'pdp'` (linhas ~273-325).
