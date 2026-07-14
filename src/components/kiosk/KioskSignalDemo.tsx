import { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import type { KioskLang, QuizContent } from '@/data/kiosk/config';
import { solutionSignalMap } from '@/data/kiosk/config';
import { kioskSignals, type SignalScenarioId } from '@/data/kiosk/signals';

interface Props {
  lang: KioskLang;
  content: QuizContent;
  solutionId: string | null;
}

const KioskSignalDemo = ({ lang, content, solutionId }: Props) => {
  const [activeId, setActiveId] = useState<SignalScenarioId | null>(null);

  // Reset when solution changes
  useEffect(() => {
    setActiveId(null);
  }, [solutionId]);

  if (!solutionId) return null;

  const scenarioIds = solutionSignalMap[solutionId] ?? (['forecast', 'pricing'] as SignalScenarioId[]);
  const scenarios = scenarioIds.map((id) => kioskSignals[lang][id]);
  const activeScenario = activeId ? kioskSignals[lang][activeId] : null;

  return (
    <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-[4vmin]">
      <div className="flex items-center gap-[2vmin] mb-[2.5vmin]">
        <span className="w-[6vmin] h-[6vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
          <MessageCircle className="w-[3vmin] h-[3vmin] text-[#F4845F]" />
        </span>
        <div>
          <p className="text-[1.6vmin] tracking-[0.3em] uppercase font-semibold text-[#F4845F]">
            {content.results.signalEyebrow}
          </p>
          <h3 className="text-[3vmin] font-bold text-white leading-tight">
            {content.results.signalTitle}
          </h3>
          <p className="text-[1.9vmin] text-white/70">{content.results.signalSubtitle}</p>
        </div>
      </div>

      <div className="flex flex-col gap-[1.5vmin]">
        {scenarios.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={`text-left rounded-xl border-2 p-[2.5vmin] transition-all min-h-[9vmin] ${
                isActive
                  ? 'bg-[#F4845F]/15 border-[#F4845F]'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <span className="block text-[1.5vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]/90 mb-[0.6vmin]">
                {s.label}
              </span>
              <span className="flex items-center gap-[1.5vmin] text-[2.2vmin] text-white/90 leading-snug">
                <ArrowRight className="w-[2.4vmin] h-[2.4vmin] flex-shrink-0 text-[#F4845F]" />
                {s.question}
              </span>
            </button>
          );
        })}
      </div>

      {activeScenario && (
        <div className="mt-[3vmin] rounded-2xl bg-[#0B1224] border border-[#F4845F]/30 p-[3vmin]">
          <p className="text-[2.1vmin] text-white/90 leading-relaxed mb-[2.5vmin]">
            {activeScenario.analysis}
          </p>
          <div className="flex flex-col gap-[1.5vmin]">
            {activeScenario.actions.map((a, i) => (
              <div key={i} className="flex gap-[1.5vmin]">
                <span className="flex-shrink-0 w-[3vmin] h-[3vmin] rounded-full bg-[#F4845F]/20 border border-[#F4845F]/40 flex items-center justify-center text-[1.6vmin] font-bold text-[#F4845F]">
                  {i + 1}
                </span>
                <p className="text-[2vmin] leading-snug text-white/85">
                  <strong className="text-white">{a.bold}</strong> {a.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KioskSignalDemo;
