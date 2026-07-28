## Escopo

Aplicar 3 ajustes globais + refinos específicos no demo de **Metas Comerciais Preditivas**.

## 1. Cabeçalhos das tabelas (Metas Comerciais)

`src/components/kiosk/demos/CommercialTargetsDemo.tsx` — nas duas tabelas ("Meta atual × Meta preditiva" e "Alocação recomendada de investimento comercial"):
- Reduzir a fonte do `<thead>` (ex.: `text-[1.15vmin]` → `text-[1vmin]`, uppercase mantido).
- Permitir quebra em 2 linhas: remover `whitespace-nowrap` e aplicar `leading-tight` + `align-bottom` para alinhar o baseline entre colunas de 1 e 2 linhas.
- Reservar altura mínima do header (`min-h-[3vmin]`) para não "pular" quando outros títulos ficarem em 1 linha.
- Não altera larguras de coluna nem dados.

## 2. Reduzir para 3 linhas por dimensão + condições específicas

`src/data/kiosk/demos/commercialTargets.ts` — enxugar `baseRows` para que cada dimensão (Região, Vendedor, Cliente, SKU) agregue exatamente **3 linhas** com um caso didático de cada ação:

- **Aumentar** → uma linha com alta demanda projetada e CAC baixo (delta positivo > +10%).
- **Manter** → uma linha estável (delta entre -5% e +5%).
- **Reduzir** → uma linha com meta atual acima do potencial (delta negativo, CAC alto).

Como o motor `computeResult` deriva as tabelas via agrupamento (`byRegion`, `byRep`, `byClient`, `bySku`), enxugar de 16 SKUs para ~9 linhas balanceadas garante 3 grupos por dimensão com os três comportamentos. A tabela `Cliente` passa a mostrar 3 clientes; a tabela `SKU` passa a mostrar 3 SKUs. Nenhuma mudança na lógica de compute.

## 3. Limpar títulos de explicabilidade em TODAS as telas

Remover o sufixo do modelo e a linha de subtítulo nos seguintes arquivos:

| Arquivo | Alteração |
|---|---|
| `src/data/kiosk/demos/commercialTargets.ts` | `reasoningTitle: 'Explicabilidade e raciocínio do modelo'`; `reasoningSubtitle: ''` |
| `src/data/kiosk/demos/demandForecast.ts` (PT+EN) | idem (`'Explainability and model reasoning'` no EN) |
| `src/data/kiosk/demos/predictivePersonalization.ts` (PT+EN) | idem |
| `src/data/kiosk/demos/propensityCampaign.ts` | idem |
| `src/data/kiosk/demos/priceToMargin.ts` (PT+EN) | idem |
| `src/data/kiosk/demos/mixAssortmentOrder.ts` | idem |

Nos componentes que renderizam esse cabeçalho (`CommercialTargetsDemo`, `DemandForecastDemo`, `PredictivePersonalizationDemo`, `PropensityCampaignDemo`, `PriceToMarginDemo`, `MixAssortmentOrderDemo`), envolver a `<p>` do subtitle em `{reasoningSubtitle && <p>...</p>}` para não deixar espaço em branco quando vazio.

## 4. Renomear KPIs — Metas Comerciais

`src/data/kiosk/demos/commercialTargets.ts` (labels.result):
- `kpiVolume`: `"VOLUME INCREMENTAL POTENCIAL"` → **`"POTENCIAL INCREMENTAL"`**
- `kpiInvestment`: `"INVESTIMENTO COMERCIAL SUGERIDO"` → **`"INVESTIMENTO SUGERIDO"`**
- `kpiCac`: `"CAC INCREMENTAL PROJETADO"` → **`"CAC ADICIONAL PROJETADO"`**
- `kpiTotalTarget` (Meta total recomendada) — não mencionado, mantido.

## Fora do escopo

- Sem bump de versão.
- Sem mudanças em lógica de cálculo, animações ou navegação.
