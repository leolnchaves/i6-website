import { useEffect, useMemo, useState } from 'react';
import { Check, Sparkles, TrendingUp, User, UserX } from 'lucide-react';
import { kioskContent, type KioskLang } from '@/data/kiosk/config';
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

const KPI_PRESETS: Record<`${UserMode}-${Vertical}`, { uplift: string; crossSell: number; confidence: number }> = {
  'logged-products': { uplift: '+1.6×', crossSell: 72, confidence: 92 },
  'logged-fashion':  { uplift: '+1.8×', crossSell: 74, confidence: 90 },
  'anon-products':   { uplift: '+1.3×', crossSell: 58, confidence: 78 },
  'anon-fashion':    { uplift: '+1.4×', crossSell: 61, confidence: 76 },
};

const MetricPill = ({
  label,
  value,
  highlight,
  trend,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  trend?: 'up' | 'down';
}) => (
  <div
    className={`rounded-lg border px-[1.8vmin] py-[1.5vmin] ${
      highlight ? 'border-[#F4845F]/50 bg-[#F4845F]/10' : 'border-white/10 bg-white/[0.03]'
    }`}
  >
    <span className="block text-[1.25vmin] tracking-[0.2em] uppercase font-semibold text-white/55 mb-[0.6vmin]">
      {label}
    </span>
    <span className={`inline-flex items-center gap-[0.5vmin] text-[2.4vmin] font-bold ${highlight ? 'text-[#F4845F]' : 'text-white'}`}>
      {trend === 'up' && <TrendingUp className="w-[2vmin] h-[2vmin]" />}
      {value}
    </span>
  </div>
);

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
      } ${small ? 'p-[1.1vmin]' : 'p-[1.6vmin]'}`}
    >
      <div className="aspect-[16/14] rounded-lg overflow-hidden bg-gradient-to-br from-white/10 to-white/[0.02] mb-[1vmin] flex items-center justify-center">
        <img src={sku.image} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>
      <span
        className={`block ${small ? 'text-[1.05vmin]' : 'text-[1.3vmin]'} uppercase tracking-wider text-[#F4845F]/80 font-semibold mb-[0.3vmin]`}
      >
        {sku.category[lang]}
      </span>
      <span
        className={`block ${small ? 'text-[1.35vmin]' : 'text-[1.65vmin]'} leading-tight text-white/90 font-semibold ${small ? 'min-h-[3vmin]' : 'min-h-[3.8vmin]'}`}
      >
        {sku.name[lang]}
      </span>
      <span
        className={`block ${small ? 'text-[1.4vmin]' : 'text-[1.65vmin]'} text-white font-bold mt-[0.5vmin]`}
      >
        {currency(sku.price, lang)}
      </span>
    </Comp>
  );
};

