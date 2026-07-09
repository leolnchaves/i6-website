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
            Onde a predição vira resultado
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Alavancas Preditivas de Valor
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-sm md:text-base text-white/70 leading-relaxed">
            Organizamos nossas soluções em frentes de impacto, orientadas exatamente para onde as operações precisam capturar resultado.
          </p>
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
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F4845F] transition-colors line-clamp-2 min-h-[2lh]">
                {t.title}
              </h3>
              <p className="text-sm text-white/70 leading-snug mb-4 line-clamp-3 min-h-[3lh]">
                {t.tagline}
              </p>
              <ul className="flex flex-col gap-1.5 mb-4">
                {t.chips.map((c) => (
                  <li
                    key={c}
                    className="text-[11px] text-white/60 border border-white/10 rounded-full px-2 py-0.5 w-fit"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-1.5 text-xs font-medium text-[#F4845F]">
                Ver as soluções desta alavanca
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
