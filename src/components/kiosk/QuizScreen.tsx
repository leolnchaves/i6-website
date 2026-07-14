import { useState } from 'react';
import { Check } from 'lucide-react';
import type { QuizContent } from '@/data/kiosk/config';
import type { TerritoryId } from '@/data/solutionsV2/content';

interface Props {
  content: QuizContent;
  onSubmit: (territoryIds: TerritoryId[]) => void;
}

const QuizScreen = ({ content, onSubmit }: Props) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const submit = () => {
    if (selected.size === 0) return;
    const territories = content.options
      .filter((o) => selected.has(o.id))
      .map((o) => o.territory);
    // Dedupe while preserving order
    const unique = Array.from(new Set(territories));
    onSubmit(unique);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-[6vmin] py-[8vmin]">
      <div className="w-full max-w-[92vw] text-center">
        <p className="text-[1.8vmin] tracking-[0.4em] uppercase text-[#F4845F] font-semibold mb-[3vmin]">
          {content.intro.eyebrow}
        </p>
        <h2 className="text-[4.5vmin] font-bold leading-tight mb-[2vmin]">
          {content.question.text}
        </h2>
        <p className="text-[2.2vmin] text-white/60 mb-[6vmin]">{content.question.helper}</p>

        <div className="flex flex-col gap-[2.5vmin]">
          {content.options.map((opt) => {
            const isSel = selected.has(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.id)}
                className={`w-full flex items-center gap-[3vmin] rounded-2xl px-[4vmin] py-[3.5vmin] text-left transition-all border-2 min-h-[10vmin] ${
                  isSel
                    ? 'bg-[#F4845F]/15 border-[#F4845F] shadow-[0_0_30px_rgba(244,132,95,0.3)]'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <span
                  className={`flex-shrink-0 w-[7vmin] h-[7vmin] rounded-xl flex items-center justify-center border-2 ${
                    isSel ? 'bg-[#F4845F] border-[#F4845F]' : 'bg-white/5 border-white/20'
                  }`}
                >
                  {isSel && <Check className="w-[4vmin] h-[4vmin] text-white" strokeWidth={3} />}
                </span>
                <span className="text-[2.8vmin] font-semibold leading-snug">{opt.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={selected.size === 0}
          className={`mt-[8vmin] w-full max-w-[70vw] mx-auto rounded-full px-[6vmin] py-[3.5vmin] text-[3vmin] font-bold transition-all min-h-[10vmin] ${
            selected.size === 0
              ? 'bg-white/10 text-white/40 cursor-not-allowed'
              : 'bg-[#F4845F] text-white shadow-[0_0_40px_rgba(244,132,95,0.5)]'
          }`}
        >
          {content.continueCta}
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;
