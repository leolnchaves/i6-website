import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { RotateCcw } from 'lucide-react';
import KioskShell from '@/components/kiosk/KioskShell';
import AttractScreen from '@/components/kiosk/AttractScreen';
import QuizScreen from '@/components/kiosk/QuizScreen';
import SolutionsGrid from '@/components/kiosk/SolutionsGrid';
import SolutionDemoBlock from '@/components/kiosk/SolutionDemoBlock';
import KioskSignalIntelliboard from '@/components/kiosk/KioskSignalIntelliboard';
import EbookCTA from '@/components/kiosk/EbookCTA';
import {
  kioskContent,
  KIOSK_INACTIVITY_MS,
  territoryEbook,
  type KioskLang,
  type RouteId,
} from '@/data/kiosk/config';
import { solutionsContent } from '@/data/solutionsV2/content';
import { trackEvent } from '@/lib/tracker';
import { trackKioskEvent } from '@/lib/kioskTracker';
import { TRACKER_EVENTS } from '@/lib/tracker-events';

type Stage = 'attract' | 'quiz' | 'results';

const TOTAL_STEPS = 2;

const getInitialLang = (): KioskLang => {
  if (typeof window === 'undefined') return 'pt';
  const params = new URLSearchParams(window.location.search);
  const q = params.get('lang');
  if (q === 'en' || q === 'pt') return q;
  return 'pt';
};

/**
 * Kiosk / totem experience:
 * Attract → Q1 (território) → Q2 (solução da branch) → Results
 */
