import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/utils/localizedPath';
import { solutionsV2Content } from '@/data/solutionsV2/content';

const SolutionsV2Hero = memo(() => {
  const localized = useLocalizedPath();
  const { hero } = solutionsV2Content;

  return (
    <section className="w-full flex items-center justify-center pt-28 pb-8 relative bg-[#0B1224]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-4">
            Soluções infinity6
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
            IA aplicada para{' '}
            <span
              className="text-[#F4845F]"
              style={{ textShadow: '0 0 30px rgba(244,132,95,0.3), 0 0 60px rgba(244,132,95,0.15)' }}
            >
              prever demanda
            </span>
            , recomendar decisões e capturar crescimento com precisão.
          </h1>
          <p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-3xl mx-auto mb-8">
            {hero.subtitle}
          </p>
          <Link
            to={localized(hero.ctaHref)}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white font-semibold rounded-xl border border-white/40 transition-all duration-500 ease-out hover:bg-white hover:text-[#0B1224] hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]"
          >
            {hero.ctaLabel}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
});

SolutionsV2Hero.displayName = 'SolutionsV2Hero';
export default SolutionsV2Hero;
