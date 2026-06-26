## Contexto
Nas 4 landing pages (`TransformationLanding`), a seção "Cases relacionados" hoje exibe links de texto simples (apenas o slug do story). O usuário quer mini cards visuais, com logo, título do case e resultados/métricas.

## O que será feito

### 1. Exportar helper de lookup por slug
Em `src/hooks/useSuccessStoriesMarkdown.ts`:
- Adicionar `client_anon?: boolean` à interface `SuccessStoryItem` (já existe nos MDs).
- Exportar uma função `getStoryBySlug(slug, language)` que retorne o `SuccessStoryItem` correspondente (ou `null`), já com os caminhos de imagem resolvidos via `getPublicAssetUrl()`.

### 2. Criar componente `RelatedStoryMiniCard`
Novo arquivo: `src/components/landings/RelatedStoryMiniCard.tsx`.

Props:
- `story: SuccessStoryItem`
- `language: 'pt' | 'en'`

Layout (referência visual — manter a identidade dark existente):
- Container: card compacto com borda sutil `border-white/10`, fundo `bg-white/[0.02]`, hover `bg-white/[0.04]` e borda `border-[#F4845F]/40`.
- **Logo**: topo do card, centralizado ou alinhado à esquerda. Largura máxima ~120px, altura máxima ~40px, `object-contain`.
  - Se `client_anon === true`, usar logo da infinity6 (`/src/assets/images/i6-symbol-white.png` via import, ou caminho público da logo).
  - Caso contrário, usar `story.logo`.
- **Título do case**: nome do story (`story.title`), texto branco, fonte semibold, tamanho pequeno (text-sm), 2 linhas máximo com `line-clamp-2`.
- **Resultados**: exibir até 2 métricas (`metric1`, `metric2`) em pequenos badges ou linhas de texto, com o valor em coral (`#F4845F`) e label em `text-white/60`.
- **Link**: card inteiro é clicável e navega para `/success-stories/<slug>`.
- Altura fixa ou mínima para alinhamento visual entre cards.

### 3. Atualizar `RelatedStories` em `TransformationLanding.tsx`
- Substituir o grid de links simples pelo novo mini card.
- Carregar os dados dos stories usando o helper `getStoryBySlug` (a partir do CSV `related_stories` do landing).
- Limitar a **3 cards** (slice nos slugs, se houver mais que 3).
- Layout em **uma única linha**: `grid grid-cols-1 sm:grid-cols-3 gap-4`.
- Manter o `SectionShell` com o mesmo eyebrow e título.
- Se algum slug não for encontrado, silenciosamente ignorar (não quebrar a UI).

### 4. Dados e i6HUB
A fonte dos slugs (`related_stories`) continua sendo o frontmatter YAML dos arquivos Markdown de landings (`src/content/landings/*`). Nenhuma mudança no pipeline de sync do i6HUB.

## Checklist de implementação
- [ ] Adicionar `client_anon` à interface e ao parser em `useSuccessStoriesMarkdown.ts`
- [ ] Exportar `getStoryBySlug(...)` do mesmo arquivo
- [ ] Criar `RelatedStoryMiniCard.tsx`
- [ ] Refatorar `RelatedStories` em `TransformationLanding.tsx`
- [ ] Verificar build (`tsc --noEmit`)
- [ ] Testar preview com uma landing que tenha `related_stories` populado
