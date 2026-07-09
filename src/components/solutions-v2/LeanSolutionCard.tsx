import { memo } from 'react';
import type { LeanSolution, SolutionsV2Content } from '@/data/solutionsV2/content';

interface Props {
  solution: LeanSolution;
  labels: SolutionsV2Content['labels'];
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5 py-2 border-t border-white/5 first:border-t-0">
    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#F4845F]/80">
      {label}
    </span>
    <span className="text-sm text-white/75 leading-snug">{value}</span>
  </div>
);

const LeanSolutionCard = memo(({ solution, labels }: Props) => {
  return (
    <article
      id={solution.id}
      className="group relative flex flex-col h-full rounded-2xl bg-white/5 border border-white/10 hover:border-[#F4845F]/50 backdrop-blur-sm transition-all duration-500 p-5"
    >
      <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-[#F4845F] transition-colors min-h-[2lh] leading-tight">
        {solution.title}
      </h4>
      <p className="text-sm text-white/70 leading-snug mb-2 line-clamp-2 min-h-[2lh]">
        {solution.tagline}
      </p>
      {solution.description && (
        <p className="text-sm text-white/60 leading-snug mb-4 line-clamp-2 min-h-[2lh]">
          {solution.description}
        </p>
      )}
      <div className="flex-grow rounded-lg bg-white/5 border border-white/10 px-3">
        <Row label={labels.resolve} value={solution.resolve} />
        <Row label={labels.entrega} value={solution.entrega} />
        <Row label={labels.impacto} value={solution.impacto} />
      </div>
    </article>
  );
});

LeanSolutionCard.displayName = 'LeanSolutionCard';
export default LeanSolutionCard;
