import { useEffect, useState } from 'react';
import { PanelLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import DocsSidebar from './DocsSidebar';
import DocsToc from './DocsToc';
import DocsPager from './DocsPager';
import DocsSampleNotice from './DocsSampleNotice';
import DocsMarkdown from './DocsMarkdown';
import DocsVideo from './DocsVideo';
import DocsDownload from './DocsDownload';

import type { DocPage, DocSection } from '@/hooks/useDocs';
import type { DocsUiCopy } from '@/data/docs/content';

interface DocsShellProps {
  sections: DocSection[];
  current: DocPage;
  prev: DocPage | null;
  next: DocPage | null;
  copy: DocsUiCopy;
  localized: (path: string) => string;
}

/**
 * Three-column documentation layout: persistent menu, content, on-page index.
 * Below `lg` the index is hidden and the menu becomes a panel opened by button —
 * no third mobile mechanism.
 */
const DocsShell = ({ sections, current, prev, next, copy, localized }: DocsShellProps) => {
  const [panelOpen, setPanelOpen] = useState(false);

  // Close the mobile panel whenever the page changes.
  useEffect(() => setPanelOpen(false), [current.slug]);

  return (
    <div className="container mx-auto px-6 pt-28 pb-14 md:pt-32 md:pb-20">
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_220px] xl:gap-14">
        {/* Menu — sticky on desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto overscroll-contain pr-2">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
              {copy.eyebrow}
            </p>
            <DocsSidebar
              sections={sections}
              activeSlug={current.slug}
              copy={copy}
              localized={localized}
            />
          </div>
        </div>

        {/* Content */}
        <article className="min-w-0">
          <div className="mb-8 lg:hidden">
            <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
              <SheetTrigger className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40">
                <PanelLeft className="h-4 w-4" aria-hidden="true" />
                {copy.menuButton}
              </SheetTrigger>
              <SheetContent side="left" className="w-[86vw] max-w-sm overflow-y-auto theme-sand border-border">
                <SheetTitle className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {copy.eyebrow}
                </SheetTitle>
                <DocsSidebar
                  sections={sections}
                  activeSlug={current.slug}
                  copy={copy}
                  localized={localized}
                  onNavigate={() => setPanelOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>

          <header className="mb-8">
            <h1 className="text-3xl md:text-[2.5rem] leading-[1.12] font-bold text-foreground">
              {current.title}
            </h1>
            {current.description && (
              <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                {current.description}
              </p>
            )}
            {current.updated_at && (
              <p className="mt-4 text-xs text-muted-foreground">
                {copy.updatedAt} {current.updated_at}
              </p>
            )}
          </header>

          {current.sample && <DocsSampleNotice message={copy.sampleNotice} />}

          {current.content_type === 'video' && current.video_id && (
            <DocsVideo videoId={current.video_id} title={current.title} playLabel={copy.playVideo} />
          )}

          {current.content_type === 'download' && current.file_url && (
            <DocsDownload
              href={current.file_url}
              label={current.file_label ?? copy.downloadLabel}
              actionLabel={copy.downloadAction}
            />
          )}

          <DocsMarkdown
            content={current.content}
            copyLabel={copy.copyCode}
            copiedLabel={copy.copiedCode}
          />


          <DocsPager prev={prev} next={next} copy={copy} localized={localized} />
        </article>

        {/* On-page index */}
        <DocsToc content={current.content} title={copy.tocTitle} />
      </div>
    </div>
  );
};

export default DocsShell;
