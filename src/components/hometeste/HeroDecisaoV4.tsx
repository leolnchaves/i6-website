import { Link } from 'react-router-dom';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import heroPanoramaPt from '@/assets/hero-decisao-panorama-v3-transparent.png.asset.json';
import heroMobilePt from '@/assets/hero-decisao-mobile-v2-transparent.png.asset.json';
import heroPanoramaEn from '@/assets/hero-decisao-panorama-en-v2.png.asset.json';
import heroMobileEn from '@/assets/hero-decisao-mobile-en-transparent.png.asset.json';

const HeroDecisaoV4 = () => {
  const localized = useLocalizedPath();
  const { language } = useLanguage();
  const isPt = language === 'pt';

  const description = isPt
    ? 'Transformamos sinais do negócio, mercado e comportamento em decisões que protegem margem, aceleram giro, aumentam conversão e reduzem custo.'
    : 'We turn business, market and behavior signals into decisions that protect margin, accelerate turnover, increase conversion and reduce cost.';

  const ctaBefore = isPt ? 'antes' : 'before';
  const ctaPrefix = isPt ? 'Decida ' : 'Decide ';
  const ctaSuffix = isPt ? ' do mercado.' : ' the market.';

  if (!isPt) {
    return (
      <section className="relative min-h-screen bg-[#0B1224] overflow-hidden flex flex-col">
        {/* 1. TÍTULO */}
        <div className="relative z-10 flex-shrink-0 pt-[12vh] md:pt-[15vh] px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
              dangerouslySetInnerHTML={{ __html: `The Platform for<br/><span style="color:#F4845F">Decision Advantage</span>` }}
            />
          </div>
        </div>

        {/* 2. DESCRIÇÃO */}
        <div className="relative z-10 flex-shrink-0 px-6 mt-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* 3. IMAGEM — desce até ficar próxima do CTA */}
        <div className="relative flex-1 min-h-0 w-full overflow-hidden flex items-end justify-center -mb-[2vh] md:-mb-[3vh]">
          <div className="container mx-auto px-6 h-full flex items-end justify-center">
            <picture className="w-[90%] h-full max-h-[50vh] md:max-h-[48vh] flex items-end justify-center">
              <source media="(min-width: 768px)" srcSet={heroPanoramaEn.url} />
              <img
                src={heroMobileEn.url}
                alt=""
                aria-hidden
                className="max-w-full max-h-full w-auto h-auto object-contain select-none"
                style={{ clipPath: 'inset(0 0.5% 2.5% 0.5%)' }}
              />
            </picture>
          </div>
        </div>

        {/* 4. CTA */}
        <div className="relative z-10 flex-shrink-0 pb-[2vh] md:pb-[3vh] px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
            <Link
              to={localized('/contact')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-[#F4845F]/60 animate-glow-coral transition-all duration-500 ease-out hover:bg-[#F4845F] hover:border-[#F4845F] hover:shadow-[0_0_30px_rgba(244,132,95,0.5),0_0_60px_rgba(244,132,95,0.2)]"
            >
              <span>
                {ctaPrefix}
                <span className="text-[#F4845F] group-hover:text-black transition-colors duration-300 [text-shadow:0_0_8px_rgba(244,132,95,0.9),0_0_20px_rgba(244,132,95,0.5),0_0_35px_rgba(244,132,95,0.25)]">
                  {ctaBefore}
                </span>
                {ctaSuffix}
              </span>
              <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-[#0B1224] overflow-hidden flex flex-col">
      {/* 1. TÍTULO */}
      <div className="relative z-10 flex-shrink-0 pt-[8vh] md:pt-[11vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
            dangerouslySetInnerHTML={{ __html: `The Platform for<br/><span style="color:#F4845F">Decision Advantage</span>` }}
          />
        </div>
      </div>

      {/* 2. GUARDRAIL — imagem preenche o máximo do espaço sem esticar */}
      <div className="relative flex-1 min-h-0 w-full overflow-hidden flex items-center justify-center -my-[2vh] md:-my-[3vh]">
        <div className="container mx-auto px-6 h-full flex items-center justify-center">
          <picture className="w-[90%] h-full max-h-[50vh] md:max-h-[48vh] flex items-center justify-center">
            <source media="(min-width: 768px)" srcSet={heroPanoramaPt.url} />
            <img
              src={heroMobilePt.url}
              alt=""
              aria-hidden
              className="max-w-full max-h-full w-auto h-auto object-contain select-none"
              style={{ clipPath: 'inset(0 0.5% 2.5% 0.5%)' }}
            />
          </picture>
        </div>

      </div>

      {/* 3. DESCRIÇÃO + CTA */}
      <div className="relative z-10 flex-shrink-0 pb-[2vh] md:pb-[3vh] px-6">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-5">
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            {description}
          </p>
          <Link
            to={localized('/contact')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-[#F4845F]/60 animate-glow-coral transition-all duration-500 ease-out hover:bg-[#F4845F] hover:border-[#F4845F] hover:shadow-[0_0_30px_rgba(244,132,95,0.5),0_0_60px_rgba(244,132,95,0.2)]"
          >
            <span>
              {ctaPrefix}
              <span className="text-[#F4845F] group-hover:text-black transition-colors duration-300 [text-shadow:0_0_8px_rgba(244,132,95,0.9),0_0_20px_rgba(244,132,95,0.5),0_0_35px_rgba(244,132,95,0.25)]">
                {ctaBefore}
              </span>
              {ctaSuffix}
            </span>
            <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroDecisaoV4;
