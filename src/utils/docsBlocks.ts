/**
 * Line-oriented extensions to the documentation Markdown, kept deliberately
 * simple (regex only, no MDX compiler):
 *
 *   :::tab api Chamada direta à API      -> opens a method tab
 *   @video youtube <id> | title          -> inline video embed
 *   @download <asset-or-url> | label     -> inline PDF download card
 *
 * A file without any `:::tab` line behaves exactly as before: `tabs` is empty
 * and the whole body stays in `intro`.
 */

export interface DocTab {
  key: string;
  label: string;
  content: string;
}

export interface DocTabbedContent {
  intro: string;
  tabs: DocTab[];
}

const TAB_RE = /^\s{0,3}:::tab\s+([a-z0-9_-]+)\s*(.*)$/i;
const VIDEO_RE = /^\s{0,3}@video\s+([a-z]+)\s+(\S+)\s*(?:\|\s*(.*))?$/i;
const DOWNLOAD_RE = /^\s{0,3}@download\s+(\S+)\s*(?:\|\s*(.*))?$/i;

/** Splits a body into the shared intro plus the method tabs, in file order. */
export const parseDocTabs = (body: string): DocTabbedContent => {
  const lines = body.split(/\r?\n/);
  const intro: string[] = [];
  const tabs: DocTab[] = [];
  let current: { key: string; label: string; lines: string[] } | null = null;
  let inFence = false;

  const flush = () => {
    if (!current) return;
    tabs.push({
      key: current.key,
      label: current.label || current.key,
      content: current.lines.join('\n').trim(),
    });
    current = null;
  };

  for (const line of lines) {
    if (/^\s{0,3}(```|~~~)/.test(line)) inFence = !inFence;

    const match = inFence ? null : line.match(TAB_RE);
    if (match) {
      flush();
      current = { key: match[1].toLowerCase(), label: match[2].trim(), lines: [] };
      continue;
    }

    if (current) current.lines.push(line);
    else intro.push(line);
  }
  flush();

  return { intro: intro.join('\n').trim(), tabs };
};

export type DocInlineBlock =
  | { kind: 'markdown'; value: string }
  | { kind: 'video'; provider: string; videoId: string; title: string | null }
  | { kind: 'download'; source: string; label: string | null };

/** Splits a body into markdown chunks and the inline media markers between them. */
export const parseInlineBlocks = (body: string): DocInlineBlock[] => {
  const out: DocInlineBlock[] = [];
  let buffer: string[] = [];
  let inFence = false;

  const flush = () => {
    const value = buffer.join('\n').trim();
    buffer = [];
    if (value) out.push({ kind: 'markdown', value });
  };

  for (const line of body.split(/\r?\n/)) {
    if (/^\s{0,3}(```|~~~)/.test(line)) inFence = !inFence;

    if (!inFence) {
      const video = line.match(VIDEO_RE);
      if (video) {
        flush();
        out.push({
          kind: 'video',
          provider: video[1].toLowerCase(),
          videoId: video[2],
          title: video[3]?.trim() || null,
        });
        continue;
      }
      const download = line.match(DOWNLOAD_RE);
      if (download) {
        flush();
        out.push({
          kind: 'download',
          source: download[1],
          label: download[2]?.trim() || null,
        });
        continue;
      }
    }

    buffer.push(line);
  }
  flush();

  return out;
};

/** Removes tab and media marker lines, for heading extraction and search text. */
export const stripDocMarkers = (body: string): string =>
  body
    .split(/\r?\n/)
    .filter((line) => !TAB_RE.test(line) && !VIDEO_RE.test(line) && !DOWNLOAD_RE.test(line))
    .join('\n');

/** CDN pointers for files attached to documentation pages. */
const assetPointers = import.meta.glob('/src/assets/*.asset.json', { eager: true }) as Record<
  string,
  { default?: { url?: string }; url?: string }
>;

export const resolveAssetUrl = (value: unknown): string | null => {
  if (typeof value !== 'string' || !value) return null;
  if (/^https?:\/\//.test(value) || value.startsWith('/__l5e/')) return value;
  const file = value.split('/').pop()!;
  const entry = Object.entries(assetPointers).find(([path]) => path.endsWith(`/${file}`));
  if (!entry) return null;
  const mod = entry[1];
  return mod.default?.url ?? mod.url ?? null;
};

/** Active tab from a `?tab=` value, falling back to the first tab. */
export const resolveActiveTab = (tabs: DocTab[], param: string | null): DocTab | null => {
  if (tabs.length === 0) return null;
  const wanted = param ? param.toLowerCase() : null;
  return tabs.find((t) => t.key === wanted) ?? tabs[0];
};
