import { ArrowRight, Zap, TerminalSquare, Network, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';

const copyByLang = {
  pt: {
    eyebrow: 'i6 Builder Platform',
    title: 'Construa sobre a inteligência da infinity6',
    description:
      'Engines preditivos, SDKs e toolkits para times de tecnologia embutirem capacidade de decisão dentro do próprio produto — sem construir a fundação de IA do zero',
    pillars: [
      { title: 'Engines preditivos', body: 'Recomendação, previsão, propensão e precificação disponíveis como capacidade de produto' },
      { title: 'SDKs e API', body: 'Integração progressiva por módulo, no seu stack e no seu ritmo de release' },
      { title: 'Toolkits de modelagem', body: 'Capacidade de modelagens proprietárias para criar experiências que só o seu produto entrega' },
      { title: 'Governança e explicabilidade', body: 'Cada decisão rastreável, com explicabilidade nativa e controle de versão de modelo' },
    ],
    ctaPrimary: 'Construir com o i6 Builder',
    ctaSecondary: 'Falar com especialista',
  },
  en: {
    eyebrow: 'i6 Builder Platform',
    title: 'Build on infinity6 intelligence',
    description:
      'Predictive engines, SDKs and toolkits for technology teams to embed decision capability inside their own product — without building the AI foundation from scratch',
    pillars: [
      { title: 'Predictive engines', body: 'Recommendation, forecasting, propensity and pricing available as product capability' },
      { title: 'SDKs and API', body: 'Progressive module-by-module integration, in your stack and at your release pace' },
      { title: 'Modeling toolkits', body: 'Proprietary modeling capabilities to create experiences only your product delivers' },
      { title: 'Governance and explainability', body: 'Every decision traceable, with native explainability and model versioning' },
    ],
    ctaPrimary: 'Build with i6 Builder',
    ctaSecondary: 'Talk to an expert',
  },
  es: {
    eyebrow: 'i6 Builder Platform',
    title: 'Construye sobre la inteligencia de infinity6',
    description:
      'Engines predictivos, SDKs y toolkits para que los equipos de tecnología integren capacidad de decisión dentro de su propio producto — sin construir la fundación de IA desde cero',
    pillars: [
      { title: 'Engines predictivos', body: 'Recomendación, pronóstico, propensión y precios disponibles como capacidad de producto' },
      { title: 'SDKs y API', body: 'Integración progresiva por módulo, en tu stack y a tu ritmo de release' },
      { title: 'Toolkits de modelado', body: 'Capacidad de modelados propietarios para crear experiencias que solo tu producto entrega' },
      { title: 'Gobernanza y explicabilidad', body: 'Cada decisión rastreable, con explicabilidad nativa y control de versión de modelo' },
    ],
    ctaPrimary: 'Construir con el i6 Builder',
    ctaSecondary: 'Hablar con un especialista',
  },
};

const pillarIcons = [Zap, TerminalSquare, Network, ShieldCheck];

/**
 * Faixa escura da home: abertura à esquerda, dois modos de uso empilhados
 * (Embedded/OEM e Novo Produto) e quatro pilares em grade 2x2 com ícones.
 */
const BuilderSection = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, copyByLang);
  const modes = pickLang(language, builderCopy).persona.modes;
  const localized = useLocalizedPath();

  return (
    <section id="builder-platform" className="scroll-mt-24 px-6 py-10 md:py-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#0B1224] p-8 text-white md:p-10 lg:p-12">
        {/* Decoração: gradiente coral à direita + brilho difuso */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#F4845F]/5 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#F4845F]/10 blur-[100px]" aria-hidden />

        {/* Abertura */}
        <div className="relative z-10 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F4845F]">
            {copy.eyebrow}
          </p>
          <h2 className="text-2xl font-bold leading-[1.15] md:text-3xl lg:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-[15px]">
            {copy.description}
          </p>
        </div>

        {/* Corpo: modos à esquerda, pilares à direita */}
        <div className="relative z-10 mt-7 grid gap-6 lg:grid-cols-12 lg:items-center">
          {/* Modos de uso */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {modes.map((mode, i) => (
              <article
                key={mode.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-[#F4845F]/50 md:p-6"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-xl font-bold text-[#F4845F]/50 transition-colors group-hover:text-[#F4845F]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{mode.title}</h3>
                </div>
                <ul className="space-y-2 text-[13px] text-slate-400">
                  {mode.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F4845F]" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Pilares em grade 2x2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {copy.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i];
              return (
                <article
                  key={pillar.title}
                  className="flex flex-col justify-center rounded-3xl border border-white/5 bg-white/[0.03] p-5"
                >
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                      i === 0
                        ? 'bg-gradient-to-br from-[#F4845F] to-[#d46d4a]'
                        : 'bg-white/10'
                    }`}
                  >
                    <Icon size={20} className={i === 0 ? 'text-white' : 'text-[#F4845F]'} aria-hidden />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{pillar.title}</h4>
                  <p className="mt-1.5 text-xs leading-snug text-slate-500">
                    {pillar.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div className="relative z-10 mt-7 flex flex-wrap items-center gap-3">
          <Link
            to={localized('/i6-builders')}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#F4845F] px-7 py-3.5 text-sm font-bold text-[#0B1224] transition-all hover:-translate-y-0.5 hover:bg-[#ff9675]"
          >
            {copy.ctaPrimary}
            <ArrowRight size={16} aria-hidden />
          </Link>
          <Link
            to={localized('/contact')}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/50"
          >
            {copy.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BuilderSection;
