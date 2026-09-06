## O cartão focado em resultado

Ordem de leitura dentro do cartão: segmento (etiqueta pequena) → **métrica 1 em número grande, terracota, peso forte** com o rótulo curto abaixo em grafite claro → filete separador → título do case → resumo em duas linhas → faixa de imagem baixa (tira horizontal, não bloco) com o logo do cliente sobreposto no canto → "ler o case →".

Regras:
- Métrica 1 é sempre o elemento dominante. Métricas 2 e 3 não aparecem no cartão (ficam no detalhe) — evita competir com o herói.
- Se o case não tiver métrica 1, o cartão cai para o título como elemento dominante, na mesma escala tipográfica, sem cartão quebrado.
- Cliente anônimo: sem logo, e o nome de cliente vira a descrição genérica já existente no conteúdo.
- Cartão inteiro é um único link para `/{lang}/success-stories/<slug>`; hover eleva sutilmente e acende o filete em terracota.
- Grade sem alturas irregulares: número, título e resumo em faixas de altura fixa; imagem por último.

## Detalhe do case — composição

1. **Capa em tela cheia com o gradiente até a cor de fundo — mantida exatamente como está.** Nenhuma mudança nessa mecânica, incluindo logo/segmento/título/cliente sobrepostos e a ocultação do logo quando o cliente é anônimo.
2. **Impacto comprovado** — primeiro bloco após a capa, já em areia: 1, 2 ou 3 colunas conforme a quantidade de métricas preenchidas, números grandes em terracota sobre cartões claros com filete superior.
3. **Narrativa em quatro atos condicionais** — A dor real / O que precisava ser antecipado / A predição / A solução, cada uma com rótulo pequeno em terracota e texto em coluna estreita de leitura; cada seção só renderiza se preenchida (regra atual preservada), e A predição recebe um leve destaque de fundo por ser o coração da tese.
4. **Alavancas de valor** — mecanismo preservado ao pé da letra: etiqueta com slug válido vira link para `/{lang}/solutions#territory-<slug>`; sem slug, permanece etiqueta não clicável. Visual novo: etiquetas em contorno terracota sobre cartão claro, com a mesma linha de apoio ("clique para conhecer...").
5. **Citação do cliente** — bloco tipográfico grande em grafite, aspas em terracota; nome e cargo ocultos quando anônimo.
6. **Outras histórias** — três cartões compactos reusando o mesmo cartão da listagem em variante reduzida (segmento + métrica 1 + título), para manter a promessa de resultado até o fim.
7. **Convite final** — o mesmo bloco de contato do site.

Continua uma rota por slug renderizando o mesmo componente para todos os cases — sem modal nem painel lateral.

## Espanhol

- Casca da página em ES completo: títulos de abertura, rótulos do filtro ("Todos"), "Impacto comprobado", "Palancas de valor", "El dolor real", "Lo que había que anticipar", "La predicción", "La solución", "Otras historias", "Volver a las historias", textos de botão e SEO. Hoje o texto estático da página só existe em PT/EN.
- Conteúdo de case: sem ES nos arquivos. Em ES a página exibe o conteúdo PT (mesmo fallback já usado no site), sem inventar tradução.

## Estrutura de arquivos prevista

- `src/data/staticData/successStoriesData.ts` — ganha bloco `es` e as novas chaves de rótulo da casca (listagem + detalhe).
- `src/components/success-stories/` — reescrita visual de `SuccessStoriesHero.tsx`, `SegmentFilter.tsx`, `ModernStoriesGrid.tsx`, `TestimonialsSection.tsx` e `story-components/StoryCard.tsx` (com variante compacta), `EmptyState.tsx`.
- `src/pages/SuccessStories.tsx` — ordem das seções e fundo areia.
- `src/pages/SuccessStoryArticle.tsx` — capa intocada; corpo reescrito em areia, com rótulos vindos do arquivo de textos em três idiomas.
- Sem mudanças em `useSuccessStoriesMarkdown.ts`, `useTestimonialsMarkdown.ts` nem no conteúdo de `src/content/stories/`.
- `HeaderNovo.tsx` — acrescentar **apenas** `/success-stories` (comparação exata) à lista de páginas claras; rotas de case (`/success-stories/<slug>`) ficam fora e mantêm o comportamento padrão.

## Investigação embutida — respostas

1. **Arquivos de hoje.** Listagem: `src/pages/SuccessStories.tsx` com `SuccessStoriesHero.tsx`, `SegmentFilter.tsx`, `ModernStoriesGrid.tsx`, `TestimonialsSection.tsx`, `story-components/StoryCard.tsx`, `story-components/EmptyState.tsx` e os utilitários em `optimized/` (`LazyComponents`, `LazyImage`, `InViewSection`, `useImageCache`). Detalhe: `src/pages/SuccessStoryArticle.tsx`. Nenhum componente da pasta `success-stories/` é usado por outra rota. Compartilhados de fora: `CTAFinal` (convite final, também na home), `useTestimonialsMarkdown` (usado por `TestemunhosCompact` e `ProofAndVoices`) e `successStoriesData` (também lido por `ProofAndVoices`) — logo, mudanças nesses dois últimos precisam ser aditivas.
2. **Sync do i6 HUB.** Já existe: `--type=stories` está registrado, com `fmStories(it, { coverLocal, logoLocal })` escrevendo em `src/content/stories/` e materializando capa em `public/content/success-stories/` e logo em pasta própria. Cobre todos os campos do schema (segmento, client_anon, challenge, what_to_anticipate, prediction, solution, metric1-3, solutions, quote, customer, show_home, published, sort_order). Nada a criar.
3. **Âncoras de /solutions.** O link usa `#territory-<slug>`, gerado por `id={`territory-${territory.id}`}` em `TerritorySection.tsx`. Slugs aceitos hoje pelo carregador de cases: `growth`, `planning`, `pricing` (as três alavancas). Os demais ids de conteúdo em solutions (`predictive-personalization`, `smart-discovery`, `predictive-campaign-targeting`, `demand-forecasting`, `predictive-commercial-targets`, entre outros) não são âncoras de território e continuam fora da lista.
4. **Rotas claras no header.** `/success-stories` **não** está na lista (hoje: `/`, `/i6-builders`, `/community`, `/contact`, `/i6-blog`, `/insights`, `/i6-intelligence`, `/our-ai`, `/docs` e subpáginas). Correção definitiva: entra na lista **só** a comparação exata `normalizedPath === '/success-stories'` (mesma normalização já usada: sem prefixo de idioma, sem barra final). Qualquer rota iniciada por `/success-stories/` — ou seja, qualquer case — fica **fora** da lista e mantém o comportamento padrão (transparente no topo, sólido após rolar), preservando a capa escura em tela cheia.
