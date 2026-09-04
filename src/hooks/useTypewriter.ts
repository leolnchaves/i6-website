import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  /** ms entre a exibição de cada linha */
  lineDelay?: number;
  /** ms antes da primeira linha aparecer */
  startDelay?: number;
}

interface UseTypewriterResult {
  /** Quantas linhas já devem estar visíveis */
  visibleCount: number;
  /** Se a animação terminou */
  isDone: boolean;
  /** Se o usuário prefere motion reduzida */
  reducedMotion: boolean;
}

/**
 * Animação typewriter linha a linha, sem loop.
 * Quando `prefers-reduced-motion` está ativo, devolve tudo pronto imediatamente.
 */
export function useTypewriter(
  lines: string[],
  { lineDelay = 320, startDelay = 400 }: UseTypewriterOptions = {},
): UseTypewriterResult {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(lines.length);
      setIsDone(true);
      return;
    }

    setVisibleCount(0);
    setIsDone(false);

    let timer: ReturnType<typeof setTimeout>;

    const showNext = (index: number) => {
      if (index >= lines.length) {
        setIsDone(true);
        return;
      }
      setVisibleCount(index + 1);
      timer = setTimeout(() => showNext(index + 1), lineDelay);
    };

    timer = setTimeout(() => showNext(0), startDelay);

    return () => clearTimeout(timer);
  }, [lines, lineDelay, startDelay, reducedMotion]);

  return { visibleCount, isDone, reducedMotion };
}
