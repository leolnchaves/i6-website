import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';

type Line = { x1: number; y1: number; x2: number; y2: number };

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Famílias de modelagem: lista à esquerda (tablist) ligada por uma linha SVG
 * ao quadro de detalhe à direita (tabpanel). A geometria da linha é sempre
 * medida do DOM — as alturas variam entre PT/EN/ES.
 */
const BuilderModels = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).models;
  const cards = copy.cards;

  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(0);
  const [line, setLine] = useState<Line | null>(null);
  const [reduced, setReduced] = useState(prefersReducedMotion);

  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const item = itemRefs.current[active];
    const panel = panelRef.current;
    if (!wrap || !item || !panel) return;
    const w = wrap.getBoundingClientRect();
    const i = item.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    const y = i.top + i.height / 2 - w.top;
    setLine({
      x1: i.right - w.left,
      y1: y,
      x2: p.left - w.left,
      y2: y,
    });
  }, [active]);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [measure, language, cards]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(() => measure());
    if (listRef.current) ro.observe(listRef.current);
    if (panelRef.current) ro.observe(panelRef.current);
    return () => {
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [measure]);

  // Ativação manual: setas movem o foco, Enter/Espaço confirma.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = cards.length - 1;
    let next = focused;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = focused === last ? 0 : focused + 1;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = focused === 0 ? last : focused - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActive(focused);
      return;
    } else return;
    e.preventDefault();
    setFocused(next);
    itemRefs.current[next]?.focus();
  };

  const current = cards[active];
  const length = line ? line.x2 - line.x1 + 40 : 0;

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
        <h2 className="text-[clamp(1.25rem,3.2vw,2.25rem)] leading-[1.12] font-bold text-foreground whitespace-nowrap">{copy.title}</h2>
        <p className="mt-5 text-[clamp(0.75rem,1.4vw,1.125rem)] text-muted-foreground leading-relaxed whitespace-nowrap">{copy.intro}</p>
      </div>

      <div ref={wrapRef} className="relative mt-12 grid gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
        {/* Linha de conexão — apenas em telas médias para cima */}
        {line && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden md:block h-full w-full overflow-visible"
          >
            <line
              key={`${active}-${language}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y1}
              stroke="hsl(var(--primary))"
              strokeWidth="1.25"
              strokeDasharray={reduced ? undefined : length}
              strokeDashoffset={reduced ? undefined : 0}
              style={
                reduced
                  ? undefined
                  : ({ animation: 'i6-draw 520ms ease-out both', '--i6-len': `${length}` } as React.CSSProperties)
              }
            />
            <circle cx={line.x2} cy={line.y1} r="3" fill="hsl(var(--primary))" />
          </svg>
        )}
        <style>{'@keyframes i6-draw{from{stroke-dashoffset:var(--i6-len,600)}to{stroke-dashoffset:0}}'}</style>

        {/* Lista de famílias */}
        <div
          ref={listRef}
          role="tablist"
          aria-orientation="vertical"
          aria-label={copy.pickLabel}
          onKeyDown={onKeyDown}
          className="flex flex-col"
        >
          {cards.map((card, i) => (
            <button
              key={card.name}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              role="tab"
              id={`model-tab-${i}`}
              aria-selected={active === i}
              aria-controls="model-panel"
              tabIndex={focused === i ? 0 : -1}
              onFocus={() => setFocused(i)}
              onClick={() => {
                setActive(i);
                setFocused(i);
              }}
              className={`group relative w-full border-t border-border py-5 pl-5 pr-3 text-left transition-colors last:border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                active === i ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1/2 h-[calc(100%-2rem)] w-[2px] -translate-y-1/2 rounded-full transition-all ${
                  active === i ? 'bg-primary opacity-100' : 'bg-primary/40 opacity-0 group-hover:opacity-60'
                }`}
              />
              {active === i && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-1/2 hidden h-[calc(100%-2rem)] w-[2px] -translate-y-1/2 rounded-full bg-primary md:block"
                />
              )}

              <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-2 block text-base md:text-lg font-semibold leading-snug">{card.name}</span>
            </button>
          ))}
        </div>

        {/* Quadro de detalhe */}
        <div
          ref={panelRef}
          role="tabpanel"
          id="model-panel"
          aria-labelledby={`model-tab-${active}`}
          tabIndex={-1}
          className="sand-card p-6 md:p-8"
        >
          <div key={`${active}-${language}`} className={reduced ? '' : 'animate-fade-in'}>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-snug">{current.name}</h3>
            <p className="mt-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{current.desc}</p>
            <p className="mt-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{current.long}</p>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {copy.outputsLabel}
            </p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {current.outputs.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-foreground/80 leading-snug">
                  <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                  {o}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {copy.enginesLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {current.engines.map((e) => (
                <li
                  key={e}
                  className="rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-medium text-foreground/70"
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderModels;
