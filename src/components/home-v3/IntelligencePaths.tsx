import { ArrowUpRight, Blocks, Gauge } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath, pickLang } from '@/utils/localizedPath';
import { SUITE_URL } from '@/components/home-v3/product/suiteContent';
import { Link } from 'react-router-dom';

const copyByLang = {
  pt: {
    eyebrow: 'DOIS CAMINHOS, A MESMA INTELIGÊNCIA',
    title: 'Duas formas de transformar inteligência em vantagem',
    description: 'Escolha a velocidade de uma solução pronta ou a liberdade de construir uma experiência única sobre a inteligência da infinity6',
    suite: {
      label: 'i6 Decision Suite',
      title: 'Use a inteligência',
      body: 'Decisões prontas, contratação direta e rápida adoção para transformar resultados do negócio',
      cta: 'Conhecer a Decision Suite',
    },
    builder: {
      label: 'i6 Builder Platform',
      title: 'Construa sobre a inteligência',
      body: 'Motores e capacidades para diferenciar produtos, criar novas experiências e escalar o valor entregue',
      cta: 'Conhecer o i6 Builder',
    },
  },
  en: {
    eyebrow: 'TWO PATHS, THE SAME INTELLIGENCE',
    title: 'Two ways to turn intelligence into advantage',
    description: 'Choose the speed of a ready-to-use solution or the freedom to build a unique experience on infinity6 intelligence',
    suite: {
      label: 'i6 Decision Suite',
      title: 'Use the intelligence',
      body: 'Ready-made decisions, direct contracting and fast adoption to transform business results',
      cta: 'Explore Decision Suite',
    },
    builder: {
      label: 'i6 Builder Platform',
      title: 'Build on the intelligence',
      body: 'Engines and capabilities to differentiate products, create new experiences and scale delivered value',
      cta: 'Explore i6 Builder',
    },
  },
  es: {
    eyebrow: 'DOS CAMINOS, LA MISMA INTELIGENCIA',
    title: 'Dos formas de convertir inteligencia en ventaja',
    description: 'Elige la velocidad de una solución lista para usar o la libertad de construir una experiencia única sobre la inteligencia de infinity6',
    suite: {
      label: 'i6 Decision Suite',
      title: 'Usa la inteligencia',
      body: 'Decisiones listas, contratación directa y rápida adopción para transformar los resultados del negocio',
      cta: 'Conocer Decision Suite',
    },
    builder: {
      label: 'i6 Builder Platform',
      title: 'Construye sobre la inteligencia',
      body: 'Motores y capacidades para diferenciar productos, crear nuevas experiencias y escalar el valor entregado',
      cta: 'Conocer i6 Builder',
    },
  },
};

const IntelligencePaths = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = pickLang(language, copyByLang);

  return (
    <section id="intelligence-paths" className="scroll-mt-24 border-b border-border bg-background py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{copy.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground md:text-[2.6rem]">{copy.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{copy.description}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="sand-card p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-[var(--radius)] bg-primary/10 text-primary">
                <Gauge size={18} aria-hidden />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{copy.suite.label}</p>
            </div>
            <h3 className="mt-7 text-2xl font-semibold text-foreground">{copy.suite.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{copy.suite.body}</p>
            <a href={SUITE_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-70">
              {copy.suite.cta}<ArrowUpRight size={15} aria-hidden />
            </a>
          </article>

          <article className="sand-card p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-[var(--radius)] bg-secondary text-primary">
                <Blocks size={18} aria-hidden />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{copy.builder.label}</p>
            </div>
            <h3 className="mt-7 text-2xl font-semibold text-foreground">{copy.builder.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{copy.builder.body}</p>
            <Link to={localized('/i6-builders')} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-70">
              {copy.builder.cta}<ArrowUpRight size={15} aria-hidden />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default IntelligencePaths;