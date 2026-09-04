import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import type { DocSection } from '@/hooks/useDocs';
import type { DocsUiCopy } from '@/data/docs/content';

const normalize = (v: string) =>
  v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

interface DocsSidebarProps {
  sections: DocSection[];
  activeSlug?: string;
  copy: DocsUiCopy;
  localized: (path: string) => string;
  onNavigate?: () => void;
}

/** Persistent documentation navigation: search field + sections + pages. */
const DocsSidebar = ({ sections, activeSlug, copy, localized, onNavigate }: DocsSidebarProps) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return sections;
    return sections
      .map((section) => ({
        ...section,
        pages: section.pages.filter((p) => normalize(p.title).includes(q)),
      }))
      .filter((section) => section.pages.length > 0);
  }, [sections, query]);

  return (
    <nav aria-label={copy.title} className="text-sm">
      <label className="relative block mb-6">
        <span className="sr-only">{copy.searchLabel}</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={copy.searchPlaceholder}
          className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
        />
      </label>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">{copy.noResults}</p>
      ) : (
        <div className="space-y-7">
          {filtered.map((section) => (
            <div key={section.key}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                {section.label}
              </p>
              <ul className="space-y-1 border-l border-border">
                {section.pages.map((page) => {
                  const active = page.slug === activeSlug;
                  return (
                    <li key={page.slug} className="relative">
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute -left-px top-1 bottom-1 w-[2px] rounded-full bg-primary"
                        />
                      )}
                      <Link
                        to={localized(`/docs/${page.slug}`)}
                        onClick={onNavigate}
                        aria-current={active ? 'page' : undefined}
                        className={`block py-1.5 pl-4 pr-2 transition-colors ${
                          active
                            ? 'font-semibold text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {page.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default DocsSidebar;
