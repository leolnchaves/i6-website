import { useLanguage } from '@/contexts/LanguageContext';

const ResultadosSection = () => {
  const { language } = useLanguage();

  const copy = {
    pt: {
      title: 'Resultados em movimento: onde a IA encontra o crescimento do negócio.',
        cases: [
        {
          segment: 'Farma',
          metrics: [
            { value: '2.200', label: 'SKUs otimizados' },
            { value: '95 mil', label: 'comportamentos de PDVs mapeados' },
            { value: 'R$ 100 milhões em savings', label: 'ao antecipar sinais de incineração, ruptura e overstocking.' },
          ],
        },
        {
          segment: 'Varejo',
          metrics: [
            { value: '1.400', label: 'SKUs otimizados' },
            { value: '50 mil', label: 'comportamentos de PDVs mapeados' },
            { value: '', label: '', richLabel: true },
          ],
        },
        {
          segment: 'Financeiro',
          metrics: [
            { value: '-57%', label: 'custo de CRM' },
            { value: '12x', label: 'mais conversão' },
            { value: 'ROI', label: 'em 90 dias' },
          ],
        },
        {
          segment: 'Fashion',
          metrics: [
            { value: '+2,6%', label: 'conversão' },
            { value: '40%', label: 'receita incremental' },
            { value: 'Preço dinâmico', label: 'otimizado' },
          ],
        },
      ],
    },
    en: {
      title: 'Results in motion: where AI meets business growth.',
        cases: [
        {
          segment: 'Pharma',
          metrics: [
            { value: '2,200', label: 'optimized SKUs' },
            { value: '95K', label: 'mapped POS behaviors' },
            { value: 'R$ 100 million in savings', label: 'by anticipating incineration, stockout and overstocking signals.' },
          ],
        },
        {
          segment: 'Retail',
          metrics: [
            { value: '1,400', label: 'optimized SKUs' },
            { value: '50K', label: 'mapped POS behaviors' },
            { value: '', label: '', richLabel: true },
          ],
        },
        {
          segment: 'Finance',
          metrics: [
            { value: '-57%', label: 'CRM cost' },
            { value: '12x', label: 'more conversion' },
            { value: 'ROI', label: 'in 90 days' },
          ],
        },
        {
          segment: 'Fashion',
          metrics: [
            { value: '+2.6%', label: 'conversion' },
            { value: '40%', label: 'incremental revenue' },
            { value: 'Dynamic pricing', label: 'optimized' },
          ],
        },
      ],
    },
  }[language];

  return (
    <section className="py-14 md:py-20 bg-[#0B1224]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-16">
          {copy.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {copy.cases.map((c, i) => (
            <div
              key={c.segment}
              className="group rounded-3xl border-l-4 border-[#F4845F] bg-gradient-to-br from-[#0F172A] to-[#162038] p-6 flex flex-col shadow-[0_0_30px_rgba(244,132,95,0.06)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(244,132,95,0.15)] cursor-default"
            >
              <span className="inline-block bg-[#F4845F]/10 text-[#F4845F] rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold mb-5 w-fit">
                {c.segment}
              </span>
              <ul className="flex flex-col gap-0">
                {c.metrics.map((m, j) => {
                  return (
                    <li
                      key={j}
                      className={`py-3 ${j < c.metrics.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      {m.richLabel ? (
                        <span className="text-white/60 text-sm">
                          <span className="text-base font-bold text-[#F4845F]">{language === 'pt' ? '+36%' : '+36%'}</span>{' '}
                          {language === 'pt' ? 'positivação de produtos' : 'product activation'}{' '}
                          <span className="text-base font-bold text-[#F4845F]">{language === 'pt' ? '+23%' : '+23%'}</span>{' '}
                          {language === 'pt' ? 'ticket médio por PDV.' : 'average ticket per POS.'}
                        </span>
                      ) : (
                        <>
                          <span className="text-base font-bold text-[#F4845F] block">{m.value}</span>
                          <span className="text-white/60 text-sm">{m.label}</span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultadosSection;
