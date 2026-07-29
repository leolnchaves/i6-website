## 1. Corrigir o erro 404 no Fully Kiosk

Causa confirmada contra o site publicado:

```text
GET https://infinity6.ai/            -> 200
GET https://infinity6.ai/kiosk       -> 404
GET https://infinity6.ai/kiosk-metrics/<token> -> 404
```

O GitHub Pages só responde 200 para caminhos que existem como arquivo. Como é uma SPA, só existe `dist/index.html`; as demais rotas caem no `404.html` (cópia do index). O conteúdo carrega, mas o **status HTTP é 404** — o Chrome ignora, o Fully Kiosk mostra a tela de erro.

Correção no build: gerar arquivos estáticos reais, cópias do `index.html` final (já com os stubs de SEO aplicados):

- `dist/kiosk/index.html`
- `dist/kiosk-metrics/<token>/index.html`

Passa a responder 200 e o Fully Kiosk abre normalmente. Nenhuma mudança no roteamento do app.

## 2. Deixar o /kiosk limpo (sem tracking por enquanto)

Remover as chamadas de tracking dos pontos de uso, mantendo a UX idêntica:

- `src/pages/Kiosk.tsx`: remover `initKioskTracking()` e os 4 `trackKioskEvent` (`kiosk:start`, `q1:*`, `q2:*`, `results:*`).
- `src/components/kiosk/KioskSignalIntelliboard.tsx`: remover `trackKioskEvent('signal:*')`.
- `src/components/kiosk/EbookCTA.tsx`: remover `trackKioskEvent('ebook:*')` — o envio do lead em si continua igual, sem alteração no FormData.

Sem export automático de CSV, sem gravação em localStorage/IndexedDB, sem fila de sync: o totem volta a rodar sem nenhum efeito colateral de storage.

## 3. Manter a página de métricas para depois

- A rota `/kiosk-metrics/:token` e o `src/pages/KioskMetrics.tsx` continuam existindo, apenas sem inicializar o tracking (o boot deixa de gravar/reconciliar).
- Como não há mais coleta, a tela exibe um aviso curto de "coleta de métricas temporariamente desativada" no topo, preservando gráficos e tabela para quando religarmos.
- As bibliotecas `src/lib/kioskTracker.ts`, `kioskEventStore.ts`, `kioskEventSync.ts` e `kioskDevice.ts` ficam no projeto, intactas e sem uso, prontas para reativação.
- A fila offline de **leads** (`leadQueue.ts`) e seus botões no dashboard continuam funcionando normalmente — isso não é métrica.

## Detalhes técnicos

- `scripts/prerender-seo-stubs.mjs`: escrever as cópias do `index.html` nas rotas do kiosk (token em constante compartilhada com o app).
- Edições pontuais em `src/pages/Kiosk.tsx`, `src/components/kiosk/KioskSignalIntelliboard.tsx`, `src/components/kiosk/EbookCTA.tsx` e `src/pages/KioskMetrics.tsx`.
- Nenhuma dependência nova; segue 100% estático.
