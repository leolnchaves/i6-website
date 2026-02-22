import { useLanguage } from '@/contexts/LanguageContext';

const rotations = ['-1.5deg', '1deg', '-0.5deg', '1.5deg'];

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
    <section className="py-24 md:py-32 bg-[#0B1224]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-16">
          {copy.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start overflow-visible">
          {copy.cases.map((c, i) => (
            <div
              key={c.segment}
              className="group rounded-3xl border-l-4 border-[#F4845F] bg-gradient-to-br from-[#0F172A] to-[#162038] p-6 flex flex-col shadow-[0_0_30px_rgba(244,132,95,0.06)] transition-all duration-300 hover:!rotate-0 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(244,132,95,0.15)] cursor-default"
              style={{ transform: `rotate(${rotations[i]})` }}
            >
              <span className="inline-block bg-[#F4845F]/10 text-[#F4845F] rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold mb-5 w-fit">
                {c.segment}
              </span>
              <ul className="flex flex-col gap-0">
                {c.metrics.map((m, j) => {
                  const parts = m.split(' ');
                  const value = parts[0];
                  const label = parts.slice(1).join(' ');
                  return (
                    <li
                      key={j}
                      className={`py-3 ${j < c.metrics.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      <span className="text-base font-bold text-[#F4845F] block">{value}</span>
                      <span className="text-white/60 text-sm">{label}</span>
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
