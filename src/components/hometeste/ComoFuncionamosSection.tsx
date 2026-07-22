import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import oracleLogo from '@/assets/logos/oracle.png.asset.json';
import sapLogo from '@/assets/logos/sap.svg.asset.json';
import snowflakeLogo from '@/assets/logos/snowflake.svg.asset.json';
import databricksLogo from '@/assets/logos/databricks.svg.asset.json';
import bigqueryLogo from '@/assets/logos/googlebigquery.svg.asset.json';
import postgresLogo from '@/assets/logos/postgresql.svg.asset.json';
import awsLogo from '@/assets/logos/aws.svg.asset.json';
import mongoLogo from '@/assets/logos/mongodb.svg.asset.json';
import kafkaLogo from '@/assets/logos/apachekafka.svg.asset.json';
import salesforceLogo from '@/assets/logos/salesforce.png.asset.json';
import hubspotLogo from '@/assets/logos/hubspot.svg.asset.json';
import shopifyLogo from '@/assets/logos/shopify.svg.asset.json';
import whatsappLogo from '@/assets/logos/whatsapp.svg.asset.json';
import zendeskLogo from '@/assets/logos/zendesk.svg.asset.json';
import rdstationLogo from '@/assets/logos/rdstation.png.asset.json';
import marketoLogo from '@/assets/logos/marketo.png.asset.json';
import metaLogo from '@/assets/logos/meta.svg.asset.json';

type LogoItem = { name: string; src: string };

const sources: LogoItem[] = [
  { name: 'Oracle', src: oracleLogo.url },
  { name: 'SAP', src: sapLogo.url },
  { name: 'Snowflake', src: snowflakeLogo.url },
  { name: 'Databricks', src: databricksLogo.url },
  { name: 'BigQuery', src: bigqueryLogo.url },
  { name: 'PostgreSQL', src: postgresLogo.url },
  { name: 'AWS S3', src: awsLogo.url },
  { name: 'MongoDB', src: mongoLogo.url },
  { name: 'Kafka', src: kafkaLogo.url },
];

const activations: LogoItem[] = [
  { name: 'Salesforce', src: salesforceLogo.url },
  { name: 'HubSpot', src: hubspotLogo.url },
  { name: 'SAP', src: sapLogo.url },
  { name: 'Shopify', src: shopifyLogo.url },
  { name: 'WhatsApp', src: whatsappLogo.url },
  { name: 'Zendesk', src: zendeskLogo.url },
  { name: 'RD Station', src: rdstationLogo.url },
  { name: 'Marketo', src: marketoLogo.url },
  { name: 'Meta Ads', src: metaLogo.url },
];

