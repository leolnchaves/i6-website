/**
 * Single source of truth for documentation heading ids.
 *
 * Both the on-page table of contents (`DocsToc`) and the markdown renderer
 * (`DocsMarkdown`) import from here, so the anchor written in the HTML and the
 * anchor the index links to can never drift apart.
 */

/** "Códigos de Erro (400/401)" -> "codigos-de-erro-400-401" */
export const slugifyHeading = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Occurrence-aware id factory. Repeated headings inside the same page get
 * `-2`, `-3`, ... in document order. Create one per document and feed it the
 * heading texts in the order they appear.
 */
export const createHeadingIdFactory = () => {
  const seen: Record<string, number> = {};
  return (text: string): string => {
    const base = slugifyHeading(text) || 'section';
    seen[base] = (seen[base] ?? 0) + 1;
    return seen[base] === 1 ? base : `${base}-${seen[base]}`;
  };
};

export interface DocHeading {
  depth: 2 | 3;
  text: string;
  id: string;
}

/** Plain-text a heading line so the index matches the rendered text. */
const stripInline = (raw: string): string =>
  raw
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

/** Extract h2/h3 headings from markdown, skipping fenced code blocks. */
export const extractHeadings = (markdown: string): DocHeading[] => {
  const nextId = createHeadingIdFactory();
  const out: DocHeading[] = [];
  let inFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s{0,3}(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(/^\s{0,3}(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;

    const text = stripInline(match[2]);
    if (!text) continue;

    out.push({
      depth: match[1].length === 2 ? 2 : 3,
      text,
      id: nextId(text),
    });
  }

  return out;
};
