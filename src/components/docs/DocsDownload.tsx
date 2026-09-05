import { Download, FileText } from 'lucide-react';

interface DocsDownloadProps {
  href: string;
  label: string;
  actionLabel: string;
}

/** Highlight card for documentation pages of type `download`. */
const DocsDownload = ({ href, label, actionLabel }: DocsDownloadProps) => (
  <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-primary/30 bg-secondary/50 p-5 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 text-primary">
        <FileText className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="text-base font-semibold text-foreground">{label}</p>
    </div>
    <a
      href={href}
      download
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/50 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {actionLabel}
    </a>
  </div>
);

export default DocsDownload;
