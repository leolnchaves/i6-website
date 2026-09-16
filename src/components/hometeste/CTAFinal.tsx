import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SUITE_URL } from '@/components/home-v3/product/suiteContent';

const ctaCopy = {
  pt: {
    eyebrow: 'Próximo passo',
    title: 'Qual será a próxima decisão que sua empresa vai antecipar?',
    description: 'Escolha como avançar com a inteligência da infinity6',
    contact: 'Falar com o time técnico',
    suite: 'Conhecer o i6 Decision Suite',
    builders: 'Construir com a i6 Builder Platform',
  },
  en: {
    eyebrow: 'Next step',
    title: 'What decision will your company anticipate next?',
    description: 'Choose how to move forward with infinity6 intelligence',
    contact: 'Talk to the technical team',
    suite: 'Explore the i6 Decision Suite',
    builders: 'Build with the i6 Builder Platform',
  },
  es: {
    eyebrow: 'Próximo paso',
    title: '¿Cuál será la próxima decisión que anticipará su empresa?',
    description: 'Elija cómo avanzar con la inteligencia de infinity6',
    contact: 'Hablar con el equipo técnico',
    suite: 'Conocer i6 Decision Suite',
    builders: 'Construir con i6 Builder Platform',
  },
} as const;

const CTAFinal = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = ctaCopy[language] ?? ctaCopy.en;

  return (
    <section className="theme-sand bg-background px-4 py-12 sm:px-6 md:py-20" aria-labelledby="success-stories-cta-title">
      <div className="container mx-auto max-w-6xl px-0">
        <div className="sand-glow relative overflow-hidden rounded-[2rem] border border-primary/15 bg-accent px-6 py-10 shadow-sm sm:px-10 md:rounded-[2.5rem] md:px-16 md:py-16">
          <div className="relative z-10">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              {copy.eyebrow}
            </p>
            <h2 id="success-stories-cta-title" className="text-3xl font-bold leading-[1.12] text-foreground md:text-[2.75rem]">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {copy.description}
            </p>

            <div className="mt-9 flex flex-col items-start gap-6 md:mt-10 md:flex-row md:items-center md:gap-8">
              <Button asChild variant="outline" size="lg" className="group h-auto min-h-12 w-full whitespace-normal rounded-full border-primary/30 bg-transparent px-6 py-3 text-left font-semibold text-foreground hover:border-primary/50 hover:bg-background sm:w-auto sm:min-w-[17.5rem]">
                <Link to={localized('/contact')}>
                  <span>{copy.contact}</span>
                  <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <nav aria-label={copy.eyebrow} className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8 md:flex-nowrap">
                <a
                  href={SUITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {copy.suite}
                  <ArrowRight aria-hidden="true" size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <Link
                  to={localized('/i6-builders')}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {copy.builders}
                  <ArrowRight aria-hidden="true" size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAFinal;
