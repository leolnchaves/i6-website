import { Sparkles } from 'lucide-react';
import type { LeanSolution, SolutionsV2Content } from '@/data/solutionsV2/content';

interface Props {
  solution: LeanSolution;
  labels: SolutionsV2Content['labels'];
}

const SolutionDemoBlock = ({ solution, labels }: Props) => {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[4vmin]">
      <div className="flex items-center gap-[2vmin] mb-[2.5vmin]">
        <span className="w-[6vmin] h-[6vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
          <Sparkles className="w-[3vmin] h-[3vmin] text-[#F4845F]" />
        </span>
        <div>
          <h3 className="text-[3.4vmin] font-bold leading-tight text-white">{solution.title}</h3>
          <p className="text-[2vmin] text-white/70">{solution.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[2vmin]">
        <Card label={labels.resolve} value={solution.resolve} />
        <Card label={labels.entrega} value={solution.entrega} />
        <Card label={labels.impacto} value={solution.impacto} highlight />
      </div>
    </div>
  );
};

const Card = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div
    className={`rounded-2xl p-[2.5vmin] border ${
      highlight ? 'bg-[#F4845F]/10 border-[#F4845F]/40' : 'bg-white/5 border-white/10'
    }`}
  >
    <span className="block text-[1.6vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.6vmin]">
      {label}
    </span>
    <span className="block text-[2.4vmin] leading-snug text-white/90">{value}</span>
  </div>
);

export default SolutionDemoBlock;
