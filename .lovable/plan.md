## 1. eBooks por território (3, não mais por solução)

Em `src/data/kiosk/config.ts`:

- Adicionar `territoryEbook: Record<RouteId, { pt: string; en: string }>` com:
  - `growth` → "eBook Inteligência Preditiva do Consumidor" / "eBook Predictive Customer Intelligence"
  - `planning` → "eBook Supply Preditivo" / "eBook Predictive Supply"
  - `pricing` → "eBook Pricing Orientado a Resultados" / "Results-Driven Pricing eBook"
- Manter `solutionEbook` por enquanto (não referenciado após a troca), removê-lo depois.

Em `src/pages/Kiosk.tsx` / `EbookCTA.tsx`:

- Passar o `route` (growth/planning/pricing) para o CTA, não o `solutionId`.
- O título do eBook passa a vir de `territoryEbook[route][lang]`.
- Envio ao i6HUB continua idêntico ao fluxo atual (mesmo endpoint/Apps Script usado em artigo/research gated), com `subscription: 'i6-website'` e o título do eBook como identificador do material — nada gravado no Lovable Cloud.

## 2. Tracking agregado (opção A: 1 linha por clique)

### Backend (Lovable Cloud)

Nova tabela `public.kiosk_events`:

- `id uuid pk default gen_random_uuid()`
- `event_key text not null` — string curta e estável
- `created_at timestamptz not null default now()`
- Index em `(event_key, created_at)` e em `created_at`.

RLS:

- `insert` liberado para `anon` e `authenticated` (site estático, sem login).
- `select` liberado para `anon` também — o dashboard é público mas fica atrás de um hash "obscuro"; sem PII na tabela, o trade-off é aceitável.
- GRANTs correspondentes.

### Chaves de evento (namespaced, curtas)

- `kiosk:start` — usuário toca em "Começar"
- `q1:<optionId>` — resposta da Q1 (ex.: `q1:r-growth`)
- `q2:<optionId>` — resposta da Q2 (ex.: `q2:g-personalization`)
- `results:<solutionId>` — solução selecionada na tela de resultados
- `ebook:<route>` — pedido de eBook submetido com sucesso (`growth`/`planning`/`pricing`)
- `signal:<scenarioKey>` — pergunta clicada no i6 Signal

### Frontend

Novo helper `src/lib/kioskTracker.ts`:

- `trackKioskEvent(eventKey: string)` → `supabase.from('kiosk_events').insert({ event_key })`, fire-and-forget, try/catch silencioso.
- Chamado nos pontos acima em `Kiosk.tsx`, `QuizScreen.tsx`, `SolutionsGrid.tsx`, `EbookCTA.tsx`, `KioskSignalIntelliboard.tsx`.
- Não substitui o `useTracker` do GA4 no site geral — é adicional, dedicado ao kiosk.

## 3. Dashboard oculto

Rota: `/kiosk-metrics/:token` (fora do prefixo de idioma, como `/kiosk`).

- Token hardcoded no código (string opaca ~24 chars). Trocar = redeploy. Documentado que é temporário.
- Se `token` não bater, `<Navigate to="/" />`.

Página `src/pages/KioskMetrics.tsx`:

- Carrega tudo de `kiosk_events` (com paginação se passar de 1000).
- Filtro de período no topo: "Desde o início" (default), "Últimas 24h", "Últimos 7 dias", "Últimos 30 dias", "Hoje", "Última hora".
- Filtro de granularidade de agrupamento visual: hora / dia / semana (para o gráfico temporal).
- Assinatura realtime em `kiosk_events` (Postgres Changes → append no estado local) para atualização ao vivo.
- Seções:
  1. **Cards de resumo**: total de sessões (`kiosk:start`), quizzes completos (soma de `q2:*`), soluções selecionadas (`results:*`), eBooks enviados (`ebook:*`), taxa de conversão sessão→eBook.
  2. **Q1 – Roteamento**: barra horizontal com contagens por opção (Growth / Planning / Pricing).
  3. **Q2 por rota**: 3 blocos (Growth, Planning, Pricing), cada um com barras por opção.
  4. **Soluções selecionadas**: ranking por solutionId (com label legível via lookup em `solutionsV2/content.ts`).
  5. **eBooks solicitados**: 3 barras (growth/planning/pricing).
  6. **i6 Signal**: contagem por cenário clicado.
  7. **Timeline**: linha temporal agrupada pelo bucket escolhido (total de eventos por bucket).
- Sem gráficos pesados: usar `recharts` (já disponível via shadcn) para timeline e barras.
- Sem cabeçalho/rodapé do site (renderizada fora do `DarkLayout`, como `/kiosk`).

Rota adicionada em `src/App.tsx` ao lado de `/kiosk`.

## 4. Fora de escopo

- Nada de PII na tabela (nome/email do eBook continuam só no fluxo i6HUB).
- Sem autenticação real no dashboard — só o token opaco na URL.
- Sem alteração no fluxo de leads de artigo/research.

## Detalhes técnicos

- Migration única: `CREATE TABLE` → `GRANT` (`anon` + `authenticated` insert/select; `service_role` all) → `ENABLE RLS` → policies `insert to anon,authenticated using (true)` e `select to anon,authenticated using (true)`.
- Realtime: `ALTER PUBLICATION supabase_realtime ADD TABLE public.kiosk_events;` na mesma migration.
- Subscribe no dashboard dentro de `useEffect` com `removeChannel` no cleanup (evita loop de conexão).
- Contagens no dashboard são computadas no cliente por filtragem/redução do array de eventos — simples e suficiente para o volume esperado; se crescer, migrar para uma RPC de agregação.
