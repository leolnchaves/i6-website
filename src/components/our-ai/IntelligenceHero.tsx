import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';
import { SUITE_URL } from '@/components/home-v3/product/suiteContent';
import { useLocalizedPath } from '@/utils/localizedPath';

interface Props {
  content: OurAIContent['hero'];
}

type Connector = { x: number; y1: number; y2: number };

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Abertura tipográfica: distingue esta camada do Builder Platform e da Decision Suite.
 * As duas camadas de cima são ligadas à base ("A inteligência") por duas linhas
 * verticais independentes — geometria sempre medida do DOM.
 */
const IntelligenceHero = memo(({ content }: Props) => {
  const localizedPath = useLocalizedPath();
  const topLayers = content.layers.filter((l) => !l.current);
  const baseLayer = content.layers.find((l) => l.current);

  const wrapRef = useRef<HTMLDivElement>(null);
  const topRefs = useRef<(HTMLLIElement | null)[]>([]);
  const baseRef = useRef<HTMLDivElement>(null);

  const [lines, setLines] = useState<Connector[]>([]);
  const [reduced, setReduced] = useState(prefersReducedMotion);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const base = baseRef.current;
    if (!wrap || !base) return;
    const w = wrap.getBoundingClientRect();
    const b = base.getBoundingClientRect();
    const next: Connector[] = [];
    topRefs.current.forEach((el) => {
      if (!el) return;
      const t = el.getBoundingClientRect();
      const y1 = t.bottom - w.top;
      const y2 = b.top - w.top;
      if (y2 <= y1) return;
      next.push({ x: t.left + t.width / 2 - w.left, y1, y2 });
    });
    setLines(next);
  }, []);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [measure, content.layers]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(() => measure());
    topRefs.current.forEach((el) => el && ro.observe(el));
    if (baseRef.current) ro.observe(baseRef.current);
    return () => {
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [measure]);

  // Traço desenhado uma única vez, ao entrar na viewport.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || drawn) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [drawn]);

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div aria-hidden className="absolute inset-0 sand-glow" />
      <div className="container relative mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl md:text-[3.4rem] font-bold leading-[1.06] text-foreground">
          {content.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">{content.lead}</p>

        {/* Linha vertical da plataforma: hairline coral contínua, do box de cima até a base,
            com o nome a 90° e "respiro" (fundo da página cobre a linha atrás do texto). */}
        <div className="mt-12 flex items-stretch">
          <div aria-hidden className="relative mr-5 hidden w-px shrink-0 bg-primary/60 md:mr-7 lg:block">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 bg-background px-1.5 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary [writing-mode:vertical-rl]">
              i6 Decision Platform
            </span>
          </div>
        <div ref={wrapRef} className="relative min-w-0 flex-1">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden md:block h-full w-full overflow-visible"
          >
            {lines.map((l) => {
              const len = Math.max(1, l.y2 - l.y1);
              return (
                <line
                  key={`${l.x}-${l.y1}-${l.y2}`}
                  x1={l.x}
                  y1={l.y1}
                  x2={l.x}
                  y2={l.y2}
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.25"
                  strokeDasharray={reduced ? undefined : len}
                  strokeDashoffset={reduced || drawn ? 0 : len}
                  style={
                    reduced || !drawn
                      ? undefined
                      : ({ animation: 'i6-draw 520ms ease-out both', '--i6-len': `${len}` } as React.CSSProperties)
                  }
                />
              );
            })}
          </svg>
          <style>{'@keyframes i6-draw{from{stroke-dashoffset:var(--i6-len,600)}to{stroke-dashoffset:0}}'}</style>

          <ul className="grid gap-4 md:grid-cols-2">
            {topLayers.map((layer, i) => {
              const isExternal = i === 0;
              const cardBody = (
                <>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    {layer.name}
                    {isExternal ? (
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <ArrowRight aria-hidden className="h-3.5 w-3.5 text-primary" />
                    )}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.role}</p>
                </>
              );
              return (
                <li
                  key={layer.name}
                  ref={(el) => {
                    topRefs.current[i] = el;
                  }}
                  className="rounded-[var(--radius)] border border-border bg-card transition-colors hover:border-primary/50"
                >
                  {isExternal ? (
                    <a
                      href={SUITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full rounded-[var(--radius)] p-6"
                    >
                      {cardBody}
                    </a>
                  ) : (
                    <Link to={localizedPath('/i6-builders')} className="block h-full rounded-[var(--radius)] p-6">
                      {cardBody}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {baseLayer && (
            <div
              ref={baseRef}
              className="mt-16 overflow-hidden rounded-[var(--radius)] border border-border bg-accent shadow-[inset_0_10px_16px_-12px_hsl(var(--foreground)/0.18)]"
            >
              <div className="p-6 md:p-8">
                <p className="text-sm font-semibold text-accent-foreground">{baseLayer.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{baseLayer.role}</p>

                {/* Mini-índice numerado: cada item é âncora para uma seção da própria página. */}
                <ul className="mt-8 grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
                  {content.indexLinks.map((link, i) => (
                    <li key={link.anchor}>
                      <a
                        href={link.anchor}
                        className="group flex items-center gap-3 border-b border-border py-2.5 transition-colors hover:border-primary"
                      >
                        <span className="font-mono text-[10px] font-medium text-primary">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 text-sm text-muted-foreground transition-colors group-hover:text-accent-foreground">
                          {link.label}
                        </span>
                        <ArrowDown
                          aria-hidden
                          className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-primary"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Faixa de credenciais: números reais, mesma família visual do restante do site. */}
              <div className="border-t border-border bg-foreground/[0.04] px-6 py-4 md:px-8">
                <dl className="flex flex-wrap gap-x-10 gap-y-4">
                  {content.credentials.map((kpi) => (
                    <div key={kpi.label} className="flex flex-col">
                      <dd className="order-2 text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        {kpi.label}
                      </dd>
                      <dt className="order-1 font-mono text-sm font-semibold text-accent-foreground">{kpi.value}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
});

IntelligenceHero.displayName = 'IntelligenceHero';
export default IntelligenceHero;
