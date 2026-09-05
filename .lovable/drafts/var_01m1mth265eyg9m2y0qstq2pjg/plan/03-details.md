## Frente A — detalhes técnicos

Diagnóstico confirmado em execução (`/pt/docs`, 1425x902): a única
ancestral com overflow não visível é `DarkLayout` —
`div.min-h-screen.bg-[#0B1224].relative.overflow-x-hidden`, `overflow`
computado `hidden auto`. Isso a torna o contêiner de rolagem das colunas,
então `sticky top-28` não gruda: após `scrollY: 727`, o `aside` e seu
filho sticky ficaram em `top: -599`. O `IntersectionObserver` do
`DocsToc` já funciona (item ativo "Convenções" após rolagem) — não há bug
de destaque, apenas a extensão para o fim do documento.

1. `src/components/DarkLayout.tsx` — `overflow-x-hidden` →
   `overflow-x-clip` (corta o transbordo sem criar contêiner de rolagem,
   preservando `sticky`).
2. `src/components/docs/DocsShell.tsx` — coluna do menu com
   `sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto
   overscroll-contain`; grid reserva a coluna do índice em `xl`
   (`xl:grid-cols-[240px_minmax(0,1fr)_220px]`), mesmo breakpoint em que
   `DocsToc` aparece (ajustar `DocsToc` de `lg:block` para `xl:block`).
3. `src/components/docs/DocsToc.tsx` — mesmo padrão sticky com scroll
   próprio; manter `rootMargin '-120px 0px -65% 0px'`; item ativo com
   `scrollIntoView({ block: 'nearest' })` apenas quando a coluna tem
   rolagem interna, respeitando `prefers-reduced-motion`.
4. Destaque com **estado único** — os dois mecanismos não competem:
   - Um `atBottomRef`/estado booleano marca "a poucos pixels do fim do
     documento" (`scrollHeight - scrollY - innerHeight <= 24`), atualizado
     num listener de scroll com `requestAnimationFrame`.
   - O `setActiveId` do `IntersectionObserver` é ignorado enquanto essa
     condição for verdadeira; ao entrar na condição, o estado passa a ser
     o id do último título e permanece assim; ao sair, o observer volta a
     comandar. Assim não há duas fontes sobrescrevendo o mesmo estado nem
     alternância/flicker perto do fim.


Verificação: build, `tsgo --noEmit` e Playwright em PT/EN/ES conferindo
laterais paradas, destaque durante a leitura, destaque na última seção e
`document.documentElement.scrollWidth === clientWidth` em `/`, `/pt`,
`/pt/i6-builders`, `/pt/community`, `/pt/contact` e `/pt/docs`.

## Frente B — detalhes técnicos

1. `src/hooks/useDocs.ts` — `DocPage` ganha
   `content_type: 'article' | 'video' | 'download'` (default `'article'`
   quando ausente ou inválido), `video_provider: 'youtube' | null`,
   `video_id: string | null`, `file_url: string | null`,
   `file_label: string | null`. O parser de frontmatter atual já lê pares
   simples, então nenhum campo existente muda de forma.
2. `scripts/sync-content-from-i6hub.mjs` — `fmDocs` escreve os campos
   novos apenas quando presentes no item do HUB; nada muda para os tipos
   de conteúdo já existentes nem para as demais rotinas de sync.
3. `src/components/docs/DocsVideo.tsx` (novo) — thumbnail
   `https://i.ytimg.com/vi/{video_id}/hqdefault.jpg` num `button` com
   `aria-label` traduzido; ao clicar, estado local troca por
   `iframe` de `https://www.youtube-nocookie.com/embed/{video_id}?autoplay=1`
   com `allow="autoplay; encrypted-media; picture-in-picture"`,
   `referrerPolicy="strict-origin-when-cross-origin"` e proporção 16:9.
   Nenhum iframe antes do clique.
4. `src/components/docs/DocsDownload.tsx` (novo) — cartão em destaque
   (`border-primary/30`, ícone de download) com `file_label` e `<a
   href={file_url} download>`; renderizado acima de `DocsMarkdown` pelo
   `DocsShell`, quando `content_type === 'download'`.
5. `src/components/docs/DocsCodeBlock.tsx` (novo) — override do `pre` em
   `DocsMarkdown`: wrapper `relative group` com botão de copiar
   (`navigator.clipboard.writeText` do texto do bloco, fallback via
   `textarea` temporária), ícone `Copy` → `Check` por ~2s,
   `aria-label`/`title` PT "Copiar código", EN "Copy code", ES "Copiar
   código", vindos de `docsUi` em `src/data/docs/content.ts`. Além da
   troca de ícone, um `<span role="status" aria-live="polite"
   class="sr-only">` recebe "Copiado" / "Copied" / "Copiado" no idioma
   ativo quando a cópia dá certo, e volta a vazio ao expirar o feedback.
   Escopo exclusivo de `DocsMarkdown`; as outras cinco renderizações de
   Markdown

   do site não são tocadas.
6. Exemplos: `video-tour-{pt,en,es}.md` e
   `download-guide-{pt,en,es}.md` em `src/content/docs/`, com
   `sample: true` e o aviso existente. O PDF de exemplo é gerado no
   sandbox e publicado como ponteiro `.asset.json` via `lovable-assets`
   (`src/assets/docs-exemplo.pdf.asset.json`), referenciado por
   `file_asset` e resolvido para URL no build do conteúdo.
7. `src/data/docs/content.ts` — novas chaves de UI nos 3 idiomas:
   rótulo do botão de copiar, confirmação "Copiado"/"Copied"/"Copiado",
   `aria-label` do play do vídeo e rótulo padrão do cartão de download.

Fora de escopo: rodapé, conteúdo das páginas atuais, mecanismo mobile,
demais renderizações de Markdown, qualquer rota além do ajuste de
`overflow` em `DarkLayout`.

Ao final: build, checagem de tipos e verificação visual em PT/EN/ES nas
páginas de exemplo (vídeo sem iframe antes do clique, download com link
válido, botão de copiar funcionando).
