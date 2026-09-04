import { useEffect, useState } from 'react';
import { extractHeadings } from '@/utils/headingSlug';

interface DocsTocProps {
  content: string;
  title: string;
}

/**
 * On-page index. Hidden below `lg` on purpose — on narrow screens the side menu
 * panel is the only secondary navigation, by design.
 */
const DocsToc = ({ content, title }: DocsTocProps) => {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
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

    return () => observer.disconnect();
    // ids are derived from content, so re-observe when the page changes
  }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </p>
        <ul className="space-y-1 border-l border-border text-sm">
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
