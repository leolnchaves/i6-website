import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { SUITE_URL } from '@/components/home-v3/product/suiteContent';

const copyByLang = {
  pt: {
    title: 'Seu concorrente vai perceber o movimento depois de você',
    sub: 'Sem custo até você ver o potencial de impacto na sua operação.',
    primary: 'Falar com especialista',
    secondary: 'Conheça o i6 Decision Suite',
    note: 'Custo zero até o backtest comprovar o resultado',
  },
  en: {
    title: 'Your competitor will notice the move after you do',
    sub: 'No cost until you see the potential impact in your operation.',
    primary: 'Talk to an expert',
    secondary: 'Explore the i6 Decision Suite',
    note: 'Zero cost until the backtest proves the result',
  },
};

const FinalCTA = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = copyByLang[language === 'pt' ? 'pt' : 'en'];

  return (
    <section className="container mx-auto px-6 pb-24">
      <div className="relative overflow-hidden rounded-[calc(var(--radius)+8px)] border border-primary/25 bg-accent px-6 py-14 md:px-14 md:py-16 text-center">
        <div aria-hidden className="absolute inset-0 sand-glow" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-[2.6rem] leading-[1.14] font-bold text-foreground">{copy.title}</h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.sub}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to={localized('/contact')}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius)] bg-primary text-primary-foreground text-sm font-semibold shadow-[var(--sand-shadow-lift)] hover:brightness-[1.06] transition-all"
            >
              {copy.primary}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={SUITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius)] border border-border bg-card text-sm font-semibold text-foreground hover:border-primary/40 transition-all"
            >
              {copy.secondary}
            </a>
          </div>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-primary">{copy.note}</p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
