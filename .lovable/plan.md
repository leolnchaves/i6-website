# Ajustes no Code.gs — POST e GET entregando o mesmo lead

Li o `.gs` atualizado. O que já está certo: o dedupe por `lead_uid`, o `uuidOk_`, o `lead_uid` no `appendRow` e o dispatch já sem a trava de `insight_id`.

O que ainda falta (é o que causa canal/motivo errados e linhas duplicadas no HUB):

- Nenhuma das duas rotas envia `channel` e `reason` — o HUB deduz pela rota e por isso erra.
- O `doPost` não manda `message`, `subscription` nem `lead_uid` ao HUB.
- O `doGet` não manda `lead_uid` (o HUB não reconhece que é o mesmo lead do push), não trunca `source` em 50, manda `insight_id` vazio e não manda `metadata`.
- `COLUMN_MAP` não tem `lead_uid`, então o `doGet` nem consegue ler a coluna.

São 5 inserções. Nada é removido, exceto duas linhas substituídas no `doGet` (indicadas).

---

## Ajuste 1 — `COLUMN_MAP`: adicionar `lead_uid`

Código original (final do objeto, linhas 32-33):

```js
  user_agent:               'user_agent',
};
```

// INSERÇÃO: adicionar a coluna lead_uid ao mapa, para o doGet poder lê-la

Código a ser inserido (substitui o trecho acima):

```js
  user_agent:               'user_agent',
  lead_uid:                 'lead_uid',
};
```

---

## Ajuste 2 — dois helpers novos, logo abaixo do `uuidOk_`

Código original (linhas 35-38):

```js
function uuidOk_(v) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    .test(String(v == null ? '' : v).trim());
}
```

// INSERÇÃO: canal fixo do site + regra única de reason, usados pelo doPost e pelo doGet

Código a ser inserido (logo abaixo do bloco acima):

```js
// canal fixo do site — mesmo valor nas duas rotas
const HUB_CHANNEL = 'i6-website';

// reason: respeita o que o site mandou; senão deriva do insight_id
function hubReason_(reason, insightId) {
  var r = String(reason == null ? '' : reason).trim();
  if (r) return r.slice(0, 50);
  return uuidOk_(insightId) ? 'insight' : 'contact';
}

// leitura limpa de célula pelo índice do COLUMN_MAP
function cell_(row, idx, key) {
  return idx[key] >= 0 ? String(row[idx[key]] || '').trim() : '';
}
```

---

## Ajuste 3 — `doPost`: capturar o parâmetro `reason`

O site já envia `reason`; o script hoje ignora.

Código original (linha 113, fim do bloco de tracking):

```js
  var user_agent                = (e.parameter.user_agent || '').toString().slice(0, 500);
```

// INSERÇÃO: capturar o reason enviado pelo site

Código a ser inserido (logo abaixo da linha acima):

```js
  var reason                    = (e.parameter.reason || '').toString().slice(0, 50);
```

---

## Ajuste 4 — `doPost`: completar o payload do dispatch

Código original (linhas 127-132):

```js
      dispatchToHub_({
        insight_id: insight_id,
        email: email,
        name: name,
        company: company,
        source: (subscription ? ('i6-website:' + subscription) : 'i6-website').slice(0, 50),
```

// INSERÇÃO: message, subscription, channel, reason e lead_uid — mesmos campos que o doGet passará a enviar

Código a ser inserido (substitui o trecho acima; o bloco `metadata:` seguinte fica intacto):

```js
      dispatchToHub_({
        insight_id: insight_id,
        email: email,
        name: name,
        company: company,
        message: message,
        subscription: subscription,
        channel: HUB_CHANNEL,
        reason: hubReason_(reason, insight_id),
        lead_uid: lead_uid,
        source: (subscription ? ('i6-website:' + subscription) : 'i6-website').slice(0, 50),
```

---

## Ajuste 5 — `doGet`: montar o mesmo payload do `doPost`

Código original (linhas 238-248):

```js
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

// INSERÇÃO: mesmo contrato do doPost — channel, reason, lead_uid, metadata, source truncado e insight_id só se for UUID

Código a ser inserido (substitui todo o `leads.push({...})` acima; a linha do `const subscription` acima dele permanece):

```js
      const rawInsightId = cell_(row, idx, 'insight_id');

      const lead = {
        timestamp: ts.toISOString(),
        email: email,
        name:    cell_(row, idx, 'name'),
        company: cell_(row, idx, 'company'),
        message: cell_(row, idx, 'message'),
        subscription: subscription,
        source: (subscription ? ('i6-website:' + subscription) : 'i6-website').slice(0, 50),
        channel: HUB_CHANNEL,
        reason: hubReason_(cell_(row, idx, 'reason'), rawInsightId),
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
```

Token do sync, `since`/`next_cursor`, `limit` e o formato `{leads, next_cursor}` continuam idênticos. A planilha não tem coluna `reason` — `cell_` devolve `''` e o fallback (`insight`/`contact`) assume; nada quebra.

---

## Passo a passo de aplicação

1. Aplicar os 5 ajustes no `Code.gs`.
2. Salvar (Ctrl+S).
3. **Implantar → Gerenciar implantações → Editar (lápis) → Versão: Nova versão → Implantar** (a URL não muda).
4. Preencher 1 CTA de blog no site.
5. Conferir: na planilha, 1 linha com `lead_uid` preenchido; na aba `_dispatch_log`, 1 registro `OK`; no HUB, `channel = i6-website` e `reason = insight`.

## Do lado do HUB (para as duplicatas realmente sumirem)

O script passa a entregar `channel`, `reason` e `lead_uid` idênticos nos dois caminhos, mas quem colapsa os registros é o HUB:

- `ingest-insight-lead` e `sync-website-leads` devem fazer **upsert por `lead_uid`** quando ele estiver presente, em vez de inserir.
- Ambas devem usar o `channel` e o `reason` do payload, em vez de inferir pela rota de entrada.

## Site

Nenhuma mudança: já envia `lead_uid`, `reason`, `source` ≤ 50 e omite `insight_id` vazio.
