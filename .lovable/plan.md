# Corrigir duplicatas e leads perdidos (Apps Script + site)

O arquivo que você colou não tem um `const payload = { ... }` — o envio ao HUB está montado direto dentro do `doPost`. Como esse trecho veio truncado, o plano substitui o `doPost` inteiro por uma versão nova, em vez de fazer edições cirúrgicas em linhas que não consigo ver.

## O que muda

1. **Apps Script (você cola)** — novo `doPost` com:
   - guard do `e` (não estoura mais `Cannot read properties of undefined`)
   - dedupe por `lead_uid` (coluna nova na planilha) + `LockService` → mesma pessoa nunca gera 2 linhas
   - envio ao HUB com header `x-webhook-secret` usando `INGEST_INSIGHT_LEAD_SECRET`
   - `insight_id` só entra no payload se for UUID válido (senão é omitido — era a causa do `invalid_payload` do lead da Victoria)
   - campos sempre string (nunca `null`) e `source` truncado em 50 chars
   - resposta com `{"result":"ok","duplicate":true|false}`

2. **Planilha** — adicionar a coluna `lead_uid` no cabeçalho da aba `ContactForm` (qualquer posição; o script acha pelo nome).

3. **Site (eu aplico)** — patch v2.2.20 com as correções de idempotência já preparadas:
   - `src/lib/leadFormConfig.ts`: `LEAD_UID_FIELD` + `normalizeLeadFields` (strings garantidas, `source` ≤ 50, `insight_id` removido quando vazio)
   - `src/lib/leadQueue.ts`: timeout 20s, máximo 3 tentativas com backoff, dedupe por `lead_uid`
   - `ContactForm.tsx`, `ArticleCTAForm.tsx`, `LeadGateForm.tsx`, `EbookCTA.tsx` passando pela normalização

## Ordem de execução

1. Adicionar a coluna `lead_uid` na planilha.
2. Colar o novo `doPost` no Apps Script → salvar → **Nova versão → Implantar** (executar como "Eu", acesso "Qualquer pessoa").
3. Eu publico a release v2.2.20 do site.
4. Teste ponta a ponta: um lead pelo site e um pelo /kiosk com Wi-Fi oscilando → deve gerar 1 linha só e chegar no HUB.

## Detalhes técnicos

- `lead_uid` é gerado no cliente (uuid por submissão) e reenviado igual em todas as tentativas da fila offline; o Apps Script varre a coluna `lead_uid` antes de gravar e, se já existir, responde `ok` sem inserir nem reenviar ao HUB.
- `LockService.getScriptLock()` com espera de 10s evita corrida entre duas tentativas simultâneas do mesmo `lead_uid`.
- O envio ao HUB fica em `try/catch` isolado: falha no HUB não impede a gravação na planilha, e a linha recebe o status do POST (`hub_status`) para auditoria.
- `doGet` (sync do HUB) fica inalterado, apenas passa a expor `lead_uid` junto dos demais campos.

Depois de aprovado, eu te entrego o `doPost` completo pronto para colar e publico o patch do site.
