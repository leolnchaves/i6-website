# Revisão do Apps Script — gravação do lead_uid

## Veredito

O código está pronto para implantar no que diz respeito ao `lead_uid`:

- `var lead_uid = (e.parameter.lead_uid || '').toString().slice(0, 64);` é lido antes do dedupe e continua no escopo na hora do `appendRow`.
- `lead_uid` é o último item do array do `appendRow`, coerente com a coluna criada como última do cabeçalho.
- O dedupe localiza a coluna pelo nome no cabeçalho e é fail-open (nunca bloqueia um lead legítimo se algo falhar).
- O guard `if (!e || !e.parameter)` evita o erro de execução manual.
- O `uuidOk_` remove `insight_id` inválido/vazio antes de enviar ao HUB.

Nenhum bloco extra pós-`appendRow` é necessário. Se ele ainda existir no arquivo, deve ser removido.

## Um ajuste recomendado antes de implantar

O HUB rejeita `source` acima de 50 caracteres. Hoje o valor é montado sem limite:

```js
source: subscription ? ('i6-website:' + subscription) : 'i6-website',
```

Com assinaturas longas (ex.: `insight:ebook-planejamento-preditivo-decisao`) o resultado passa de 50 caracteres e o lead entra na planilha mas é recusado pelo HUB — exatamente o padrão dos leads que não chegaram.

Correção: truncar na montagem do payload dentro do `doPost`.

```js
source: (subscription ? ('i6-website:' + subscription) : 'i6-website').slice(0, 50),
```

## Observações menores (sem ação necessária)

- A constante global `HUB_INGEST_URL` ficou sem uso, já que `dispatchToHub_` lê a URL das Script Properties. Não causa problema; pode ser deixada como está.
- `doGet` usa `SpreadsheetApp.getActiveSpreadsheet()` enquanto o `doPost` usa `openById`. Funciona porque o script é vinculado à planilha. Não mexer agora.
- O lock do dedupe é liberado antes do `appendRow`, então duas requisições disparadas no mesmo instante ainda poderiam passar. Na prática o retry do site espera segundos entre tentativas, então o dedupe cobre o caso real.

## Passos para você

1. Aplicar o `.slice(0, 50)` na linha do `source`.
2. Salvar e criar Nova versão em Gerenciar implantações (mantendo a mesma URL).
3. Teste ponta a ponta: um lead com insight (deve gravar linha, preencher `lead_uid` e registrar `OK` em `_dispatch_log`), um lead sem insight (grava linha, sem dispatch) e um reenvio do mesmo `lead_uid` (deve responder `duplicate` e não criar linha nova).
