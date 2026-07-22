import { Link } from 'react-router-dom';
import { useLocalizedPath } from '@/utils/localizedPath';
import { ArrowRight } from 'lucide-react';
import heroDecisao from '@/assets/hero-decisao-panorama.png';

// V4 — Diagrama centralizado sem sobreposição; CTA acima da descrição
const HeroDecisaoV4 = () => {
  const localized = useLocalizedPath();
  const coralGlow = '0 0 8px rgba(244,132,95,0.9), 0 0 20px rgba(244,132,95,0.5), 0 0 35px rgba(244,132,95,0.25)';

  return (
    <section className="relative min-h-screen bg-[#0B1224] overflow-hidden flex flex-col">
      {/* Diagrama dimensionado pela largura para preservar proporção e ocupar o eixo horizontal */}
      <div className="absolute inset-x-0 top-[22vh] z-0 flex justify-center pointer-events-none">
        <div className="w-[min(112vw,1550px)] h-auto flex items-center justify-center">
          <img
            src={heroDecisao}
            alt=""
            aria-hidden
            className="w-full h-auto max-w-none select-none"
            style={{
              opacity: 0.93,
              imageRendering: 'auto',
              maskImage:
                'radial-gradient(ellipse 100% 100% at center, black 88%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 100% 100% at center, black 88%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* Halo suave atrás do texto (topo) */}
      <div
        className="absolute inset-x-0 top-[14%] h-[30%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 80% at center, rgba(11,18,36,0.7) 0%, rgba(11,18,36,0.3) 55%, rgba(11,18,36,0) 90%)',
        }}
      />

      {/* Bloco de título no topo */}
      <div className="relative z-10 pt-[14vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
            dangerouslySetInnerHTML={{ __html: `The Platform for<br/><span style="color:#F4845F">Decision Advantage</span>` }}
          />
        </div>
      </div>

      {/* Descrição + CTA colados ao final */}
      <div className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 z-10 px-6 w-full">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-5">
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            Transformamos sinais do negócio, mercado e comportamento em decisões que protegem margem, aceleram giro, aumentam conversão e reduzem custo.
          </p>
          <Link
            to={localized('/contact')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-[#F4845F]/60 animate-glow-coral transition-all duration-500 ease-out hover:bg-[#F4845F] hover:border-[#F4845F] hover:shadow-[0_0_30px_rgba(244,132,95,0.5),0_0_60px_rgba(244,132,95,0.2)]"
          >
            <span>Decida <span className="text-[#F4845F] group-hover:text-black transition-colors duration-300 [text-shadow:0_0_8px_rgba(244,132,95,0.9),0_0_20px_rgba(244,132,95,0.5),0_0_35px_rgba(244,132,95,0.25)]">antes</span> do mercado. Agora.</span>
            <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroDecisaoV4;
