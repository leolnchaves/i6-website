## Objetivo

Enviar o `insight_id` (uuid vindo do i6Hub) junto com cada submit do `LeadGateForm`, mantendo o site 100% estático.

## Como funciona hoje

- O script `scripts/sync-insights-from-i6hub.mjs` baixa os insights publicados do edge function do i6Hub e grava um `.md` por insight em `src/content/insights/`.
- O frontmatter atual **não** inclui o `id` do registro, embora o feed do HUB já o retorne (cada linha de `public_insights` tem uuid).
- `useInsights.ts` faz parse desse frontmatter e expõe os campos para a página.
- `InsightArticle.tsx` renderiza `<LeadGateForm insightTitle insightSlug pdfUrl />` — sem id.
- `LeadGateForm.tsx` envia para o Apps Script: `name`, `email`, `company`, `message`, `subscription`, `token`.

Conclusão: o uuid existe no HUB, só não está sendo propagado para o site estático.

## Plano

1. **Propagar o `id` do HUB para o Markdown (sync)**
   - Em `scripts/sync-insights-from-i6hub.mjs`, adicionar no frontmatter:
     ```
     id: <it.id>
     ```
     (assumindo que o feed já devolve `id`; se vier com outro nome, mapear).
   - Esse campo só aparece quando `it.id` existir, mas para insights deve sempre existir.

2. **Expor `id` na camada de leitura**
   - Em `src/hooks/useInsights.ts`:
     - Adicionar `id?: string` em `InsightFrontmatter`.
     - Incluir `id: fm.id` no objeto montado em `ALL`.
   - O parser de frontmatter atual já lê qualquer chave string, então não precisa mudar.

3. **Passar `insightId` para o formulário**
   - Em `src/pages/InsightArticle.tsx`, passar `insightId={insight.id}` para `<LeadGateForm>`.

4. **Enviar `insight_id` no submit**
   - Em `src/components/insights/LeadGateForm.tsx`:
     - Adicionar prop opcional `insightId?: string`.
     - Renderizar um `<input type="hidden" name="insight_id" value={insightId ?? ''} />` dentro do `<form>` (apenas marcação; o submit real vai por `FormData`).
     - No `onSubmit`, fazer `formData.append('insight_id', insightId ?? '')`.
     - Acrescentar `ID: <uuid>` no bloco `message` (logo abaixo de `Slug:`), para manter retrocompatibilidade com leitores que parseiam a mensagem.

5. **ContactForm permanece igual**
   - Decisão do usuário: para o formulário de Contato, `insight_id` é **nulo** — então não tocamos nesse componente. O Apps Script simplesmente não receberá o campo (ou receberá vazio), o que equivale a nulo no destino.

6. **Re-sync**
   - Após o merge, rodar o sync (GitHub Action ou local) para regravar os `.md` com `id`. Insights antigos no repo só ganham o `id` depois do próximo sync — é esperado.

## Pontos técnicos

- Nada muda no Apps Script: ele aceita campos arbitrários e grava o que vier. Para o lead aparecer numa coluna dedicada, basta o destino mapear `insight_id`. Enquanto não há coluna, o `ID:` no `message` garante que o dado não se perde.
- Nenhuma mudança de banco/backend é necessária no site (continua estático).
- Sem mudanças no `ContactForm.tsx`.

## Arquivos afetados

- `scripts/sync-insights-from-i6hub.mjs` — adicionar `id` ao frontmatter gerado.
- `src/hooks/useInsights.ts` — tipar e expor `id`.
- `src/pages/InsightArticle.tsx` — passar `insightId` ao `LeadGateForm`.
- `src/components/insights/LeadGateForm.tsx` — prop, hidden input e `formData.append('insight_id', ...)`.
