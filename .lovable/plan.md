# Padronizar `source` e `reason` em todos os envios de lead

## Objetivo

Todos os formulários do site (contato, i6 Builders, comunidade, materiais ricos e Kiosk) passam a enviar:

- **`source`**: sempre `"i6-website"` (valor fixo, igual para todo envio vindo do site).
- **`reason`**: a razão legível do contato — o que o cliente escolheu ou o item em que ele clicou.

O ID do conteúdo visualizado já é gravado hoje (campo `insight_id` + slug e URL no corpo da mensagem) e continua igual.

## Novos valores de `reason` por formulário

| Formulário | `reason` enviado |
|---|---|
| Contato (/contact) | Rótulo em PT do assunto escolhido: "Vendas — i6 Decision Suite", "Parcerias", "Imprensa" ou "Outro" |
| i6 Builders (/i6-builders) | "i6 Builders" |
| Comunidade (/community) | "i6 Community" |
| Gate de artigo do blog (insights) | "i6 Blog" |
| Gate de research (i6 Intelligence) | "i6 Intelligence" |
| CTA dentro de artigo do blog | "i6 Blog" |
| CTA dentro de research | "i6 Intelligence" |
| Ebook / Kiosk (/demo) | "Kiosk Demo" |

Os rótulos são fixos em PT nos três idiomas, como já acontece hoje com o assunto de Comunidade/Builders — são chaves de triagem na planilha.

## O que muda no código

1. **`src/lib/leadFormConfig.ts`** — `normalizeLeadFields` deixa de derivar `source` do parâmetro de origem e passa a gravar sempre `source = "i6-website"`. O parâmetro de origem deixa de ser necessário (assinatura simplificada e chamadas ajustadas).
2. **`src/components/contact/ContactForm.tsx`** — `reason` passa a ser:
   - variante `builders` → "i6 Builders"; variante `community` → "i6 Community";
   - variante `default` → o rótulo em PT do assunto escolhido no select (mapa das 4 opções), em vez do valor técnico (`sales_suite` etc.). O campo `subscription` continua levando o valor do assunto como hoje.
3. **`src/components/insights/LeadGateForm.tsx`** e **`ArticleCTAForm.tsx`** — `reason` vira "i6 Blog" ou "i6 Intelligence" conforme o tipo de conteúdo.
4. **`src/components/kiosk/EbookCTA.tsx`** — `reason` vira "Kiosk Demo" (hoje herda a origem técnica).

Nada muda na aparência dos formulários, nas validações, nos UTMs/jornada já enviados, nem no `insight_id`.

## Validação antes de publicar

- Build OK.
- Envio de teste na prévia em pelo menos 3 fluxos (contato com assunto "Parcerias", comunidade e um gate de research), confirmando na planilha que `source` chega como "i6-website" e `reason` com o rótulo esperado. Se o HUB rejeitar algum valor novo de `reason` (validação de valores permitidos), aviso você para liberar o valor no HUB antes de publicarmos.

## Observação

O Apps Script/planilha não precisa de mudança para receber os novos valores, **desde que** o HUB não trave `reason` em uma lista fechada — o teste de envio confirma isso.
