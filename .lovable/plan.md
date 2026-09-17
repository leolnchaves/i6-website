# Padronizar `source` e `reason` nos envios de lead

## Resultado da investigação sobre `first_touch_source`

Boa notícia: **isso já existe e já funciona** — nenhum código novo é necessário.

1. **Captura de UTM:** existe hoje em `src/lib/tracker.ts`. Na primeira visita o site lê as UTMs da URL (`utm_source`, `utm_medium`, `utm_campaign` etc.), o site de origem (referrer) e a página de entrada.
2. **Persistência entre páginas:** já implementada. O primeiro acesso é gravado em armazenamento local (`i6_first_touch`) e **só é escrito uma vez** — se o lead voltar dias depois por uma página sem UTM, o valor original é preservado. O acesso mais recente é guardado em separado (`i6_last_touch`).
3. **Campo no payload:** `first_touch_source` (junto com `first_touch_medium`, `first_touch_campaign`, `first_touch_referrer`, `first_touch_landing_page` e os equivalentes de `last_touch`) já é enviado hoje em **todos os formulários**, inclusive no Kiosk — todos usam a mesma função de contexto do lead. Quando não há UTM, o campo vai vazio, sem valor inventado.

**Conclusão:** o item de `first_touch_source` sai do escopo de implementação; ele já se comporta exatamente como pedido, inclusive no Kiosk. A validação de envio confirmará o valor chegando na planilha.

## O que muda de fato

Os formulários (contato, i6 Builders, comunidade e materiais ricos) passam a enviar:

- **`source`**: sempre `"i6-website"` (identificador fixo do canal site → HUB).
- **`reason`**: a razão legível do contato — o que o cliente escolheu ou o item em que clicou.

O Kiosk/Ebook (/demo) fica **fora** da regra de `source`/`reason` — `src/components/kiosk/EbookCTA.tsx` não será tocado. O `insight_id` (+ slug e URL na mensagem) não muda.

### Valores de `reason` por formulário

| Formulário | `reason` enviado |
|---|---|
| Contato (/contact) | Rótulo em PT do assunto escolhido: "Vendas — i6 Decision Suite", "Parcerias", "Imprensa" ou "Outro" |
| i6 Builders (/i6-builders) | "i6 Builders" |
| Comunidade (/community) | "i6 Community" |
| Gate de artigo do blog (/i6-blog) | "i6 Blog" |
| Gate de research (i6 Intelligence) | "i6 Deep Research" |
| CTA dentro de artigo do blog | "i6 Blog" |
| CTA dentro de research | "i6 Deep Research" |
| Ebook / Kiosk (/demo) | **Sem mudança — fora da regra** |

Os rótulos são fixos em PT nos três idiomas — são chaves de triagem na planilha, não texto de UI.

### Arquivos alterados

1. **`src/lib/leadFormConfig.ts`** — `normalizeLeadFields` passa a gravar sempre `source = "i6-website"`, deixando de derivar esse valor do parâmetro de origem. A assinatura e o parâmetro de origem são mantidos como estão (investigação anterior confirmou que ele não alimenta analytics, eventos nem roteamento de e-mail).
2. **`src/components/contact/ContactForm.tsx`** — `reason` vira "i6 Builders" / "i6 Community" nas variantes, e o rótulo em PT do assunto escolhido na variante padrão (mapa fixo das 4 opções), em vez do valor técnico. `subscription` continua igual.
3. **`src/components/insights/LeadGateForm.tsx`** e **`ArticleCTAForm.tsx`** — `reason` vira "i6 Blog" (insights) ou "i6 Deep Research" (research).

## O que não muda

Aparência dos formulários, validações, UTMs e jornada já enviados, `insight_id`, campo `subscription`, assinatura da `normalizeLeadFields`, EbookCTA.

## Antes de aplicar

Mostro o diff de cada arquivo alterado para sua aprovação antes de aplicar.

## Validação

- Build OK.
- Envio de teste na prévia em pelo menos 3 fluxos (contato com assunto "Parcerias", comunidade e um gate de research), confirmando na planilha `source = "i6-website"`, `reason` com o rótulo esperado e `first_touch_source` correto — um envio com UTM na URL e um sem.
- Se o HUB rejeitar algum valor novo de `reason`, paro e aviso antes de publicar.
