import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Check, Sparkles, TrendingUp, User, UserX } from 'lucide-react';
import type { KioskLang } from '@/data/kiosk/config';
import {
  catalogs,
  scenarios,
  uiLabels,
  currency,
  buildArgument,
  type Sku,
  type UserMode,
  type Vertical,
} from '@/data/kiosk/demos/predictivePersonalization';

interface Props {
  lang: KioskLang;
}

type Phase = 'pick' | 'list' | 'training' | 'pdp';

const SkuTile = ({
  sku,
  lang,
  onClick,
  small,
}: {
  sku: Sku;
  lang: KioskLang;
  onClick?: () => void;
  small?: boolean;
}) => {
  const Comp = onClick ? 'button' : 'div';
  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`text-left rounded-xl border-2 transition-all bg-white/[0.03] border-white/10 ${
        onClick ? 'hover:border-[#F4845F]/60 hover:bg-[#F4845F]/[0.06] active:scale-[0.98]' : ''
      } ${small ? 'p-[1.3vmin]' : 'p-[1.6vmin]'}`}
    >
      <div
        className={`${
          small ? 'aspect-[4/5]' : 'aspect-[4/5]'
        } rounded-lg overflow-hidden bg-gradient-to-br from-white/10 to-white/[0.02] mb-[1vmin] flex items-center justify-center`}
      >
        <img
          src={sku.image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <span
        className={`block ${
          small ? 'text-[1.15vmin]' : 'text-[1.3vmin]'
        } uppercase tracking-wider text-[#F4845F]/80 font-semibold mb-[0.3vmin]`}
      >
        {sku.category[lang]}
      </span>
      <span
        className={`block ${
          small ? 'text-[1.5vmin]' : 'text-[1.65vmin]'
        } leading-tight text-white/90 font-semibold ${small ? 'min-h-[3.4vmin]' : 'min-h-[3.8vmin]'}`}
      >
        {sku.name[lang]}
      </span>
      <span
        className={`block ${
          small ? 'text-[1.5vmin]' : 'text-[1.65vmin]'
        } text-white font-bold mt-[0.5vmin]`}
      >
        {currency(sku.price, lang)}
      </span>

    </Comp>
  );
};

