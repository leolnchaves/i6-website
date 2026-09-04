import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';
import { builderCopy, DOCS_PATH } from '@/data/i6Builders/content';

/**
 * Faixa escura: quebra o ritmo claro da página e agrupa o percurso
 * SDK → API → Toolkit sobre um trilho horizontal.
 */
const BuilderHowItWorks = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = pickLang(language, builderCopy).how;

  return (
    <section className="bg-[#0B1224] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F4845F] mb-4">{copy.eyebrow}</p>
            <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-white">{copy.title}</h2>
          </div>
          <Link
            to={localized(DOCS_PATH)}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#F4845F]"
          >
            {copy.docsLink}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <p className="mt-12 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">{copy.railLabel}</p>

        {/* Trilho: pontos ligados por uma linha contínua */}
        <div className="relative mt-6">
          <div aria-hidden className="absolute left-0 right-0 top-[7px] h-px bg-white/12" />
          <div className="relative grid md:grid-cols-3 gap-10 md:gap-12">
            {copy.blocks.map((block, i) => (
              <div key={block.title} className="relative pt-0">
                <span
                  aria-hidden
                  className="block h-3.5 w-3.5 rounded-full border-2 border-[#F4845F] bg-[#0B1224]"
                />
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-white/35">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-xl font-semibold text-white">{block.title}</h3>
                </div>
                <p className="mt-3 text-sm md:text-[15px] text-white/60 leading-relaxed">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderHowItWorks;
