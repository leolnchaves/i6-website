
# Reenviar manualmente o último lead ao i6 HUB

## Objetivo

Forçar a entrega ao HUB de um lead que já está gravado na planilha mas não chegou lá (dispatch falhou ou o lead veio de antes das correções), sem alterar o site e sem criar linha duplicada na planilha.

## Como funciona

Adicionar ao Apps Script uma função utilitária avulsa, executada manualmente pelo editor (nunca chamada pelo `doPost`). Ela lê a última linha da aba `ContactForm`, monta o mesmo payload que o `doPost` monta e chama o `dispatchToHub_` já existente. O resultado aparece no log de execução e na aba `_dispatch_log`.

Nada do fluxo atual é alterado: nenhuma mudança em `doPost`, `doGet`, `COLUMN_MAP` ou na estrutura da planilha.

## Código a adicionar (no final do Code.gs)

```js
// Utilitário manual: reenvia ao HUB a última linha da planilha.
// Execute pelo editor do Apps Script. Não é chamado pelo doPost.
function reenviarUltimoLead() {
  var sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var last = sh.getLastRow();
  if (last < 2) { console.log('planilha vazia'); return; }

  var hdr = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]
    .map(function (h) { return String(h).toLowerCase().trim(); });
  var row = sh.getRange(last, 1, 1, sh.getLastColumn()).getValues()[0];
  function val(nome) { var i = hdr.indexOf(nome); return i >= 0 ? String(row[i] || '').trim() : ''; }

  var subscription = val('subscription');
  var payload = {
    insight_id: val('insight_id'),
    email: val('email'),
    name: val('name'),
    company: val('company'),
    source: (subscription ? ('i6-website:' + subscription) : 'i6-website').slice(0, 50),
    metadata: {
      utm_source:   val('first_touch_source')   || val('last_touch_source')   || null,
      utm_medium:   val('first_touch_medium')   || val('last_touch_medium')   || null,
      utm_campaign: val('first_touch_campaign') || val('last_touch_campaign') || null,
      referrer:     val('first_touch_referrer') || null,
      user_agent:   val('user_agent')           || null,
    },
  };

  console.log('linha ' + last, JSON.stringify(payload));
  dispatchToHub_(payload);
}
```

## Passos para você

1. Colar a função no final do `Code.gs` e salvar.
2. Selecionar `reenviarUltimoLead` no seletor de funções e clicar em Executar. Não é preciso criar nova versão da implantação — funções manuais rodam na versão salva do editor.
3. Conferir o log de execução: deve aparecer o payload e depois `dispatchToHub_ response 200`.
4. Confirmar na aba `_dispatch_log` a linha com status `OK` e no HUB que o lead apareceu.

## Se der `FAIL_400`

O corpo da resposta no log dirá o campo recusado. Casos prováveis:

- `insight_id` vazio ou não-UUID na planilha: nesse caso o HUB não tem como associar o insight; o lead precisaria ser lançado no HUB com o insight correto informado à mão no payload (troque `insight_id: val('insight_id')` pelo UUID correto e rode de novo).
- `source` longo: já tratado pelo `.slice(0, 50)` acima.

## Reenviar outra linha, não a última

Se o lead faltante não for o último, use uma variante com o número da linha:

```js
function reenviarLead(numeroDaLinha) { /* mesmo corpo, com last = numeroDaLinha */ }
```

Nesse caso me diga o número da linha (ou o e-mail) e eu passo a versão ajustada.
