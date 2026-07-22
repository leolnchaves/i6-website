import { Link } from 'react-router-dom';
import { useLocalizedPath } from '@/utils/localizedPath';
import { ArrowRight } from 'lucide-react';
import heroDecisao from '@/assets/hero-decisao.png.asset.json';

// V1 — Split lateral: copy à esquerda, diagrama à direita
const HeroDecisaoV1 = () => {
  const localized = useLocalizedPath();
  const coralGlow = '0 0 8px rgba(244,132,95,0.9), 0 0 20px rgba(244,132,95,0.5), 0 0 35px rgba(244,132,95,0.25)';

  return (
    <section className="relative min-h-screen flex items-center bg-[#0B1224] overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-24 lg:py-0">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <h1
            className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
            dangerouslySetInnerHTML={{ __html: `Decida <span style="color:#F4845F">antes</span> do mercado` }}
          />
          <p className="mt-4 text-lg sm:text-xl md:text-2xl font-light text-[#F4845F] tracking-wide">
            The Platform for <span className="font-semibold" style={{ textShadow: coralGlow }}>Decision Advantage</span>
          </p>
          <p className="mt-6 text-base sm:text-lg text-white/60 max-w-2xl lg:max-w-none leading-relaxed">
            Transformamos sinais de demanda, preço, estoque e comportamento em decisões que protegem margem, aceleram giro e aumentam conversão.
          </p>

          <Link
            to={localized('/contact')}
            className="group inline-flex items-center gap-2 mt-10 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-[#F4845F]/60 animate-glow-coral transition-all duration-500 ease-out hover:bg-[#F4845F] hover:border-[#F4845F] hover:shadow-[0_0_30px_rgba(244,132,95,0.5),0_0_60px_rgba(244,132,95,0.2)]"
          >
            Antecipe sua próxima decisão. Agora.
            <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Diagrama */}
        <div className="relative">
          <img
            src={heroDecisao.url}
            alt=""
            aria-hidden
            className="w-full h-auto max-h-[75vh] object-contain animate-fade-in"
            style={{
              opacity: 0.95,
              maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 95%)',
            }}
          />
        </div>
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

export default HeroDecisaoV1;
