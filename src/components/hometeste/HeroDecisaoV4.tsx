import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import heroVideoMp4 from '@/assets/hero-video-pt-v1.mp4.asset.json';
import heroVideoWebm from '@/assets/hero-video-pt-v1.webm.asset.json';
import heroVideoPoster from '@/assets/hero-video-pt-v1-poster.jpg.asset.json';
import heroPanoramaEn from '@/assets/hero-decisao-panorama-en-v7-transparent.png.asset.json';
import heroMobileEn from '@/assets/hero-decisao-mobile-en-v5-transparent.png.asset.json';

const EDGE_MASK =
  'radial-gradient(ellipse 74% 72% at 50% 50%, #000 32%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0) 97%)';

const HeroDecisaoV4 = () => {
  const localized = useLocalizedPath();
  const { language } = useLanguage();
  const isPt = language === 'pt';

  // vídeo só no desktop e sem prefers-reduced-motion; caso contrário fica o poster
  const [playVideo, setPlayVideo] = useState(false);
  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 768px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPlayVideo(mqDesktop.matches && !mqMotion.matches);
    update();
    mqDesktop.addEventListener('change', update);
    mqMotion.addEventListener('change', update);
    return () => {
      mqDesktop.removeEventListener('change', update);
      mqMotion.removeEventListener('change', update);
    };
  }, []);

  const description = isPt
    ? 'Transformamos sinais do negócio, mercado e comportamento em decisões que protegem margem, aceleram giro, aumentam conversão e reduzem custo.'
    : 'We turn business, market and behavior signals into decisions that protect margin, accelerate turnover, increase conversion and reduce cost.';

  const ctaBefore = isPt ? 'antes' : 'before';
  const ctaPrefix = isPt ? 'Decida ' : 'Decide ';
  const ctaSuffix = isPt ? ' do mercado.' : ' the market.';
  const heroImageWidth = 'w-[72%]';

  return (
    <section className="relative min-h-screen bg-[#0B1224] overflow-hidden flex flex-col">
      {/* FUNDO EM VÍDEO (PT) — camada ambiente, sem bordas perceptíveis */}
      {isPt && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-x-[-2%] md:inset-x-[2%] top-[23vh] md:top-[23vh] h-[56vh] md:h-[58vh]"
            style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
          >
            {playVideo ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={heroVideoPoster.url}
                className="w-full h-full object-contain select-none"
                style={{ filter: 'saturate(0.7) brightness(0.85) contrast(1.05)', mixBlendMode: 'screen' }}
              >
                <source src={heroVideoWebm.url} type="video/webm" />
                <source src={heroVideoMp4.url} type="video/mp4" />
              </video>
            ) : (
              <img
                src={heroVideoPoster.url}
                alt=""
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain select-none"
                style={{ filter: 'saturate(0.7) brightness(0.85) contrast(1.05)', mixBlendMode: 'screen' }}
              />
            )}
          </div>




          {/* glow coral difuso no núcleo */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(40% 42% at 50% 55%, rgba(244,132,95,0.12) 0%, rgba(244,132,95,0.04) 50%, rgba(244,132,95,0) 78%)',
            }}
          />

          {/* vinheta navy nas quatro bordas — dissolve qualquer linha reta */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #0B1224 0%, rgba(11,18,36,0) 18%), linear-gradient(to left, #0B1224 0%, rgba(11,18,36,0) 18%), linear-gradient(to bottom, #0B1224 0%, rgba(11,18,36,0) 22%), linear-gradient(to top, #0B1224 0%, rgba(11,18,36,0) 20%)',
            }}
          />
        </div>
      )}


      {/* 1. TÍTULO */}
      <div className="relative z-10 flex-shrink-0 pt-[8vh] md:pt-[11vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
            dangerouslySetInnerHTML={{ __html: `The Platform for<br/><span style="color:#F4845F">Decision Advantage</span>` }}
          />
        </div>
      </div>

      {/* 2. ESPAÇO CENTRAL — arte de fundo (PT) ou imagem dedicada (EN) */}
      <div className="relative flex-1 min-h-0 w-full overflow-hidden flex items-center justify-center -my-[2vh] md:-my-[3vh]">
        {!isPt && (
          <div className="container mx-auto px-6 h-full flex items-center justify-center relative">
            <picture className={`${heroImageWidth} h-full max-h-[45vh] md:max-h-[43vh] flex items-center justify-center`}>
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
        )}
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