const PredictivePersonalizationDemo = ({ lang }: Props) => {
  const t = uiLabels[lang];

  const [userMode, setUserMode] = useState<UserMode>('logged');
  const [vertical, setVertical] = useState<Vertical>('products');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>('list');

  const scenarioKey =
    userMode && vertical ? (`${userMode}-${vertical}` as const) : null;
  const scenario = scenarioKey ? scenarios[scenarioKey] : null;
  const catalog = vertical ? catalogs[vertical] : null;
  const selected = useMemo<Sku | null>(() => {
    if (!catalog || !selectedId) return null;
    return catalog.skus.find((s) => s.id === selectedId) ?? null;
  }, [catalog, selectedId]);

  const containerRef = useRef<HTMLDivElement>(null);
  const pdpRef = useRef<HTMLDivElement>(null);
  const argRef = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  const latencyMs = useMemo(() => {
    if (!selected) return '0.00';
    return (18 + Math.random() * 22).toFixed(2);
  }, [selectedId]);

  // Pipeline animation
  useEffect(() => {
    if (phase !== 'training' || !scenario) return;
    setProgress(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;
    scenario.features.forEach((step, i) => {
      elapsed += step.durationMs;
      timers.push(setTimeout(() => setProgress(i + 1), elapsed));
    });
    // After pipeline, transition to PDP
    timers.push(setTimeout(() => setPhase('pdp'), elapsed + 200));
    return () => timers.forEach(clearTimeout);
  }, [phase, scenario]);

  // Connector line
  useLayoutEffect(() => {
    if (phase !== 'pdp') {
      setLine(null);
      return;
    }
    const measure = () => {
      const c = containerRef.current?.getBoundingClientRect();
      const p = pdpRef.current?.getBoundingClientRect();
      const a = argRef.current?.getBoundingClientRect();
      if (!c || !p || !a) return;
      setLine({
        x1: p.right - c.left,
        y1: p.top + p.height / 2 - c.top,
        x2: a.left - c.left,
        y2: a.top + a.height / 2 - c.top,
      });
    };
    const t = setTimeout(measure, 500);
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (pdpRef.current) ro.observe(pdpRef.current);
    if (argRef.current) ro.observe(argRef.current);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [phase, selectedId]);

  const pickProduct = (id: string) => {
    setSelectedId(id);
    setProgress(0);
    setPhase('training');
  };

  const backToCatalog = () => {
    setSelectedId(null);
    setProgress(0);
    setPhase('list');
  };

  const startScenario = (u: UserMode, v: Vertical) => {
    setUserMode(u);
    setVertical(v);
    setSelectedId(null);
    setProgress(0);
    setPhase('list');
  };

  const scenarioTabs: Array<{ u: UserMode; v: Vertical; icon: JSX.Element; title: string; sub: string }> = [
    { u: 'logged', v: 'products', icon: <User className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" />, title: t.userLogged, sub: t.verticalProducts },
    { u: 'logged', v: 'fashion',  icon: <User className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" />, title: t.userLogged, sub: t.verticalFashion },
    { u: 'anon',   v: 'products', icon: <UserX className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" />, title: t.userAnon,   sub: t.verticalProducts },
    { u: 'anon',   v: 'fashion',  icon: <UserX className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" />, title: t.userAnon,   sub: t.verticalFashion },
  ];

  if (!scenario || !catalog) return null;


  // Recommendations: use recIds from selected; for fashion PDP use lookIds
  const recSkus =
    selected && catalog
      ? (vertical === 'fashion' && selected.lookIds
          ? selected.lookIds
          : selected.recIds
        )
          .map((id) => catalog.skus.find((s) => s.id === id))
          .filter(Boolean) as Sku[]
      : [];

  const lookTotal = recSkus.reduce((acc, s) => acc + s.price, 0) + (selected?.price ?? 0);
  const argumentText = scenario && selected
    ? buildArgument(`${userMode}-${vertical}` as `${UserMode}-${Vertical}`, selected, recSkus, lang)
    : '';




  return (
    <div ref={containerRef} className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      {/* Header */}
      <div className="flex items-center gap-[1.5vmin] mb-[2vmin]">
        <span className="w-[4.5vmin] h-[4.5vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
          <Sparkles className="w-[2.4vmin] h-[2.4vmin] text-[#F4845F]" />
        </span>
        <div>
          <h4 className="text-[2.2vmin] font-bold text-white leading-tight">{t.header}</h4>
          <p className="text-[1.4vmin] text-white/60">{t.headerSubtitle}</p>
        </div>
      </div>

      {/* Scenario tabs — trocar cenário com 1 clique */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[1vmin] mb-[2vmin]">
        {scenarioTabs.map(({ u, v, icon, title, sub }) => {
          const active = userMode === u && vertical === v;
          return (
            <button
              key={`${u}-${v}`}
              type="button"
              onClick={() => startScenario(u, v)}
              className={`text-left rounded-2xl border-2 p-[1.4vmin] transition-all active:scale-[0.98] ${
                active
                  ? 'border-[#F4845F] bg-[#F4845F]/[0.12]'
                  : 'border-white/15 bg-white/[0.03] hover:border-[#F4845F]/60 hover:bg-[#F4845F]/[0.06]'
              }`}
            >
              <div className="flex items-center gap-[1vmin]">
                <span className="w-[3.6vmin] h-[3.6vmin] rounded-lg bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center flex-shrink-0">
                  {icon}
                </span>
                <div className="min-w-0">
                  <span className="block text-[1.55vmin] font-bold text-white leading-tight truncate">{title}</span>
                  <span className="block text-[1.3vmin] text-white/60 leading-tight truncate">{sub}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Objetivo do cenário ativo */}
      <div className="flex flex-wrap items-center gap-[1vmin] mb-[2vmin]">
        <span className="inline-flex items-center gap-[0.8vmin] px-[1.4vmin] py-[0.6vmin] rounded-full bg-[#F4845F]/15 border border-[#F4845F]/40 text-[1.4vmin] font-semibold text-[#F4845F]">
          {t.objectiveLabel}: {scenario.objective[lang]}
        </span>
      </div>


      <div className="grid grid-cols-2 gap-[3vmin] items-stretch">
        {/* LEFT: e-commerce (list OR pdp) */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col h-full">
          {/* Fake browser bar */}
          <div className="flex items-center gap-[1vmin] px-[2vmin] py-[1.5vmin] bg-white/[0.04] border-b border-white/10">
            <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#ff5f56]" />
            <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#ffbd2e]" />
            <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#27c93f]" />
            <span className="ml-[1.5vmin] text-[1.4vmin] text-white/50 font-mono">
              vivashop.io / {vertical}
            </span>
          </div>

          <div className="p-[2vmin] flex-1 flex flex-col">
            {phase === 'list' && (
              <>
                <div className="flex items-baseline justify-between mb-[1.5vmin]">
                  <div>
                    <h5 className="text-[2vmin] font-bold text-white">{catalog.title[lang]}</h5>
                    <p className="text-[1.4vmin] text-white/60">{catalog.subtitle[lang]}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-[1.2vmin]">
                  {catalog.skus.slice(0, 6).map((sku) => (
                    <SkuTile key={sku.id} sku={sku} lang={lang} onClick={() => pickProduct(sku.id)} small />
                  ))}
                </div>
              </>
            )}

            {(phase === 'training' || phase === 'pdp') && selected && (
              <div className="flex flex-col animate-fade-in">
                <button
                  type="button"
                  onClick={backToCatalog}
                  className="self-start inline-flex items-center gap-[1vmin] min-h-[7vmin] px-[2.5vmin] py-[1.6vmin] rounded-full border border-white/25 bg-white/[0.04] text-[1.6vmin] text-white/85 hover:text-white hover:border-[#F4845F]/70 hover:bg-[#F4845F]/[0.08] active:scale-[0.98] transition mb-[1.5vmin]"
                >
                  {t.backToCatalog}
                </button>

                {vertical === 'fashion' && phase === 'pdp' ? (
                  <>
                    {/* Fashion: âncora + look complementar unificado lado a lado */}
                    <div ref={pdpRef} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.7fr)] gap-[1.2vmin] items-stretch animate-fade-in">
                      {/* Anchor product — vertical, mais estreito e mais alto */}
                      <div className="rounded-2xl border-2 border-[#F4845F]/40 bg-white/[0.03] p-[1.4vmin] flex flex-col">
                        <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-white/[0.02] mb-[1vmin]">
                          <img src={selected.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="block text-[1.15vmin] uppercase tracking-wider text-[#F4845F]/80 font-semibold mb-[0.2vmin]">
                          {selected.category[lang]}
                        </span>
                        <h5 className="text-[1.7vmin] leading-tight text-white font-bold mb-[0.4vmin]">
                          {selected.name[lang]}
                        </h5>
                        <span
                          className="block text-[2vmin] font-bold text-white leading-none mt-auto"
                          style={{ textShadow: '0 0 20px rgba(244,132,95,0.4)' }}
                        >
                          {currency(selected.price, lang)}
                        </span>
                      </div>

                      {/* Unified look card — itens em linha (thumb • descrição • preço) */}
                      <div className="rounded-2xl border-2 border-[#F4845F]/40 bg-[#F4845F]/[0.06] p-[1.4vmin] flex flex-col">
                        <div className="flex items-center justify-between mb-[1vmin]">
                          <span className="text-[1.35vmin] tracking-[0.22em] uppercase font-semibold text-[#F4845F]">
                            {t.lookTitle}
                          </span>
                          <span className="text-[1.2vmin] text-white/50">{t.tapToExplore}</span>
                        </div>
                        <div className="flex flex-col gap-[0.6vmin] flex-1">
                          {recSkus.slice(0, 3).map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => pickProduct(s.id)}
                              className="w-full flex items-center gap-[1.2vmin] rounded-lg p-[0.8vmin] transition-all hover:bg-white/[0.05] active:scale-[0.99] text-left"
                            >
                              <div className="w-[7vmin] h-[7vmin] flex-shrink-0 rounded-md overflow-hidden bg-gradient-to-br from-white/10 to-white/[0.02]">
                                <img src={s.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <span className="flex-1 min-w-0 text-[1.5vmin] leading-tight text-white/90 font-semibold truncate">
                                {s.name[lang]}
                              </span>
                              <span className="flex-shrink-0 text-[1.6vmin] text-white font-bold tabular-nums">
                                {currency(s.price, lang)}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Total dentro do quadro */}
                        <div className="mt-[1vmin] pt-[1vmin] border-t border-white/10 flex items-center justify-between">
                          <span className="text-[1.4vmin] text-white/80">{t.lookTotal}</span>
                          <span className="text-[1.9vmin] font-bold text-white tabular-nums">{currency(lookTotal, lang)}</span>
                        </div>
                      </div>
                    </div>
                  </>

                ) : (
                  <>
                    {/* Selected product hero (não-fashion, ou fashion durante training) */}
                    <div className="rounded-2xl border-2 border-[#F4845F]/40 bg-white/[0.03] p-[1.6vmin]">
                      <div className="flex gap-[1.5vmin] items-center">
                        <div className="w-[14vmin] h-[14vmin] flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-white/[0.02]">
                          <img src={selected.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-[1.2vmin] uppercase tracking-wider text-[#F4845F]/80 font-semibold mb-[0.2vmin]">
                            {selected.category[lang]}
                          </span>
                          <h5 className="text-[2vmin] leading-tight text-white font-bold mb-[0.4vmin]">
                            {selected.name[lang]}
                          </h5>
                          <span
                            className="block text-[2.4vmin] font-bold text-white leading-none"
                            style={{ textShadow: '0 0 20px rgba(244,132,95,0.4)' }}
                          >
                            {currency(selected.price, lang)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {phase === 'pdp' && (
                      <div ref={pdpRef} className="mt-[1.5vmin] animate-fade-in">
                        <div className="flex items-center justify-between mb-[0.8vmin]">
                          <span className="text-[1.35vmin] tracking-[0.22em] uppercase font-semibold text-[#F4845F]">
                            {t.recsTitle}
                          </span>
                          <span className="text-[1.2vmin] text-white/50">{t.tapToExplore}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-[1vmin]">
                          {recSkus.slice(0, 4).map((s) => (
                            <SkuTile key={s.id} sku={s} lang={lang} onClick={() => pickProduct(s.id)} small />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {phase === 'pdp' && (
                  <div className="grid grid-cols-3 gap-[1vmin] mt-[1.5vmin] animate-fade-in">
                    <MetricPill
                      label={t.kpiTicketUplift}
                      value={kpiPreset.uplift}
                      highlight
                      trend="up"
                    />
                    <MetricPill
                      label={t.kpiCrossSell}
                      value={`${kpiPreset.crossSell}%`}
                    />
                    <MetricPill
                      label={t.kpiConfidence}
                      value={`${kpiPreset.confidence}%`}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: reasoning */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2vmin] flex flex-col h-full">
          <div className="flex items-center gap-[1.2vmin] mb-[1.2vmin]">
            <span className="w-[4.2vmin] h-[4.2vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
              <Sparkles className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" />
            </span>
            <div>
              <h4 className="text-[1.9vmin] font-bold text-white leading-tight">{t.reasoningTitle}</h4>
              <p className="text-[1.35vmin] text-white/60">{t.reasoningSubtitle}</p>
            </div>
          </div>

          {phase === 'list' ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-[3vmin]">
              <div className="w-[8vmin] h-[8vmin] rounded-full border-2 border-dashed border-[#F4845F]/40 flex items-center justify-center mb-[1.5vmin]">
                <Sparkles className="w-[3.4vmin] h-[3.4vmin] text-[#F4845F]/60" />
              </div>
              <p className="text-[1.8vmin] font-semibold text-white/80 mb-[0.4vmin]">
                {t.reasoningIdle}
              </p>
              <p className="text-[1.4vmin] text-white/50 max-w-[36vmin]">{t.reasoningIdleHint}</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-[0.8vmin]">
                {scenario.features.map((step, i) => {
                  const state = i < progress ? 'done' : i === progress ? 'active' : 'idle';
                  return (
                    <div
                      key={i}
                      className={`rounded-xl border p-[1.1vmin] transition-all ${
                        state === 'active'
                          ? 'border-[#F4845F] bg-[#F4845F]/10'
                          : state === 'done'
                          ? 'border-white/20 bg-white/[0.04]'
                          : 'border-white/10 bg-white/[0.02] opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-[1.2vmin] mb-[0.4vmin]">
                        <span
                          className={`flex-shrink-0 w-[2.2vmin] h-[2.2vmin] rounded-full flex items-center justify-center text-[1.2vmin] font-bold border-2 ${
                            state === 'done'
                              ? 'bg-[#F4845F] border-[#F4845F] text-white'
                              : state === 'active'
                              ? 'border-[#F4845F] text-[#F4845F]'
                              : 'border-white/30 text-white/50'
                          }`}
                        >
                          {state === 'done' ? <Check className="w-[1.3vmin] h-[1.3vmin]" /> : i + 1}
                        </span>
                        <span className="text-[1.5vmin] leading-tight text-white/90 font-semibold">
                          {step.label[lang]}
                        </span>
                      </div>
                      <div className="pl-[3.4vmin]">
                        <p className="text-[1.2vmin] text-white/60 font-mono mb-[0.3vmin]">
                          {step.microMetric[lang]}
                        </p>
                        {state === 'active' && (
                          <div className="h-[0.35vmin] rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-[#F4845F] animate-[kiosk-progress_var(--dur)_linear_forwards]"
                              style={{ ['--dur' as string]: `${step.durationMs}ms` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {phase === 'pdp' && selected && (
                <div
                  ref={argRef}
                  className="kiosk-insight-card relative mt-[1.4vmin] rounded-2xl border-2 border-[#F4845F]/70 bg-[#F4845F]/[0.10] p-[1.6vmin] pr-[9vmin] animate-fade-in"
                >
                  <div className="absolute top-[1.2vmin] right-[1.2vmin] flex items-center gap-[0.5vmin] px-[1vmin] py-[0.4vmin] rounded-full bg-[#F4845F] text-white text-[1.1vmin] font-bold uppercase tracking-[0.18em] shadow-[0_0_16px_rgba(244,132,95,0.6)]">
                    <Sparkles className="w-[1.4vmin] h-[1.4vmin] kiosk-insight-sparkle" strokeWidth={2.5} />
                    <span>Insight</span>
                  </div>
                  <span className="block text-[1.3vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.8vmin]">
                    {t.rationaleLabel}
                  </span>
                  <p className="text-[1.55vmin] leading-relaxed text-white/95 mb-[1vmin]">
                    {argumentText}
                  </p>
                  <div className="flex items-center gap-[1vmin] text-[1.25vmin] text-white/70">
                    <span className="inline-flex items-center gap-[0.5vmin] px-[1vmin] py-[0.3vmin] rounded-full bg-white/[0.06] border border-white/15 font-mono">
                      {t.latencyLabel}: {latencyMs} ms
                    </span>
                    <span className="text-white/50">· {t.latencyHint}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Connector line: PDP → argument */}
      {line && (
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full"
          style={{ overflow: 'visible' }}
          aria-hidden="true"
        >
          <path
            d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
            fill="none"
            stroke="#F4845F"
            strokeOpacity={0.9}
            strokeWidth={1.5}
            strokeDasharray="6 6"
            style={{ filter: 'drop-shadow(0 0 6px rgba(244,132,95,0.7))' }}
            className="kiosk-connector-path"
          />
          <circle cx={line.x1} cy={line.y1} r={4} fill="#F4845F" className="kiosk-connector-dot" />
          <circle cx={line.x2} cy={line.y2} r={4} fill="#F4845F" className="kiosk-connector-dot" />
        </svg>
      )}
    </div>
  );
};

export default PredictivePersonalizationDemo;
