import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import WaveBackground from './WaveBackground';
import FlowingParticles from './FlowingParticles';

const HeroMovimento = () => {
  const { language } = useLanguage();

  const copy = {
    pt: {
      title: 'Inteligência de Movimento',
      subtitle: 'Data moves. You Grow.',
      desc: 'Transformamos dados estáticos em decisões que antecipam o mercado.',
      cta: 'Fale com um especialista',
    },
    en: {
      title: 'Intelligence of Movement',
      subtitle: 'Data moves. You Grow.',
      desc: 'We turn static data into decisions that anticipate the market.',
      cta: 'Talk to a specialist',
    },
  }[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0B1224] overflow-hidden">
      <WaveBackground />
      <FlowingParticles />

      <div className="relative z-10 text-center lg:text-left px-6 max-w-4xl mx-auto lg:ml-[40%] lg:mr-12">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
          {copy.title}
        </h1>
        <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-light text-[#F4845F] tracking-wide">
          {copy.subtitle}
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
    </section>
  );
};

export default HeroMovimento;
