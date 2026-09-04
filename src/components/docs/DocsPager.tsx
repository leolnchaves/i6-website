import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { DocPage } from '@/hooks/useDocs';
import type { DocsUiCopy } from '@/data/docs/content';

interface DocsPagerProps {
  prev: DocPage | null;
  next: DocPage | null;
  copy: DocsUiCopy;
  localized: (path: string) => string;
}

const DocsPager = ({ prev, next, copy, localized }: DocsPagerProps) => {
  if (!prev && !next) return null;

  return (
    <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          to={localized(`/docs/${prev.slug}`)}
          className="sand-card sand-card-hover group flex flex-col gap-1 px-5 py-4"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.prev}
          </span>
          <span className="font-semibold text-foreground">{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}

      {next && (
        <Link
          to={localized(`/docs/${next.slug}`)}
          className="sand-card sand-card-hover group flex flex-col items-end gap-1 px-5 py-4 text-right sm:col-start-2"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {copy.next}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="font-semibold text-foreground">{next.title}</span>
        </Link>
      )}
    </nav>
  );
};

export default DocsPager;
