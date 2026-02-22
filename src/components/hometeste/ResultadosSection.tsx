import { useLanguage } from '@/contexts/LanguageContext';

const ResultadosSection = () => {
  const { language } = useLanguage();

  const copy = {
    pt: {
      title: 'Resultados que falam sozinhos',
      cases: [
        {
          segment: 'Farma',
          metrics: ['2.200 SKUs otimizados', '50 mil PDVs cobertos', 'R$ 100 MM em savings'],
        },
        {
          segment: 'Varejo',
          metrics: ['+36% positivação', '+23% ticket médio', 'Receita incremental comprovada'],
        },
        {
          segment: 'Financeiro',
          metrics: ['-57% custo de CRM', '12x mais conversão', 'ROI em 90 dias'],
        },
        {
          segment: 'Fashion',
          metrics: ['+2,6% conversão', '40% receita incremental', 'Preço dinâmico otimizado'],
        },
      ],
    },
    en: {
      title: 'Results that speak for themselves',
      cases: [
        {
          segment: 'Pharma',
          metrics: ['2,200 optimized SKUs', '50K points of sale', 'R$ 100M in savings'],
        },
        {
          segment: 'Retail',
          metrics: ['+36% activation rate', '+23% average ticket', 'Proven incremental revenue'],
        },
        {
          segment: 'Finance',
          metrics: ['-57% CRM cost', '12x more conversion', 'ROI in 90 days'],
        },
        {
          segment: 'Fashion',
          metrics: ['+2.6% conversion', '40% incremental revenue', 'Dynamic pricing optimized'],
        },
      ],
    },
  }[language];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1224] text-center mb-16">
          {copy.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {copy.cases.map((c) => (
            <div
              key={c.segment}
              className="rounded-2xl bg-[#0F172A] p-6 flex flex-col"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#F4845F] font-semibold mb-5">
                {c.segment}
              </span>
              <ul className="flex flex-col gap-3">
                {c.metrics.map((m, j) => (
                  <li key={j} className="text-white/90 text-sm leading-relaxed">
                    <span className="text-[#F4845F] font-bold">{m.split(' ')[0]}</span>{' '}
                    {m.split(' ').slice(1).join(' ')}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultadosSection;
