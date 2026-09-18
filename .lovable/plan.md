# Links sem idioma na URL: o que acontece hoje (relatório)

Testei os links reais na prévia. O resultado confirma que **todo** link sem idioma perde a página de destino, não só os de Insights.

| Link acessado | Onde cai hoje | Deveria cair em |
| --- | --- | --- |
| /insights/demo-dados-prontos-para-ia | /en/demo-dados-prontos-para-ia (não existe) | /en/insights/demo-dados-prontos-para-ia |
| /insights | /en (home) | /en/insights |
| /i6-blog/&lt;slug&gt; | /en/&lt;slug&gt; (não existe) | /en/i6-blog/&lt;slug&gt; |
| /i6-intelligence/&lt;slug&gt; | /en/&lt;slug&gt; (não existe) | /en/i6-intelligence/&lt;slug&gt; |
| /solutions/x | /en/x (não existe) | /en (rota descontinuada) |
| /docs | /en (home) | /en/docs |

A etiqueta de campanha (?utm_source=...) **foi preservada** em todos esses casos.

## Respostas aos 5 pontos

**1. Onde vive a lógica**
Em `src/App.tsx` há dois mecanismos: `RootLangRedirect` (correto, monta `/idioma + caminho completo`) e a validação dentro de `LocalizedRoutes` (quebrada). Não funciona nem para rotas simples: `/docs` e `/insights` também caem na home.

**2. Por que /insights/&lt;slug&gt; virou /en/&lt;slug&gt;**
Sim — é exatamente a causa que você suspeitou. A rota `/:lang/*` captura qualquer endereço, então "insights" é lido como se fosse o código de idioma. Ao perceber que não é um idioma válido, a lógica **remove o primeiro segmento** e o substitui por "en", jogando "insights" no lixo. O redirecionamento correto (`RootLangRedirect`) nunca é alcançado, porque a rota genérica casa primeiro.

**3. Alcance do problema**
Geral, não específico de Insights: vale para qualquer endereço sem idioma, com ou sem slug (confirmado na tabela acima). Só escapam os endereços declarados explicitamente antes (`/demo`, `/demo-metrics/...`).

**4. Correção recomendada (não aplicada)**
Deixar de tratar o primeiro segmento como idioma por posição e passar a **verificar** se ele é um idioma conhecido antes de qualquer corte: se for, segue para o site no idioma; se não for, monta o destino como `/idioma-preferido + caminho completo original`, com qualquer profundidade de path. Isso conserta de uma vez Insights, blog, research, docs e futuras rotas, sem exceções por rota.

**5. Etiqueta de campanha (UTM)**
São dois pontos de falha independentes. Este redirecionamento de idioma já preserva a etiqueta. A perda que apuramos antes acontece **depois**, nos redirecionamentos internos de `/insights/<slug>` para `/i6-blog` ou `/i6-intelligence`, que não repassam a query. Consertar o idioma não conserta aquele; são dois reparos separados.

## Detalhes técnicos

- `src/App.tsx`: a rota `<Route path="/:lang/*" element={<LocalizedRoutes />} />` precede `<Route path="*" element={<RootLangRedirect />} />`, tornando o catch-all inalcançável.
- `LocalizedRoutes` faz `location.pathname.replace(/^\/[^/]+/, '')` quando `isLang(lang)` é falso — isso descarta o primeiro segmento real.
- Correção proposta: em `LocalizedRoutes`, quando `lang` não é idioma válido, redirecionar para `/${detectPreferredLang()}${location.pathname}${search}${hash}` (path completo, sem `replace`), mantendo `RootLangRedirect` para `/`.
- Segundo reparo (independente): incluir `location.search`/`hash` nos `<Navigate>` de `src/pages/InsightArticle.tsx` (linhas 72-80).

## Escopo desta entrega

Este documento é só o relatório solicitado. Nenhuma alteração de código foi feita e nenhuma release foi publicada.
