# Padronizar `source` e `reason` em todos os envios de lead

## Objetivo

Os formulários do site (contato, i6 Builders, comunidade e materiais ricos) passam a enviar:

- **`source`**: sempre `"i6-website"` (valor fixo, igual para todo envio vindo do site).
- **`reason`**: a razão legível do contato — o que o cliente escolheu ou o item em que clicou.

O Kiosk/Ebook (/demo) fica **fora** desta regra e continua exatamente como está. O `insight_id` (+ slug e URL no corpo da mensagem) não muda.

## Investigação prévia (já feita)

Grep por `normalizeLeadFields` e `LeadSource` em `src/`: o parâmetro de origem é usado **apenas** como argumento da `normalizeLeadFields` nos 4 call-sites (ContactForm, LeadGateForm, ArticleCTAForm, EbookCTA) e no `reason` atual do ContactForm. Nenhum uso em analytics, nome de evento, roteamento de e-mail ou outra lógica downstream.

**Decisão:** conforme sua instrução, o parâmetro de origem **não será removido** da assinatura — a função só deixa de usá-lo para derivar `source`.

## Novos valores de `reason` por formulário

| Formulário | `reason` enviado |
|---|---|
| Contato (/contact) | Rótulo em PT do assunto escolhido: "Vendas — i6 Decision Suite", "Parcerias", "Imprensa" ou "Outro" |
| i6 Builders (/i6-builders) | "i6 Builders" |
| Comunidade (/community) | "i6 Community" |
| Gate de artigo do blog (/i6-blog) | "i6 Blog" |
| Gate de research (i6 Intelligence) | "i6 Deep Research" |
| CTA dentro de artigo do blog | "i6 Blog" |
| CTA dentro de research | "i6 Deep Research" |
| Ebook / Kiosk (/demo) | **Sem mudança — excluído da regra** |

Os rótulos de `reason` são fixos em PT nos três idiomas — são chaves de triagem na planilha, não texto de UI.

## O que muda no código

1. **`src/lib/leadFormConfig.ts`** — `normalizeLeadFields` passa a gravar sempre `source = "i6-website"`, ignorando o parâmetro de origem para esse fim. A assinatura e o parâmetro são mantidos (sem quebrar os call-sites).
2. **`src/components/contact/ContactForm.tsx`** — `reason` passa a ser:
   - variante `builders` → "i6 Builders"; variante `community` → "i6 Community";
   - variante `default` → o rótulo em PT do assunto escolhido no select (mapa fixo das 4 opções), em vez do valor técnico (`sales_suite` etc.). O campo `subscription` continua levando o valor do assunto como hoje, sem mudança.
3. **`src/components/insights/LeadGateForm.tsx`** e **`ArticleCTAForm.tsx`** — `reason` vira "i6 Blog" (insights) ou "i6 Deep Research" (research).
4. **`src/components/kiosk/EbookCTA.tsx`** — **não mexer**.

## O que não muda

Aparência dos formulários, validações, UTMs/jornada já enviados, `insight_id`, campo `subscription`, assinatura da `normalizeLeadFields`.

## Antes de aplicar

Apresento o diff de cada arquivo para sua aprovação antes de aplicar, junto com o resultado do grep (acima). Não aplico automaticamente.

## Validação

- Build OK.
- Envio de teste na prévia em pelo menos 3 fluxos (contato com assunto "Parcerias", comunidade e um gate de research), confirmando na planilha que `source` chega como "i6-website" e `reason` com o rótulo esperado.
- Se o HUB rejeitar algum valor novo de `reason` (validação de valores permitidos), paro e aviso antes de publicar.
