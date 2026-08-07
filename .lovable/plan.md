# /demo bilíngue: /pt/demo e /en/demo

Hoje a demo vive em `/demo` e o idioma vem do parâmetro `?lang=pt|en`. Passa a existir `/pt/demo` e `/en/demo`, com a página inteira (quiz, cards, simulações e i6 Signal) traduzida.

## Rotas

- Novas rotas `/:lang/demo` (validando `pt`/`en`) sem header/footer, fora do layout do site.
- `/demo` sem prefixo passa a redirecionar para `/<idioma detectado>/demo`, preservando query string (útil porque o totem hoje aponta para `/demo`).
- `/demo-metrics/:token` continua como está.
- Idioma vem da URL; `?lang=` deixa de ser necessário (se vier, a URL manda).
- `scripts/prerender-seo-stubs.mjs` passa a gerar arquivos 200 reais para `pt/demo/index.html`, `en/demo/index.html` e `demo/index.html` (além do já existente de métricas), para não dar 404 no GitHub Pages / Fully Kiosk.

## Tradução

Já bilíngue (nada a fazer): textos de abertura/quiz/resultados (`src/data/kiosk/config.ts`), cards de solução (`src/data/solutionsV2/content.ts`), cenários do i6 Signal (`src/data/kiosk/signals.ts`), Personalização Preditiva e Forecast de Demanda.

A traduzir para EN, mantendo o padrão `Record<'pt'|'en', ...>` já usado nos arquivos bilíngues:

1. **Datasets das simulações hoje só em PT** — rótulos de filtros, etapas do pipeline, colunas de tabela, insights e textos de resultado em:
   - `commercialTargets.ts` (Metas Comerciais Preditivas)
   - `mixAssortmentOrder.ts` (Mix, Sortimento e Pedido Ideal)
   - `priceMargin.ts` e `priceTurnover.ts` (Preço → Margem / Giro)
   - `propensityCampaign.ts` (Campanha por Propensão)
   - completar os blocos EN parciais de `priceToMargin.ts`
2. **Strings fixas nos componentes** — cabeçalhos, legendas de eixo, botões e microcópias em `PriceTurnoverDemo`, `PriceMarginDemo`, `CommercialTargetsDemo`, `PriceToMarginDemo`, `PropensityCampaignDemo`, `MixAssortmentOrderDemo`, `SolutionDemoBlock`, `AttractScreen`, `KioskSignalIntelliboard` e `EbookCTA` passam a vir de dicionários por idioma; cada componente recebe/usa o `lang`.

Números, moeda e nomes de empresa/produto fictícios permanecem os mesmos nas duas versões (dados brasileiros em R$), só os rótulos e narrativas são traduzidos.

## Detalhes técnicos

- `Kiosk.tsx` deriva `lang` de `useParams()`, mantendo a persistência de sessão em `sessionStorage`.
- Sem mudança em chaves de storage, eventos de tracking ou no fluxo de leads (`EbookCTA` continua enviando os mesmos metadados; a linguagem já vai no payload).
