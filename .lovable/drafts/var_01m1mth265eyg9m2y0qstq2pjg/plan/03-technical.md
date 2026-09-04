## Detalhes técnicos

Arquivo único: `src/components/home-v3/HeroSuite.tsx`.

- `decisions` em PT e EN cresce de 3 para 12 itens. Os três primeiros ficam byte-idênticos.
- Ícones reutilizam `lucide-react` já disponível: `AlertTriangle`, `TrendingUp`, `Target`, mais `Sparkles`/`Layers`/`Percent`/`Compass`/`BarChart3` conforme o tema.
- Rotação: `useState` com índice de página + `useEffect` com `setInterval` de 5s, `pageCount = Math.ceil(items.length / 3)`, slice de 3. Intervalo limpo no unmount e pausado no `mouseenter` do quadro.
- Transição: reaplica `animate-sand-rise` via `key={page}` nos cards, mantendo o stagger atual de `0.14s`.
- Altura estável: os cards existentes já têm alturas próximas; para evitar salto, o container dos três cards recebe `min-h` fixo por breakpoint.
- Indicador discreto de página (três/quatro pontinhos) abaixo dos cards, em `border`/`primary`, clicável para avançar.
- Nenhuma mudança em conteúdo de outras seções, header, footer ou `suiteContent.ts`.
