## Detalhes técnicos

Arquivo único: `src/components/our-ai/IntelligenceHero.tsx`.

- Estrutura: separar `content.layers` em faixas não-atuais (topo, `md:grid-cols-2`, cartões `bg-card` com `border border-border rounded-[var(--radius)]`) e a faixa `current` (base, largura total, `bg-accent`). Remove-se a moldura única `gap-px`/`bg-border`.
- Geometria medida do DOM, como em `BuilderModels.tsx`: `wrapRef` no container relativo, refs nos dois cartões de topo e no cartão base; `measure()` usa `getBoundingClientRect()` para calcular centro-x/base-y de cada topo e o topo-y da base, tudo relativo ao wrapper. Nenhum valor fixo em px.
- Recalcular em `useLayoutEffect` (via `requestAnimationFrame`) com dependência de `language`/`content.layers`, em `window.resize` e em `ResizeObserver` observando os três cartões.
- Overlay: `<svg aria-hidden className="pointer-events-none absolute inset-0 hidden md:block h-full w-full overflow-visible">` dentro do container; caminho em Y invertido (duas descidas verticais + barramento horizontal + descida central até a base) com `stroke="hsl(var(--primary))"`, `strokeWidth="1.25"` e um `circle` r=3 no ponto de junção.
- Animação de traço: reaproveita o padrão `@keyframes i6-draw` com `strokeDasharray`/`--i6-len` derivado do comprimento medido; disparo único ao entrar na viewport via `IntersectionObserver` (threshold ~0.3, desconecta após disparar). Com `prefers-reduced-motion: reduce` (checado por `matchMedia` + listener `change`), sem dasharray e sem animação.
- Profundidade no cartão base: `shadow-[inset_0_10px_16px_-12px_hsl(var(--foreground)/0.18)]` (token semântico, sem cor literal), mantendo textos e classes de tipografia atuais.
- Mobile: o SVG fica `hidden md:block`; as faixas empilham como hoje.

Verificação: `npx tsgo --noEmit -p tsconfig.app.json`, build, e Playwright em pt/en/es a 1440px (linhas presentes, ancoradas nos cartões, sem overflow) e 390px (SVG ausente, sem overflow).
