/**
 * Canonical event names used across the site. Centralized so analytics
 * dashboards (GA4) and any future destinations see a stable vocabulary.
 */
export const TRACKER_EVENTS = {
  // Insights funnel
  INSIGHT_VIEW: 'insight_view',
  INSIGHT_DOWNLOAD_STARTED: 'insight_download_started',
  INSIGHT_DOWNLOAD_COMPLETED: 'insight_download_completed',
  INSIGHT_CTA_SUBMITTED: 'insight_cta_submitted',
  // Research funnel (i6 Research gated content)
  RESEARCH_VIEW: 'research_view',
  RESEARCH_UNLOCKED: 'research_unlocked',
  RESEARCH_CTA_SUBMITTED: 'research_cta_submitted',
  // Contact funnel
  CONTACT_FORM_STARTED: 'contact_form_started',
  CONTACT_FORM_SUBMITTED: 'contact_form_submitted',
  // Generic engagement
  CTA_CLICK: 'cta_click',
  SCROLL_75: 'scroll_75',
  // Kiosk (totem) experience
  KIOSK_SESSION_STARTED: 'kiosk_session_started',
  KIOSK_QUIZ_ANSWERED: 'kiosk_quiz_answered',
  KIOSK_QUIZ_COMPLETED: 'kiosk_quiz_completed',
  KIOSK_SOLUTION_SELECTED: 'kiosk_solution_selected',
  KIOSK_EBOOK_REQUESTED: 'kiosk_ebook_requested',
} as const;

export type TrackerEventName = (typeof TRACKER_EVENTS)[keyof typeof TRACKER_EVENTS];
