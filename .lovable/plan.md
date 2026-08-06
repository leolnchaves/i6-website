# Fazer POST e GET entregarem o mesmo lead

Objetivo: os dois caminhos (push do `doPost` e pull do `doGet` lido pelo `sync-website-leads`) passam a produzir **o mesmo payload, com a mesma chave de idempotência**. Assim o HUB pode reconhecer que é o mesmo lead e os rótulos (`channel`, `reason`) saem iguais nos dois lados.

## Peça central: um único montador de payload

Criar no Apps Script uma função nova, `buildHubPayload_(f)`, que é a **única** fonte do formato enviado/exposto ao HUB. Ela é usada em três lugares: no `doPost` (antes do `dispatchToHub_`), no `doGet` (no lugar do objeto montado hoje dentro do loop) e no `reenviarUltimoLead`.

Campos padronizados:

- `lead_uid` — chave de idempotência (o site já manda; no `doGet` vem da coluna `lead_uid`). É o que permite ao HUB colapsar push + pull no mesmo lead.
- `insight_id` — incluído **somente** se `uuidOk_()`; caso contrário o campo é omitido (não vai vazio).
- `source` — mesma regra nos dois: `i6-website:<subscription>` truncado em 50 caracteres. Quando há `insight_id` válido, o `subscription` já é o do insight, então o HUB consegue derivar `reason: Insight` também no pull.
- `email`, `name`, `company`, `message` — sempre presentes, string (nunca `null`), inclusive `message` no pull (hoje uma leitura vem com mensagem e outra vazia).
- `metadata` — `utm_source`, `utm_medium`, `utm_campaign`, `referrer`, `user_agent`, `language`, com o mesmo fallback `first_touch_* || last_touch_*` que o `reenviarUltimoLead` já usa.

## Alterações no `Code.gs`

1. **Adicionar `buildHubPayload_`** logo depois do helper `uuidOk_` (bloco novo, não altera nada existente).
2. **`doPost`** — no ponto onde hoje o payload é montado e passado ao `dispatchToHub_`, trocar o objeto literal pela chamada `buildHubPayload_({...})`, incluindo `lead_uid` (a variável já existe, lida no bloco de dedupe).
3. **`doGet`** — dentro do loop, substituir o `leads.push({ ... })` por `leads.push(buildHubPayload_({ ...valores da linha... }))`, lendo também as colunas `lead_uid` e `message`. O `next_cursor` e a lógica de cursor/limite ficam intactos.
4. **`reenviarUltimoLead`** — trocar o payload local pela mesma chamada, para o reenvio manual sair idêntico.
5. **`COLUMN_MAP`** — acrescentar `lead_uid: 'lead_uid'` (a coluna já existe na planilha), para o `doGet` conseguir ler o índice.

Nada é removido: `SHARED_TOKEN`, honeypot, dedupe por `lead_uid`, `appendRow`, ordem das colunas, `dispatchToHub_`, `logDispatch_` e o formato de resposta do `doGet` (`{leads, next_cursor}`) continuam como estão.

## Do lado do HUB

Com os dois caminhos entregando `lead_uid` e o mesmo `source`:

- `sync-website-leads` e `ingest-insight-lead` devem **deduplicar por `lead_uid`** (upsert por essa chave) — é o que elimina de fato as linhas repetidas.
- `channel` e `reason` derivados do mesmo par (`source`, presença de `insight_id`) nas duas rotas.

## O que falta para eu te dar os trechos exatos

O `Code.gs` que você colou veio truncado justamente no meio do `doPost` (do bloco de dedupe até o `dispatchToHub_`) e no início do `doGet`. Me mande esses dois trechos e eu devolvo o passo a passo com o **código original** e, dentro dele, marcado, exatamente o que entra e o que sai — sem reescrever o resto.

## Ordem de execução

1. Você me envia os dois trechos faltantes.
2. Eu devolvo as 5 alterações marcadas no código original.
3. Você salva e cria **Nova versão** em Gerenciar implantações (mesma URL).
4. Teste: 1 CTA de blog → 1 lead no HUB, `channel` e `reason` corretos; conferir que o pull não cria linha extra.
5. Limpar no HUB as 2 linhas duplicadas do teste anterior.

## Site

Nada muda no site: ele já envia `lead_uid`, `source` curto e omite `insight_id` vazio.
