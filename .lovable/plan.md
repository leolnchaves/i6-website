## Problema

Hoje há 3 clusters fixos com ações fixas (`sp-premium=hold`, `minas-gerais=markdown`, `sul=wait`). Quando o usuário troca o produto, apenas os SKUs mudam — a ordem e o rótulo da ação por cluster continuam sempre "Manter · Markdown · Aguardar". Também não existe cenário de **aumento de preço**. Além disso, o card "POR QUE" mostra sempre o mesmo `argument` do cluster, sem refletir o produto nem a ação atual.

## Correção

### 1) Nova ação `raise` (aumentar preço)

Em `src/data/kiosk/demos/priceTurnover.ts`:
- Estender `ClusterAction` para `'hold' | 'markdown' | 'wait' | 'raise'`.
- Em `PriceTurnoverDemo.tsx`, adicionar cor/label/tone para `raise` (verde-esmeralda `#10b981`, rótulo "Aumentar", classe `text-[#34d399]`).
- Rótulo curto na tabela: `nextAction = 'Aumentar preço'`. Delta típico +6% a +12%, coerente com `elasticity` baixa e `sellVelocity` bem acima da categoria.

### 2) Cenários por produto (perfis fixos, não RNG)

Perfis pré-desenhados de forma que a ordem e o mix de ações mudem quando o usuário troca o filtro Produto:

- `sku-1` (Jaqueta acolchoada · inverno): `markdown` (SP) · `hold` (MG) · `wait` (Sul).
- `sku-2` (Bota térmica premium): `raise` (Sul) · `hold` (SP) · `markdown` (MG).
- `sku-3` (Blusa tricô oversized): `hold` (SP) · `raise` (MG) · `markdown` (Sul).

### 3) Modelagem no dado

- Adicionar `clusterActionByProduct: Record<productId, Record<clusterId, ClusterAction>>`.
- Adicionar `clusterOverridesByAction: Record<ClusterAction, { situation; nextAction; recommendedMarkdownPct; sellThroughProjectedPct; agedStockPct; marginPreservedPp; capitalUnlockedBRL }>` — pacote coerente por ação, incluindo `raise`.
- `computeOutcome` recebe `productId`, lê a ação daquele produto para aquele cluster, aplica os overrides e depois o ajuste de `objective`/`minMargin`. Para `raise`: preço recomendado = `currentPrice * (1 + risePct/100)`; a coluna Markdown mostra `+X%` em verde (sinal invertido).
- `skuTemplatesByProduct` ganha um bloco `raise` com preços acima do `currentPrice` e sell-through alto.

### 4) Argumentos "POR QUE" por cenário (produto × ação)

Substituir o campo único `cluster.argument` por uma matriz de argumentos:

- `argumentsByProductAndAction: Record<productId, Record<clusterId, string>>` — uma frase específica para cada combinação (3 produtos × 3 clusters = 9 argumentos), aterrando em:
  - Números coerentes com o cenário (idade média, velocidade vs. categoria, elasticidade estimada, janela sazonal, margem preservada, capital liberado ou valor incremental).
  - Motivo econômico da ação (por que markdown agora / por que segurar / por que aguardar / por que subir).

Exemplos-guia (o texto final segue esta linha, adaptando SKU e região):
- Jaqueta · SP · markdown: "Idade média 63 d em SP Premium (+37% vs. categoria) com queda projetada de 2,1 pp/semana. Elasticidade −1,6 e coleção nova em 21 dias: markdown de 15% agora captura fim de ciclo e evita liquidação profunda."
- Bota · Sul · raise: "Sell-out 42 un/sem vs. 26 da categoria e ruptura projetada em 12 dias. Elasticidade −0,5 no pico da frente fria permite aumento controlado de +8% preservando conversão e capturando R$ 74 mil de margem incremental."
- Blusa · MG · raise: "Giro 38 un/sem em BH/Uberlândia (+58% vs. categoria) com estoque enxuto (17 d) e coleção descontinuada em 30 d. Aumento de +6% ancora percepção premium sem impacto material em sell-through (−1 pp)."

Fallback: se faltar entrada específica, cai no argumento genérico da ação (`fallbackArgumentByAction[action]`) — assim nada quebra ao adicionar produtos futuros.

### 5) UI

- Coluna "Markdown" da tabela de SKUs: `markdownPct > 0` → `−X%` (coral); `< 0` → `+|X|%` verde (`#34d399`); `0` → "—".
- Bolinha e cor do "Ação sugerida" seguem `actionColor[action]`, incluindo verde para `raise`.
- Título dinâmico do card "POR QUE" ganha o caso `'raise' → 'Por que subir preço'`.
- O corpo do card "POR QUE" passa a ler `argumentsByProductAndAction[product][cluster.id]` (com fallback).

### 6) Insight geral

`generalInsightFor` passa a contar também os `raise` e frasear: "N com giro forte e elasticidade baixa → capturar valor com aumento controlado".

Escopo restrito à demo Preço Orientado ao Giro (data + component).
