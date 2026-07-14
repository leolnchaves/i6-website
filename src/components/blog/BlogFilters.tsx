import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  themes: string[];
  tags: string[];
  activeTheme: string | null;
  activeTag: string | null;
  onThemeChange: (v: string | null) => void;
  onTagChange: (v: string | null) => void;
}

const chipClass = (active: boolean) =>
  `px-3 py-1 rounded-full text-xs font-medium transition-all ${
    active ? 'bg-[#F4845F] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
  }`;

const BlogFilters = ({
  themes,
  tags,
  activeTheme,
  activeTag,
  onThemeChange,
  onTagChange,
}: Props) => {
  const { t } = useLanguage();
  if (themes.length === 0 && tags.length === 0) return null;

  return (
    <div className="mt-12 space-y-3">
      {themes.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-white/40 mr-2">
            {t('blog.filterTheme')}
          </span>
          <button onClick={() => onThemeChange(null)} className={chipClass(activeTheme === null)}>
            {t('blog.filterAll')}
          </button>
          {themes.map((th) => (
            <button key={th} onClick={() => onThemeChange(th)} className={chipClass(activeTheme === th)}>
              {th}
            </button>
          ))}
        </div>
      )}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-white/40 mr-2">
            {t('blog.filterTags')}
          </span>
          <button onClick={() => onTagChange(null)} className={chipClass(activeTag === null)}>
            {t('blog.filterAll')}
          </button>
          {tags.map((tag) => (
            <button key={tag} onClick={() => onTagChange(tag)} className={chipClass(activeTag === tag)}>
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogFilters;
