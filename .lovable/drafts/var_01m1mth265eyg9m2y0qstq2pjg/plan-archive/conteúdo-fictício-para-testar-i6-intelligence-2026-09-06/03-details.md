## Detalhes técnicos

- Arquivos novos: `src/content/intelligence/demo-<slug>-{pt,en}.md`. Nenhum arquivo existente é alterado, e as duas peças reais de ruptura de gôndola continuam intactas.
- Frontmatter seguindo exatamente o schema lido por `useIntelligence.ts`: `id, title, slug, language, type, date, sector, theme, excerpt, read_time, featured, cover_image, related_product, related_story_slug`, e `gated` + `asset_url` em algumas peças de eBook.
- `type` sempre literal `i6 Research` ou `i6 eBook` (o filtro é estrito; qualquer outro valor é descartado com aviso em DEV).
- `slug` idêntico entre pt e en, prefixado com `demo-` para facilitar a remoção depois.
- Corpo em Markdown curto e plausível (resposta direta, contexto, por que abordagens tradicionais falham, motor proprietário, resultados), no mesmo tom da peça real.
- `cover_image` aponta para imagens já existentes em `public/` quando usado; metade das peças fica sem capa de propósito.
- Sem mudanças em componentes, hooks, rotas ou traduções. Sem release nem publicação.
- Verificação: build + checagem de tipos, e conferência em pt/en de que as peças aparecem, os filtros de tipo/tema batem com o contador e o estado vazio ainda funciona.
