import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseTypewriterOptions {
  /** ms base por caractere */
  charDelay?: number;
  /** variação aleatória (±) aplicada por caractere */
  jitter?: number;
  /** pausa extra ao passar por uma quebra de linha */
  newlineDelay?: number;
  /** ms antes do primeiro caractere */
  startDelay?: number;
  /** ms de leitura com o cursor piscando antes de reiniciar o loop */
  holdDelay?: number;
}

interface UseTypewriterResult {
  /** Quantos caracteres do texto completo já foram digitados */
  typedCount: number;
  /** Se a digitação terminou (fase de leitura, cursor piscando) */
  isDone: boolean;
  /** Se o usuário prefere motion reduzida */
  reducedMotion: boolean;
  /** Congela/retoma a animação (hover, foco) */
  setPaused: (paused: boolean) => void;
}

/**
 * Animação typewriter caractere a caractere, em loop contínuo.
 * Cadência humana: `charDelay` ± `jitter` por caractere, com pausa extra em
 * cada quebra de linha. Ao terminar, mantém o bloco completo por `holdDelay`
 * (cursor piscando) e reinicia do zero.
 * Pode ser congelada via `setPaused` (hover/foco) — retoma de onde parou.
 * Com `prefers-reduced-motion`, devolve tudo pronto e nunca anima.
 */
export function useTypewriter(
  lines: string[],
  {
    charDelay = 40,
    jitter = 15,
    newlineDelay = 350,
    startDelay = 400,
    holdDelay = 5000,
  }: UseTypewriterOptions = {},
): UseTypewriterResult {
  const fullText = useMemo(() => lines.join('\n'), [lines]);
  const total = fullText.length;

  const [reducedMotion, setReducedMotion] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const pausedRef = useRef(false);

  const setPaused = useCallback((paused: boolean) => {
    pausedRef.current = paused;
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setTypedCount(total);
      setIsDone(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    setTypedCount(0);
    setIsDone(false);

    /** Agenda `fn` respeitando o estado de pausa (congela sem avançar). */
    const schedule = (fn: () => void, delay: number) => {
      if (cancelled) return;
      timer = setTimeout(() => {
        if (cancelled) return;
        if (pausedRef.current) {
          schedule(fn, 120);
          return;
        }
        fn();
      }, delay);
    };

    const typeNext = (index: number) => {
      if (index >= total) {
        setIsDone(true);
        // Fase de leitura, cursor piscando — depois reinicia do zero.
        schedule(() => {
          setTypedCount(0);
          setIsDone(false);
          schedule(() => typeNext(0), startDelay);
        }, holdDelay);
        return;
      }

      const next = index + 1;
      setTypedCount(next);

      const isNewline = fullText[index] === '\n';
      const wobble = Math.random() * jitter * 2 - jitter;
      const delay = Math.max(8, charDelay + wobble) + (isNewline ? newlineDelay : 0);

      schedule(() => typeNext(next), delay);
    };

    schedule(() => typeNext(0), startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fullText, total, charDelay, jitter, newlineDelay, startDelay, holdDelay, reducedMotion]);

  return { typedCount, isDone, reducedMotion, setPaused };
}
