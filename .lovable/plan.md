## Contexto

Na iteração anterior, os chips de "ALAVANCAS DE VALOR" (detalhe da success story) foram configurados para linkar para as 4 landings de transformação (ex: `/solutions/demand-supply-efficiency`). O correto é linkar para as **3 alavancas preditivas de valor** dentro da própria página `/solutions`, na seção detalhada de cada alavanca (não no hero, e não nas landings de transformação).

## Novo contrato de slugs

O i6 HUB continua enviando `solutions` como array de strings no formato `"Rótulo|slug"`. A whitelist passa a aceitar apenas 3 slugs, correspondentes aos IDs das alavancas em `src/data/solutionsV2/content.ts`:

| Slug       | Alavanca                                         |
| ---------- | ------------------------------------------------ |
| `growth`   | Crescimento & Inteligência de Consumidor         |
| `planning` | Demanda, Distribuição e Planejamento Comercial   |
| `pricing`  | Precificação e Inteligência de Margem            |

Destino do link: `/{lang}/solutions#territory-{slug}` (ex: `/pt/solutions#territory-pricing`). A âncora `territory-{id}` já existe em `TerritorySection.tsx`, então basta scroll nativo. Se o usuário estiver em `/en`, o link respeita o idioma.

## Alterações

1. **`src/hooks/useSuccessStoriesMarkdown.ts`**
   - Substituir a whitelist antiga (`demand-supply-efficiency`, `dynamic-pricing`, `predictive-personalization`, `data-monetization`) pela nova: `growth`, `planning`, `pricing`.
   - Slugs fora da whitelist continuam virando texto puro (sem link), preservando retrocompatibilidade.

2. **`src/pages/SuccessStoryArticle.tsx`**
   - Trocar o destino do `<Link>` de `/{lang}/solutions/{slug}` para `/{lang}/solutions#territory-{slug}`.
   - Manter estilos de hover (borda coral, fundo semi-transparente) já aplicados.
   - Como o link é uma âncora na mesma rota quando já se está em `/solutions`, garantir `scroll` para a âncora ao clicar (o browser já resolve `#territory-x` nativamente; se o usuário estiver em outra rota, o React Router navega e a âncora é aplicada — se necessário, adicionar um pequeno `useEffect` de fallback com `scrollIntoView`, mas provavelmente não será preciso).

3. **`src/content/stories/README.md`**
   - Atualizar a tabela de slugs válidos para as 3 alavancas, com exemplos:
     - `"Precificação Dinâmica|pricing"`
     - `"Previsão de Demanda|planning"`
     - `"Descoberta e Personalização|growth"`
   - Explicar que o link aterrissa na seção detalhada da alavanca dentro de `/solutions`.

## Fora do escopo

- Nenhuma mudança visual nos chips além do destino do link.
- Nenhuma alteração em `/solutions` (IDs `growth`/`planning`/`pricing` já existem).
- Nenhum bump de versão nesta etapa (publicação será solicitada depois).
