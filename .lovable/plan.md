# Igualar o que o POST e o GET entregam ao HUB

Causa raiz confirmada pelos dois trechos: o `doGet` **não expõe `lead_uid`** (então o HUB não tem como saber que o lead do pull é o mesmo do push), manda `insight_id` como string vazia em alguns casos, não trunca `source` em 50 e não manda `metadata`. Resultado: linhas repetidas e rótulos divergentes.

São 3 alterações, todas dentro do `doGet` + `COLUMN_MAP`. O `doPost` fica intacto.

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

## Alteração 2 — helper de leitura de célula, antes do `doGet`

Bloco novo, colado imediatamente **antes** de `function doGet(e) {`:

```js
// ===== ADICIONAR =====
function cell_(row, idx, key) {
  return idx[key] >= 0 ? String(row[idx[key]] || '').trim() : '';
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

Substituir **apenas o `leads.push({...})`** por (a linha do `subscription` acima continua igual):

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
        // chave de idempotência: é isso que permite ao HUB reconhecer
        // que o lead do pull é o mesmo já entregue pelo push
        lead_uid: cell_(row, idx, 'lead_uid'),
        // mesmo formato de metadata que o doPost envia
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

Nada mais muda: token do sync, cursor (`since` / `next_cursor`), limite, filtro por e-mail e o formato da resposta (`{leads, next_cursor}`) continuam idênticos.

## Passo a passo

1. Aplicar as 3 alterações no `Code.gs`.
2. Salvar.
3. Gerenciar implantações → Editar → **Nova versão** (a URL não muda).
4. Preencher 1 CTA de blog no site.
5. Conferir no HUB: **1 único lead**, com `channel` e `reason` corretos, e `_dispatch_log` com o registro do push.

## Do lado do HUB (necessário para acabar com as duplicatas)

O script agora entrega `lead_uid` nos dois caminhos, mas quem colapsa os registros é o HUB:

- `ingest-insight-lead` e `sync-website-leads` devem fazer **upsert por `lead_uid`** (quando presente), em vez de inserir.
- `channel` e `reason` devem ser derivados dos mesmos campos nas duas rotas: `source` (`i6-website:<subscription>`) define o canal; presença de `insight_id` define `reason = Insight`, ausência define `Contact`.

Sem esse upsert, os rótulos ficam consistentes, mas o HUB ainda pode criar linha extra ao ler o pull.

## Site

Nada muda: já envia `lead_uid`, `source` ≤ 50 e omite `insight_id` vazio.
