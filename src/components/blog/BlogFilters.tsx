import { useLanguage } from '@/contexts/LanguageContext';

interface ThemeOption {
  value: string;
  label: string;
}

interface Props {
  themes: ThemeOption[];
  tags: string[];
  activeTheme: string | null;
  activeTag: string | null;
  onThemeChange: (v: string | null) => void;
  onTagChange: (v: string | null) => void;
  /** Quantidade de artigos visíveis com os filtros atuais. */
  resultCount?: number;
}

const tabClass = (active: boolean) =>
  `relative pb-2 text-sm transition-colors ${
    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
  }`;

const chipClass = (active: boolean) =>
  `rounded-full border px-3 py-1 text-xs transition-colors ${
    active
      ? 'border-primary bg-primary/10 text-primary'
      : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
  }`;

/** Abas de tema com sublinhado terracota + chips de tag. Dados dinâmicos. */
const BlogFilters = ({
  themes,
  tags,
  activeTheme,
  activeTag,
  onThemeChange,
  onTagChange,
  resultCount,
}: Props) => {
  const { t } = useLanguage();
  if (themes.length === 0 && tags.length === 0) return null;

  return (
    <div className="border-b border-border pb-6">
      {themes.length > 0 && (
        <div className="flex flex-wrap items-end gap-x-7 gap-y-3">
          <button type="button" onClick={() => onThemeChange(null)} className={tabClass(activeTheme === null)}>
            {t('blog.filterAll')}
            {activeTheme === null && (
              <span className="absolute inset-x-0 -bottom-px h-[2px] bg-primary" aria-hidden="true" />
            )}
          </button>
          {themes.map((th) => (
            <button
              key={th.value}
              type="button"
              onClick={() => onThemeChange(th.value)}
              className={tabClass(activeTheme === th.value)}
            >
              {th.label}
              {activeTheme === th.value && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] bg-primary" aria-hidden="true" />
              )}
            </button>
          ))}
          {typeof resultCount === 'number' && (
            <span className="ml-auto pb-2 text-xs text-muted-foreground" aria-live="polite">
              {resultCount} {t('blog.articlesLabel')}
            </span>
          )}
        </div>
      )}

      {tags.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {t('blog.filterTags')}
          </span>
          <button type="button" onClick={() => onTagChange(null)} className={chipClass(activeTag === null)}>
            {t('blog.filterAll')}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagChange(tag)}
              className={chipClass(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogFilters;
