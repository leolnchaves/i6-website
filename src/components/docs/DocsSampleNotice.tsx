import { Info } from 'lucide-react';

interface DocsSampleNoticeProps {
  message: string;
}

/**
 * Shown only while a page carries `sample: true` in its frontmatter. The i6 HUB
 * sync never writes that flag, so publishing the real page removes the notice.
 */
const DocsSampleNotice = ({ message }: DocsSampleNoticeProps) => (
  <div
    role="note"
    className="mb-10 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/[0.07] px-4 py-3.5"
  >
    <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
    <p className="text-sm leading-relaxed text-foreground/85">{message}</p>
  </div>
);

export default DocsSampleNotice;
