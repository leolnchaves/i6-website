import { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import avatarRicardo from '@/assets/images/avatar-ricardo.jpg';
import {
  Home, Database, Brain, LayoutGrid, Send, ChevronRight, ChevronDown, ChevronUp,
  Heart, BookOpen, RotateCcw, Settings, BarChart3, Upload, Target,
  Lightbulb, Sparkles, TrendingUp, Shuffle, Repeat, Layers, Zap
} from 'lucide-react';
import { signalDemoContent as content, TYPING_SPEED, RESPONSE_DELAY, type Scenario, type Phase } from '@/data/signalDemo/content';
import { SupplyTable, ForecastChart, ComercialChart, MixComparison, PdvBarChart } from '@/components/signalDemo/visualizations';

// Bilingual content moved to @/data/signalDemo/content


// Sub-components moved to @/components/signalDemo/visualizations


// ─── Sidebar menu items ──────────────────────────────────────────

const sidebarMenuItems = [
  { icon: Home, labelIndex: 0, active: false },
  { icon: Upload, labelIndex: 1, active: false },
  { icon: Target, labelIndex: 2, active: false },
  { icon: Database, labelIndex: 3, active: false },
  { icon: Brain, labelIndex: 4, active: true },
  { icon: LayoutGrid, labelIndex: 5, active: false },
];

// Wizard icons for favorites bar
const wizardIcons = [Sparkles, TrendingUp, Shuffle, Repeat, Layers, Zap, Target];

// ─── Main component ──────────────────────────────────────────────

const I6SignalDemo = memo(() => {
  const { language } = useLanguage();
  const lang = language as 'pt' | 'en';
  const t = content[lang];

  const [activeScenario, setActiveScenario] = useState<Scenario>('supply');
  const [phase, setPhase] = useState<Phase>('idle');
  const [typedText, setTypedText] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isFillingInput, setIsFillingInput] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState('');
  const [pendingScenario, setPendingScenario] = useState<Scenario | null>(null);
  const [isSendAnimating, setIsSendAnimating] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const scenario = t.scenarios[activeScenario];

  const startAnimation = useCallback((sc: Scenario) => {
    setActiveScenario(sc);
    setPhase('typing');
    setTypedText(t.scenarios[sc].question);
    setShowResponse(false);
    setInputText('');
  }, [t.scenarios]);

  // Typing phase - wait then show response
  useEffect(() => {
    if (phase !== 'typing') return;
    const timer = setTimeout(() => {
      setPhase('responding');
      setShowResponse(true);
    }, RESPONSE_DELAY);
    return () => clearTimeout(timer);
  }, [phase]);

  // Auto-scroll to bottom and show scroll hint
  useEffect(() => {
    if (showResponse && chatRef.current) {
      setTimeout(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
        // Show scroll hint after auto-scroll completes
        setTimeout(() => {
          if (chatRef.current && chatRef.current.scrollTop > 50) {
            setShowScrollHint(true);
          }
        }, 500);
      }, 100);
    } else {
      setShowScrollHint(false);
    }
  }, [showResponse]);

  // Hide scroll hint when user scrolls up
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const handleScroll = () => {
      const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 30;
      if (!isAtBottom) setShowScrollHint(false);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Input filling effect (typing into input field)
  useEffect(() => {
    if (!isFillingInput || !pendingQuestion) return;
    if (inputText.length < pendingQuestion.length) {
      const timer = setTimeout(() => {
        setInputText(pendingQuestion.slice(0, inputText.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    } else {
      // Typing complete — animate Send button, then trigger chat
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
    }
  }, [isFillingInput, inputText, pendingQuestion, pendingScenario, startAnimation]);

  // Auto-start on mount
  useEffect(() => {
    const timer = setTimeout(() => startAnimation('supply'), 800);
    return () => clearTimeout(timer);
  }, [startAnimation]);

  const handleScenarioClick = (sc: Scenario) => {
    if (sc === activeScenario && phase === 'responding') return;
    // Highlight selected scenario immediately
    setActiveScenario(sc);
    // Clear current chat
    setPhase('idle');
    setShowResponse(false);
    setTypedText('');
    // Start filling input with scenario question
    setInputText('');
    setPendingQuestion(t.scenarios[sc].question);
    setPendingScenario(sc);
    setIsFillingInput(true);
  };

  const handleSuggestedQuestionClick = (questionText: string) => {
    // Find which scenario this question belongs to
    const scenarios = Object.keys(t.scenarios) as Scenario[];
    let targetScenario: Scenario = activeScenario;
    for (const sc of scenarios) {
      if (t.scenarios[sc].questions.includes(questionText)) {
        targetScenario = sc;
        break;
      }
    }
    // Highlight the corresponding scenario immediately if it changed
    setActiveScenario(targetScenario);
    // Clear current chat
    setPhase('idle');
    setShowResponse(false);
    setTypedText('');
    // Start filling input
    setInputText('');
    setPendingQuestion(questionText);
    setPendingScenario(targetScenario);
    setIsFillingInput(true);
  };

  return (
    <section className="py-6 md:py-10 px-4 relative z-[10]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-2">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.sectionTitle}</h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">{t.sectionSubtitle}</p>
        </div>

        {/* Scenario selector - continuous bar */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-wrap justify-center gap-1 rounded-2xl md:rounded-full md:inline-flex md:flex-nowrap p-1 backdrop-blur-md bg-white/5 border border-white/10">
            {(Object.keys(t.scenarios) as Scenario[]).map((sc) => (
              <button
                key={sc}
                onClick={() => handleScenarioClick(sc)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeScenario === sc
                    ? 'bg-orange-500/80 backdrop-blur-sm text-white shadow-lg shadow-orange-500/30'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                {t.scenarios[sc].label}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Container */}
        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
          {/* ── Intelliboard Header ── */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3" style={{ background: 'linear-gradient(135deg, #0F1F36, #1E4A94, #0F1F36)' }}>
            <div className="flex items-center gap-2">
              <span className="text-orange-400 font-bold text-xl">i6</span>
              <span className="text-white font-bold text-lg tracking-tight">Intelliboard</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-orange-400 text-[10px] font-semibold uppercase tracking-wide">VIVARIS PHARMA S.A.</p>
                <p className="text-white text-xs font-medium">Leonardo Chaves</p>
                <p className="text-white/50 text-[10px]">leonardo.chaves@vivarispharma.com</p>
              </div>
              <img src={avatarRicardo} alt="Leonardo Chaves" className="h-9 w-9 rounded-full ring-2 ring-white/40 object-cover" />
            </div>
          </div>

          {/* ── Main body ── */}
          <div className="flex h-[520px] md:h-[620px]">
            {/* Sidebar — light theme, hidden on mobile */}
            <div className="hidden md:flex flex-col w-52 bg-white border-r border-gray-200 flex-shrink-0">
              {/* Angle dropdown */}
              <div className="px-3 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-orange-50/60 border-l-2 border-orange-500">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-xs font-semibold uppercase tracking-wide">ÂNGULO</p>
                    <p className="text-gray-500 text-[10px]">Forecast</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>

              {/* Menu items */}
              <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
                {sidebarMenuItems.map((item) => {
                  const label = t.sidebar[item.labelIndex];
                  return (
                    <div
                      key={label}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-default ${
                        item.active
                          ? 'bg-gradient-to-r from-orange-50 to-blue-50 text-orange-600 font-semibold border-l-2 border-orange-500'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{label}</span>
                    </div>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="border-t border-gray-100 px-2 py-2 space-y-0.5">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-500 hover:bg-gray-50 cursor-default">
                  <BarChart3 className="w-4 h-4" />
                  <span className="truncate">Billing Analytics</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-500 hover:bg-gray-50 cursor-default">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <Settings className="w-4 h-4 text-gray-400" />
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            </div>

            {/* Favorites bar — hidden on mobile */}
            <div className="hidden md:flex flex-col w-10 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 flex-shrink-0 items-center py-3 gap-1.5">
              {/* Wizard icons */}
              {wizardIcons.map((WizIcon, i) => (
                <button
                  key={i}
                  className="h-7 w-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                >
                  <WizIcon className="h-3.5 w-3.5" />
                </button>
              ))}
              {/* Separator */}
              <div className="w-5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1" />
              {/* Heart favorites */}
              {[0, 1, 2, 3, 4].map((i) => (
                <button key={`heart-${i}`} className="h-6 w-6 rounded-full flex items-center justify-center text-orange-300 hover:text-orange-500 transition-colors">
                  <Heart className="h-3.5 w-3.5 fill-current" />
                </button>
              ))}
            </div>

            {/* Main Chat Area — white background */}
            <div className="flex-1 flex flex-col min-w-0 bg-white relative">
              {/* Scroll up indicator */}
              {showScrollHint && (
                <div 
                  className="absolute top-3 right-4 z-20 cursor-pointer animate-scroll-hint-pulse"
                  onClick={() => chatRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-400 rounded-xl px-4 py-2.5 shadow-lg shadow-orange-200/50">
                    <ChevronUp className="w-5 h-5 text-orange-500 animate-bounce" style={{ animationDuration: '0.8s' }} />
                    <span className="text-orange-600 text-sm font-bold tracking-wide">
                      {lang === 'pt' ? 'Navegue pelo conteúdo' : 'Scroll through content'}
                    </span>
                  </div>
                </div>
              )}
              {/* Chat content */}
              <div ref={chatRef} className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-16 pt-6 pb-6">
                <div className="max-w-4xl mx-auto space-y-4">
                  {/* Empty state or user message */}
                  {phase === 'idle' && (
                    <div className="flex items-center justify-center pt-20 pb-10">
                      <p className="text-xl text-gray-300 font-light tracking-wide">{t.emptyState}</p>
                    </div>
                  )}

                  {/* User message */}
                  {(phase === 'typing' || phase === 'responding') && (
                    <div className="flex justify-end animate-fade-in">
                      <div className="bg-gradient-to-br from-orange-50/80 to-blue-50/60 border border-gray-200/50 rounded-2xl px-4 py-2.5 max-w-[85%] shadow-sm">
                        <p className="text-gray-800 text-sm">{typedText}</p>
                      </div>
                    </div>
                  )}

                  {/* Loading dots */}
                  {phase === 'typing' && typedText === t.scenarios[activeScenario].question && (
                    <div className="flex gap-1.5 px-2 py-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}

                  {/* AI Response */}
                  {showResponse && (
                    <div className="animate-fade-in">
                      <div className="max-w-full">
                        {/* Title */}
                        <h3 className="text-gray-900 font-bold text-base md:text-lg mb-3">{scenario.title}</h3>

                        {/* Executive Analysis */}
                        <h4 className="text-orange-500 font-semibold text-sm mb-1.5">{t.executiveAnalysis}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{scenario.analysis}</p>

                        {/* Visualization */}
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
                          <ComercialChart data={(scenario as typeof t.scenarios.comercial).comercialChart} lang={lang} />
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

                        {/* Recommended Actions */}
                        <h4 className="text-orange-500 font-semibold text-sm mt-4 mb-2">{t.recommendedActions}</h4>
                        <ol className="space-y-1.5 text-sm">
                          {scenario.actions.map((a, i) => (
                            <li key={i} className="text-gray-600 flex gap-2">
                              <span className="text-orange-500 font-bold flex-shrink-0">{i + 1}.</span>
                              <span><strong className="text-gray-800">{a.bold}</strong> {a.text}</span>
                            </li>
                          ))}
                        </ol>

                        {/* Suggested Questions — inline */}
                        <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 border border-orange-200/30">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-orange-500" />
                            <span className="text-xs font-medium text-orange-800">{t.suggestedQuestions}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {scenario.questions.slice(0, 3).map((q, i) => (
                              <span
                                key={i}
                                className="text-[11px] text-gray-500 px-2.5 py-1 rounded-lg text-left"
                              >
                                {q}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Scenario tabs + Input bar */}
              <div className="border-t border-gray-200/50 bg-white/95 backdrop-blur-sm p-3 md:p-4 md:pl-14">
                {/* Input row */}
                <div className="flex items-center gap-2">
                  <button className="h-10 w-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors flex-shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button className="h-10 w-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors flex-shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={inputText}
                    placeholder={t.placeholder}
                    className="flex-1 h-12 rounded-full border border-gray-200 bg-white px-5 text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                  />
                  <button className={`h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center flex-shrink-0 ${isSendAnimating ? 'scale-125 ring-4 ring-orange-400/40 shadow-orange-500/50 shadow-xl' : ''}`}>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

I6SignalDemo.displayName = 'I6SignalDemo';

export default I6SignalDemo;