const Chip = ({
  item,
  align,
  chipRef,
}: {
  item: LogoItem;
  align: 'left' | 'right';
  chipRef: (el: HTMLDivElement | null) => void;
}) => (
  <div
    ref={chipRef}
    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200 shadow-[0_2px_8px_rgba(15,23,42,0.06)] text-slate-700 text-xs md:text-sm hover:shadow-[0_4px_16px_rgba(244,132,95,0.18)] hover:border-[#F4845F]/40 transition-all ${
      align === 'right' ? 'flex-row-reverse' : ''
    }`}
  >
    <img
      src={item.src}
      alt=""
      loading="lazy"
      className="w-4 h-4 object-contain"
    />
    <span className="font-medium">{item.name}</span>
  </div>
);

const ComoFuncionamosSection = () => {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const card01Ref = useRef<HTMLDivElement | null>(null);
  const card04Ref = useRef<HTMLDivElement | null>(null);
  const sourceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activationRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [leftPaths, setLeftPaths] = useState<string[]>([]);
  const [rightPaths, setRightPaths] = useState<string[]>([]);
  const [leftEnds, setLeftEnds] = useState<{ x: number; y: number }[]>([]);
  const [rightEnds, setRightEnds] = useState<{ x: number; y: number }[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  const recalculate = () => {
    const wrap = wrapperRef.current;
    const c1 = card01Ref.current;
    const c4 = card04Ref.current;
    if (!wrap || !c1 || !c4) return;
    const wr = wrap.getBoundingClientRect();
    setSvgSize({ w: wr.width, h: wr.height });

    const c1r = c1.getBoundingClientRect();
    const c4r = c4.getBoundingClientRect();
    const targetLeft = { x: c1r.left - wr.left, y: c1r.top - wr.top + c1r.height / 2 };
    const targetRight = { x: c4r.right - wr.left, y: c4r.top - wr.top + c4r.height / 2 };

    const lPaths: string[] = [];
    const lEnds: { x: number; y: number }[] = [];
    sourceRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const sx = r.right - wr.left;
      const sy = r.top - wr.top + r.height / 2;
      const tx = targetLeft.x;
      const ty = targetLeft.y;
      const dx = Math.max(60, (tx - sx) * 0.6);
      const c1x = sx + dx;
      const c2x = tx - dx;
      lPaths.push(`M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ty}, ${tx} ${ty}`);
      lEnds.push({ x: sx, y: sy });
    });
    setLeftPaths(lPaths);
    setLeftEnds(lEnds);

    const rPaths: string[] = [];
    const rEnds: { x: number; y: number }[] = [];
    activationRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const sx = r.left - wr.left;
      const sy = r.top - wr.top + r.height / 2;
      const tx = targetRight.x;
      const ty = targetRight.y;
      const dx = Math.max(60, (sx - tx) * 0.6);
      const c1x = tx + dx;
      const c2x = sx - dx;
      rPaths.push(`M ${tx} ${ty} C ${c1x} ${ty}, ${c2x} ${sy}, ${sx} ${sy}`);
      rEnds.push({ x: sx, y: sy });
    });
    setRightPaths(rPaths);
    setRightEnds(rEnds);
  };

  useLayoutEffect(() => {
    recalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    const ro = new ResizeObserver(() => recalculate());
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    window.addEventListener('resize', recalculate);
    // Recalc after webfonts/logos load
    const t = window.setTimeout(recalculate, 300);
    const t2 = window.setTimeout(recalculate, 1200);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recalculate);
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = isPt
    ? {
        badge: 'COMO FUNCIONA',
        titleStart: 'Como transformamos sinais em ',
        titleHighlight: 'decisões acionáveis',
        subtitle:
          'Da leitura do contexto à ativação no canal, combinamos predição, recomendação e execução para antecipar a próxima melhor decisão.',
        sourcesLabel: 'Capturamos de qualquer ecossistema',
        activationLabel: 'Ativamos em qualquer ecossistema',
        steps: [
          { title: 'Captura de sinais', desc: 'Demanda, preço, estoque, comportamento e contexto de mercado.' },
          { title: 'Predição', descBefore: '', highlight: 'Modelos proprietários', descAfter: ' identificam risco, intenção, elasticidade e propensão.' },
          { title: 'Recomendação priorizada', desc: 'A melhor ação por objetivo, canal, cliente, SKU ou praça.' },
          { title: 'Ativação', desc: 'A decisão chega à operação no ecossistema do cliente.' },
        ] as any[],
      }
    : {
        badge: 'HOW IT WORKS',
        titleStart: 'How we turn signals into ',
        titleHighlight: 'actionable decisions',
        subtitle:
          'From reading the context to activating the channel, i6 combines prediction, recommendation and execution to anticipate the next best decision.',
        sourcesLabel: 'We capture from any ecosystem',
        activationLabel: 'We activate in any ecosystem',
        steps: [
          { title: 'Signal capture', desc: 'Demand, price, inventory, behavior and market context.' },
          { title: 'Prediction', descBefore: '', highlight: 'Proprietary models', descAfter: ' identify risk, intent, elasticity and propensity.' },
          { title: 'Prioritized recommendation', desc: 'The best action by objective, channel, customer, SKU or region.' },
          { title: 'Activation', desc: 'The decision reaches operations across the client ecosystem.' },
        ] as any[],
      };

  const stepRefs = [null, card01Ref, null, null, card04Ref];
  const cardRefMap = (i: number) => (i === 0 ? card01Ref : i === 3 ? card04Ref : undefined);

  return (
    <section className="relative bg-[#F5F6FA]">
      {/* Soft top transition from navy hero */}
      <div className="h-10 bg-gradient-to-b from-[#0B1224] to-[#F5F6FA]" />
      {/* Soft bottom transition to navy next section */}

      <div className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4845F]/15 text-[#F4845F] text-xs font-semibold tracking-widest uppercase">
              {copy.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-snug mb-4">
            {copy.titleStart}
            <span className="text-[#F4845F]">{copy.titleHighlight}</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mb-12">
            {copy.subtitle}
          </p>
        </div>

        {/* Desktop — fluid graph */}
        <div className="hidden lg:block container mx-auto px-6 max-w-[1400px]">
          <div ref={wrapperRef} className="relative">
            {/* SVG connectors */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={svgSize.w}
              height={svgSize.h}
              viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
            >
              <defs>
                <linearGradient id="strokeL" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F4845F" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#F4845F" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="strokeR" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F4845F" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#F4845F" stopOpacity="0.15" />
                </linearGradient>
                <filter id="pGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {leftPaths.map((d, i) => (
                <path key={`l-${i}`} id={`path-l-${i}`} d={d} stroke="url(#strokeL)" strokeWidth={1.2} fill="none" />
              ))}
              {rightPaths.map((d, i) => (
                <path key={`r-${i}`} id={`path-r-${i}`} d={d} stroke="url(#strokeR)" strokeWidth={1.2} fill="none" />
              ))}
              {leftEnds.map((p, i) => (
                <circle key={`ld-${i}`} cx={p.x} cy={p.y} r={2.5} fill="#F4845F" />
              ))}
              {rightEnds.map((p, i) => (
                <circle key={`rd-${i}`} cx={p.x} cy={p.y} r={2.5} fill="#F4845F" />
              ))}
              {leftPaths.map((_, i) => (
                <circle key={`lp-${i}`} r={2.2} fill="#F4845F" filter="url(#pGlow)">
                  <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${i * 0.25}s`}>
                    <mpath href={`#path-l-${i}`} />
                  </animateMotion>
                </circle>
              ))}
              {rightPaths.map((_, i) => (
                <circle key={`rp-${i}`} r={2.2} fill="#F4845F" filter="url(#pGlow)">
                  <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${i * 0.22}s`}>
                    <mpath href={`#path-r-${i}`} />
                  </animateMotion>
                </circle>
              ))}
            </svg>

            <div className="relative grid grid-cols-[minmax(170px,210px)_1fr_minmax(170px,210px)] gap-10 items-center">
              {/* LEFT chips — staggered */}
              <div className="relative">
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-400 mb-5">
                  {copy.sourcesLabel}
                </p>
                <div className="flex flex-col gap-2.5">
                  {sources.map((s, i) => (
                    <div
                      key={s.name}
                      style={{
                        marginLeft: `${[0, 14, 28, 20, 6, 0, 10, 24, 18, 4][i] ?? 0}px`,
                      }}
                    >
                      <Chip
                        item={s}
                        align="left"
                        chipRef={(el) => (sourceRefs.current[i] = el)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CENTER — i6 PLATFORM box with 4 cards */}
              <div className="relative rounded-2xl border border-[#F4845F]/30 bg-white/40 backdrop-blur-[2px] shadow-[0_10px_40px_rgba(244,132,95,0.08)] px-4 pt-8 pb-4">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#F5F6FA] border border-[#F4845F]/40 text-[#F4845F] text-[10px] font-bold tracking-[0.22em] uppercase whitespace-nowrap">
                  i6 Platform
                </span>
                <div className="grid grid-cols-4 gap-4">
                  {copy.steps.map((step, i) => {
                    const ref = cardRefMap(i);
                    return (
                      <div
                        key={i}
                        ref={ref as any}
                        className="group relative p-5 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_40px_rgba(244,132,95,0.18)] hover:border-[#F4845F]/50 transition-all duration-300"
                      >
                        <div className="text-4xl font-bold text-[#F4845F] mb-4 leading-none tracking-tight">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-slate-900 text-base font-semibold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {step.desc ?? (
                            <>
                              <span className="font-semibold text-[#F4845F]">{step.highlight}</span>
                              {step.descAfter}
                            </>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>


              {/* RIGHT chips — staggered */}
              <div className="relative">
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-400 mb-5 text-right">
                  {copy.activationLabel}
                </p>
                <div className="flex flex-col gap-2.5 items-end">
                  {activations.map((a, i) => (
                    <div
                      key={a.name}
                      style={{
                        marginRight: `${[0, 14, 28, 20, 6, 0, 10, 24, 18, 4][i] ?? 0}px`,
                      }}
                    >
                      <Chip
                        item={a}
                        align="right"
                        chipRef={(el) => (activationRefs.current[i] = el)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet */}
        <div className="lg:hidden container mx-auto px-6 max-w-6xl space-y-8">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-400 mb-3 text-center">
              {copy.sourcesLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {sources.map((s, i) => (
                <Chip key={s.name} item={s} align="left" chipRef={() => {}} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {copy.steps.map((step, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
              >
                <div className="text-4xl font-bold text-[#F4845F] mb-3 leading-none tracking-tight">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-slate-900 text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.desc ?? (
                    <>
                      <span className="font-semibold text-[#F4845F]">{step.highlight}</span>
                      {step.descAfter}
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-400 mb-3 text-center">
              {copy.activationLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {activations.map((a, i) => (
                <Chip key={a.name} item={a} align="right" chipRef={() => {}} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Soft bottom transition back to navy */}
      <div className="h-10 bg-gradient-to-b from-[#F5F6FA] to-[#0F172A]" />
    </section>
  );
};

export default ComoFuncionamosSection;
