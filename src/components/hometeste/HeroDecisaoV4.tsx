import { Link } from 'react-router-dom';
import { useLocalizedPath } from '@/utils/localizedPath';
import { ArrowRight } from 'lucide-react';
import heroDecisao from '@/assets/hero-decisao.png.asset.json';

// V4 — Diagrama full-bleed ancorado no bottom; texto no "vale" (topo/centro), CTA no "pico" (abaixo)
const HeroDecisaoV4 = () => {
  const localized = useLocalizedPath();
  const coralGlow = '0 0 8px rgba(244,132,95,0.9), 0 0 20px rgba(244,132,95,0.5), 0 0 35px rgba(244,132,95,0.25)';

  return (
    <section className="relative min-h-screen bg-[#0B1224] overflow-hidden">
      {/* Diagrama full-bleed ancorado no bottom */}
      <img
        src={heroDecisao.url}
        alt=""
        aria-hidden
        className="absolute inset-x-0 bottom-0 w-full h-[85%] object-cover object-bottom pointer-events-none select-none animate-fade-in"
        style={{
          opacity: 0.38,
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 18%, black 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 18%, black 100%)',
        }}
      />

      {/* Halo no vale (upper-center) pra dar respiro ao texto */}
      <div
        className="absolute inset-x-0 top-[18%] h-[38%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 80% at center, rgba(11,18,36,0.75) 0%, rgba(11,18,36,0.35) 55%, rgba(11,18,36,0) 90%)',
        }}
      />

      {/* Bloco de texto no vale */}
      <div className="relative z-10 pt-[16vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
            dangerouslySetInnerHTML={{ __html: `Decida <span style="color:#F4845F">antes</span> do mercado` }}
          />
          <p className="mt-4 text-lg sm:text-xl md:text-2xl font-light text-[#F4845F] tracking-wide">
            The Platform for <span className="font-semibold" style={{ textShadow: coralGlow }}>Decision Advantage</span>
          </p>
        </div>
      </div>

      {/* Descrição + CTA no pico, colados ao final */}
      <div className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 z-10 px-6 w-full">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            Transformamos sinais de demanda, preço, estoque e comportamento em decisões que protegem margem, aceleram giro e aumentam conversão.
          </p>
          <Link
            to={localized('/contact')}
            className="group inline-flex items-center gap-2 mt-8 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-[#F4845F]/60 animate-glow-coral transition-all duration-500 ease-out hover:bg-[#F4845F] hover:border-[#F4845F] hover:shadow-[0_0_30px_rgba(244,132,95,0.5),0_0_60px_rgba(244,132,95,0.2)]"
          >
            Antecipe sua próxima decisão. Agora.
            <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroDecisaoV4;
