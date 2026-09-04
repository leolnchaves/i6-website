## Detalhes técnicos

Arquivos novos:

- `src/pages/Comunidade.tsx` — monta as seis seções, mesmo padrão de `I6Builders.tsx` (wrapper `theme-sand`, bloco final `bg-[#0B1224]`, `SEOHead`).
- `src/components/comunidade/` — `CommunityOpening.tsx`, `CommunityScaleBand.tsx`, `CommunityMural.tsx`, `CommunityEvents.tsx`, `CommunityBelonging.tsx`, `CommunityFinalCTA.tsx`.
- `src/data/comunidade/content.ts` — toda a cópia em PT/EN/ES via `pickLang`, incluindo os arquétipos e os três eventos.
- `src/data/comunidade/placeholders.ts` — apenas a lista de imagens provisórias e seus recortes/rotações, isolada para troca fácil pelas fotos reais.
- `src/hooks/useRevealOnScroll.ts` (ou reuso do `useScrollAnimation` existente, se couber) — entradas ao rolar respeitando `prefers-reduced-motion`.

Alterações aditivas em arquivos existentes:

- `src/App.tsx` — rota `comunidade` dentro de `LocalizedRoutes`.
- `src/components/hometeste/HeaderNovo.tsx` — acrescentar `/comunidade` à lista de rotas de tema claro (`normalizedPath`), sem tocar nas demais rotas.
- `src/lib/leadFormConfig.ts` — novo valor `'i6-comunidade'` no tipo `LeadSource`.
- `src/data/staticData/seoData.ts` — entrada `comunidade` (título, descrição, sem ponto final).
- `src/data/i6Builders/content.ts` — nada muda; `COMMUNITY_PATH` já aponta para `/comunidade` e passa a resolver.
- `public/sitemap.xml` e `roadmap.md` — atualização do item pendente.

Movimento e acessibilidade:

- Cada seção usa `IntersectionObserver` para revelar com deslocamento curto; a faixa de setores usa animação CSS contínua; camadas do mural têm deriva leve por `transform` no scroll.
- Uma única checagem de `prefers-reduced-motion` desliga revelação, marquise e deriva, deixando tudo no estado final.
- Imagens com `alt` descritivo e `loading="lazy"`; a colagem é decorativa e não carrega informação exclusiva.

Sem mudança em pipeline de deploy, sincronização de conteúdo do i6 HUB, componente de formulário ou destino de leads.
