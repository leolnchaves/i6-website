
# Métricas do /kiosk não podem mais se perder (100% estático)

Nada de banco, backend, edge function ou Lovable Cloud. Tudo roda no navegador do totem; o único destino externo é o **Apps Script/planilha que o site já usa hoje** para os leads do Kiosk — o mesmo padrão estático já aprovado.

## O que aconteceu (confirmado no código)

`src/lib/kioskTracker.ts` grava os eventos **apenas** em `localStorage` (chave `i6_kiosk_events`). Não há cópia remota nem backup. O Fully Kiosk tem opções como "Clear Cache / Clear WebStorage on Restart" — quando qualquer uma dispara (ou o app é atualizado/reinstalado), todo o histórico do dia some. `/kiosk-metrics/<token>` lê essa mesma chave, então mostra vazio.

## Estratégia: três camadas independentes

Se uma falhar, as outras preservam o dado.

### 1. Persistência local redundante
- Manter `localStorage` (leitura rápida do dashboard) **e** espelhar tudo em **IndexedDB** (`i6-kiosk` / store `events`), que não tem o limite de ~5MB e sobrevive a limpezas parciais.
- Na inicialização, reconciliar as duas fontes: o que existir em qualquer uma repopula a outra (união por `id`).
- `device_id` estável gerado uma vez e guardado nas duas camadas.

### 2. Export automático diário para arquivo
- Uma vez por dia (primeiro carregamento após virar o dia), o kiosk dispara automaticamente o download do CSV do dia para a pasta de downloads do dispositivo — arquivo físico, imune à limpeza de webstorage.
- Nome: `kiosk-events-<device_id>-<AAAA-MM-DD>.csv`.

### 3. Cópia remota em lote (opcional, mesmo canal dos leads)
- Cada evento também é enfileirado e enviado em lote ao `APPS_SCRIPT_URL` já configurado, reaproveitando o padrão de `leadQueue.ts` (POST `no-cors`, timeout curto, retry, fila offline).
- Lotes de até 50 eventos a cada ~20s, mais flush em `online`, no load e em `pagehide` — não gera requisição por toque.
- Payload: `type=kiosk_event`, `device_id`, `events` (JSON), `app_version`.
- Offline o totem continua funcionando normalmente; a fila reenvia quando a rede volta.
- Se você preferir zero tráfego externo novo, essa camada 3 fica desligada por uma flag e as camadas 1 e 2 já resolvem a perda.

## Visibilidade em /kiosk-metrics

- Bloco de saúde no topo: `device_id`, total local, pendentes de envio, último envio remoto e último export automático.
- Botões "Forçar envio agora" e "Exportar CSV do dia".
- Aviso destacado quando o `localStorage` estiver vazio mas houver histórico no IndexedDB (sinal de limpeza), ou quando o último export tiver mais de 24h.

## Configuração do Fully Kiosk (fora do código)

Após o deploy, desmarcar "Clear Cache on Restart", "Clear WebStorage on Restart" e "Clear Cookies". Isso reduz a chance de zerar a camada local — e, mesmo que zere, o CSV diário e a cópia remota preservam o dia.

## Detalhes técnicos

- Alterados: `src/lib/kioskTracker.ts` (fachada sobre as 3 camadas), `src/pages/KioskMetrics.tsx` (bloco de saúde + ações).
- Novos: `src/lib/kioskEventStore.ts` (IndexedDB + reconciliação), `src/lib/kioskEventSync.ts` (fila/lote), `src/lib/kioskDevice.ts` (`device_id`).
- A API `trackKioskEvent(eventKey)` não muda — os 6 pontos de chamada em `Kiosk.tsx`, `KioskSignalIntelliboard.tsx` e `EbookCTA.tsx` ficam intactos.
- Sem dependências novas: IndexedDB é API nativa do navegador.
