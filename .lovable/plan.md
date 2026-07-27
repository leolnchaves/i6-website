## Ajustes — Preço Orientado à Margem (`/kiosk`)

Escopo restrito a `src/components/kiosk/demos/PriceMarginDemo.tsx` e `src/data/kiosk/demos/priceMargin.ts`. PT-only (kiosk).

### 1. KPIs do painel direito (result view)
- Remover o card **"Latência do modelo"**.
- Reorganizar os 3 KPIs remanescentes — **Faixa recomendada**, **Preço ótimo**, **Confiança** — em uma única linha (`grid-cols-3`), com o "Preço ótimo" mantendo o destaque coral.

### 2. Reagrupar filtros do setup (esquerda) em 3 linhas rotuladas
Substituir o grid único atual por 3 blocos empilhados, cada um com um eyebrow coral e seus TouchSelects:

```text
FILTROS      → [Categoria]        [Região / Canal]
RESTRIÇÕES   → [Margem mínima]    [Banda competitiva]
OBJETIVO     → [Estratégia corporativa]
```

Mantém o componente `TouchSelect` já usado; apenas reorganiza a estrutura visual.

### 3. Resultado reativo aos filtros
Hoje `alternatives`, `optimalPrice`, `recommendedRange`, `confidencePct` e `marginImpactPct` vêm fixos do MD. Vou introduzir uma função pura `computeOutcome(selected, { strategy, marginMin, competitiveBand })` em `PriceMarginDemo.tsx` que aplica multiplicadores determinísticos sobre os valores base do SKU:

- **Estratégia corporativa** (objetivo) desloca o preço ótimo e a curva:
  - `maximize-margin` → +preço, −volume, +margem
  - `defend-volume` → −preço, +volume, −margem
  - `balance` → base
  - `share-gain` → −preço agressivo, +volume
- **Margem mínima** age como *piso*: força o preço ótimo para cima se o cenário base ficar abaixo do piso (recalcula margem impact); reduz confiança se o piso comprime a faixa.
- **Banda competitiva** define a largura da faixa recomendada (`narrow`/`medium`/`wide`) e limita o teto do preço ótimo (não pode sair da banda vs. concorrente).

A tabela de alternativas (Conservador / Recomendado / Agressivo), os KPIs, os marcadores da curva e o `marginImpactPct` passam a derivar de `computeOutcome`, então mudar qualquer filtro/SKU altera de forma coerente o output. Valores permanecem "quebrados" (não redondos) para preservar o realismo.

Nada muda no dataset base — só na camada de cálculo.

### 4. "POR QUE" com sensibilidade de preço + sazonalidade/tendência
Reescrever os 5 campos `argument` em `priceMargin.ts` para incorporar explicitamente:
- **Elasticidade / sensibilidade** do SKU dentro da faixa (usando o valor de `elasticity` já presente) e o efeito esperado em volume por ponto percentual de preço.
- **Sazonalidade / tendência** de demanda projetada para o próximo ciclo (janela sazonal, direção da tendência, cobertura de estoque frente à projeção).
- Continua no padrão comportamental já usado nas outras demos (números concretos + dimensões).

O componente já renderiza `selected.argument`; nenhuma mudança estrutural no card do insight.

### Detalhes técnicos
- Sem novos arquivos; edições confinadas aos 2 arquivos citados.
- `computeOutcome` é pura e memoizada com `useMemo` sobre `[selectedId, strategy, marginMin, competitiveBand]`.
- Curva SVG (`ResultChart`) passa a receber os valores derivados em vez de ler direto de `selected`.
- Sem impacto em outras demos ou no tracker.
