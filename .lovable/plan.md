## Objetivo

Reescrever o texto do card "POR QUE essa recomendação" da demo **Mix, Sortimento e Pedido Ideal** para descrever **o que o modelo aprendeu** (sinais observados no PDV, cluster e histórico) antes de sugerir o mix — em vez de listar apenas o resultado (X manutenções, Y inclusões, Z substituições).

Referência de estilo: os textos `reason` por SKU já estão excelentes (falam de giro no cluster, sell-out em aceleração, cobertura vs. ciclo, canibalização, margem líquida, capital liberado). O card geral deve seguir o mesmo tom: dados/sinais concretos → decisão.

## Escopo

Um único arquivo, uma única função:

- `src/data/kiosk/demos/mixAssortmentOrder.ts` → `generalInsightFor(rows)` (linhas 323–330).

Tudo mais permanece intocado (KPIs, tabela do carrinho, timeline, reasons por SKU, textos em PT/EN de labels).

## Como será o novo texto

O gerador continua dinâmico (depende do carrinho filtrado por PDV), mas o conteúdo passa a estruturar-se em três blocos curtos, no mesmo tom dos reasons por SKU:

1. **Sinais aprendidos no cluster e no PDV** — cobertura vs. ciclo, giro médio, sell-out em aceleração/queda, complementaridade de cesta, presença de SKUs em PDVs pares.
2. **Padrões que orientaram cada tipo de ação** — por que o modelo prioriza inclusões (SKUs presentes em X% dos PDVs pares com giro saudável), aumentos (sell-out acelerando + cobertura abaixo do ciclo), substituições (giro abaixo do piso + margem superior no substituto), reduções/remoções (cobertura excedente + capital realocável).
3. **Restrições operacionais respeitadas** — limite financeiro do pedido, capacidade de estoque, embalagens mínimas, sem abrir buraco de sortimento.

O texto continua parametrizado pelos contadores (`keep`, `include`, `substitute`, `remove`) do carrinho filtrado, para variar por PDV, mas os números aparecem como evidência do que o modelo aprendeu — não como o "resumo da entrega".

## Detalhes técnicos

- Manter a assinatura `generalInsightFor(rows: CartRow[]) => string` para não quebrar o consumo em `MixAssortmentOrderDemo.tsx:68`.
- Manter uso dos contadores existentes (`keep`, `include`, `substitute`, `remove`) derivados de `rows`.
- Manter tudo em português (o card é PT-only hoje).
- Sem alterações em componentes, tipos, i18n ou outras demos.
