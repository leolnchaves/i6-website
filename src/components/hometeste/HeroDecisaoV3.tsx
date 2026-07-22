import { Link } from 'react-router-dom';
import { useLocalizedPath } from '@/utils/localizedPath';
import { ArrowRight } from 'lucide-react';
import heroDecisao from '@/assets/hero-decisao.png.asset.json';

// V3 — Assinatura: copy no topo, diagrama em faixa ancorada no bottom
const HeroDecisaoV3 = () => {
  const localized = useLocalizedPath();
  const coralGlow = '0 0 8px rgba(244,132,95,0.9), 0 0 20px rgba(244,132,95,0.5), 0 0 35px rgba(244,132,95,0.25)';

  return (
    <section className="relative min-h-screen flex flex-col bg-[#0B1224] overflow-hidden">
      {/* Copy no topo */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
            dangerouslySetInnerHTML={{ __html: `Decida <span style="color:#F4845F">antes</span> do mercado` }}
          />
          <p className="mt-4 text-lg sm:text-xl md:text-2xl font-light text-[#F4845F] tracking-wide">
            The Platform for <span className="font-semibold" style={{ textShadow: coralGlow }}>Decision Advantage</span>
          </p>
          <p className="mt-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
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
      </div>

      {/* Diagrama como assinatura no bottom */}
      <div className="relative w-full">
        <img
          src={heroDecisao.url}
          alt=""
          aria-hidden
          className="w-full h-auto max-h-[38vh] object-contain object-bottom animate-fade-in"
          style={{
            opacity: 0.9,
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 35%, black 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 35%, black 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
          }}
        />
      </div>
    </section>
  );
};

export default HeroDecisaoV3;
