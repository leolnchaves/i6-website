import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { extractHeadings } from '@/utils/headingSlug';
import { parseDocTabs, resolveActiveTab, stripDocMarkers } from '@/utils/docsBlocks';

interface DocsTocProps {
  content: string;
  title: string;
}

/** Distance from the document bottom (px) at which the last heading takes over. */
const BOTTOM_THRESHOLD = 24;

/**
 * On-page index. Hidden below `xl` on purpose — the shell only reserves a third
 * column from `xl` up, and on narrower screens the side menu panel is the only
 * secondary navigation, by design.
 *
 * Highlighting uses a SINGLE piece of state. Two mechanisms feed it, but they
 * never compete: while the viewport sits within `BOTTOM_THRESHOLD` of the end of
 * the document, the last heading wins and IntersectionObserver updates are
 * ignored, so there is no flicker when scrolling near the bottom.
 */
const DocsToc = ({ content, title }: DocsTocProps) => {
  const [searchParams] = useSearchParams();
  const { intro, tabs } = parseDocTabs(content);
  const activeTab = resolveActiveTab(tabs, searchParams.get('tab'));

  // Only what is actually on screen: the shared intro plus the active tab.
  const visible = stripDocMarkers(activeTab ? `${intro}\n\n${activeTab.content}` : content);
  const headings = extractHeadings(visible);
  const [activeId, setActiveId] = useState<string>('');
  const atBottomRef = useRef(false);
  const listRef = useRef<HTMLUListElement>(null);
  const lastId = headings.length > 0 ? headings[headings.length - 1].id : '';

  const isAtBottom = useCallback(
    () =>
      document.documentElement.scrollHeight - window.scrollY - window.innerHeight <=
      BOTTOM_THRESHOLD,
    [],
  );

  useEffect(() => {
    // Tab switches change the heading set: clear the highlight and the
    // end-of-document flag BEFORE re-observing, so the previous tab's section
    // can never stay pinned and never competes with the observer.
    atBottomRef.current = false;
    setActiveId('');

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // End-of-document has priority: ignore observer updates in that window.
        if (atBottomRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -65% 0px', threshold: 0 },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const bottom = isAtBottom();
        if (bottom === atBottomRef.current) return;
        atBottomRef.current = bottom;
        // Entering the bottom window pins the last heading; leaving it hands
        // control back to the observer on its next callback.
        if (bottom && lastId) setActiveId(lastId);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    // Initial highlight from the current scroll position: the observer only
    // fires on change, so after a tab switch the closest heading above the
    // viewport is chosen right away instead of leaving the index blank.
    if (!atBottomRef.current) {
      let initial = headings[0].id;
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el && el.getBoundingClientRect().top <= 140) initial = heading.id;
      }
      setActiveId(initial);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
    // ids are derived from the visible content, so re-observe when the page or
    // the active tab changes
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the active item visible when the index itself has an inner scrollbar.
  useEffect(() => {
    const list = listRef.current;
    if (!activeId || !list) return;
    if (list.scrollHeight <= list.clientHeight + 1) return;
    const item = list.querySelector<HTMLAnchorElement>(`a[href="#${CSS.escape(activeId)}"]`);
    if (!item) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    item.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  }, [activeId]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-28 max-h-[calc(100vh-9rem)] flex flex-col">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </p>
        <ul
          ref={listRef}
          className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain border-l border-border text-sm"
        >
          {headings.map((heading) => {
            const active = heading.id === activeId;
            return (
              <li key={heading.id} className="relative">
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-px top-1 bottom-1 w-[2px] rounded-full bg-primary"
                  />
                )}
                <a
                  href={`#${heading.id}`}
                  className={`block py-1.5 pr-2 transition-colors ${
                    heading.depth === 3 ? 'pl-7' : 'pl-4'
                  } ${active ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default DocsToc;
