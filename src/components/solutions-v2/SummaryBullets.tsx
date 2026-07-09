import { memo } from 'react';
import { Check } from 'lucide-react';
import { solutionsV2Content } from '@/data/solutionsV2/content';

const SummaryBullets = memo(() => {
  const { summary } = solutionsV2Content;

  return (
    <section className="py-16 md:py-20 bg-[#0B1224] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-3">
            Conclusão
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {summary.title}
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {summary.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3"
            >
              <Check className="w-4 h-4 text-[#F4845F] mt-1 flex-shrink-0" />
              <span className="text-sm text-white/80 leading-snug">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

SummaryBullets.displayName = 'SummaryBullets';
export default SummaryBullets;
