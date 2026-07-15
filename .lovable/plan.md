# Plano

## 1) Hero do blog truncado no mobile

**Causa:** em `src/components/blog/BlogHero.tsx` (linha 22) o container usa `aspect-[21/9]` no mobile. Essa proporção é muito baixa para o formato retrato do celular, então o bloco de texto (badge + título + excerpt + CTA), posicionado com `absolute inset-0 flex flex-col justify-end`, transborda para cima e é cortado pelo `overflow-hidden` do card.

**Correção (só mobile — desktop fica igual):**
- Trocar `aspect-[21/9] lg:aspect-auto lg:h-full` por uma proporção mais alta no mobile, ex.: `aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full`.
- Reduzir `line-clamp-3` do excerpt para `line-clamp-2` no mobile (`line-clamp-2 md:line-clamp-3`) para garantir folga.
- Ajustar padding do bloco de conteúdo no mobile (`p-5 md:p-8`) para caber melhor.

Sem mudança de layout desktop e sem tocar em BlogCard/RecentStrip.

## 2) Conteúdo MD divergente entre preview e produção

Isso **não é bug** — é comportamento arquitetural do site:

- Todo conteúdo dinâmico (insights, research, landings, stories) mora no i6Hub CMS.
- O workflow `.github/workflows/deploy-gh-pages.yml` roda `scripts/sync-content-from-i6hub.mjs` em 4 etapas (insights/research/landings/stories) **a cada deploy**. Isso reescreve `src/content/**` e `public/content/**` com o estado atual do CMS.
- O **preview do Lovable não executa esse sync** — ele serve apenas o que está commitado no repositório. Como faz várias semanas que ninguém commita esses MDs manualmente, o preview mostra um snapshot antigo (arquivos que já foram removidos do i6Hub ainda existem no repo, e novos artigos criados só no i6Hub não aparecem aqui).
- Em PRD (infinity6.ai) o conteúdo está sempre correto porque o sync roda no build da GH Action.

**Opções (escolha uma na aprovação):**

- **A. Não mexer** — apenas documentar. Preview segue sendo "layout/código", produção segue sendo "conteúdo real". Recomendado, é como funciona hoje.
- **B. Rodar o sync uma vez agora** e commitar o resultado, para o preview refletir o estado atual do i6Hub neste momento. Requer que os secrets `I6HUB_FEED_URL*` e `I6HUB_SYNC_TOKEN` estejam disponíveis no ambiente Lovable (hoje eles vivem só nos GitHub Secrets). Se não estiverem, precisaria cadastrá-los como secrets do projeto Lovable.
- **C. Adicionar um passo automático de sync no dev-server do preview** (via script rodando no `predev`). Mesmo pré-requisito de secrets da opção B; adiciona latência ao boot do preview.

## Detalhes técnicos

Arquivo alterado no item 1:
- `src/components/blog/BlogHero.tsx` — apenas classes Tailwind no wrapper do cover e no `<p>` do excerpt.

Nenhum arquivo alterado para o item 2 até você decidir A/B/C.
