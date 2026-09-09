import { ArrowRight, Check } from 'lucide-react';
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

/**
 * Faixa escura full-bleed da home: abertura, quatro pilares em linha,
 * faixa dividida com os dois modos de entrega e CTAs alinhados à esquerda.
 */
const BuilderSection = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, copyByLang);
  const modes = pickLang(language, builderCopy).persona.modes;
  const localized = useLocalizedPath();

  return (
    <section id="builder-platform" className="scroll-mt-24 bg-[#0B1224] text-white">
      {/* Abertura + pilares */}
      <div className="container mx-auto px-6 pb-8 pt-14 md:pt-16">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F4845F]">
          {copy.eyebrow}
        </p>
        <h2 className="max-w-3xl text-2xl font-bold leading-[1.15] md:text-3xl lg:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-[15px]">
          {copy.description}
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {copy.pillars.map((pillar) => (
            <div key={pillar.title} className="border-l border-white/20 pl-5">
              <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Faixa dividida: dois modos de entrega */}
      <div className="container mx-auto px-6">
        <div className="grid overflow-hidden border-y border-white/10 lg:grid-cols-2">
          {modes.map((mode, i) => (
            <article
              key={mode.title}
              className={
                i === 0
                  ? 'bg-[#F7F3F0] px-6 py-10 text-[#0B1224] md:px-10 lg:px-12'
                  : 'border-t border-white/10 bg-[#131E38] px-6 py-10 text-white md:px-10 lg:border-l lg:border-t-0 lg:px-12'
              }
            >
              <span className="mb-4 block font-mono text-sm font-bold text-[#F4845F]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold md:text-2xl">{mode.title}</h3>
              <p
                className={`mt-3 max-w-xl text-sm leading-relaxed ${
                  i === 0 ? 'text-[#0B1224]/70' : 'text-white/70'
                }`}
              >
                {mode.desc}
              </p>
              <ul className="mt-6 space-y-3">
                {mode.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[13px] font-medium">
                    <Check size={16} className="mt-0.5 shrink-0 text-[#F4845F]" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>


      {/* CTAs */}
      <div className="container mx-auto px-6 pb-14 pt-8 md:pb-16">
        <div className="flex flex-wrap items-center justify-start gap-3">
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
