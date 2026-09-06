## Detalhes técnicos

Arquivo único: `src/components/our-ai/IntelligenceHero.tsx`.

- Estrutura: separar `content.layers` em faixas não-atuais (topo, `md:grid-cols-2`, cartões `bg-card` com `border border-border rounded-[var(--radius)]`) e a faixa `current` (base, largura total, `bg-accent`). Remove-se a moldura única `gap-px`/`bg-border`.
- Geometria medida do DOM, como em `BuilderModels.tsx`: `wrapRef` no container relativo, refs nos cartões de topo e no cartão base; `measure()` usa `getBoundingClientRect()` para produzir, por cartão de topo, um objeto `{ x: t.left + t.width/2 - w.left, y1: t.bottom - w.top, y2: base.top - w.top }`. Um `<line>` por cartão, com `x1 === x2 === x`. Nenhum valor fixo em px, nenhuma coordenada compartilhada, nenhum `path` com segmento horizontal, nenhum `circle`.
- Recalcular em `useLayoutEffect` (via `requestAnimationFrame`) com dependência de `language`/`content.layers`, em `window.resize` e em `ResizeObserver` observando os cartões de topo e a base.
- Overlay: `<svg aria-hidden className="pointer-events-none absolute inset-0 hidden md:block h-full w-full overflow-visible">` dentro do container, com `stroke="hsl(var(--primary))"` e `strokeWidth="1.25"`.
- Animação de traço: padrão `@keyframes i6-draw` com `strokeDasharray`/`--i6-len` derivado do comprimento medido de cada linha (`y2 - y1`); disparo único ao entrar na viewport via `IntersectionObserver` (threshold ~0.3, desconecta após disparar). Com `prefers-reduced-motion: reduce` (via `matchMedia` + listener `change`), sem dasharray e sem animação.
- Profundidade no cartão base: `shadow-[inset_0_10px_16px_-12px_hsl(var(--foreground)/0.18)]`, mantendo textos e tipografia atuais.
- Mobile: o SVG fica `hidden md:block`; as faixas empilham como hoje.

Verificação: `npx tsgo --noEmit -p tsconfig.app.json`, build, e Playwright em pt/en/es a 1440px (cada linha vertical com x1 igual a x2 e alinhada ao centro do seu cartão, sem overflow) e 390px (SVG ausente, sem overflow).
