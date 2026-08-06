# Igualar o que o POST e o GET entregam ao HUB

Causa raiz confirmada pelos dois trechos: nenhuma das duas rotas envia `channel` e `reason` explicitamente (o HUB deduz pela rota de entrada, e por isso erra), e o `doGet` ainda não expõe `lead_uid`, manda `insight_id` como string vazia, não trunca `source` em 50 e não manda `metadata`.

Correção: as duas funções passam a enviar **o mesmo conjunto de campos**, com `channel` e `reason` explícitos.

Contrato único (idêntico nas duas rotas):

| campo | valor |
|---|---|
| `channel` | sempre `i6-website` |
| `reason` | o `reason` enviado pelo site; se vazio → `insight` quando há `insight_id` válido, senão `contact` |
| `source` | `i6-website:<subscription>` truncado em 50 |
| `lead_uid` | chave de idempotência |
| `insight_id` | só quando é UUID válido (`uuidOk_`) |
| `email`, `name`, `company`, `message`, `subscription` | string, sempre presentes |
| `metadata` | `utm_source`, `utm_medium`, `utm_campaign`, `referrer`, `user_agent` |

São 4 alterações.

## Alteração 1 — `COLUMN_MAP`: acrescentar as colunas que faltam

No objeto `COLUMN_MAP` (topo do arquivo), acrescentar as chaves abaixo, mantendo o estilo das existentes. Os valores são os nomes das colunas em minúsculas, como estão no cabeçalho da planilha:

```js
const COLUMN_MAP = {
  // ... chaves existentes (timestamp, subscription, company, email, name, message, insight_id) ...

  // ===== ADICIONAR =====
  lead_uid:             'lead_uid',
  first_touch_source:   'first_touch_source',
  first_touch_medium:   'first_touch_medium',
  first_touch_campaign: 'first_touch_campaign',
  first_touch_referrer: 'first_touch_referrer',
  last_touch_source:    'last_touch_source',
  last_touch_medium:    'last_touch_medium',
  last_touch_campaign:  'last_touch_campaign',
  user_agent:           'user_agent',
  // ===== FIM =====
};
```

Observação: se a planilha ainda não tiver a coluna `reason`, o `doGet` cai no fallback (`insight`/`contact`) — nada quebra.

## Alteração 2 — helpers, antes do `doGet`

Bloco novo, colado imediatamente **antes** de `function doGet(e) {`:

```js
// ===== ADICIONAR =====
function cell_(row, idx, key) {
  return idx[key] >= 0 ? String(row[idx[key]] || '').trim() : '';
}

// canal fixo do site — mesmo valor nas duas rotas
const HUB_CHANNEL = 'i6-website';

// reason: respeita o que o site mandou; senão deriva do insight_id
function hubReason_(reason, insightId) {
  const r = String(reason || '').trim();
  if (r) return r.slice(0, 50);
  return uuidOk_(insightId) ? 'insight' : 'contact';
}
// ===== FIM =====
```

## Alteração 3 — o `leads.push` do `doGet`

Trecho original:

```js
      const subscription = idx.subscription >= 0 ? String(row[idx.subscription] || '').trim() : '';

      leads.push({
        timestamp: ts.toISOString(),
        email: email,
        name:    idx.name    >= 0 ? String(row[idx.name]    || '') : '',
        company: idx.company >= 0 ? String(row[idx.company] || '') : '',
        message: idx.message >= 0 ? String(row[idx.message] || '') : '',
        insight_id: idx.insight_id >= 0 ? String(row[idx.insight_id] || '').trim() : '',
        subscription: subscription,
        source: subscription ? `i6-website:${subscription}` : 'i6-website',
        row: i + 1,
      });
```

Substituir **apenas o `leads.push({...})`** por (a linha do `subscription` continua igual):

