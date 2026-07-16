import { useState } from 'react';
import { Check } from 'lucide-react';
import type { PricingBucket, QuizQuestion } from '@/data/kiosk/config';

interface Props {
  question: QuizQuestion;
  stepIndex: number; // 0-based (base questions)
  totalSteps: number; // number of base questions (used for progress text)
  progressLabel: string; // "Passo {current} de {total}"
  continueCta: string;
  isTiebreaker?: boolean;
  onAnswer: (weights: Partial<Record<PricingBucket, number>>, optionId: string) => void;
}

const QuizScreen = ({
  question,
  stepIndex,
  totalSteps,
  progressLabel,
  continueCta,
  isTiebreaker,
  onAnswer,
}: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  const progress = isTiebreaker
    ? question.eyebrow
    : progressLabel
        .replace('{current}', String(stepIndex + 1))
        .replace('{total}', String(totalSteps));

  const submit = () => {
    if (!selected) return;
    const opt = question.options.find((o) => o.id === selected);
    if (!opt) return;
    onAnswer(opt.weights, opt.id);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-[6vmin] py-[8vmin]">
      <div className="w-full max-w-[92vw] text-center">
        <p className="text-[1.8vmin] tracking-[0.4em] uppercase text-[#F4845F] font-semibold mb-[3vmin]">
          {progress}
        </p>
        <h2 className="text-[4.5vmin] font-bold leading-tight mb-[2vmin]">{question.text}</h2>
        {question.helper && (
          <p className="text-[2.2vmin] text-white/60 mb-[6vmin]">{question.helper}</p>
        )}

        <div className="flex flex-col gap-[2.5vmin]">
          {question.options.map((opt) => {
            const isSel = selected === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelected(opt.id)}
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
          disabled={!selected}
          className={`mt-[8vmin] w-full max-w-[70vw] mx-auto rounded-full px-[6vmin] py-[3.5vmin] text-[3vmin] font-bold transition-all min-h-[10vmin] ${
            !selected
              ? 'bg-white/10 text-white/40 cursor-not-allowed'
              : 'bg-[#F4845F] text-white shadow-[0_0_40px_rgba(244,132,95,0.5)]'
          }`}
        >
          {continueCta}
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;
