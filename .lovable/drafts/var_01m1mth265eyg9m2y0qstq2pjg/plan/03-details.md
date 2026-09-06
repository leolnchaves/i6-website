## Estrutura de arquivos (só dentro do escopo)

Reescritos em `src/components/blog/`:

- `BlogHero.tsx` → destaque editorial assimétrico com cartão flutuante de metadados reais (`theme_label`, `date`, `read_time`), imagem `cover_image` via `resolveCoverImage`, sem scrim escuro.
- `RecentStrip.tsx` → régua numerada na faixa grafite.
- `BlogFilters.tsx` → abas de tema com sublinhado terracota + chips de tag e contagem de resultados, mesma API de props de hoje.
- `ThemeRail.tsx` → cabeçalho de tema tipográfico + grade assimétrica.
- `BlogCard.tsx` → variantes `feature` / `compact` no tema areia.

Novos, ainda em `src/components/blog/`: `BlogIntro.tsx` (abertura tipográfica) e `BlogDivider.tsx` (quebra diagonal).

`src/pages/Blog.tsx`: mesma lógica de dados (memos inalterados), envolvida por `theme-sand` e pela nova sequência de faixas. Helmet mantido.

## Imagem de borda a borda, sem rolagem lateral

Nada de `100vw` com margem negativa — com barra de rolagem vertical, `100vw` inclui a barra e sobra alguns pixels.

Técnica: a faixa do destaque é uma `section` de largura 100% (sem container), com grid de duas colunas em telas grandes. A coluna de texto recebe o recuo normal da página e alinha o conteúdo por dentro (`flex justify-end` com largura máxima em `rem`), replicando o alinhamento do container do site. A coluna da imagem simplesmente ocupa 100% da própria coluna até a borda direita — a imagem chega à borda sem nenhum truque de viewport. Tudo em `%`/`rem`, sem `vw` e sem margem negativa.

Verificação: script de navegador comparando `document.documentElement.scrollWidth` com `clientWidth` em `/pt/i6-blog`, `/en/i6-blog` e `/es/i6-blog`, nas larguras 390, 768, 1280 e 1600.

## Comportamento com poucos artigos

- **Régua de recentes**: renderiza apenas os artigos existentes (`slice(0, 5)` sobre a lista real), sem espaços reservados nem numeração fantasma; com zero recentes, a faixa grafite inteira não é renderizada.
- **Grupo de tema**: o padrão "1 grande + compactos" só é aplicado com 5 ou mais artigos no tema. Com 3–4, todos aparecem compactos em três colunas; com 1–2, todos compactos em até duas colunas. Nenhuma posição vazia é criada.
- **Zero resultados no filtro**: mensagem de estado vazio no mesmo tom tipográfico, sobre o fundo areia, com opção de limpar o filtro.

## Notas técnicas

- Cores e fontes por tokens do tema areia; a faixa escura usa o mesmo grafite `#0B1224` já adotado nas faixas escuras de /i6-builders.
- `/i6-blog` entra na checagem de rota clara do cabeçalho, junto de `/contact`, `/docs`, `/community` e `/i6-builders`.
- Cartão flutuante do destaque: absoluto sobre a imagem em telas médias/grandes, empilhado abaixo no celular.
- Quebra diagonal com `clip-path` em bloco de largura 100%, `aria-hidden`.
- Novas chaves de texto PT/EN/ES para "destaque", "artigos" e contagem de resultados.
- Sem alterações em `InsightArticle.tsx`, `useInsights.ts`, parser de frontmatter, sync do i6 HUB, `/insights`, `/i6-intelligence`, `InsightsRow.tsx` e `InsightsSection.tsx`.
- Ao final: checagem de tipos, build e o teste de rolagem acima. Sem release ou publicação.
