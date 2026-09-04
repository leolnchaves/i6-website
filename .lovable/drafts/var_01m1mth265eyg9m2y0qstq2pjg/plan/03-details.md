## O que será alterado

### 1. Roteamento (`src/App.tsx`)
- Alterar a rota `comunidade` para `community`.
- Adicionar redirecionamento da rota antiga `/comunidade` (e `/:lang/comunidade`) para `/community` (e `/:lang/community`) usando `<Navigate>` do React Router. Como não há arquivos físicos para essas rotas no GitHub Pages, o SPA sempre carrega via `404.html`/`index.html`; o redirecionamento client-side dispara assim que o bundle interpreta o path antigo.

### 2. Navegação global
- `src/components/hometeste/HeaderNovo.tsx`: trocar `localized('/comunidade')` por `localized('/community')` e atualizar o array de paths usado no controle de tema/classe ativa.
- `src/components/hometeste/FooterNovo.tsx`: trocar `localized('/comunidade')` por `localized('/community')`.

### 3. CTA do i6-builders
- `src/data/i6Builders/content.ts`: trocar `COMMUNITY_PATH = '/comunidade'` por `'/community'`.

### 4. Sitemap
- `public/sitemap.xml`: substituir todas as ocorrências de `/comunidade` por `/community` nas URLs PT/EN/ES e nos `hreflang` alternates.

### 5. Comentários e documentação interna
- Atualizar comentários em `src/data/comunidade/content.ts` e `src/data/comunidade/placeholders.ts` para referenciar `/community`.

## O que NÃO será alterado
- Nomes de pastas, componentes, hooks, chaves de SEO (`page="comunidade"`, chave `comunidade` em `seoData.ts`) e identificadores de lead (`i6-comunidade`) permanecem inalterados — são internos e não aparecem na URL.
- Conteúdo textual em português que usa a palavra "comunidade" (títulos, CTAs, descrições) permanece como está.

## Validação
1. `bunx tsgo --noEmit -p tsconfig.app.json`
2. `bun run build`
3. Verificação visual em PT, EN, ES, desktop e mobile:
   - Acessar `/pt/community`, `/en/community`, `/es/community`.
   - Verificar header e footer ativos/corretos.
   - Verificar redirecionamento de `/comunidade` antigo.
   - Confirmar que `/i6-builders` e `/docs` continuam intactos.