const PredictivePersonalizationDemo = ({ lang }: Props) => {
  const t = uiLabels[lang];
  const results = kioskContent[lang].results;

  const [userMode, setUserMode] = useState<UserMode>('logged');
  const [vertical, setVertical] = useState<Vertical>('products');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>('list');

  const scenarioKey = `${userMode}-${vertical}` as const;
  const scenario = scenarios[scenarioKey];
  const catalog = catalogs[vertical];
  const selected = useMemo<Sku | null>(() => {
    if (!catalog || !selectedId) return null;
    return catalog.skus.find((s) => s.id === selectedId) ?? null;
  }, [catalog, selectedId]);

  const latencyMs = useMemo(() => {
    if (!selected) return '0.00';
    return (18 + Math.random() * 22).toFixed(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  useEffect(() => {
    if (phase !== 'training' || !scenario) return;
    setProgress(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;
    scenario.features.forEach((step, i) => {
      elapsed += step.durationMs;
      timers.push(setTimeout(() => setProgress(i + 1), elapsed));
    });
    timers.push(setTimeout(() => setPhase('pdp'), elapsed + 200));
    return () => timers.forEach(clearTimeout);
  }, [phase, scenario]);

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

  if (!scenario || !catalog) return null;

  const recSkus =
    selected
      ? (vertical === 'fashion' && selected.lookIds ? selected.lookIds : selected.recIds)
          .map((id) => catalog.skus.find((s) => s.id === id))
          .filter(Boolean) as Sku[]
      : [];

  const lookTotal = recSkus.reduce((acc, s) => acc + s.price, 0) + (selected?.price ?? 0);
  const argumentText = selected ? buildArgument(scenarioKey, selected, recSkus, lang) : '';
  const kpiPreset = KPI_PRESETS[scenarioKey];

  // 2×2 matrix rows: [vertical][userMode]
  const rows: Array<{ v: Vertical; label: string }> = [
    { v: 'fashion',  label: results.matrixFashion },
    { v: 'products', label: results.matrixProducts },
  ];
  const cols: Array<{ u: UserMode; label: string; icon: JSX.Element }> = [
    { u: 'anon',   label: t.userAnon,   icon: <UserX className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" /> },
    { u: 'logged', label: t.userLogged, icon: <User  className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" /> },
  ];

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      {/* Header */}
      <div className="flex items-center gap-[1.5vmin] mb-[2vmin]">
        <div>
          <h4 className="text-[2.2vmin] font-bold text-white leading-tight">{t.header}</h4>
          <p className="text-[1.4vmin] text-white/60">{t.headerSubtitle}</p>
        </div>
      </div>

      {/* Vertical rows with user-mode buttons */}
      <span className="block text-[1.6vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[1.2vmin]">
        {lang === 'pt' ? 'SELECIONE UMA CATEGORIA E TIPO DE CLIENTE' : 'SELECT A CATEGORY AND CUSTOMER TYPE'}
      </span>
      <div className="mb-[1.5vmin] grid grid-cols-2 gap-[1vmin]">
        {rows.map((r) => {
          const isFashion = r.v === 'fashion';
          const rowClass = isFashion
            ? 'border border-[#F4845F]/25 border-l-4 border-l-[#F4845F] bg-[#F4845F]/[0.06]'
            : 'border border-sky-400/20 border-l-4 border-l-sky-400/70 bg-sky-400/[0.05]';
          const labelClass = isFashion ? 'text-[#F4845F]' : 'text-sky-300';
          return (
            <div
              key={`row-${r.v}`}
              className={`grid grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)] gap-[0.8vmin] items-stretch rounded-xl px-[1.4vmin] py-[0.9vmin] ${rowClass}`}
            >
              <span className={`flex items-center text-[1.6vmin] tracking-[0.2em] uppercase font-bold ${labelClass}`}>
                {r.label}
              </span>
              {cols.map((c) => {
                const active = userMode === c.u && vertical === r.v;
                return (
                  <button
                    key={`${r.v}-${c.u}`}
                    type="button"
                    onClick={() => startScenario(c.u, r.v)}
                    className={`min-h-[5vmin] rounded-xl border-2 px-[1vmin] py-[0.5vmin] text-left transition-all active:scale-[0.98] ${
                      active
                        ? isFashion
                          ? 'border-[#F4845F] bg-[#F4845F]/[0.14]'
                          : 'border-sky-400 bg-sky-400/[0.14]'
                        : isFashion
                        ? 'border-white/15 bg-white/[0.03] hover:border-[#F4845F]/60 hover:bg-[#F4845F]/[0.06]'
                        : 'border-white/15 bg-white/[0.03] hover:border-sky-400/60 hover:bg-sky-400/[0.06]'
                    }`}
                  >
                    <span className="text-[1.5vmin] font-normal text-white leading-tight">{c.label}</span>
                  </button>

                );
              })}
            </div>
          );
        })}
      </div>




      {/* STACKED: top = store, bottom = reasoning */}
      <div className="flex flex-col gap-[2vmin]">
        {/* TOP: e-commerce (list OR pdp) */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden">




          <div className="p-[2vmin]">
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


                {vertical === 'fashion' && phase === 'pdp' ? (
                  <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.7fr)] gap-[1.2vmin] items-stretch animate-fade-in">
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
                            className="w-full flex items-center gap-[1.4vmin] rounded-lg p-[0.8vmin] transition-all hover:bg-white/[0.05] active:scale-[0.99] text-left"
                          >
                            <div className="w-[11vmin] h-[11vmin] flex-shrink-0 rounded-md overflow-hidden bg-gradient-to-br from-white/10 to-white/[0.02]">
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
                      <div className="mt-[1vmin] pt-[1vmin] border-t border-white/10 flex items-center justify-between">
                        <span className="text-[1.4vmin] text-white/80">{t.lookTotal}</span>
                        <span className="text-[1.9vmin] font-bold text-white tabular-nums">{currency(lookTotal, lang)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
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
                      <div className="mt-[1.5vmin] animate-fade-in">
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
                  <div className="grid grid-cols-4 gap-[1vmin] mt-[1.5vmin] animate-fade-in items-stretch">
                    <button
                      type="button"
                      onClick={backToCatalog}
                      className="inline-flex items-center justify-center gap-[1vmin] px-[1.5vmin] py-[1.8vmin] rounded-xl border border-white/25 bg-white/[0.04] text-[1.7vmin] font-semibold text-white/85 hover:text-white hover:border-[#F4845F]/70 hover:bg-[#F4845F]/[0.08] active:scale-[0.98] transition"
                    >
                      {t.backToCatalog}
                    </button>
                    <MetricPill label={t.kpiTicketUplift} value={kpiPreset.uplift} highlight trend="up" />
                    <MetricPill label={t.kpiCrossSell} value={`${kpiPreset.crossSell}%`} />
                    <MetricPill label={t.kpiConfidence} value={`${kpiPreset.confidence}%`} />
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

        {/* BOTTOM: reasoning as horizontal timeline + compact insight */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2vmin]">
          <div className="flex items-center gap-[1.2vmin] mb-[1.4vmin]">
            <div>
              <h4 className="text-[1.9vmin] font-bold text-white leading-tight">{t.reasoningTitle}</h4>
              <p className="text-[1.35vmin] text-white/60">{t.reasoningSubtitle}</p>
            </div>
          </div>

          {phase === 'list' ? (
            <div className="flex items-center justify-center gap-[1.5vmin] py-[2vmin] text-center">
              <div className="w-[5vmin] h-[5vmin] rounded-full border-2 border-dashed border-[#F4845F]/40 flex items-center justify-center">
                <Sparkles className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]/60" />
              </div>
              <div className="text-left">
                <p className="text-[1.7vmin] font-semibold text-white/80">{t.reasoningIdle}</p>
                <p className="text-[1.3vmin] text-white/50">{t.reasoningIdleHint}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Compact POR QUE above timeline */}
              {phase === 'pdp' && selected && (
                <div className="mb-[1.4vmin] rounded-xl border-2 border-[#F4845F]/60 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.8vmin] animate-fade-in">
                  <div className="flex items-center gap-[1vmin] mb-[0.8vmin]">
                    <Sparkles className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" strokeWidth={2.5} />
                    <span className="text-[1.7vmin] tracking-[0.25em] uppercase font-bold text-[#F4845F]">
                      {t.rationaleLabel}
                    </span>
                    <span className="ml-auto text-[1.15vmin] text-white/60 font-mono">
                      {t.latencyLabel}: {latencyMs} ms
                    </span>
                  </div>
                  <p className="text-[2vmin] leading-relaxed text-white/95">{argumentText}</p>
                </div>
              )}

              {/* Micro-metric of active step */}
              <div className="h-[2vmin] mb-[1vmin] flex items-center justify-center">
                {progress < scenario.features.length && (
                  <span className="text-[1.2vmin] text-white/60 font-mono">
                    {scenario.features[progress].microMetric[lang]}
                  </span>
                )}
              </div>

              {/* Horizontal timeline */}
              <div className="relative px-[2vmin] pb-[1vmin]">
                <div className="absolute left-[3vmin] right-[3vmin] top-[1.9vmin] h-[0.3vmin] rounded-full bg-white/10" />
                <div
                  className="absolute left-[3vmin] top-[1.9vmin] h-[0.3vmin] rounded-full bg-[#F4845F] transition-all duration-500"
                  style={{
                    width: `calc((100% - 6vmin) * ${
                      scenario.features.length > 1
                        ? Math.min(progress, scenario.features.length - 1) / (scenario.features.length - 1)
                        : 0
                    })`,
                  }}
                />
                <div className="relative grid" style={{ gridTemplateColumns: `repeat(${scenario.features.length}, minmax(0,1fr))` }}>
                  {scenario.features.map((step, i) => {
                    const state = i < progress ? 'done' : i === progress ? 'active' : 'idle';
                    return (
                      <div key={i} className="flex flex-col items-center gap-[0.8vmin] px-[0.5vmin]">
                        <span
                          className={`flex-shrink-0 w-[3.8vmin] h-[3.8vmin] rounded-full flex items-center justify-center text-[1.5vmin] font-bold border-2 transition-all ${
                            state === 'done'
                              ? 'bg-[#F4845F] border-[#F4845F] text-white'
                              : state === 'active'
                              ? 'border-[#F4845F] text-[#F4845F] bg-[#F4845F]/15 animate-pulse'
                              : 'border-white/25 text-white/50 bg-[#0B1224]'
                          }`}
                        >
                          {state === 'done' ? <Check className="w-[1.8vmin] h-[1.8vmin]" /> : i + 1}
                        </span>
                        <span
                          className={`text-center text-[1.3vmin] leading-tight font-semibold ${
                            state === 'idle' ? 'text-white/45' : 'text-white/90'
                          }`}
                        >
                          {step.label[lang]}
                        </span>
                        <span
                          className={`text-center text-[1.1vmin] leading-tight font-mono ${
                            state === 'idle' ? 'text-white/30' : 'text-white/55'
                          }`}
                        >
                          {step.microMetric[lang]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictivePersonalizationDemo;
