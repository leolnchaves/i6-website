
# Lead da Victoria Baumann — por que o HUB recusou

## Diagnóstico (confirmado pelo log)

O reenvio manual da linha 12 gerou:

```
{"insight_id":"","email":"v.baumann.invest@gmail.com","name":"Victoria Baumann",
 "company":"","source":"i6-website:partnership", ...}
dispatchToHub_ response 400 {"error":"invalid_payload","details":{}}
```

O `uuidOk_` removeu o `insight_id` vazio antes do envio, e mesmo assim o HUB recusou. O endpoint usado (`ingest-insight-lead`) existe para entregar um insight/ebook a um lead — ele valida `insight_id` como UUID obrigatório. Sem insight, não há o que entregar e o payload é sempre inválido.

Ou seja: **não é um bug do site nem do Apps Script**. Esse lead veio do formulário de parceria (`subscription: partnership`), que por definição não tem insight. Ele está corretamente gravado na planilha; o que não existe é uma rota no HUB para ingerir lead sem insight.

Isso também redefine o "lead perdido": leads de parceria/contato nunca aparecerão no HUB por essa rota. Só leads com `insight_id` deveriam ser cobrados.

## Opções

### A. Registrar esse lead à mão no HUB (imediato)

Cadastrar o contato da Victoria diretamente no HUB, como lead de parceria. Resolve o caso pontual, sem mexer em código.

### B. Criar no HUB uma rota para leads sem insight (definitivo)

Adicionar no HUB um endpoint tipo `ingest-contact-lead` que aceite lead sem `insight_id` (nome, e-mail, empresa, mensagem, source, metadata). Depois, no Apps Script, o `doPost` passa a rotear:

```text
insight_id UUID válido  -> ingest-insight-lead   (fluxo atual, entrega o PDF)
sem insight_id          -> ingest-contact-lead   (novo, só registra o contato)
```

Isso exige trabalho no projeto do HUB (não neste repositório do site) mais um pequeno ajuste no Apps Script.

### C. Manter como está

Leads de parceria/contato vivem só na planilha; o HUB recebe apenas leads de insight. Nenhuma mudança.

## Ajuste que vale fazer de qualquer forma

No `dispatchToHub_`, quando o `insight_id` for removido por ser inválido, não vale chamar o HUB — é uma chamada garantidamente 400 que ainda polui o `_dispatch_log`. Registrar como ignorado:

```js
if (payload && !uuidOk_(payload.insight_id)) {
  logDispatch_('SKIP', 'sem insight_id valido — HUB exige insight', payload);
  return;
}
```

O `doPost` já só chama o dispatch quando existe `insight_id`, então isso só afeta reenvios manuais e valores malformados.

## Decisão necessária

Qual caminho seguir para leads sem insight: A (manual agora), B (nova rota no HUB) ou C (deixar só na planilha).
