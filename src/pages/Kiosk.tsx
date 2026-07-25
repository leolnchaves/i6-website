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
  solutionEbook,
  type KioskLang,
  type RouteId,
} from '@/data/kiosk/config';
import { solutionsContent } from '@/data/solutionsV2/content';
import { trackEvent } from '@/lib/tracker';
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
    trackEvent(TRACKER_EVENTS.KIOSK_QUIZ_COMPLETED, {
      language: lang,
      route,
      solutions: opt.solutionIds.join(','),
    });
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

  const ebookTitle = selectedSolution
    ? solutionEbook[selectedSolution.id]?.[lang] ?? selectedSolution.title
    : '';

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
          <button
            type="button"
            onClick={reset}
            className="fixed top-[3vmin] right-[3vmin] z-20 flex items-center gap-[1.5vmin] px-[3vmin] py-[2vmin] rounded-full bg-white/10 border border-white/20 text-[1.8vmin] font-semibold text-white/85 min-h-[8vmin]"
          >
            <RotateCcw className="w-[2.4vmin] h-[2.4vmin]" />
            {kContent.footer.resetLabel}
          </button>
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
              <p className="text-[2.2vmin] text-white/65">
                {isCombo ? kContent.results.tieSubtitle : kContent.results.subtitle}
              </p>
            </div>

            <SolutionsGrid
              solutions={solutionsForResults}
              labels={sContent.labels}
              activeId={selectedSolutionId}
              onSelect={handleSelectSolution}
              highlightAll={isCombo}
            />

            <div id="kiosk-solution-demo" className="mt-[6vmin] flex flex-col gap-[4vmin]">
              {selectedSolution ? (
                <>
                  <SolutionDemoBlock
                    key={selectedSolution.id}
                    solution={selectedSolution}
                    labels={sContent.labels}
                    lang={lang}
                  />
                  <KioskSignalIntelliboard
                    lang={lang}
                    content={kContent}
                    solutionId={selectedSolution.id}
                  />

                  <EbookCTA
                    lang={lang}
                    content={kContent}
                    solutionId={selectedSolution.id}
                    solutionTitle={selectedSolution.title}
                    ebookTitle={ebookTitle}
                  />
                </>
              ) : (
                <p className="text-center text-[2.2vmin] text-white/50 py-[4vmin]">
                  {kContent.results.selectSolutionHint}
                </p>
              )}
            </div>

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
