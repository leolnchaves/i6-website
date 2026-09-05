import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createHeadingIdFactory } from '@/utils/headingSlug';
import DocsCodeBlock from './DocsCodeBlock';
import { useLocalizedPath } from '@/utils/localizedPath';
import type { MouseEvent, ReactNode } from 'react';

/**
 * Markdown renderer used ONLY by the documentation area.
 * Heading ids come from the shared factory in `@/utils/headingSlug`, the same
 * one `DocsToc` uses, so index links and anchors always match.
 */
const flatten = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(flatten).join('');
  const el = node as { props?: { children?: ReactNode } };
  return el.props ? flatten(el.props.children) : '';
};

interface DocsMarkdownProps {
  content: string;
  copyLabel: string;
  copiedLabel: string;
}

/** True for hrefs that point at another documentation page of this very site. */
const isInternalDocHref = (href?: string): boolean => {
  if (!href) return false;
  if (/^(https?:|mailto:|tel:|#|\/\/)/i.test(href)) return false;
  if (/^\/(pt|en|es)\/docs(\/|$)/.test(href)) return true;
  if (/^\/docs(\/|$)/.test(href)) return true;
  // Relative, schemeless links such as "docs/guia" or "./docs/guia".
  return /^\.{0,2}\/?docs(\/|$)/.test(href);
};

const DocsMarkdown = ({ content, copyLabel, copiedLabel }: DocsMarkdownProps) => {
  const navigate = useNavigate();
  const localized = useLocalizedPath();

  const handleInternalClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    // Preserve native behaviour for new tab / new window intents.
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const path = href.replace(/^\.{0,2}\//, '/').replace(/^(?!\/)/, '/');
    navigate(/^\/(pt|en|es)\//.test(path) ? path : localized(path));
  };

  // Recreated on every render and consumed synchronously in document order,
  // mirroring extractHeadings() exactly.
  const nextId = createHeadingIdFactory();



  return (
    <div className="max-w-none text-[0.975rem] md:text-base leading-relaxed text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2
              id={nextId(flatten(children))}
              className="scroll-mt-28 mt-12 mb-4 text-2xl md:text-[1.75rem] font-bold text-foreground first:mt-0"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              id={nextId(flatten(children))}
              className="scroll-mt-28 mt-9 mb-3 text-lg md:text-xl font-semibold text-foreground"
            >
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-5 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-5">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          a: ({ href, children }) => {
            const internal = isInternalDocHref(href);
            return (
              <a
                href={href}
                onClick={internal ? (event) => handleInternalClick(event, href!) : undefined}
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                {children}
              </a>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="mb-6 border-l-2 border-primary pl-5 italic text-foreground/80">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = typeof className === 'string' && className.includes('language-');
            if (isBlock) {
              return (
                <code className="block whitespace-pre overflow-x-auto font-mono text-[0.85rem] leading-relaxed text-foreground/90">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <DocsCodeBlock copyLabel={copyLabel} copiedLabel={copiedLabel}>
              {children}
            </DocsCodeBlock>
          ),

          table: ({ children }) => (
            <div className="mb-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-border bg-secondary/60 px-4 py-2.5 text-left font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="border-b border-border px-4 py-2.5 align-top">{children}</td>,
          hr: () => <hr className="my-10 border-border" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default DocsMarkdown;
