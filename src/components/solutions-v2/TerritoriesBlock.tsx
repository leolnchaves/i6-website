import { memo } from 'react';
import { ArrowDown } from 'lucide-react';
import { solutionsV2Content } from '@/data/solutionsV2/content';

const TerritoriesBlock = memo(() => {
  const { territories } = solutionsV2Content;

  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(`territory-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="py-16 md:py-20 bg-[#0B1224] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-3">
            Onde a infinity6 gera valor
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Três territórios de decisão preditiva
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {territories.map((t) => (
            <a
              key={t.id}
              href={`#territory-${t.id}`}
              onClick={handleScroll(t.id)}
              className="group relative flex flex-col rounded-2xl bg-white/5 border border-white/10 hover:border-[#F4845F]/50 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] p-6"
            >
              <div className="absolute top-0 left-0 w-0 h-1 bg-[#F4845F] group-hover:w-full transition-all duration-700 ease-out rounded-t-2xl" />
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#F4845F]/80 mb-3">
                {t.eyebrow}
              </p>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F4845F] transition-colors">
                {t.title}
              </h3>
              <p className="text-sm text-white/70 leading-snug mb-4">
                {t.tagline}
              </p>
              <ul className="flex flex-wrap gap-1.5 mb-5">
                {t.chips.map((c) => (
                  <li
                    key={c}
                    className="text-[11px] text-white/60 border border-white/10 rounded-full px-2 py-0.5"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-1.5 text-xs font-medium text-[#F4845F]">
                Ver soluções deste território
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

TerritoriesBlock.displayName = 'TerritoriesBlock';
export default TerritoriesBlock;
