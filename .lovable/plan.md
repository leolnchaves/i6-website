
## Objetivo

Remover, em 8 respostas do i6 Signal, os blocos que explicam como o modelo pensa (leitura comportamental / sinais / detalhamento / correlações / "o que o modelo observa em cada sessão"), pois já duplicam a "Análise Executiva" e as tabelas principais. Fazer também 2 ajustes visuais.

Escopo: apenas UI. Nada muda em dados, tracking, rotas, i18n. Sem tocar em KPIs, ações recomendadas ou gráficos principais (exceto o ajuste do gráfico do item 2).

## Mudanças

Todas concentradas em `src/components/kiosk/KioskSignalIntelliboard.tsx` (remoção de renderizações) e em `src/components/signalDemo/visualizations.tsx` (ajuste do gráfico + limpeza de badges).

### Remoções em `KioskSignalIntelliboard.tsx`

| # | Cenário | Bloco removido | Componente |
|---|---------|----------------|------------|
| 1 | `targetsRisk` (Metas Comerciais, R2) | Sinais que sustentam a previsão | `TargetsSignalsTable` |
| 2 | `mixBehavior` (Mix, R1) | Leitura comportamental | `MixBehaviorReading` |
| 3 | `mixGaps` (Mix, R2) | Detalhamento comportamental | `MixGapsDetailList` |
| 4 | `personalizationBehavior` (Personalização, R1) | Sinais que sustentam a recomendação | `PersonalizationSignalsTable` |
| 5 | `personalizationRepurchase` (Personalização, R2) | Correlações comportamentais | `RepurchaseCorrelationsTable` |
| 6 | `marginOpportunities` (Margem, R1) | Leitura comportamental | `MarginBehaviorReading` |
| 7 | `priceConversionFriction` (Conversão, R1) | Sinais comportamentais | `PriceConversionSignalsTable` |
| 8 | `priceConversionIncentiveNeed` (Conversão, R2) | O que o modelo observa em cada sessão | `PriceConversionDetailList` |

Em cada bloco, remover apenas a tag do componente correspondente dentro do fragmento `<>...</>`, preservando os demais elementos (heatmap/scatter, tabela principal e ações recomendadas). Nenhum outro componente ou import se torna órfão em `KioskSignalIntelliboard.tsx` — os componentes continuam exportados por `visualizations.tsx` e podem ser mantidos por ora (limpeza opcional, ver abaixo).

### Ajuste do gráfico — item 2 (Mix, R1)

Em `MixBehaviorScatter` (barras horizontais empilhadas Aderente × Gap) as barras estão curtas demais no eixo X. Ajustes:

- Fixar o domínio do XAxis em `[0, 100]` (percentuais somam 100), removendo o auto-fit que hoje comprime as barras.
- Aumentar a altura do container e a largura das barras (`barCategoryGap` menor, `barSize` maior) para leitura confortável em portrait.
- Manter cores, tooltip e legenda atuais.

### Ajuste dos badges — item 7 (Conversão, R1)

Nas tabelas de `priceConversionFriction` (`PriceConversionContextTable` e o que restar em tela), aplicar a mesma regra já adotada nas demais respostas: **sem badges, sem boxes coloridos** — apenas cor de fonte. Onde ainda houver `<span>` com `bg-*/border-*/rounded-*` para status/tom, converter para texto com apenas classe de cor (`text-*`), reutilizando o padrão dos helpers de tom já existentes no arquivo. Nenhum novo helper necessário.

## Limpeza opcional (não-bloqueante)

Como consequência, estes 8 componentes deixam de ser usados no intelliboard. Podemos:
- (a) Manter no arquivo `visualizations.tsx` (sem custo em runtime; risco zero) — recomendado agora.
- (b) Remover em uma release seguinte junto com os campos `signalsTable`, `behaviorReading`, `behaviorDetail`, `correlationsTable`, `detail` em `src/data/signalDemo/content.ts`.

Recomendação: seguir com (a) nesta rodada para manter o diff pequeno e reversível.

## Checagens antes de fechar

- Cada uma das 8 respostas continua com: título, Análise Executiva, visualização principal (heatmap/scatter/gráfico/tabela) e Ações recomendadas.
- Nenhum erro de TS por variável não usada (as remoções são só de JSX; os helpers seguem em `visualizations.tsx`).
- Em Mix R1, as barras ocupam largura confortável e a leitura Aderente vs Gap fica clara em 0–100%.
- Em Conversão R1, nenhuma célula de tabela mantém fundo/borda colorida — só cor de fonte.
