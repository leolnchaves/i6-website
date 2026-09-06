import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import type { Insight } from '@/hooks/useInsights';

interface Props {
  articles: Insight[];
}

/**
 * Régua numerada dos artigos mais recentes, na faixa grafite. Renderiza apenas
 * os artigos existentes — sem posições vazias nem números fantasma.
 */
const RecentStrip = ({ articles }: Props) => {
  const { t, language } = useLanguage();
  const localized = useLocalizedPath();
  const locale = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US';

  const list = articles.slice(0, 5);
  if (list.length === 0) return null;

  return (
    <section className="w-full bg-[#0B1224] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#F4845F]">
          {t('blog.recentTitle')}
        </h2>

        <ul className="mt-8 border-t border-white/10">
          {list.map((a, i) => (
            <li key={a.slug}>
              <Link
                to={localized(`/i6-blog/${a.slug}`)}
                className="group flex items-baseline gap-5 border-b border-white/10 py-5 md:gap-8"
              >
                <span className="font-display text-lg tabular-nums text-[#F4845F]/70 md:text-xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base leading-snug text-white transition-colors group-hover:text-[#F4845F] md:text-lg">
                    {a.title}
                  </span>
                  <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/45">
                    {(a.theme_label || a.theme) && (
                      <span className="uppercase tracking-[0.16em]">
                        {a.theme_label || a.theme}
                      </span>
                    )}
                    {a.date && (
                      <time dateTime={a.date}>
                        {new Date(a.date).toLocaleDateString(locale, {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </time>
                    )}
                    {a.read_time && (
                      <span>
                        {a.read_time} {t('blog.minRead')}
                      </span>
                    )}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F4845F]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RecentStrip;
