## Problema

Na página de detalhe (`/success-stories/:slug`):

1. **Bloco de citação (`quote`)** é renderizado como texto puro (`<p>{story.quote}</p>` na linha 225 de `src/pages/SuccessStoryArticle.tsx`) — não passa por ReactMarkdown, então `>`, `**bold**`, listas e quebras não são interpretados.
2. **Escapes `\\n` / `\\\n`** vindos do i6HUB não são normalizados. Hoje o `normalizeMd` só troca `\n` (barra + n) por newline. Quando o conteúdo chega como `\\n` (barra dupla + n) — visível no anexo como `\\\n\n\n>` — a substituição atual deixa uma barra residual e o `>` não vira blockquote.

## Correções

### 1. `src/pages/SuccessStoryArticle.tsx`

- Ampliar `normalizeMd` para lidar com múltiplos níveis de escape antes de aplicar a troca:
  - Colapsar sequências `\\` → `\` (uma passagem) e então trocar `\n` → newline e `\t` → tab.
  - Também remover a barra órfã antes de `\n` (`\\\n` → `\n`) que aparece no dump do HUB.
- Passar `story.quote` pelo `MdBlock` em vez de `<p>`. Manter o wrapper visual (card com borda/ícone `Quote`) e as classes de tipografia, mas o corpo do texto vira Markdown com blockquote/negrito/quebras funcionando.

### 2. Verificar demais campos

Os campos `challenge`, `whatToAnticipate`, `prediction`, `solution` já usam `MdBlock` — herdam o `normalizeMd` melhorado automaticamente.

## Fora do escopo

- Não alterar `useSuccessStoriesMarkdown` (parsing do frontmatter) — o problema é apenas de exibição.
- Não mexer em cards de listagem nem em outros artigos (Blog/Intelligence já usam ReactMarkdown).
- Sem release nesta etapa; publicar patch só quando o usuário pedir.
