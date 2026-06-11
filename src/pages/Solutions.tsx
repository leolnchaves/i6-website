import { memo, useMemo } from 'react';
import SolutionsHero from '@/components/solutions/SolutionsHero';
import StaticSolutionsGrid from '@/components/solutions/StaticSolutionsGrid';
import I6SignalDemo from '@/components/solutions/I6SignalDemo';
import SolutionsCTA from '@/components/solutions/SolutionsCTA';
import SEOHead from '@/components/common/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';

const Solutions = memo(() => {
  const { language } = useLanguage();

  const jsonLd = useMemo(() => {
    const faqs = language === 'pt'
      ? [
          {
            q: 'Como a Inteligência Artificial da infinity6 resolve a ruptura de estoque (stockout)?',
            a: 'Através do motor proprietário i6 RecSys, conectado ao i6Signal, a infinity6 antecipa o comportamento de consumo por PDV e otimiza o mix de produtos por região, garantindo alocação inteligente de estoque, o produto certo no lugar certo e redução consistente da ruptura de gôndola.',
          },
          {
            q: 'Como reduzir overstocking com machine learning?',
            a: 'O motor i6 Previsio aplica previsão de demanda preditiva com modelos adaptativos e autoaprendizes, substituindo planilhas e médias históricas. Isso aumenta a acurácia do planejamento de inventário, reduz excessos de estoque e libera capital de giro sem comprometer o nível de serviço.',
          },
          {
            q: 'Como proteger margem de lucro no varejo com inteligência artificial?',
            a: 'O motor i6 ElasticPrice ajusta preços dinamicamente com base em elasticidade, comportamento de demanda e ciclo de vida do produto. O resultado é proteção de margem, otimização da margem de contribuição e redução significativa da necessidade de descontos forçados e liquidações.',
          },
          {
            q: 'Como calcular propensão de compra de clientes anônimos?',
            a: 'A infinity6 transforma sinais comportamentais em tempo real em score de propensão de compra, mesmo sem login ou histórico. Combinado com clusterização de lojas e segmentação preditiva de campanha, isso direciona esforços comerciais aos canais e clientes com maior probabilidade de conversão, reduzindo CAC.',
          },
        ]
      : [
          {
            q: 'How does infinity6 AI solve stockouts and shelf rupture?',
            a: 'Through the proprietary i6 RecSys engine, connected to i6Signal, infinity6 anticipates consumer behavior by store and optimizes product mix by region, enabling intelligent inventory allocation, putting the right product in the right place and consistently reducing stockouts.',
          },
          {
            q: 'How to reduce overstocking with machine learning?',
            a: 'The i6 Previsio engine applies predictive demand forecasting with adaptive, self-learning models that replace spreadsheets and historical averages. This increases inventory planning accuracy, reduces excess stock and frees working capital without compromising service levels.',
          },
          {
            q: 'How to protect retail profit margin with AI?',
            a: 'The i6 ElasticPrice engine dynamically adjusts prices based on elasticity, demand behavior and product lifecycle. The result is margin protection, contribution margin optimization and a significant reduction in the need for forced discounts and clearance.',
          },
          {
            q: 'How to score purchase propensity for anonymous customers?',
            a: 'infinity6 turns real-time behavioral signals into a purchase propensity score, even without login or history. Combined with store clustering and predictive campaign targeting, this focuses commercial effort on the channels and customers with the highest conversion probability, lowering CAC.',
          },
        ];

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
  }, [language]);

  return (
    <>
      <SEOHead page="solutions" jsonLd={jsonLd} />
      <SolutionsHero />
      <StaticSolutionsGrid />
      <I6SignalDemo />
      <SolutionsCTA />
    </>
  );
});

Solutions.displayName = 'Solutions';

export default Solutions;
