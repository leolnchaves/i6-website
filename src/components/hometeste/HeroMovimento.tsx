import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import WaveBackground from './WaveBackground';

const HeroMovimento = () => {
  const { language } = useLanguage();

  const copy = {
    pt: {
      title: 'Inteligência de Movimento',
      subtitle: 'Data moves. You Grow.',
      desc: 'Transformamos dados estáticos em decisões que antecipam o mercado.',
      cta: 'Colocar Resultados em Movimento',
    },
    en: {
      title: 'Movement Intelligence',
      subtitle: 'Data moves. You Grow.',
      desc: 'We turn static data into decisions that anticipate the market.',
      cta: 'Set Results in Motion',
    },
  }[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0B1224] overflow-hidden">
      <WaveBackground />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
          {copy.title}
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl font-light text-[#F4845F] tracking-wide">
          Data moves. <span className="font-semibold" style={{ textShadow: '0 0 8px rgba(244,132,95,0.9), 0 0 20px rgba(244,132,95,0.5), 0 0 35px rgba(244,132,95,0.25)' }}>You Grow.</span>
        </p>
        <p className="mt-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
          {copy.desc}
        </p>
        <Link
          to="/contact"
          className="inline-block mt-10 px-8 py-4 bg-[#F4845F] hover:bg-[#E8764A] text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(244,132,95,0.35)]"
        >
          {copy.cta}
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-7 h-12 rounded-full border border-[#F4845F]/40 pt-2 flex items-start justify-center shadow-[0_0_15px_rgba(244,132,95,0.15)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F4845F] animate-scroll-dot-move" />
        </div>
        <span className="text-[#F4845F]/50 text-[10px] tracking-[0.3em] uppercase animate-pulse-soft">scroll</span>
      </div>
    </section>
  );
};

export default HeroMovimento;
