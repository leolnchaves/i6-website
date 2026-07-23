import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight } from 'lucide-react';

const CTAFinal = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const isMobile = useIsMobile();

  const copy = {
    pt: {
      line1: 'O mercado não espera.',
      line2Start: 'Sua próxima decisão também ',
      lineHighlight: 'não deveria.',
      cta: isMobile ? 'Antecipe sua\npróxima decisão' : 'Antecipe sua próxima decisão',
    },
    en: {
      line1: "The market doesn't wait.",
      line2Start: 'Your next decision ',
      lineHighlight: "shouldn't either.",
      cta: isMobile ? 'Anticipate your\nnext decision' : 'Anticipate your next decision',
    },
  }[language];

  return (
    <section className="relative py-14 md:py-20 bg-gradient-to-br from-[#F4845F] via-[#E8764A] to-[#0B1224] overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
          {copy.line1}<br />
          <span className="md:whitespace-nowrap">
            {copy.line2Start}<span className="text-[#0B1224] bg-white/90 px-2 py-0.5 rounded">{copy.lineHighlight}</span>
          </span>
        </p>
        <Link
          to={localized('/contact')}
          className={`group inline-flex items-center gap-2 mt-10 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-white/50 animate-glow-white transition-all duration-500 ease-out hover:bg-white hover:text-[#0B1224] hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4),0_0_60px_rgba(255,255,255,0.15)] ${isMobile ? 'whitespace-pre-line text-center' : ''}`}
        >
          {copy.cta}
          <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default CTAFinal;
