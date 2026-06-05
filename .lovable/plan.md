## Mudança

Em `src/components/insights/LeadGateForm.tsx`, remover a linha `PDF: ${pdfUrl || '-'}` da composição do texto `message` enviado ao Apps Script.

## Detalhes técnicos

- Arquivo: `src/components/insights/LeadGateForm.tsx` (função `onSubmit`)
- Remover apenas a entrada `` `PDF: ${pdfUrl || '-'}` `` do array que compõe `message`
- Manter a prop `pdfUrl` e as demais linhas (Insight, Slug, ID, URL, Idioma, Origem) inalteradas
- Nenhuma outra alteração em formulários, payload (`formData`) ou no fluxo de envio

## Fora de escopo

- Remover a prop `pdfUrl` do componente (ainda pode ser útil futuramente; mantida sem uso no texto)
- Alterar `ContactForm` ou script de sync