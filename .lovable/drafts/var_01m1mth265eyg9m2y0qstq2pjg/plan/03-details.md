## Como corrigir

1. Aplicar a regra de tipos por página: em `/i6-blog` mostrar apenas itens do tipo i6 Blog e i6 Article; em `/i6-intelligence` mostrar apenas i6 eBook e i6 Research. Itens fora da regra do card devem ser ignorados, mesmo que o arquivo esteja na mesma pasta. Isso vale também para o conteúdo real vindo do i6 HUB, evitando o mesmo vazamento no futuro.
2. Mover os 16 arquivos de demonstração de artigo para a pasta usada pelas peças de blog/on media, para que o lugar do arquivo reflita o que ele é.
3. Conferir depois: em PT e EN, o blog mostra apenas os 8 artigos de teste e o Research mostra apenas as peças de research/eBook.

## Detalhes técnicos

- `src/hooks/useIntelligence.ts` faz `import.meta.glob` de `src/content/intelligence/*.md` e não filtra por `type`; passa a descartar itens com `type: i6 Blog` ou `type: i6 Article`.
- `src/hooks/useBlogArticles.ts` (ou equivalente em `useInsights.ts`) passa a filtrar apenas `i6 Blog` e `i6 Article`, descartando `i6 eBook` e `i6 Research`.
- Os arquivos `src/content/intelligence/demo-*.md` (8 slugs × PT/EN) vão para `src/content/insights/`; `useInsights` já varre as duas pastas, então o blog não muda de comportamento.
- Nada muda em `Blog.tsx`, `Intelligence.tsx`, nos cards, no parser, no sync do i6 HUB ou nas rotas de artigo.
- Sem release/deploy. Ao final: checagem de tipos, build e verificação visual de `/pt/i6-blog`, `/en/i6-blog`, `/pt/i6-intelligence` e `/en/i6-intelligence`.
- Remoção futura da demo: `rm src/content/insights/demo-*.md`.