const Kiosk = () => {
  const [lang, setLang] = useState<KioskLang>(getInitialLang);
  const [stage, setStage] = useState<Stage>('attract');
  const [route, setRoute] = useState<RouteId | null>(null);
  const [recommendedIds, setRecommendedIds] = useState<string[] | null>(null);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);
  const [simulationCompleted, setSimulationCompleted] = useState<Record<string, boolean>>({});

  const kContent = kioskContent[lang];
  const sContent = solutionsContent[lang];

  const solutionsForResults = useMemo(() => {
    if (!recommendedIds || recommendedIds.length === 0) return [];
    const byId = new Map(sContent.solutions.map((s) => [s.id, s]));
    return recommendedIds.map((id) => byId.get(id)).filter(Boolean) as typeof sContent.solutions;
  }, [recommendedIds, sContent.solutions]);

  const isCombo = solutionsForResults.length > 1;

  const selectedSolution = useMemo(
    () => solutionsForResults.find((s) => s.id === selectedSolutionId) ?? null,
    [solutionsForResults, selectedSolutionId],
  );

  const reset = () => {
    setStage('attract');
    setRoute(null);
    setRecommendedIds(null);
    setSelectedSolutionId(null);
    setSimulationCompleted({});
  };

  // Ao entrar em results, auto-seleciona a primeira solução recomendada
  // e scrolla até o demo.
  useEffect(() => {
    if (stage !== 'results') return;
    if (solutionsForResults.length > 0) {
      setSelectedSolutionId(solutionsForResults[0].id);
      requestAnimationFrame(() => {
        const el = document.getElementById('kiosk-solution-demo');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [stage, solutionsForResults]);

  const handleStart = () => {
    trackEvent(TRACKER_EVENTS.KIOSK_SESSION_STARTED, { language: lang });
    trackKioskEvent('kiosk:start');
    setStage('quiz');
    setRoute(null);
    setRecommendedIds(null);
    setSelectedSolutionId(null);
  };

  const handleAnswer = (optionId: string) => {
    if (route === null) {
      // Q1: escolher rota.
      const opt = kContent.routing.options.find((o) => o.id === optionId);
      if (!opt?.route) return;
      trackEvent(TRACKER_EVENTS.KIOSK_QUIZ_ANSWERED, {
        language: lang,
        step: 'q1',
        option_id: optionId,
        route: opt.route,
      });
      trackKioskEvent(`q1:${optionId}`);
      setRoute(opt.route);
      return;
    }
    // Q2: escolher soluções.
    const branch = kContent.branches[route];
    const opt = branch.options.find((o) => o.id === optionId);
    if (!opt?.solutionIds) return;
    trackEvent(TRACKER_EVENTS.KIOSK_QUIZ_ANSWERED, {
      language: lang,
      step: 'q2',
      option_id: optionId,
      route,
    });
    trackKioskEvent(`q2:${optionId}`);
    trackEvent(TRACKER_EVENTS.KIOSK_QUIZ_COMPLETED, {
      language: lang,
      route,
      solutions: opt.solutionIds.join(','),
    });
    opt.solutionIds.forEach((sid) => trackKioskEvent(`results:${sid}`));
    setRecommendedIds(opt.solutionIds);
    setStage('results');
  };

  const handleSelectSolution = (id: string) => {
    setSelectedSolutionId(id);
    trackEvent(TRACKER_EVENTS.KIOSK_SOLUTION_SELECTED, { solution_id: id, language: lang });
    requestAnimationFrame(() => {
      const el = document.getElementById('kiosk-solution-demo');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const ebookTitle = route ? territoryEbook[route][lang] : '';

  const currentQuestion =
    route === null ? kContent.routing : kContent.branches[route];
  const currentStepIndex = route === null ? 0 : 1;

  return (
    <>
      <Helmet>
        <title>{lang === 'pt' ? 'infinity6 · Experiência Interativa' : 'infinity6 · Interactive Experience'}</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </Helmet>

      <KioskShell
        inactivityMs={KIOSK_INACTIVITY_MS}
        onInactive={reset}
        active={stage !== 'attract'}
      >
        {false && stage === 'attract' && (
          <div className="absolute top-[3vmin] right-[3vmin] z-20 flex gap-[1vmin]">
            {(['pt', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-[2.5vmin] py-[1.5vmin] rounded-full text-[1.8vmin] font-semibold border-2 ${
                  lang === l
                    ? 'bg-[#F4845F] border-[#F4845F] text-white'
                    : 'bg-white/5 border-white/20 text-white/70'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {stage !== 'attract' && (
          <div className="fixed top-[2vmin] right-[2vmin] z-20">
            <div
              aria-hidden
              className="absolute -inset-y-[0.8vmin] -inset-x-[1.2vmin] rounded-full bg-[#0B1224]/85 backdrop-blur-md ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
            />
            <button
              type="button"
              onClick={reset}
              className="relative flex items-center gap-[1.2vmin] px-[2.4vmin] py-[1.2vmin] rounded-full bg-transparent border border-white/25 text-[1.8vmin] font-semibold text-white/90 min-h-[6vmin]"
            >
              <RotateCcw className="w-[2vmin] h-[2vmin]" />
              {kContent.footer.resetLabel}
            </button>
          </div>
        )}

        {stage === 'attract' && <AttractScreen content={kContent} onStart={handleStart} />}

        {stage === 'quiz' && (
          <QuizScreen
            key={route === null ? 'q1' : `q2-${route}`}
            question={currentQuestion}
            stepIndex={currentStepIndex}
            totalSteps={TOTAL_STEPS}
            progressLabel={kContent.progressLabel}
            continueCta={kContent.continueCta}
            onAnswer={handleAnswer}
          />
        )}

        {stage === 'results' && (
          <div className="w-full max-w-[96vw] mx-auto px-[4vmin] pt-[10vmin] pb-[8vmin]">
            <div className="text-center mb-[5vmin]">
              <p className="text-[1.7vmin] tracking-[0.35em] uppercase font-semibold text-[#F4845F] mb-[1.5vmin]">
                {kContent.results.eyebrow}
              </p>
              <h2 className="text-[4vmin] font-bold leading-tight mb-[1vmin]">
                {isCombo ? kContent.results.tieTitle : kContent.results.title}
              </h2>
            </div>

            {(() => {
              const migratedIds = ['predictive-personalization', 'smart-discovery', 'predictive-campaign-targeting', 'demand-forecasting', 'predictive-commercial-targets', 'mix-assortment-order', 'price-to-margin', 'price-to-turnover'];
              const isMigrated = !!selectedSolution && migratedIds.includes(selectedSolution.id);
              const companion =
                selectedSolution?.id === 'predictive-personalization'
                  ? solutionsForResults.find((s) => s.id === 'smart-discovery') ?? null
                  : selectedSolution?.id === 'smart-discovery'
                    ? solutionsForResults.find((s) => s.id === 'predictive-personalization') ?? null
                    : null;

              return (
                <>
                  {!isMigrated && (
                    <>
                      <SolutionsGrid
                        solutions={solutionsForResults}
                        labels={sContent.labels}
                        activeId={selectedSolutionId}
                        onSelect={handleSelectSolution}
                        highlightAll={isCombo}
                      />
                      <p className="mt-[5vmin] text-center text-[2.2vmin] text-white/65">
                        {isCombo ? kContent.results.tieSubtitle : kContent.results.subtitle}
                      </p>
                    </>
                  )}

                  <div id="kiosk-solution-demo" className={`${isMigrated ? '' : 'mt-[6vmin]'} flex flex-col gap-[4vmin] w-full min-w-0`}>
                    {selectedSolution ? (
                      <>
                        <SolutionDemoBlock
                          key={selectedSolution.id}
                          solution={selectedSolution}
                          labels={sContent.labels}
                          lang={lang}
                          companion={companion}
                          onSimulationClosed={
                            isMigrated
                              ? () => {
                                  setSimulationCompleted((s) => ({ ...s, [selectedSolution.id]: true }));
                                  requestAnimationFrame(() => {
                                    document
                                      .getElementById('kiosk-signal-intelliboard')
                                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  });
                                }
                              : undefined
                          }
                        />
                        {(!isMigrated || simulationCompleted[selectedSolution.id]) && (
                          <>
                            <KioskSignalIntelliboard
                              lang={lang}
                              content={kContent}
                              solutionId={selectedSolution.id}
                            />

                            <EbookCTA
                              lang={lang}
                              content={kContent}
                              route={route}
                              solutionId={selectedSolution.id}
                              solutionTitle={selectedSolution.title}
                              ebookTitle={ebookTitle}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <p className="text-center text-[2.2vmin] text-white/50 py-[4vmin]">
                        {kContent.results.selectSolutionHint}
                      </p>
                    )}
                  </div>
                </>
              );
            })()}

            <p className="text-center text-[1.6vmin] tracking-[0.3em] uppercase text-white/40 mt-[6vmin]">
              {kContent.footer.tagline}
            </p>
          </div>
        )}
      </KioskShell>
    </>
  );
};

export default Kiosk;
