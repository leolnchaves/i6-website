import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { ArrowRight } from 'lucide-react';
import heroWaves from '@/assets/hero-waves-coral.png.asset.json';


const HeroMovimento = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();

  const coralGlow = '0 0 8px rgba(244,132,95,0.9), 0 0 20px rgba(244,132,95,0.5), 0 0 35px rgba(244,132,95,0.25)';
  const copy = {
    pt: {
      titleHtml: `Decida <span style="color:#F4845F">antes</span> do mercado`,
      desc: 'Transformamos sinais de demanda, preço, estoque e comportamento em decisões que protegem margem, aceleram giro e aumentam conversão.',
      cta: 'Antecipe sua próxima decisão. Agora.',
    },
    en: {
      titleHtml: `Decide <span style="color:#F4845F">before</span> the market`,

      desc: 'We turn demand, price, inventory and behavior signals into decisions that protect margin, accelerate turnover and increase conversion.',
      cta: 'Get ahead of your next decision. Now.',
    },
  }[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0B1224] overflow-hidden">
      {/* Wave background — coral waves with transparent bg, subtle overlay on navy */}
      <img
        src={heroWaves.url}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover scale-110 pointer-events-none select-none"
        style={{
          opacity: 0.55,
          maskImage: 'radial-gradient(ellipse 80% 90% at center, black 45%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at center, black 45%, transparent 92%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          className="text-5xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-tight tracking-tight"
          dangerouslySetInnerHTML={{ __html: copy.titleHtml }}
        />
        <p className="mt-4 text-lg sm:text-xl md:text-2xl font-light text-[#F4845F] tracking-wide">
          The Platform for <span className="font-semibold" style={{ textShadow: coralGlow }}>Decision Advantage</span>
        </p>
        <p className="mt-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
          {copy.desc}
        </p>

        <Link
          to={localized('/contact')}
          className="group inline-flex items-center gap-2 mt-10 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-[#F4845F]/60 animate-glow-coral transition-all duration-500 ease-out hover:bg-[#F4845F] hover:border-[#F4845F] hover:shadow-[0_0_30px_rgba(244,132,95,0.5),0_0_60px_rgba(244,132,95,0.2)]"
        >
          {copy.cta}
          <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
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
