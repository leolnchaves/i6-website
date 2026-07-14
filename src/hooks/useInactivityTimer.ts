import { useEffect, useRef, useCallback } from 'react';

/**
 * Fires `onTimeout` after `timeoutMs` of no user interaction.
 * Listens on document-level pointer/touch/key events. Enable/disable via `enabled`.
 * Call the returned `reset()` to manually restart the timer (e.g. after a state change).
 */
export function useInactivityTimer(onTimeout: () => void, timeoutMs: number, enabled: boolean) {
  const timerRef = useRef<number | null>(null);
  const cbRef = useRef(onTimeout);
  cbRef.current = onTimeout;

  const reset = useCallback(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    if (!enabled) return;
    timerRef.current = window.setTimeout(() => cbRef.current(), timeoutMs);
  }, [enabled, timeoutMs]);

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      return;
    }
    reset();
    const events: (keyof DocumentEventMap)[] = [
      'pointerdown',
      'pointermove',
      'touchstart',
      'keydown',
      'wheel',
    ];
    const handler = () => reset();
    events.forEach((e) => document.addEventListener(e, handler, { passive: true }));
    return () => {
      events.forEach((e) => document.removeEventListener(e, handler));
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [enabled, reset]);

  return reset;
}
