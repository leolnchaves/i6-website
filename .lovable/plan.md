# Fechamento: validação ponta a ponta da captura de leads

## Status dos 3 itens que você listou

1. **Reautorizar o Apps Script** — resolvido. Quando a função de teste conseguiu sair para a rede (o log mostrou tentativa de DNS e depois HTTP 400 do HUB), ficou provado que o `UrlFetchApp` está autorizado.
2. **Revalidar o token do HUB** — resolvido. O HUB respondeu `400 invalid_payload` (e não `401`), o que só acontece depois de autenticar: `INGEST_INSIGHT_LEAD_SECRET` no header `x-webhook-secret` é o par correto.
3. **Trechos do `doPost`** — entregues e implantados por você (guard do `e`, dedupe por `lead_uid`, `uuidOk_` no `dispatchToHub_`). Release do site **v2.2.20** já publicada.

## O que ainda falta

### A. Coluna `lead_uid` na planilha (pré-requisito do dedupe)
O bloco de dedupe é fail-open: se o cabeçalho da aba `ContactForm` não tiver a coluna `lead_uid`, ele não faz nada e as duplicatas voltam a acontecer. Acrescentar `lead_uid` como última coluna do cabeçalho e garantir que a linha gravada no `appendRow` inclua esse valor na mesma posição.

### B. Teste ponta a ponta (3 casos)
1. **Lead normal pelo site** (`/contact` ou CTA de artigo aberto) → 1 linha na planilha, `lead_uid` preenchido, chegada no HUB.
2. **Lead sem insight** (contato genérico) → deve chegar no HUB sem `invalid_payload`, já que o `insight_id` é omitido quando não é UUID.
3. **Lead do /kiosk com rede oscilando** (desligar o Wi-Fi durante o envio e religar) → a fila reenvia, mas a planilha fica com **1 linha só** e a resposta do segundo POST é `{"result":"ok","duplicate":true}`.

### C. Limpeza da planilha atual
Remover as linhas duplicadas históricas e reprocessar manualmente os leads que nunca chegaram ao HUB (Victoria Baumann e outros do mesmo período), enviando-os pela função de teste do Apps Script com o payload correto.

## Detalhes técnicos

- Verificação rápida do dedupe: nos logs de execução do Apps Script, um POST repetido deve encerrar antes do `dispatchToHub_`, sem linha nova.
- Se aparecer `FAIL_401` no `logDispatch_` depois do deploy, é sinal de que a propriedade `INGEST_INSIGHT_LEAD_SECRET` foi alterada no HUB — nesse caso é só atualizar a Script Property, sem mexer em código.
- Para identificar os leads perdidos, filtrar na planilha as linhas cujo `logDispatch_` registrou `FAIL_400` / `EXCEPTION`.
