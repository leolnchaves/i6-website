import { supabase } from '@/integrations/supabase/client';

/**
 * Fire-and-forget tracker for the /kiosk experience.
 * Writes one row per user action into public.kiosk_events with a stable
 * namespaced key (e.g. "q1:r-growth", "results:predictive-personalization",
 * "ebook:growth"). No PII is stored.
 */
export function trackKioskEvent(eventKey: string): void {
  try {
    void supabase
      .from('kiosk_events')
      .insert({ event_key: eventKey })
      .then(({ error }) => {
        if (error && import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn('[kioskTracker] insert failed', error.message);
        }
      });
  } catch {
    // swallow — tracking must never break UX
  }
}
