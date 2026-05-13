## Causa raiz (confirmada rodando o build local)

```
src/hooks/useInsights.ts (3:9): "Buffer" is not exported by "__vite-browser-external"
```

A lib `gray-matter` foi feita pra Node (usa `Buffer` e `eval`). Isso quebra:
- O **preview** (mesmo erro que aparecia nos logs do Vite)
- O **deploy do GitHub Pages** (build falha antes de publicar)

O aviso de "Node.js 20 deprecated" no GitHub Actions é só um aviso, não tem relação.

## Plano de correção

1. **Trocar `gray-matter` por um parser de frontmatter próprio (~20 linhas)**
   - Lê o bloco `---` no topo do arquivo `.md`
   - Faz parse de YAML simples (chave: valor, strings, números, null)
   - 100% browser-safe, sem `Buffer`, sem `eval`

2. **Limpar `src/hooks/useInsights.ts`**
   - Remover imports de `gray-matter` e `buffer`
   - Remover o polyfill de `window.Buffer`
   - Manter toda a lógica atual (`import.meta.glob` em `/src/content/insights/*.md`, filtro por idioma, `useInsights`/`useInsight`/`resolveCoverImage`)

3. **Remover dependências mortas do `package.json`**
   - `gray-matter` (não será mais usado)
   - Manter `react-markdown` e `remark-gfm` (continuam renderizando o corpo dos artigos)

4. **Validar**
   - `npm run build` localmente → deve concluir sem erro
   - Preview volta a renderizar
   - `/pt/insights` mostra os 2 posts existentes; home mostra os 3 cards

## Detalhes técnicos

O frontmatter dos seus arquivos atuais é simples (apenas pares chave/valor, sem listas aninhadas), então um parser mínimo cobre 100% dos casos. Estrutura dos `.md` continua exatamente igual — você não precisa mudar nada nos drafts.

Nenhuma mudança em rotas, design, SEO, sitemap ou no workflow do GitHub Actions.