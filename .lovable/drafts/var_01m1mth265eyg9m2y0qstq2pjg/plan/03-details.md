## Como corrigir

1. Fazer a página de Research exibir apenas os tipos i6 Research e i6 eBook (hoje ela também mostra i6 Article), ignorando itens marcados como artigo de blog — mesmo que o arquivo esteja na mesma pasta. Isso vale também para o conteúdo real vindo do i6 HUB, evitando o mesmo vazamento no futuro.
2. Mover os 16 arquivos de demonstração de artigo para a pasta usada pelas peças de blog/on media, para que o lugar do arquivo reflita o que ele é.
3. Conferir depois: em PT e EN, o blog continua com os 8 artigos de teste e o Research volta a mostrar apenas as peças de research/eBook.

## Detalhes técnicos

- `src/hooks/useIntelligence.ts` faz `import.meta.glob` de `src/content/intelligence/*.md` e não filtra por `type`; passa a descartar itens com `type: i6 Article` (o campo já existe no frontmatter e é lido pelo parser de `useInsights`).
- Os arquivos `src/content/intelligence/demo-*.md` (8 slugs × PT/EN) vão para `src/content/insights/`; `useInsights` já varre as duas pastas, então o blog não muda de comportamento.
- Nada muda em `Blog.tsx`, `Intelligence.tsx`, nos cards, no parser, no sync do i6 HUB ou nas rotas de artigo.
- Sem release/deploy. Ao final: checagem de tipos, build e verificação visual de `/pt/i6-blog`, `/en/i6-blog`, `/pt/i6-intelligence` e `/en/i6-intelligence`.
- Remoção futura da demo: `rm src/content/insights/demo-*.md`.
