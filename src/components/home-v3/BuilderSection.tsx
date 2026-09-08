import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';

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

const BuilderSection = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, copyByLang);
  const localized = useLocalizedPath();

  return (
    <section id="builder-platform" className="scroll-mt-24 container mx-auto px-6 py-20 md:py-28">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">
          {copy.eyebrow}
        </p>
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">
          {copy.title}
        </h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          {copy.description}
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {copy.pillars.map((pillar) => (
          <article key={pillar.title} className="sand-card sand-card-hover p-6">
            <h3 className="text-base font-semibold text-foreground">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          to={localized('/i6-builders')}
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {copy.ctaPrimary}
          <ArrowRight size={16} aria-hidden />
        </Link>
        <Link
          to={localized('/contact')}
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
        >
          {copy.ctaSecondary}
        </Link>
      </div>
    </section>
  );
};

export default BuilderSection;