```js
      const subscription = idx.subscription >= 0 ? String(row[idx.subscription] || '').trim() : '';

      // ===== SUBSTITUIR o leads.push antigo por este =====
      const rawInsightId = cell_(row, idx, 'insight_id');

      const lead = {
        timestamp: ts.toISOString(),
        email: email,
        name:    cell_(row, idx, 'name'),
        company: cell_(row, idx, 'company'),
        message: cell_(row, idx, 'message'),
        subscription: subscription,
        // mesma regra do doPost: truncado em 50 chars
        source: (subscription ? ('i6-website:' + subscription) : 'i6-website').slice(0, 50),
        channel: HUB_CHANNEL,
        reason: hubReason_(cell_(row, idx, 'reason'), rawInsightId),
        // chave de idempotência: permite ao HUB reconhecer que o lead do pull
        // é o mesmo já entregue pelo push
        lead_uid: cell_(row, idx, 'lead_uid'),
        metadata: {
          utm_source:   cell_(row, idx, 'first_touch_source')   || cell_(row, idx, 'last_touch_source')   || null,
          utm_medium:   cell_(row, idx, 'first_touch_medium')   || cell_(row, idx, 'last_touch_medium')   || null,
          utm_campaign: cell_(row, idx, 'first_touch_campaign') || cell_(row, idx, 'last_touch_campaign') || null,
          referrer:     cell_(row, idx, 'first_touch_referrer') || null,
          user_agent:   cell_(row, idx, 'user_agent')           || null,
        },
        row: i + 1,
      };

      // igual ao dispatchToHub_: só manda insight_id se for UUID válido
      if (uuidOk_(rawInsightId)) lead.insight_id = rawInsightId;

      leads.push(lead);
      // ===== FIM =====
```

Token do sync, cursor (`since` / `next_cursor`), limite, filtro por e-mail e o formato da resposta (`{leads, next_cursor}`) continuam idênticos.

## Alteração 4 — o payload do `doPost`

Trecho original:

```js
var language                  = (e.parameter.language || '').toString().slice(0, 5);
var user_agent                = (e.parameter.user_agent || '').toString().slice(0, 500);
```

Acrescentar uma linha logo abaixo (o site já manda esse parâmetro, o script hoje o ignora):

```js
var user_agent                = (e.parameter.user_agent || '').toString().slice(0, 500);
// ===== ADICIONAR =====
var reason                    = (e.parameter.reason || '').toString().slice(0, 50);
// ===== FIM =====
```

Trecho original do dispatch:

```js
      dispatchToHub_({
        insight_id: insight_id,
        email: email,
        name: name,
        company: company,
        source: (subscription ? ('i6-website:' + subscription) : 'i6-website').slice(0, 50),
        metadata: {
```

Substituir por (o bloco `metadata` continua igual):

```js
      dispatchToHub_({
        insight_id: insight_id,
        email: email,
        name: name,
        company: company,
        // ===== ADICIONAR: mesmos campos do doGet =====
        message: message,
        subscription: subscription,
        channel: HUB_CHANNEL,
        reason: hubReason_(reason, insight_id),
        lead_uid: lead_uid,
        // ===== FIM =====
        source: (subscription ? ('i6-website:' + subscription) : 'i6-website').slice(0, 50),
        metadata: {
```

O `if (insight_id)` que envolve o dispatch, o `appendRow`, o dedupe e o `logDispatch_` ficam como estão.

## Passo a passo

1. Aplicar as 4 alterações no `Code.gs`.
2. Salvar.
3. Gerenciar implantações → Editar → **Nova versão** (a URL não muda).
4. Preencher 1 CTA de blog no site.
5. Conferir no HUB: **1 único lead**, `channel = i6-website`, `reason = insight`, e `_dispatch_log` com o registro do push.

## Do lado do HUB (necessário para acabar com as duplicatas)

O script passa a entregar `channel`, `reason` e `lead_uid` nos dois caminhos, mas quem colapsa os registros é o HUB:

- `ingest-insight-lead` e `sync-website-leads` devem fazer **upsert por `lead_uid`** (quando presente), em vez de inserir.
- Ambas devem usar o `channel` e o `reason` recebidos no payload, em vez de inferir pela rota de entrada.

## Site

Nada muda: já envia `lead_uid`, `reason`, `source` ≤ 50 e omite `insight_id` vazio.
