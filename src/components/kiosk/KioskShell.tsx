import { useEffect, useRef, type ReactNode } from 'react';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';

interface Props {
  children: ReactNode;
  inactivityMs: number;
  onInactive: () => void;
  active: boolean;
}

/**
 * Wraps kiosk pages with:
 * - locked overflow, no text selection, no context menu
 * - `touch-action: manipulation` (kills double-tap zoom + 300ms tap delay)
 * - inactivity auto-reset while `active` is true
 * - a background gradient stack that fills the viewport in portrait
 */
const KioskShell = ({ children, inactivityMs, onInactive, active }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  useInactivityTimer(onInactive, inactivityMs, active);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.cssText;
    const prevBody = body.style.cssText;
    html.style.background = '#0B1224';
    body.style.background = '#0B1224';
    body.style.overflow = 'hidden';
    body.style.userSelect = 'none';
    (body.style as unknown as { webkitUserSelect: string }).webkitUserSelect = 'none';
    body.style.touchAction = 'manipulation';

    const prevent = (e: Event) => e.preventDefault();
    document.addEventListener('contextmenu', prevent);
    document.addEventListener('gesturestart', prevent as EventListener);

    return () => {
      html.style.cssText = prevHtml;
      body.style.cssText = prevBody;
      document.removeEventListener('contextmenu', prevent);
      document.removeEventListener('gesturestart', prevent as EventListener);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 overflow-hidden bg-[#0B1224] text-white"
      style={{ touchAction: 'manipulation' }}
    >
      {/* Ambient gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 0%, rgba(244,132,95,0.20) 0%, rgba(11,18,36,0) 45%), radial-gradient(ellipse at 70% 100%, rgba(244,132,95,0.10) 0%, rgba(11,18,36,0) 50%)',
        }}
      />
      <div className="relative h-full w-full overflow-y-auto overflow-x-hidden">{children}</div>
    </div>
  );
};

export default KioskShell;
