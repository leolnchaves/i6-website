## Diagnóstico

**Anexo 1 (larguras)** — o header usa `container mx-auto px-6` (largura máxima ~1536px), mas várias seções da home aplicam `max-w-6xl` por cima e ficam mais estreitas. `InsightsSection` não tem esse limite — por isso está alinhada com o header (anexo 2).

Seções com `max-w-6xl` a normalizar:
- `src/components/hometeste/SinaisSection.tsx`
- `src/components/hometeste/ComoFuncionamosSection.tsx` (header, animação desktop e stack mobile)
- `src/components/hometeste/TestemunhosCompact.tsx`
- `src/components/hometeste/HeroDecisaoV4.tsx` (container da imagem)

Também vou varrer as demais páginas (Solutions, OurAI, SuccessStories, Blog, Contact, TransformationLanding) e remover `max-w-6xl/5xl/7xl` aplicados no **wrapper de seção** quando o header estiver mais largo. Preservo `max-w-*` de blocos internos (parágrafo, subtítulo).

**Anexo 3 (markdown em success story)** — `src/pages/SuccessStoryArticle.tsx` renderiza `<p>{story.challenge}</p>` etc. sem parser. Por isso `###`, `>`, listas e `\n\n` do MD do i6HUB aparecem literalmente. As páginas de i6 Blog/Article usam `ReactMarkdown` + `remark-gfm`.

**Anexo 4 (imagem do hero) + logos "Como Funciona"** — confirmado via `curl`: `/__l5e/assets-v1/{id}/...` retorna **404 no GitHub Pages** (infinity6.ai) mas **200 no preview do Lovable**. Nenhum passo do workflow baixa os binários. Ou seja, **todos os `.asset.json`** (hero, waves, logos da seção Como Funciona) estão quebrados em produção.

## Mudanças

### 1. Alinhar largura das seções ao header
- **`src/components/hometeste/SinaisSection.tsx`** — remover `max-w-6xl` do wrapper.
- **`src/components/hometeste/ComoFuncionamosSection.tsx`** — remover `max-w-6xl` do header, do bloco desktop e do mobile.
- **`src/components/hometeste/TestemunhosCompact.tsx`** — trocar `max-w-6xl mx-auto` do carrossel por `w-full`.
- **`src/components/hometeste/HeroDecisaoV4.tsx`** — remover `max-w-6xl` do container da `<picture>`.
- **Varrer outras páginas** e remover `max-w-{6xl,5xl,7xl}` do container-mãe de cada seção sempre que o header estiver mais largo. Mantenho limites internos de leitura em subtítulos/parágrafos.

### 2. Markdown nas success stories
Em `src/pages/SuccessStoryArticle.tsx`:
- Importar `ReactMarkdown` + `remark-gfm` (já usados em `InsightArticle`/`IntelligenceArticle`).
- Substituir os `<p>` de `challenge`, `prediction`, `solution` e `impact` por `<ReactMarkdown remarkPlugins={[remarkGfm]} components={{...}}>` com wrapper `prose prose-invert` e o mesmo mapa de `components` do blog (links com `target="_blank" rel="noopener noreferrer"`, headings, listas, `blockquote`, `strong`).
- Normalizar `\n` literal do payload (`.replace(/\\n/g, '\n')`) antes de renderizar — visível no anexo 3.

### 3. Corrigir `.asset.json` em produção (hero + logos + waves)
Criar `scripts/inline-lovable-assets.mjs` que roda **pós-build**:
- Faz glob de `src/**/*.asset.json`.
- Lê `url` (`/__l5e/assets-v1/{id}/{file}`).
- Baixa o binário do preview público (`https://i6-website.lovable.app{url}` com fallback para `https://id-preview--{projectId}.lovable.app{url}` extraído do próprio JSON).
- Escreve em `dist{url}`, preservando a estrutura de pastas.

Adicionar novo passo `Inline lovable-assets` no `.github/workflows/deploy-gh-pages.yml` **entre `npm run build` e `Upload artifact`**. Assim, os caminhos `/__l5e/assets-v1/...` passam a existir como arquivos estáticos no site publicado, sem tocar em nenhum componente.

Nenhuma alteração em `vite.config.ts`, `.env`, `src/integrations/*` ou lockfile. Sem bump de versão nesta rodada — publico release patch após validação, se você pedir.

## Detalhes técnicos

- `ReactMarkdown` e `remark-gfm` já estão nas deps (usados em `InsightArticle`/`IntelligenceArticle`); reutilizo o mesmo mapa de components para manter consistência tipográfica.
- O script usa `fetch` global do Node 20 (já configurado no workflow), com timeout curto e falha explícita caso algum asset retorne não-200 (evita deploy silencioso com imagens quebradas).
- Como o preview é sempre pré-requisito para produção (o próprio Lovable serve os assets), essa dependência é segura para o build do GH Pages.