# Corrigir duplicatas e leads perdidos (Apps Script + site) — modo conservador

Você tem razão: esse Apps Script tem várias integrações penduradas (planilha, HUB ingest, `doGet` de sync do HUB, tokens). Então o plano **não reescreve o `doPost`**. São 3 inserções pontuais, cada uma isolada e reversível, sem tocar em nada do que já funciona.

## Princípios de segurança das alterações

- Nada é removido ou renomeado: `SHARED_TOKEN`, `COLUMN_MAP`, `SHEET_NAME`, honeypot, ordem das colunas e o `doGet` de sync ficam **idênticos**.
- Cada mudança é adicionada como bloco novo (ou 1 linha), fácil de comentar e desfazer.
- Antes de salvar: **Implantações → nova versão** (a versão anterior continua existindo para rollback imediato).
- Nenhuma mudança de layout da planilha exigida além de **acrescentar** uma coluna no fim do cabeçalho (colunas existentes não se movem).

## As 3 alterações no Apps Script

1. **Guard do `e`** — 1 linha no início do `doPost`: se `e` ou `e.parameter` vier vazio, responde `ok` e sai. Elimina o `Cannot read properties of undefined` das execuções manuais e de chamadas malformadas.

2. **Dedupe por `lead_uid`** — bloco novo logo depois da checagem do token: lê `e.parameter.lead_uid`; se já existir na coluna `lead_uid`, responde `{"result":"ok","duplicate":true}` e sai antes de gravar/reenviar. Envolvido em `LockService.getScriptLock()`. Se a coluna não existir na planilha, o bloco simplesmente não faz nada (fail-open) — ou seja, não quebra nada se você adiar a criação da coluna.

3. **Sanitização do `insight_id` antes do POST ao HUB** — no ponto onde o `insight_id` é usado no envio, passa por um helper `uuidOk()`: se não for UUID válido, o campo é omitido do envio (em vez de ir vazio). Era isso que gerava `invalid_payload` e perdia leads como o da Victoria Baumann. O valor continua sendo gravado na planilha como hoje.

Nada do header/secret muda: se o envio hoje já usa `x-webhook-secret` com `INGEST_INSIGHT_LEAD_SECRET`, fica como está — eu só confirmo com você o trecho exato antes de mexer.

## Planilha

Acrescentar `lead_uid` como **última** coluna do cabeçalho da aba `ContactForm`. Sem isso, o item 2 fica inativo (site segue funcionando).

## Site (eu aplico) — patch v2.2.20

- `src/lib/leadFormConfig.ts`: `LEAD_UID_FIELD` + `normalizeLeadFields` (campos sempre string, `source` ≤ 50 chars, `insight_id` removido quando vazio).
- `src/lib/leadQueue.ts`: timeout 20s, máximo 3 tentativas com backoff, dedupe local por `lead_uid` (fim do reenvio infinito com Wi-Fi oscilando).
- `ContactForm.tsx`, `ArticleCTAForm.tsx`, `LeadGateForm.tsx`, `EbookCTA.tsx` passando pela normalização.

## Ordem de execução

1. Adicionar a coluna `lead_uid` na planilha.
2. Eu te mando os 3 trechos exatos para colar (com marcadores de onde entram) — você salva e implanta nova versão.
3. Eu publico a release v2.2.20 do site.
4. Teste: 1 lead pelo site + 1 pelo /kiosk com rede oscilando → 1 linha por lead, ambos chegando no HUB.

## Rollback

Se algo sair torto: reverter para a versão anterior da implantação no Apps Script (site continua enviando normalmente) e reverter a release do site pelo histórico.
