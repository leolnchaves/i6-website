# Fazer o lead de contato chegar ao HUB e aparecer no `_dispatch_log`

## Causa

No `doPost`, o envio ao HUB está dentro de `if (insight_id)`. O formulário de contato não tem `insight_id`, então o `dispatchToHub_` nunca roda — e como o log só é escrito dentro dele, `_dispatch_log` fica vazio.

Uma única mudança resolve: tirar esse `if`.

## Mudança no `Code.gs`

Localize este trecho (está no `doPost`, logo depois do `sheet.appendRow([...])`):

### Código original

```js
// === Dispatch instantâneo para o HUB (só quando há insight_id) ===
// Não bloqueia a resposta ao site: erros são silenciosos e o cron faz fallback.
if (insight_id) {
  try {
    dispatchToHub_({
      insight_id: insight_id,
      email: email,
      name: name,
      company: company,
      source: (subscription ? ('i6-website:' + subscription) : 'i6-website').slice(0, 50),
      metadata: {
        utm_source:   first_touch_source   || last_touch_source   || null,
        utm_medium:   first_touch_medium   || last_touch_medium   || null,
        utm_campaign: first_touch_campaign || last_touch_campaign || null,
        referrer:     first_touch_referrer || null,
        user_agent:   user_agent           || null,
      },
    });
  } catch (err) {
    // não falha o doPost se o HUB estiver fora — o cron pega no próximo ciclo
    console.warn('dispatchToHub failed', err);
  }
}
```

### Como fica (as linhas marcadas com `// <<<` são as alteradas)

```js
// === Dispatch instantâneo para o HUB (todos os leads) ===
// Não bloqueia a resposta ao site: erros são silenciosos e o cron faz fallback.
try {                                                                    // <<< era: if (insight_id) { try {
  dispatchToHub_({
    insight_id: insight_id,
    email: email,
    name: name,
    company: company,
    message: message,                                                    // <<< incluído
    lead_uid: lead_uid,                                                  // <<< incluído
    source: (subscription ? ('i6-website:' + subscription) : 'i6-website').slice(0, 50),
    metadata: {
      utm_source:   first_touch_source   || last_touch_source   || null,
      utm_medium:   first_touch_medium   || last_touch_medium   || null,
      utm_campaign: first_touch_campaign || last_touch_campaign || null,
      referrer:     first_touch_referrer || null,
      user_agent:   user_agent           || null,
    },
  });
} catch (err) {
  // não falha o doPost se o HUB estiver fora — o cron pega no próximo ciclo
  console.warn('dispatchToHub failed', err);
}                                                                        // <<< removida a chave } extra do if
```

Resumo do que muda: `if (insight_id) {` sai, a chave `}` que fechava esse `if` (a última do bloco) sai, e entram duas linhas no payload (`message`, `lead_uid`). Nada mais no arquivo é tocado.

## Passo a passo

1. Abrir o `Code.gs`, aplicar a alteração acima e salvar.
2. **Implantar → Gerenciar implantações → lápis (editar) → Versão: Nova versão → Implantar** (mantém a mesma URL usada pelo site).
3. Enviar 1 contato pelo site em `/pt/contact`, com um nome único.
4. Conferir: linha nova em `ContactForm`, linha nova em `_dispatch_log` com status `OK`, e o registro no HUB.

Se o `_dispatch_log` registrar `FAIL_400`, a mensagem gravada na coluna `message` mostra qual campo o HUB recusou — daí ajustamos só esse campo.

## Site

Nada a alterar no site.
