import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { Send, Lightbulb, Brain } from 'lucide-react';
import {
  signalDemoContent,
  TYPING_SPEED,
  RESPONSE_DELAY,
  type Scenario,
  type Phase,
} from '@/data/signalDemo/content';
import {
  SupplyTable,
  ForecastChart,
  ComercialChart,
  MixComparison,
  PdvBarChart,
} from '@/components/signalDemo/visualizations';
import { solutionSignalMap, type KioskLang, type QuizContent } from '@/data/kiosk/config';

type Props = {
  lang: KioskLang;
  content: QuizContent;
  solutionId: string;
};

/**
 * Kiosk-optimized i6 Signal intelliboard for portrait 27" touchscreen.
 * - Presents full pre-baked questions (from solutionSignalMap) as large touch cards.
 * - Reuses the shared signal content and visualizations from /solutions demo.
 */
const KioskSignalIntelliboard = memo(({ lang, content, solutionId }: Props) => {
  const t = signalDemoContent[lang];

  const scenarios: Scenario[] = solutionSignalMap[solutionId] ?? ['pricing', 'mix'];

  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [inputText, setInputText] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState('');
  const [pendingScenario, setPendingScenario] = useState<Scenario | null>(null);
  const [isFillingInput, setIsFillingInput] = useState(false);
  const [isSendAnimating, setIsSendAnimating] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const startAnimation = useCallback((sc: Scenario) => {
    setActiveScenario(sc);
    setPhase('typing');
    setShowResponse(false);
    setInputText('');
  }, []);

  // Typing -> response transition
  useEffect(() => {
    if (phase !== 'typing') return;
    const timer = setTimeout(() => {
      setPhase('responding');
      setShowResponse(true);
    }, RESPONSE_DELAY);
    return () => clearTimeout(timer);
  }, [phase]);

  // Fill input with question characters
  useEffect(() => {
    if (!isFillingInput || !pendingQuestion) return;
    if (inputText.length < pendingQuestion.length) {
      const timer = setTimeout(() => {
        setInputText(pendingQuestion.slice(0, inputText.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setIsSendAnimating(true);
      setTimeout(() => {
        setIsSendAnimating(false);
        setIsFillingInput(false);
        setPendingQuestion('');
        if (pendingScenario) {
          startAnimation(pendingScenario);
          setPendingScenario(null);
        }
      }, 400);
    }, 300);
    return () => clearTimeout(timer);
  }, [isFillingInput, inputText, pendingQuestion, pendingScenario, startAnimation]);

  // Auto-scroll into the response once it renders
  useEffect(() => {
    if (showResponse && responseRef.current) {
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  }, [showResponse]);

  const handleQuestionClick = (sc: Scenario) => {
    if (isFillingInput || (sc === activeScenario && phase === 'responding')) return;
    setActiveScenario(sc);
    setPhase('idle');
    setShowResponse(false);
    setInputText('');
    setPendingQuestion(t.scenarios[sc].question);
    setPendingScenario(sc);
    setIsFillingInput(true);
  };

  const scenario = activeScenario ? t.scenarios[activeScenario] : null;

  return (
    <section className="w-full">
      {/* Section header */}
      <div className="text-center mb-[3vmin]">
        <div className="inline-flex items-center gap-[1.2vmin] px-[2vmin] py-[0.8vmin] rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[1.5vmin] font-semibold tracking-[0.2em] uppercase mb-[1.5vmin]">
          <Brain className="w-[2vmin] h-[2vmin]" />
          {content.results.signalEyebrow}
        </div>
        <h3 className="text-white text-[3.2vmin] font-bold leading-tight">
          {content.results.signalTitle}
        </h3>
        <p className="text-white/60 text-[1.8vmin] mt-[1vmin] max-w-[70vmin] mx-auto">
          {content.results.signalSubtitle}
        </p>
      </div>

      {/* Question cards */}
      <div className="mb-[2vmin]">
        <p className="text-orange-400 text-[1.4vmin] font-semibold uppercase tracking-[0.25em] mb-[1.5vmin] text-center">
          {content.results.signalPickHint}
        </p>
        <div className="grid grid-cols-1 gap-[2vmin]">
          {scenarios.map((sc) => {
            const isActive = activeScenario === sc;
            return (
              <button
                key={sc}
                onClick={() => handleQuestionClick(sc)}
                disabled={isFillingInput}
                className={`group relative text-left p-[2.5vmin] rounded-[2vmin] transition-all duration-300 min-h-[12vmin] active:scale-[0.98] ${
                  isActive
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 border-2 border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.4)]'
                    : 'bg-white/5 border-2 border-white/10 hover:border-orange-500/50 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start gap-[2vmin]">
                  <div
                    className={`flex-shrink-0 w-[5vmin] h-[5vmin] rounded-[1.2vmin] flex items-center justify-center ${
                      isActive ? 'bg-white/20' : 'bg-orange-500/15'
                    }`}
                  >
                    <Lightbulb
                      className={`w-[3vmin] h-[3vmin] ${
                        isActive ? 'text-white' : 'text-orange-400'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className={`text-[1.3vmin] font-semibold uppercase tracking-[0.2em] mb-[0.6vmin] ${
                        isActive ? 'text-white/80' : 'text-orange-400'
                      }`}
                    >
                      {t.scenarios[sc].label}
                    </div>
                    <div
                      className={`text-[2.2vmin] font-semibold leading-snug ${
                        isActive ? 'text-white' : 'text-white/90'
                      }`}
                    >
                      {t.scenarios[sc].question}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Intelliboard response panel */}
      <div className="rounded-[2vmin] bg-white shadow-2xl border border-white/10 overflow-hidden">
        {/* Chat surface */}
        <div className="p-[3vmin] min-h-[35vmin] max-h-[80vmin] overflow-y-auto">
          {!activeScenario && (
            <div className="h-full min-h-[30vmin] flex items-center justify-center text-center">
              <div>
                <Brain className="w-[6vmin] h-[6vmin] text-orange-400 mx-auto mb-[1.5vmin] opacity-60" />
                <p className="text-gray-400 text-[1.8vmin]">{t.emptyState}</p>
              </div>
            </div>
          )}

          {activeScenario && phase === 'typing' && (
            <div className="flex items-center gap-[1.5vmin] text-gray-500 text-[1.7vmin]">
              <div className="flex gap-[0.5vmin]">
                <span className="w-[1vmin] h-[1vmin] rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-[1vmin] h-[1vmin] rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-[1vmin] h-[1vmin] rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>{lang === 'pt' ? 'Analisando sinais preditivos…' : 'Analyzing predictive signals…'}</span>
            </div>
          )}

          {activeScenario && showResponse && scenario && (
            <div ref={responseRef} className="animate-fade-in">
              <h3 className="text-gray-900 font-bold text-[2.4vmin] mb-[1.5vmin]">
                {scenario.title}
              </h3>

              <h4 className="text-orange-500 font-semibold text-[1.6vmin] mb-[0.8vmin] uppercase tracking-wider">
                {t.executiveAnalysis}
              </h4>
              <p className="text-gray-700 text-[1.8vmin] leading-relaxed mb-[2vmin]">
                {scenario.analysis}
              </p>

              {activeScenario === 'supply' && 'table' in scenario && (
                <SupplyTable data={(scenario as typeof t.scenarios.supply).table} />
              )}
              {activeScenario === 'forecast' && 'chartData' in scenario && (
                <ForecastChart
                  data={(scenario as typeof t.scenarios.forecast).chartData}
                  note={(scenario as typeof t.scenarios.forecast).chartNote}
                  lang={lang}
                />
              )}
              {activeScenario === 'pricing' && 'table' in scenario && (
                <SupplyTable data={(scenario as typeof t.scenarios.pricing).table} />
              )}
              {activeScenario === 'comercial' && 'comercialChart' in scenario && (
                <ComercialChart
                  data={(scenario as typeof t.scenarios.comercial).comercialChart}
                  lang={lang}
                />
              )}
              {activeScenario === 'mix' && 'comparison' in scenario && (
                <MixComparison comparison={(scenario as typeof t.scenarios.mix).comparison} />
              )}
              {activeScenario === 'pdv' && 'barChartData' in scenario && (
                <PdvBarChart
                  data={(scenario as typeof t.scenarios.pdv).barChartData}
                  note={(scenario as typeof t.scenarios.pdv).barChartNote}
                  lang={lang}
                />
              )}

              <h4 className="text-orange-500 font-semibold text-[1.6vmin] mt-[2.5vmin] mb-[1vmin] uppercase tracking-wider">
                {t.recommendedActions}
              </h4>
              <ol className="space-y-[1vmin]">
                {scenario.actions.map((a, i) => (
                  <li key={i} className="text-gray-700 text-[1.8vmin] flex gap-[1vmin] leading-relaxed">
                    <span className="text-orange-500 font-bold flex-shrink-0">{i + 1}.</span>
                    <span>
                      <strong className="text-gray-900">{a.bold}</strong> {a.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Input bar (decorative — reflects typed question) */}
        <div className="border-t border-gray-200 bg-gray-50/80 p-[2vmin]">
          <div className="flex items-center gap-[1vmin]">
            <input
              type="text"
              readOnly
              value={inputText}
              placeholder={t.placeholder}
              className="flex-1 h-[6vmin] rounded-full border border-gray-200 bg-white px-[2.5vmin] text-[1.7vmin] text-gray-700 placeholder:text-gray-300 outline-none"
            />
            <button
              type="button"
              tabIndex={-1}
              className={`h-[6vmin] w-[6vmin] rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md flex items-center justify-center flex-shrink-0 transition-all ${
                isSendAnimating ? 'scale-125 ring-4 ring-orange-400/40' : ''
              }`}
            >
              <Send className="w-[2.4vmin] h-[2.4vmin]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

KioskSignalIntelliboard.displayName = 'KioskSignalIntelliboard';

export default KioskSignalIntelliboard;
