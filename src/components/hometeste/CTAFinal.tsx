import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight } from 'lucide-react';

const CTAFinal = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const copy = {
    pt: {
      lineStart: 'Seus dados já têm as respostas.\nSó falta ',
      lineHighlight: 'movimento.',
      cta: isMobile ? 'Vamos transformar dados em lucro?' : 'Pronto para transformar dados em lucro?',
    },
    en: {
      lineStart: 'Your data already has the answers.\nAll it needs is ',
      lineHighlight: 'movement.',
      cta: isMobile ? "Let's turn data into profit?" : 'Ready to turn data into profit?',
    },
  }[language];

  return (
    <section className="relative py-14 md:py-20 bg-gradient-to-br from-[#F4845F] via-[#E8764A] to-[#0B1224] overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug whitespace-pre-line">
          {copy.lineStart}<span className="text-[#0B1224] bg-white/90 px-2 py-0.5 rounded">{copy.lineHighlight}</span>
        </p>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 mt-10 px-8 py-4 bg-white/90 backdrop-blur-md text-[#0B1224] font-semibold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15),0_4px_15px_rgba(0,0,0,0.1)] border border-white/40 transition-all duration-500 ease-out hover:bg-white hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(255,255,255,0.25),0_8px_25px_rgba(0,0,0,0.15)] hover:border-white/60"
        >
          {copy.cta}
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default CTAFinal;
