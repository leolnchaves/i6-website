## Detalhes técnicos

- `src/components/docs/DocsSidebar.tsx`: substituir o filtro por título por um matcher que normaliza (NFD + lowercase) `title`, `description` e `content` da `DocPage`. Manter o agrupamento por seção; em modo busca, renderizar lista achatada e ordenada por peso (título 3, descrição 2, conteúdo 1) e depois pela ordem atual.
- Snippet: extrair ~140 caracteres em torno da primeira ocorrência no conteúdo, removendo marcação Markdown básica (cercas de código, `#`, `*`, `[]()`), com elipses e `<mark>`-equivalente estilizado por token (`bg-primary/20 text-foreground`) — destaque feito por split de string, sem `dangerouslySetInnerHTML`.
- `src/data/docs/content.ts`: ajustar `searchPlaceholder`/`noResults` nos três idiomas (ex.: "Buscar na documentação…" / "Nenhum resultado"), mantendo o tipo `DocsUiCopy`.
- `useDocs.ts` já expõe `content` em cada página; nenhuma mudança no hook, no sync do i6 HUB ou no frontmatter.
- Acessibilidade: contagem de resultados anunciada em região `aria-live="polite"`.
- Fora de escopo: TOC, layout sticky, páginas de vídeo/download, release/deploy.
