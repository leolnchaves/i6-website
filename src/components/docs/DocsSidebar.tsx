import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import type { DocPage, DocSection } from '@/hooks/useDocs';
import type { DocsUiCopy } from '@/data/docs/content';

const normalize = (v: string) =>
  v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/** Strips the basic Markdown noise so snippets read as plain prose. */
const toPlainText = (md: string) =>
  md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/[*_~]{1,3}/g, '')
    .replace(/\|/g, ' ')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

const SNIPPET = 140;

interface Match {
  page: DocPage;
  weight: number;
  snippet: string | null;
}

/** Builds a ~140 char excerpt around the first occurrence of `q`. */
const buildSnippet = (content: string, q: string): string | null => {
  const plain = toPlainText(content);
  const idx = normalize(plain).indexOf(q);
  if (idx === -1) return null;
  const half = Math.floor((SNIPPET - q.length) / 2);
  let start = Math.max(0, idx - half);
  let end = Math.min(plain.length, idx + q.length + half);
  if (start > 0) {
    const space = plain.indexOf(' ', start);
    if (space !== -1 && space < idx) start = space + 1;
  }
  if (end < plain.length) {
    const space = plain.lastIndexOf(' ', end);
    if (space > idx + q.length) end = space;
  }
  return `${start > 0 ? '…' : ''}${plain.slice(start, end).trim()}${end < plain.length ? '…' : ''}`;
};

/** Highlight without dangerouslySetInnerHTML: split on the normalized match. */
const Highlight = ({ text, query }: { text: string; query: string }) => {
  const nText = normalize(text);
  const parts: Array<{ value: string; hit: boolean }> = [];
  let cursor = 0;
  let idx = nText.indexOf(query);
  while (idx !== -1 && query) {
    if (idx > cursor) parts.push({ value: text.slice(cursor, idx), hit: false });
    parts.push({ value: text.slice(idx, idx + query.length), hit: true });
    cursor = idx + query.length;
    idx = nText.indexOf(query, cursor);
  }
  if (cursor < text.length) parts.push({ value: text.slice(cursor), hit: false });

  return (
    <>
      {parts.map((part, i) =>
        part.hit ? (
          <mark key={i} className="rounded bg-primary/20 px-0.5 text-foreground">
            {part.value}
          </mark>
        ) : (
          <span key={i}>{part.value}</span>
        ),
      )}
    </>
  );
};

interface DocsSidebarProps {
  sections: DocSection[];
  activeSlug?: string;
  copy: DocsUiCopy;
  localized: (path: string) => string;
  onNavigate?: () => void;
}

/** Persistent documentation navigation: full-text search + sections + pages. */
const DocsSidebar = ({ sections, activeSlug, copy, localized, onNavigate }: DocsSidebarProps) => {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');

  // ~200ms debounce: filtering + snippet extraction runs over full page bodies.
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(query), 200);
    return () => window.clearTimeout(id);
  }, [query]);

  const q = normalize(debounced).trim();

  const results = useMemo<Match[]>(() => {
    if (!q) return [];
    const out: Match[] = [];
    sections.forEach((section) => {
      section.pages.forEach((page) => {
        const inTitle = normalize(page.title).includes(q);
        const inDescription = page.description ? normalize(page.description).includes(q) : false;
        const snippet = buildSnippet(page.content, q);
        if (!inTitle && !inDescription && !snippet) return;
        out.push({
          page,
          weight: inTitle ? 3 : inDescription ? 2 : 1,
          snippet: snippet ?? (inDescription ? page.description : null),
        });
      });
    });
    return out.sort((a, b) => b.weight - a.weight);
  }, [sections, q]);

  const searching = q.length > 0;

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

      <p aria-live="polite" className="sr-only">
        {searching ? copy.resultsCount.replace('{count}', String(results.length)) : ''}
      </p>

      {searching ? (
        results.length === 0 ? (
          <p className="text-muted-foreground">{copy.noResults}</p>
        ) : (
          <ul className="space-y-3">
            {results.map(({ page, snippet }) => (
              <li key={`${page.section}-${page.slug}`}>
                <Link
                  to={localized(`/docs/${page.slug}`)}
                  onClick={onNavigate}
                  aria-current={page.slug === activeSlug ? 'page' : undefined}
                  className="block rounded-xl border border-border bg-card/60 px-3 py-2.5 transition-colors hover:border-primary/40"
                >
                  <span className="block font-semibold text-foreground">
                    <Highlight text={page.title} query={q} />
                    {page.sample && (
                      <span className="ml-1.5 font-normal text-[11px] text-muted-foreground">
                        {copy.sampleTag}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-primary">
                    {page.section_label}
                  </span>
                  {snippet && (
                    <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">
                      <Highlight text={snippet} query={q} />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : (
        <div className="space-y-7">
          {sections.map((section) => (
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
