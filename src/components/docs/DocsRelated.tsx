import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface DocsRelatedItem {
  slug: string;
  title: string;
}

interface DocsRelatedProps {
  items: DocsRelatedItem[];
  title: string;
  localized: (path: string) => string;
}

/**
 * "Related reading" list rendered after the page body. Plain text links with an
 * arrow — no cards, no chips. Renders nothing when there is nothing to suggest.
 */
const DocsRelated = ({ items, title, localized }: DocsRelatedProps) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label={title} className="mt-12 border-t border-border pt-6">
      <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
        {title}
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              to={localized(`/docs/${item.slug}`)}
              className="group inline-flex items-center gap-2 text-sm text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DocsRelated;
