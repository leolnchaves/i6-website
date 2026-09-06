## Cartão sem imagem

O bloco com o nome do tipo em letra enorme e apagada sai. No lugar:

- Cartão claro sobre a areia, com borda fina e leve elevação no hover (terracota na borda e no título, como no blog).
- O tipo é comunicado só pelo badge pequeno no topo — não se repete em nenhum outro lugar do cartão.
- Fundo com uma textura geométrica muito discreta no canto superior direito (linhas diagonais finas em tom de borda, baixo contraste), que aparece **apenas** quando não há imagem de capa; quando há capa, ela ocupa a faixa superior como hoje.
- A hierarquia é tipográfica: título forte, resumo em três linhas com corte limpo, e rodapé fino com tema, data e tempo de leitura separados por ponto médio.

## Onde "Executive Research" será substituído por "i6 Deep Research"

Levantamento completo do que existe hoje:

- Rótulo do menu "Inteligência Aplicada" / "Applied Intelligence" / "Inteligencia Aplicada": chave `header.research.hub`, hoje "i6 Executive Research" nos três arquivos de tradução (pt, en, es) — passa a "i6 Deep Research" em todos.
- Sobrelinha da abertura da página: hoje "infinity6 · Executive Research".
- Título e descrição de SEO da listagem: hoje "i6 Research | infinity6" e o texto de apoio — passam a usar "i6 Deep Research", incluindo o nome no dado estruturado da página.
- Título acessível (h1 oculto) e o rótulo de tipo dos cartões: o badge de peça continua "i6 Research" (é o nome do tipo de conteúdo, não da página) — só o nome da página muda. Confirmo isso na revisão para não gerar ambiguidade.

Não há link com esse texto no rodapé hoje; o rodapé não referencia a página. Breadcrumb e título de leitura de item individual (`IntelligenceArticle.tsx`, `InsightArticle.tsx`) ficam **fora de escopo** nesta rodada, como pedido — eles continuarão dizendo "i6 Research". Vale registrar que isso deixa uma inconsistência temporária entre listagem e leitura, a resolver numa próxima rodada.

## Detalhes técnicos

- Arquivos alterados: `src/pages/Intelligence.tsx` (composição, cartão, remoção do filtro de setor), `src/components/hometeste/HeaderNovo.tsx` (adicionar `/i6-intelligence` à lista de rotas de tema claro), `src/data/translations/pt.ts`, `en.ts`, `es.ts` (chave `header.research.hub`).
- Sem novos arquivos de componente: o cartão continua inline em `Intelligence.tsx`, como hoje.
- Intocados: `useIntelligence.ts`, `useInsights.ts` (incluindo `useIntelligenceInsights`), `IntelligenceOrInsightArticle.tsx`, `IntelligenceArticle.tsx`, `InsightArticle.tsx`, `Insights.tsx`, `Blog.tsx`, o sync do i6 HUB.
- O campo `sector` permanece no frontmatter e nos hooks; apenas a UI e o parâmetro `sector` da URL desaparecem. O parâmetro `theme` continua funcionando — os cartões de solução em `/solutions` linkam para `/i6-intelligence?theme=...` e esse atalho segue válido.
- Cores só por tokens do tema (areia, grafite, terracota), sem hexadecimais soltos como os `#F4845F` atuais.
- A página hoje decide textos com `language === 'pt' ? ... : ...`, então espanhol cai no inglês. Na nova composição os rótulos de interface (Tipo, Tema, Todos, tempo de leitura, estado vazio, contador) ganham as três variantes pt/en/es.
- Ao final: checagem de tipos, build e verificação em pt/en/es de que a página não tem rolagem horizontal e que os filtros de tipo e tema funcionam junto com o parâmetro da URL. Sem release nem deploy.
