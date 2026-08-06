# 1 preenchimento no site = 3 leads no HUB

## O que está confirmado

**O site envia uma única vez.** O CTA do blog (`ArticleCTAForm`) faz um `fetch` POST para o Apps Script e nada mais. Não há retry, nem segunda rota, nem fila (a fila offline existe só no Kiosk). Logo, a multiplicação acontece depois do site.

**O Apps Script entrega o mesmo lead ao HUB por dois caminhos independentes:**

1. **Push** — dentro do `doPost`, o `dispatchToHub_` chama `ingest-insight-lead` na hora. Esse é o registro com `Reason: Insight` (traz o insight) e é o que o HUB rotula como `Channel: Website`.
2. **Pull** — o `doGet` do mesmo script expõe as linhas da planilha (`leads` + `next_cursor`) para o HUB buscar por cursor. Esses registros chegam com `source = i6-website:<subscription>`, que é exatamente o `Channel: i6-website` e `Reason: Contact` das outras duas linhas.

Ou seja: o HUB recebe o lead empurrado pelo script **e** puxa a mesma linha da planilha. As duas linhas `Contact` diferindo em `Message` (uma com texto, outra vazia) são leituras do pull em ciclos/versões diferentes de mapeamento.

Os rótulos errados são consequência disso, não causa separada: `Channel` e `Reason` são definidos pelo HUB a partir da rota/`source` de cada entrada — por isso o push acerta o motivo e erra o canal, e o pull acerta o canal e erra o motivo.

## O que precisa ser feito (o mínimo)

**Escolher um único caminho de entrada.** Recomendação: manter o **push** (instantâneo, entrega o PDF na hora) e desligar o **pull**.

1. **No HUB:** desativar o job/cron que consome o `doGet` do Apps Script (o sync por cursor). É a mudança que elimina as 2 linhas duplicadas. Nada no Apps Script precisa mudar para isso.
2. **No HUB:** ajustar os rótulos da rota de push para o que você espera — `Channel` = o canal do site e `Reason` = `Insight` quando vem `insight_id`, `Contact` quando não vem.
3. **Na planilha:** apagar as 2 linhas duplicadas já criadas no HUB (manter a que tem `Reason: Insight`).

O `doGet` pode continuar existindo no script como fallback manual — só não deve ser consumido automaticamente.

## Alternativa (se preferir manter o pull)

Se o sync por cursor for a via oficial do HUB, o inverso: remover a chamada `dispatchToHub_` de dentro do `doPost` e deixar o HUB puxar. Perde-se a entrega instantânea do PDF.

## Site

Nada a alterar no site.

## Antes de mexer no Code.gs

Se a decisão exigir alteração no script (alternativa acima), me mande o trecho do `doPost` a partir do comentário do dispatch até o fim da função — o conteúdo colado veio truncado nessa parte, e sem ele eu não marco a linha exata a mudar.
