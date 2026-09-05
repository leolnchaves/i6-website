## Detalhes técnicos

### 1. Navegação interna sem reload (`src/components/docs/DocsMarkdown.tsx`)
- Usar `useNavigate` de `react-router-dom` (padrão já usado no projeto) no renderizador `a`.
- Considerar interno todo href que: começa com `/docs`, casa `^/(pt|en|es)/docs`, ou é relativo sem esquema apontando para docs. Ancoras (`#...`), `mailto:`, `tel:` e URLs absolutas http(s) para outro domínio ficam intactas.
- No clique interno: se não houver modificador (`metaKey`, `ctrlKey`, `shiftKey`, `altKey`) e for botão primário, `event.preventDefault()` + `navigate(path)`. O `href` permanece no DOM (abrir em nova aba continua funcionando).
- Normalizar o destino com o helper de idioma já existente (`useLocalizedPath`) quando o href vier sem prefixo de idioma, para não perder o idioma atual.
- Nenhuma mudança nos outros renderizadores.

### 2. `related` em `src/hooks/useDocs.ts`
- `DocPage` ganha `related: string[]` (vazio quando ausente).
- O parser de frontmatter é simples (sem YAML de listas), então aceitar as duas formas que o HUB pode emitir: `related: a, b, c` e `related: [a, b, c]` — split por vírgula, trim, remoção de colchetes/quotes, descarte de itens vazios.
- `useDocs` passa a expor também um resolvedor: para cada slug em `current.related`, buscar em `pages` (idioma já resolvido pela cadeia de fallback existente) e, se não achar, buscar em `ALL` por qualquer idioma antes de descartar. Slug inexistente → ignorado, com `console.warn` só quando `import.meta.env.DEV`.
- `scripts/sync-content-from-i6hub.mjs` (`fmDocs`): escrever `related: a, b, c` quando o item do HUB trouxer o campo, mantendo-o opcional.

### 3. Novo `src/components/docs/DocsRelated.tsx`
- Props: lista já resolvida `{ slug, title }[]`, título da seção e `localized`.
- Renderiza `<nav>` com título `text-sm font-semibold uppercase tracking-wide` e lista de `Link` (react-router) com seta `ArrowRight` (lucide), estilo de link primary já usado no /docs. Sem cartões nem chips.
- Retorna `null` quando a lista está vazia.

### 4. Integração e textos
- `DocsShell.tsx`: renderizar `<DocsRelated …/>` entre `<DocsMarkdown/>` e `<DocsPager/>`.
- `src/data/docs/content.ts`: nova chave `relatedTitle` em `DocsUiCopy` — "Leitura relacionada" / "Related reading" / "Lectura relacionada".

### Fora de escopo
Taxonomia de seções, chips/etiquetas, sidebar, índice lateral, `/i6-builders`, release/deploy.

### Verificação
`npx tsgo --noEmit`, `bun run build` e checagem no preview: clicar num link interno de doc sem recarregar (sem flash de página) e ver o bloco "Leitura relacionada" numa página de exemplo com o campo preenchido.
