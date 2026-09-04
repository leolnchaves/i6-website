import { useEffect, useRef, useState } from 'react';

/** True quando o usuário pediu menos movimento no sistema */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Revela um bloco quando ele entra na viewport.
 * Com prefers-reduced-motion, entrega `revealed = true` de imediato.
 */
export const useRevealOnScroll = <T extends HTMLElement = HTMLDivElement>(
  rootMargin = '-12% 0px'
) => {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return { ref, revealed };
};

/** Classe utilitária de entrada (fade + deslocamento curto) */
export const revealClass = (revealed: boolean, delayMs = 0): string =>
  [
    'transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none',
    revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0',
  ].join(' ') + (delayMs ? ` [transition-delay:${delayMs}ms]` : '');
