import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath, pickLang } from '@/utils/localizedPath';
import { SUITE_URL } from '@/components/home-v3/product/suiteContent';

const copyByLang = {
  pt: {
    title: 'Seu concorrente vai perceber o movimento depois de você',
    decision: 'Teste a i6 Decision Suite grátis por 30 dias',
    builder: 'Construa com a i6 Builder',
    specialist: 'Falar com especialista',
  },
  en: {
    title: 'Your competitor will notice the move after you do',
    decision: 'Try the i6 Decision Suite free for 30 days',
    builder: 'Build with the i6 Builder',
    specialist: 'Talk to an expert',
  },
  es: {
    title: 'Tu competidor va a notar el movimiento después de ti',
    decision: 'Prueba la i6 Decision Suite gratis por 30 días',
    builder: 'Construye con la i6 Builder',
    specialist: 'Hablar con un especialista',
  },
};

const FinalCTA = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = pickLang(language, copyByLang);

  return (
    <section className="container mx-auto px-6 pb-24">
      <div className="relative overflow-hidden rounded-[calc(var(--radius)+8px)] border border-primary/25 bg-accent px-6 py-14 md:px-14 md:py-16 text-center">
        <div aria-hidden className="absolute inset-0 sand-glow" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-[2.6rem] leading-[1.14] font-bold text-foreground">{copy.title}</h2>

          <div className="mt-7 flex flex-col items-center gap-3">
            <a
              href={SUITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex max-w-full items-center justify-center gap-2 px-7 py-3.5 rounded-[var(--radius)] bg-primary text-primary-foreground text-sm font-semibold shadow-[var(--sand-shadow-lift)] hover:brightness-[1.06] transition-all text-center"
            >
              {copy.decision}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to={localized('/i6-builders')}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius)] border border-border bg-card text-sm font-semibold text-foreground hover:border-primary/40 transition-all"
              >
                {copy.builder}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                to={localized('/contact')}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius)] border border-border bg-card text-sm font-semibold text-foreground hover:border-primary/40 transition-all"
              >
                {copy.specialist}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
