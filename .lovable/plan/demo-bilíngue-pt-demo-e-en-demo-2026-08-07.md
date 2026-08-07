# /demo bilíngue: /pt/demo e /en/demo

Hoje a demo vive em `/demo` e o idioma vem do parâmetro `?lang=pt|en`. Passa a existir `/pt/demo` e `/en/demo`, com a página inteira (quiz, cards, simulações e i6 Signal) traduzida.

## Rotas

- Novas rotas `/:lang/demo` (validando `pt`/`en`) sem header/footer, fora do layout do site.
- `/demo` sem prefixo passa a redirecionar para `/<idioma detectado>/demo`, preservando query string (útil porque o totem hoje aponta para `/demo`).
- `/demo-metrics/:token` continua como está.
- Idioma vem da URL; `?lang=` deixa de ser necessário (se vier, a URL manda).
- `scripts/prerender-seo-stubs.mjs` passa a gerar arquivos 200 reais para `pt/demo/index.html`, `en/demo/index.html` e `demo/index.html` (além do já existente de métricas), para não dar 404 no GitHub Pages / Fully Kiosk.

## Seletor de idioma na /demo

- Adicionar o toggle PT/EN (mesmo componente visual do site, `LanguageSelectorSimple`) fixo no topo da `/demo`, ao lado do botão "Reiniciar".
- Trocar o idioma navega para `/pt/demo` ou `/en/demo` mantendo o estágio da jornada (quiz/resultados) e a solução selecionada, sem reiniciar a sessão.

## Auditoria de tradução (verificada no código)

Já 100% bilíngue: `src/data/kiosk/config.ts` (abertura, quiz, resultados, rodapé, eBooks por território), `src/data/solutionsV2/content.ts` (cards e rótulos), `src/data/kiosk/signals.ts` (todos os cenários do i6 Signal), `src/data/signalDemo/content.ts`. Não há resíduo em PT dentro dos blocos EN desses arquivos.

Só em PT hoje (é aqui que está o trabalho):

1. **Datasets das simulações** — filtros, etapas do pipeline, colunas de tabela, insights e textos de resultado:
   - `commercialTargets.ts` (Metas Comerciais Preditivas)
   - `mixAssortmentOrder.ts` (Mix, Sortimento e Pedido Ideal)
   - `priceMargin.ts` e `priceTurnover.ts` (Preço → Margem / Giro)
   - `propensityCampaign.ts` (Campanha por Propensão)
   - `predictivePersonalization.ts` e `demandForecast.ts`: bilíngues apenas em parte da cópia — completar os rótulos/tabelas que ficaram em PT
   - `priceToMargin.ts`: tem bloco EN parcial — completar
2. **Strings fixas nos componentes** — cabeçalhos, legendas de eixo, botões e microcópias em `PriceTurnoverDemo`, `PriceMarginDemo`, `CommercialTargetsDemo`, `PriceToMarginDemo`, `PropensityCampaignDemo`, `MixAssortmentOrderDemo`, `SolutionDemoBlock`, `AttractScreen`, `KioskSignalIntelliboard` e `EbookCTA` passam a vir de dicionários por idioma; cada componente recebe/usa o `lang`.

Ao final, faço uma varredura em `/en/demo` percorrendo os 4 territórios e todas as simulações para garantir que nenhum texto em PT sobrou.

Números, moeda e nomes de empresa/produto fictícios permanecem os mesmos nas duas versões (dados brasileiros em R$), só os rótulos e narrativas são traduzidos.

## Detalhes técnicos

- `Kiosk.tsx` deriva `lang` de `useParams()`, mantendo a persistência de sessão em `sessionStorage`.
- Sem mudança em chaves de storage, eventos de tracking ou no fluxo de leads (`EbookCTA` continua enviando os mesmos metadados; a linguagem já vai no payload).
