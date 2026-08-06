# Ajustar o `Code.gs` para despachar (e logar) todo lead, não só os com `insight_id`

## O que a comparação mostrou

O site (`ContactForm.tsx` + `normalizeLeadFields`) envia, para todo contato:
`name, email, company, message, subscription, reason, source, token, lead_uid, utm_source, utm_medium, utm_campaign, user_agent` + campos de contexto (`anonymous_id`, `session_id`, `first_touch_*`, `last_touch_*`, `journey`, `language`…). Para o formulário de contato **não existe `insight_id`** — ele é removido de propósito, porque o HUB rejeitava string vazia como UUID.

No `Code.gs`, o dispatch está dentro de:

```js
if (insight_id) {
  try { dispatchToHub_({ ... }) } catch (err) { ... }
}
```

Ou seja: **lead de contato nunca entra no `dispatchToHub_`** — e como o `logDispatch_` só é chamado de dentro do `dispatchToHub_`, não existe linha em `_dispatch_log`. Isso explica exatamente o que você viu (planilha ok, log vazio, nenhuma execução com erro).

O lead ainda assim apareceu no HUB porque existe o **segundo caminho**: o `doGet` de sync, que o HUB puxa por cron. Esse caminho não grava em `_dispatch_log` e monta o lead lendo a planilha por cabeçalho — é o candidato para o nome divergente. Ainda não confirmado: pode ser (a) o HUB fazendo upsert por e-mail e mantendo o nome de um cadastro anterior, ou (b) leitura de coluna no `doGet`. Isso a gente confirma no passo 4.

O script também **ignora** três campos que o site manda: `reason`, `source` e `utm_*` (usa `first_touch_*` no lugar). Não é erro, mas o `reason` é informação de negócio que hoje se perde.

## Passo a passo das mudanças (locais exatos)

### Passo 1 — Liberar o dispatch para leads sem `insight_id`

**Local:** no `doPost`, no bloco comentado `// === Dispatch instantâneo para o HUB (só quando há insight_id) ===`, logo depois do `sheet.appendRow([...])`.

Trocar a condição `if (insight_id) {` por `try {` (removendo o `if` e a chave de fechamento correspondente), e enriquecer o payload com o que já existe em variáveis do request:

- adicionar `message: message`
- adicionar `subscription: subscription`
- adicionar `reason: (e.parameter.reason || '').toString().slice(0, 50)`
- adicionar `lead_uid: lead_uid` (idempotência também no HUB)
- manter `insight_id: insight_id` (o `uuidOk_` já remove quando vazio)
- em `metadata`, usar os `utm_*` que o site manda como primeira opção: `e.parameter.utm_source || first_touch_source || last_touch_source || null` (idem medium e campaign)

Assim todo lead — contato, parceria, kiosk, insight — vai ao HUB pelo caminho instantâneo e **sempre** gera linha de log.

### Passo 2 — Nunca ficar sem rastro no `_dispatch_log`

**Local:** no `catch (err)` desse mesmo bloco do `doPost` (hoje só faz `console.warn`).

Acrescentar `logDispatch_('EXCEPTION_DOPOST', String(err), { email: email, insight_id: insight_id });` antes do `console.warn`. Com isso, mesmo uma exceção antes do `UrlFetchApp` deixa registro.

### Passo 3 — Log com `lead_uid` e origem

**Local:** função `logDispatch_`.

- No cabeçalho criado quando a aba não existe, passar a usar: `['timestamp','status','message','email','insight_id','lead_uid','origin']`.
- No `appendRow`, acrescentar `payload && payload.lead_uid || ''` e uma string de origem (`'doPost'` / `'manual'`).
- Como a aba `_dispatch_log` já existe com 5 colunas, os dois novos valores caem em F e G; opcionalmente escreva os títulos `lead_uid` e `origin` à mão em F1/G1.

### Passo 4 — Implantar e validar

1. Salvar o `Code.gs`.
2. **Implantar → Gerenciar implantações → editar (lápis) → Versão: Nova versão → Implantar** (mantém a mesma URL que o site usa).
3. Enviar 1 contato pelo site (`/pt/contact`), com um nome novo e único.
4. Conferir, nesta ordem: linha em `ContactForm` com `lead_uid` → linha em `_dispatch_log` com status `OK` → registro no HUB com o **nome idêntico** ao digitado.

Se no passo 4 o log der `OK` mas o nome no HUB continuar diferente, o problema é do lado do HUB (upsert por e-mail sobrescrevendo/preservando nome antigo) — e aí o ajuste é na nova rota que você está criando, não aqui.

## Observação sobre o `doGet` (sync por cron)

Depois que o dispatch instantâneo cobrir todos os leads, o `doGet` passa a ser só rede de segurança. Não vou alterá-lo agora — mexer nele afeta o cron do HUB. Se o teste do passo 4 mostrar que o nome divergente vinha do cron, aí sim avaliamos incluir `lead_uid` na resposta do `doGet` para o HUB deduplicar contra o dispatch instantâneo.

## Sobre o site

Nenhuma mudança necessária no código do site: ele já envia todos os campos normalizados, com `lead_uid` e sem `insight_id` vazio. Todo o ajuste é no Apps Script.
