import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { realResults } from '@/data/staticData/realResults';

interface Props {
  /** Optional title above the strip. If omitted, only the KPIs render. */
  title?: string;
  /** Compact variant for the Home (smaller numbers, tighter spacing). */
  compact?: boolean;
  /** Optional explicit subset of slugs (defaults to all). */
  slugs?: string[];
}

const RealResultsStrip = memo(({ title, compact, slugs }: Props) => {
  const { language } = useLanguage();
  const items = slugs
    ? slugs.map((s) => realResults.find((r) => r.slug === s)).filter(Boolean) as typeof realResults
    : realResults;

  const heading = title ?? (language === 'pt' ? 'Resultados reais em produção' : 'Real results in production');
  const caption = language === 'pt'
    ? 'Dados anonimizados de clientes infinity6. Métricas medidas em produção após o deploy dos motores proprietários.'
    : 'Anonymized data from infinity6 clients. Metrics measured in production after deploying the proprietary engines.';

  return (
    <section className={`relative ${compact ? 'py-12 md:py-16' : 'py-16 md:py-20'} bg-[#0B1224] border-t border-white/5`}>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-2">
              {language === 'pt' ? 'Provas em números' : 'Proof in numbers'}
            </p>
            <h2 className={`${compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-bold text-white`}>
              {heading}
            </h2>
          </div>
          <p className="text-xs text-white/45 max-w-sm leading-relaxed">{caption}</p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 border border-white/5 rounded-lg overflow-hidden">
          {items.map((kpi) => (
            <li
              key={kpi.slug}
              className="bg-[#0B1224] p-4 md:p-5 flex flex-col items-start"
            >
              <span
                className={`${compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-bold text-[#F4845F] leading-none mb-2`}
              >
                {kpi.value}
              </span>
              <span className="text-[11px] md:text-xs text-white/70 leading-snug">
                {kpi.label[language]}
              </span>
              <span className="text-[10px] text-white/35 mt-2 uppercase tracking-wider">
                {kpi.source[language]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

RealResultsStrip.displayName = 'RealResultsStrip';
export default RealResultsStrip;
