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
  bucketToSolutionId,
  PRICING_SOLUTION_IDS,
  type KioskLang,
  type PricingBucket,
} from '@/data/kiosk/config';
import { solutionsContent } from '@/data/solutionsV2/content';
import { trackEvent } from '@/lib/tracker';
import { TRACKER_EVENTS } from '@/lib/tracker-events';

type Stage = 'attract' | 'quiz' | 'results';
type Scores = Record<PricingBucket, number>;

const zeroScores = (): Scores => ({ margin: 0, turnover: 0, conversion: 0 });

const getInitialLang = (): KioskLang => {
  if (typeof window === 'undefined') return 'pt';
  const params = new URLSearchParams(window.location.search);
  const q = params.get('lang');
  if (q === 'en' || q === 'pt') return q;
  return 'pt';
};

/**
 * Retorna o bucket vencedor único (max estritamente maior que os demais)
 * ou null se houver empate no topo / tudo zerado.
 */
const resolveWinner = (scores: Scores): PricingBucket | null => {
  const entries = Object.entries(scores) as [PricingBucket, number][];
  entries.sort((a, b) => b[1] - a[1]);
  if (entries[0][1] <= 0) return null;
  if (entries[0][1] === entries[1][1]) return null;
  return entries[0][0];
};

/** Há empate entre os dois maiores (com valor > 0)? */
const hasTopTie = (scores: Scores): boolean => {
  const values = Object.values(scores).sort((a, b) => b - a);
  return values[0] > 0 && values[0] === values[1];
};

/**
 * Kiosk / totem experience:
 * Attract → Q1 → Q2 → Q3 → [Q4 desempate] → Results
 * Fluxo dedicado a pricing: pontua Margin / Turnover / Conversion
 * e abre direto o demo da solução vencedora (ou 3 cards se empatar).
 */
const Kiosk = () => {
  const [lang, setLang] = useState<KioskLang>(getInitialLang);
  const [stage, setStage] = useState<Stage>('attract');
  const [quizStep, setQuizStep] = useState<number>(0);
  const [showTiebreaker, setShowTiebreaker] = useState<boolean>(false);
  const [scores, setScores] = useState<Scores>(zeroScores);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);

  const kContent = kioskContent[lang];
  const sContent = solutionsContent[lang];

  const winner = useMemo(() => resolveWinner(scores), [scores]);
  const showTieFallback = stage === 'results' && winner === null;

  const solutionsForResults = useMemo(() => {
    if (winner) {
      const id = bucketToSolutionId[winner];
      return sContent.solutions.filter((s) => s.id === id);
    }
    // Empate ou zerado: mostrar as 3 de pricing.
    return sContent.solutions.filter((s) =>
      (PRICING_SOLUTION_IDS as readonly string[]).includes(s.id),
    );
  }, [winner, sContent.solutions]);

  const selectedSolution = useMemo(
    () => solutionsForResults.find((s) => s.id === selectedSolutionId) ?? null,
    [solutionsForResults, selectedSolutionId],
  );

  const reset = () => {
    setStage('attract');
    setQuizStep(0);
    setShowTiebreaker(false);
    setScores(zeroScores());
    setSelectedSolutionId(null);
  };

  // Ao entrar em results com vencedor único, auto-seleciona a solução
  // e scrolla até o demo.
  useEffect(() => {
    if (stage !== 'results') return;
    if (winner) {
      const id = bucketToSolutionId[winner];
      setSelectedSolutionId(id);
      requestAnimationFrame(() => {
        const el = document.getElementById('kiosk-solution-demo');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      setSelectedSolutionId(null);
    }
  }, [stage, winner]);

  const handleStart = () => {
    trackEvent(TRACKER_EVENTS.KIOSK_SESSION_STARTED, { language: lang });
    setStage('quiz');
    setQuizStep(0);
    setShowTiebreaker(false);
    setScores(zeroScores());
  };

  const handleAnswer = (
    weights: Partial<Record<PricingBucket, number>>,
    optionId: string,
  ) => {
    const nextScores: Scores = {
      margin: scores.margin + (weights.margin ?? 0),
      turnover: scores.turnover + (weights.turnover ?? 0),
      conversion: scores.conversion + (weights.conversion ?? 0),
    };
    setScores(nextScores);
    trackEvent(TRACKER_EVENTS.KIOSK_QUIZ_ANSWERED, {
      language: lang,
      step: showTiebreaker ? 'tiebreaker' : `q${quizStep + 1}`,
      option_id: optionId,
    });

    if (showTiebreaker) {
      // Depois do desempate, sempre vai para results.
      const w = resolveWinner(nextScores);
      trackEvent(TRACKER_EVENTS.KIOSK_QUIZ_COMPLETED, {
        language: lang,
        winner: w ?? 'tie',
      });
      setStage('results');
      return;
    }

    const isLastBase = quizStep >= kContent.questions.length - 1;
    if (!isLastBase) {
      setQuizStep(quizStep + 1);
      return;
    }

    // Após Q3: tem empate no topo? → desempate.
    if (hasTopTie(nextScores)) {
      setShowTiebreaker(true);
      return;
    }

    const w = resolveWinner(nextScores);
    trackEvent(TRACKER_EVENTS.KIOSK_QUIZ_COMPLETED, {
      language: lang,
      winner: w ?? 'tie',
    });
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

  const currentQuestion = showTiebreaker
    ? kContent.tiebreaker
    : kContent.questions[quizStep];

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
        {/* Language toggle temporariamente oculto — só PT nesta rodada.
            Para reativar: desmascarar o bloco abaixo. */}
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

        {stage === 'quiz' && currentQuestion && (
          <QuizScreen
            key={showTiebreaker ? 'tb' : `q${quizStep}`}
            question={currentQuestion}
            stepIndex={quizStep}
            totalSteps={kContent.questions.length}
            progressLabel={kContent.progressLabel}
            continueCta={kContent.continueCta}
            isTiebreaker={showTiebreaker}
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
                {showTieFallback ? kContent.results.tieTitle : kContent.results.title}
              </h2>
              <p className="text-[2.2vmin] text-white/65">
                {showTieFallback ? kContent.results.tieSubtitle : kContent.results.subtitle}
              </p>
            </div>

            <SolutionsGrid
              solutions={solutionsForResults}
              labels={sContent.labels}
              activeId={selectedSolutionId}
              onSelect={handleSelectSolution}
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
