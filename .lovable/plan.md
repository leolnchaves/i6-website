## Problema

Em `InsightArticle.tsx`, qualquer insight com `type !== 'article'` (ex.: `press`, `linkedin`, `podcast`, `video`) é tratado como link externo: um `useEffect` abre `external_url` em nova aba e a página renderiza apenas o fallback "Abrir em nova aba". O gate (nome + email) só é avaliado dentro do bloco de `type === 'article'`, então insights `press` gated — como o da CNN — nunca mostram o formulário.

## Correção

Em `src/pages/InsightArticle.tsx`, dar prioridade ao `gated` antes do tratamento de link externo:

1. No `useEffect` que abre `external_url` em nova aba, adicionar guarda: **não abrir** se `insight.gated === true`.
2. No bloco `if (insight.type !== 'article')`, adicionar guarda: **se `insight.gated === true`, não retornar o fallback externo** — deixar o fluxo seguir para a renderização normal do artigo, que já contém o `LeadGateForm` quando `isLocked` é verdadeiro.
3. Como insights não-article gated não têm corpo de markdown útil, o `LeadGateForm` é o único conteúdo exibido (header + cover + gate). Após submit, mostra a confirmação "Pedido recebido / Request received" (já implementado). O `external_url` / `asset_url` permanecem ocultos do visitante — o material é enviado pelo CRM via email.

### Inalterado
- Markdown frontmatter, sync do i6Hub, Apps Script, arquitetura estática.
- Insights não-gated com `external_url` continuam abrindo em nova aba normalmente.
