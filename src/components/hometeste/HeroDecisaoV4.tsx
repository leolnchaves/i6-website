import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import heroVideoMp4 from '@/assets/hero-video-pt-v4.mp4.asset.json';
import heroVideoWebm from '@/assets/hero-video-pt-v4.webm.asset.json';
import heroVideoPoster from '@/assets/hero-video-pt-v4-poster.jpg.asset.json';

import heroPanoramaEn from '@/assets/hero-decisao-panorama-en-v7-transparent.png.asset.json';
import heroMobileEn from '@/assets/hero-decisao-mobile-en-v5-transparent.png.asset.json';

const VIDEO_CLASS =
  'absolute inset-0 w-full h-full object-contain object-center md:object-cover select-none filter brightness-[0.95] saturate-100 contrast-[1.02]';




const HeroDecisaoV4 = () => {
  const localized = useLocalizedPath();
  const { language } = useLanguage();
  const isPt = language === 'pt';

  // vídeo em qualquer tamanho de tela; poster quando prefers-reduced-motion
  const [playVideo, setPlayVideo] = useState(false);
  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPlayVideo(!mqMotion.matches);
    update();
    mqMotion.addEventListener('change', update);
    return () => mqMotion.removeEventListener('change', update);
  }, []);


  const description = isPt
    ? 'Transformamos sinais do negócio, mercado e comportamento em decisões que protegem margem, aceleram giro, aumentam conversão e reduzem custo.'
    : 'We turn business, market and behavior signals into decisions that protect margin, accelerate turnover, increase conversion and reduce cost.';

  const ctaBefore = isPt ? 'antes' : 'before';
  const ctaPrefix = isPt ? 'Decida ' : 'Decide ';
  const ctaSuffix = isPt ? ' do mercado.' : ' the market.';
  const heroImageWidth = 'w-[72%]';

  return (
    <section className="relative min-h-[100svh] bg-[#0B1224] overflow-hidden flex flex-col">
      {/* FUNDO EM VÍDEO (PT) — tela cheia, integrado ao navy por gradientes */}
      {isPt && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[26svh] h-[38svh] md:inset-0 md:top-0 md:h-auto z-0 overflow-hidden"
        >
          {playVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={heroVideoPoster.url}
              className={VIDEO_CLASS}
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
              className={VIDEO_CLASS}
            />
          )}

          {/* integração com o navy — mesma técnica dos success stories */}
          <div className="absolute inset-0 bg-[#0B1224]/10" />

          {/* mobile: fade suave apenas no topo/base da faixa */}
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(to bottom, #0B1224 0%, rgba(11,18,36,0.35) 10%, rgba(11,18,36,0) 26%, rgba(11,18,36,0) 74%, rgba(11,18,36,0.35) 90%, #0B1224 100%)',
            }}
          />

          {/* desktop: fade vertical + laterais */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(to bottom, #0B1224 0%, rgba(11,18,36,0.45) 12%, rgba(11,18,36,0) 26%, rgba(11,18,36,0) 74%, rgba(11,18,36,0.55) 88%, #0B1224 100%)',
            }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(to right, #0B1224 0%, rgba(11,18,36,0.35) 8%, rgba(11,18,36,0) 18%, rgba(11,18,36,0) 82%, rgba(11,18,36,0.35) 92%, #0B1224 100%)',
            }}
          />


          {/* glow coral difuso no núcleo */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(40% 42% at 50% 55%, rgba(244,132,95,0.12) 0%, rgba(244,132,95,0.04) 50%, rgba(244,132,95,0) 78%)',
            }}
          />
        </div>


      )}


      {/* 1. TÍTULO */}
      <div className="relative z-10 flex-shrink-0 pt-[10vh] sm:pt-[9vh] md:pt-[11vh] px-5 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
            dangerouslySetInnerHTML={{ __html: `The Platform for<br/><span style="color:#F4845F">Decision Advantage</span>` }}
          />
        </div>
      </div>

      {/* 2. ESPAÇO CENTRAL — arte de fundo (PT) ou imagem dedicada (EN) */}
      <div className="relative flex-1 min-h-[18vh] sm:min-h-0 w-full overflow-hidden flex items-center justify-center -my-[1vh] sm:-my-[2vh] md:-my-[3vh]">

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
      <div className="relative z-10 flex-shrink-0 pb-[4vh] sm:pb-[2vh] md:pb-[3vh] px-5 sm:px-6">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 sm:gap-5">

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
