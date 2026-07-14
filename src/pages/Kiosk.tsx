import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { RotateCcw } from 'lucide-react';
import KioskShell from '@/components/kiosk/KioskShell';
import AttractScreen from '@/components/kiosk/AttractScreen';
import QuizScreen from '@/components/kiosk/QuizScreen';
import SolutionsGrid from '@/components/kiosk/SolutionsGrid';
import SolutionDemoBlock from '@/components/kiosk/SolutionDemoBlock';
import KioskSignalDemo from '@/components/kiosk/KioskSignalDemo';
import EbookCTA from '@/components/kiosk/EbookCTA';
import { kioskContent, KIOSK_INACTIVITY_MS, solutionEbook, type KioskLang } from '@/data/kiosk/config';
import { solutionsContent, type TerritoryId } from '@/data/solutionsV2/content';
import { trackEvent } from '@/lib/tracker';
import { TRACKER_EVENTS } from '@/lib/tracker-events';

type Stage = 'attract' | 'quiz' | 'results';

const getInitialLang = (): KioskLang => {
  if (typeof window === 'undefined') return 'pt';
  const params = new URLSearchParams(window.location.search);
  const q = params.get('lang');
  if (q === 'en' || q === 'pt') return q;
  return 'pt';
};

/**
 * Kiosk / totem experience:
 * Attract → Quiz (single question, multi-select of business challenges)
 * → Results (filtered solutions grid, expanded solution demo, i6Signal demo, eBook CTA).
 *
 * Standalone route (no header/footer). Locale via `?lang=pt|en`.
 */
const Kiosk = () => {
  const [lang, setLang] = useState<KioskLang>(getInitialLang);
  const [stage, setStage] = useState<Stage>('attract');
  const [territories, setTerritories] = useState<TerritoryId[]>([]);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);

  const kContent = kioskContent[lang];
  const sContent = solutionsContent[lang];

  const filteredSolutions = useMemo(() => {
    if (territories.length === 0) return sContent.solutions;
    return sContent.solutions.filter((s) => territories.includes(s.territory));
  }, [sContent.solutions, territories]);

  const selectedSolution = useMemo(
    () => filteredSolutions.find((s) => s.id === selectedSolutionId) ?? null,
    [filteredSolutions, selectedSolutionId],
  );

  const reset = () => {
    setStage('attract');
    setTerritories([]);
    setSelectedSolutionId(null);
  };

  useEffect(() => {
    if (stage === 'attract') {
      // Ensure clean state
      setSelectedSolutionId(null);
    }
  }, [stage]);

  const handleStart = () => {
    trackEvent(TRACKER_EVENTS.KIOSK_SESSION_STARTED, { language: lang });
    setStage('quiz');
  };

  const handleQuizSubmit = (t: TerritoryId[]) => {
    setTerritories(t);
    setStage('results');
    setSelectedSolutionId(null);
  };

  const handleSelectSolution = (id: string) => {
    setSelectedSolutionId(id);
    trackEvent(TRACKER_EVENTS.KIOSK_SOLUTION_SELECTED, { solution_id: id, language: lang });
    // Scroll the demo block into view smoothly
    requestAnimationFrame(() => {
      const el = document.getElementById('kiosk-solution-demo');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const ebookTitle = selectedSolution
    ? solutionEbook[selectedSolution.id]?.[lang] ?? selectedSolution.title
    : '';

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
        {/* Language toggle (visible only on attract to avoid mid-flow switch) */}
        {stage === 'attract' && (
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

        {/* Reset button, hidden on attract */}
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

        {stage === 'quiz' && <QuizScreen content={kContent} onSubmit={handleQuizSubmit} />}

        {stage === 'results' && (
          <div className="w-full max-w-[96vw] mx-auto px-[4vmin] pt-[10vmin] pb-[8vmin]">
            <div className="text-center mb-[5vmin]">
              <p className="text-[1.7vmin] tracking-[0.35em] uppercase font-semibold text-[#F4845F] mb-[1.5vmin]">
                {kContent.results.eyebrow}
              </p>
              <h2 className="text-[4vmin] font-bold leading-tight mb-[1vmin]">
                {kContent.results.title}
              </h2>
              <p className="text-[2.2vmin] text-white/65">{kContent.results.subtitle}</p>
            </div>

            <SolutionsGrid
              solutions={filteredSolutions}
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
                  <KioskSignalDemo
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
