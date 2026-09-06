import BlogCard from './BlogCard';
import type { Insight } from '@/hooks/useInsights';

interface Props {
  title: string;
  articles: Insight[];
}

/**
 * Grupo por tema com grade assimétrica.
 * - 5+ artigos: 1 destaque (2 colunas) + compactos.
 * - 3–4 artigos: todos compactos em três colunas.
 * - 1–2 artigos: todos compactos em até duas colunas.
 * Nenhuma posição vazia é criada em nenhum dos casos.
 */
const ThemeRail = ({ title, articles }: Props) => {
  if (articles.length === 0) return null;

  const useFeature = articles.length >= 5;
  const featured = useFeature ? articles[0] : null;
  const rest = useFeature ? articles.slice(1) : articles;

  const restGrid = useFeature
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    : articles.length >= 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2';

  return (
    <section className="mt-14 first:mt-10">
      <h2 className="font-display text-xl tracking-tight text-foreground md:text-2xl">{title}</h2>
      <div className="mt-6 space-y-6">
        {featured && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <BlogCard article={featured} variant="feature" />
            </div>
          </div>
        )}
        <div className={`grid gap-6 ${restGrid}`}>
          {rest.map((a) => (
            <BlogCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemeRail;
