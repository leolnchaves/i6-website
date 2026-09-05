import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';

interface DocsCodeBlockProps {
  children: ReactNode;
  copyLabel: string;
  copiedLabel: string;
}

/**
 * Code block used ONLY inside the documentation Markdown renderer.
 * Copy feedback is both visual (Copy -> Check) and announced through a polite
 * live region, so screen reader users get the same confirmation.
 */
const DocsCodeBlock = ({ children, copyLabel, copiedLabel }: DocsCodeBlockProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const timer = useRef<number>();
  const [copied, setCopied] = useState(false);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? '';
    if (!text) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
      }
    } catch {
      return; // silent: no false confirmation
    }

    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mb-6">
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-xl border border-border bg-secondary/70 p-4 pr-14"
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? copiedLabel : copyLabel}
        title={copied ? copiedLabel : copyLabel}
        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground opacity-0 transition-all hover:border-primary/40 hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group-hover:opacity-100"
      >
        {copied ? (
          <Check className="h-4 w-4 text-primary" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ''}
      </span>
    </div>
  );
};

export default DocsCodeBlock;
