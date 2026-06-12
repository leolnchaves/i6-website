// FAQ JTBD em linguagem de negócio para a página Solutions.
// Mantemos os 4 ids de "product" para preservar tipagem/filtros/JSON-LD, mas os labels
// exibidos e os textos das perguntas/respostas usam nomes de solução de negócio
// (Forecasting, Recomendação & Mix, Pricing Dinâmico). Apenas o i6Signal — camada
// conversacional voltada ao usuário final — mantém seu nome de marca.

export interface SolutionsFAQ {
  id: number;
  product: 'i6Signal' | 'i6Previsio' | 'i6RecSys' | 'i6ElasticPrice';
  question: string;
  answer: string;
}

interface SolutionsFAQContent {
  title: string;
  subtitle: string;
  productLabel: Record<SolutionsFAQ['product'], string>;
  faqs: SolutionsFAQ[];
}

export const solutionsFaqContent: Record<'pt' | 'en', SolutionsFAQContent> = {
  pt: {
    title: 'Perguntas frequentes sobre nossa IA',
    subtitle: 'Respostas diretas sobre como nossas soluções entregam valor em demanda, mix, preço e propensão',
    productLabel: {
      i6Signal: 'i6Signal',
      i6Previsio: 'Forecasting',
      i6RecSys: 'Recomendação & Mix',
      i6ElasticPrice: 'Pricing Dinâmico',
    },
    faqs: [
      // i6Signal — camada conversacional (mantém marca)
      {
        id: 1,
        product: 'i6Signal',
        question: 'O que é o i6Signal e como ele se relaciona com nossas soluções de Forecasting, Recomendação e Pricing?',
        answer: 'O i6Signal é a camada conversacional preditiva da infinity6. Ele consome as saídas das nossas soluções de Forecasting e Predição de Demanda, Recomendação e Otimização de Mix e Pricing Dinâmico, e traduz essas saídas em respostas, alertas e recomendações de próxima ação para times de negócio, em linguagem natural.',
      },
      {
        id: 2,
        product: 'i6Signal',
        question: 'Times de negócio conseguem usar o i6Signal sem equipe de data science?',
        answer: 'Sim. O i6Signal foi desenhado para ser operado por times comerciais, de trade, de pricing e de operações. Toda a complexidade dos modelos preditivos fica encapsulada nas nossas soluções de Forecasting, Recomendação e Pricing. A interface conversacional entrega contexto, justificativa e a próxima ação recomendada.',
      },
      // Forecasting — demanda, ruptura, estoque
      {
        id: 3,
        product: 'i6Previsio',
        question: 'Como reduzir ruptura de gôndola (stockout) em varejo e farma com previsão de demanda preditiva?',
        answer: 'Nossa solução de Forecasting e Predição de Demanda aplica previsão por SKU e por PDV, com modelos adaptativos que ajustam projeções em função de sazonalidade, promoção, evento local e ruptura recente. Isso permite reposição antecipada, alocação inteligente de estoque e redução consistente da ruptura de gôndola, especialmente em categorias críticas de farma e perecíveis.',
      },
      {
        id: 4,
        product: 'i6Previsio',
        question: 'Como reduzir overstock e capital de giro parado com nossa solução de Forecasting e Predição de Demanda?',
        answer: 'Nossa solução de Forecasting substitui médias móveis e planilhas por previsão adaptativa. Ao aumentar a acurácia do planejamento de demanda, libera capital de giro travado em excesso de estoque, sem comprometer o nível de serviço. Em indústria, isso significa S&OP mais preciso; em varejo, menos liquidação forçada de saldo.',
      },
      {
        id: 5,
        product: 'i6Previsio',
        question: 'Como aplicar sensoriamento de demanda em tempo real para antecipar desvios de venda?',
        answer: 'Além do horizonte tático (semanas e meses), nossa solução de Forecasting incorpora sinais de curto prazo (sell-out diário, comportamento de busca, eventos locais) para fazer demand sensing e ajustar projeções dinamicamente, alimentando o i6Signal com alertas de desvio antes que virem ruptura ou sobra.',
      },
      // Recomendação & Mix
      {
        id: 6,
        product: 'i6RecSys',
        question: 'Como otimizar mix de produtos por loja ou região com nossa solução de Recomendação e Mix?',
        answer: 'Nossa solução de Recomendação e Otimização de Mix clusteriza PDVs por perfil de demanda e recomenda o sortimento ideal por cluster, priorizando SKUs com maior probabilidade de giro naquele contexto. Isso aumenta vendas por metro quadrado, reduz cauda longa improdutiva e libera espaço para itens de alta rotação.',
      },
      {
        id: 7,
        product: 'i6RecSys',
        question: 'Como aumentar conversão em e-commerce com recomendação personalizada em tempo real?',
        answer: 'Nossa solução de Recomendação aplica personalização em tempo real, considerando histórico, contexto de sessão, jornada e elasticidade. Substitui regras estáticas de "quem comprou X também comprou Y" por modelagem comportamental, elevando taxa de conversão, ticket médio e itens por pedido.',
      },
      {
        id: 8,
        product: 'i6RecSys',
        question: 'Como calcular propensão de compra de clientes anônimos sem login ou histórico?',
        answer: 'Nossa solução de Recomendação transforma sinais comportamentais em tempo real (origem, jornada, intenção, contexto) em score de propensão de compra mesmo sem login ou histórico. Combinada com segmentação preditiva de campanha, direciona esforço comercial aos visitantes com maior probabilidade de conversão e reduz CAC.',
      },
      // Pricing Dinâmico
      {
        id: 9,
        product: 'i6ElasticPrice',
        question: 'Como proteger margem em varejo e indústria com nossa solução de Pricing Dinâmico?',
        answer: 'Nossa solução de Pricing Dinâmico ajusta preços com base em elasticidade real medida por SKU, posicionamento competitivo, ciclo de vida e demanda projetada pela nossa solução de Forecasting. O resultado é proteção de margem de contribuição e redução significativa da necessidade de descontos forçados e liquidações de saldo.',
      },
      {
        id: 10,
        product: 'i6ElasticPrice',
        question: 'Como modelar elasticidade dinâmica de preço por SKU e canal?',
        answer: 'Nossa solução de Pricing Dinâmico estima curvas de elasticidade por SKU, canal e contexto promocional, e atualiza essas curvas continuamente com base em resposta de mercado. Isso permite políticas de pricing diferenciadas por canal (e-commerce, B2B, loja física) e por estágio do ciclo de vida do produto.',
      },
    ],
  },
  en: {
    title: 'Frequently asked questions about our AI',
    subtitle: 'Direct answers on how our solutions deliver value across demand, mix, price and propensity',
    productLabel: {
      i6Signal: 'i6Signal',
      i6Previsio: 'Forecasting',
      i6RecSys: 'Recommendation & Mix',
      i6ElasticPrice: 'Dynamic Pricing',
    },
    faqs: [
      {
        id: 1,
        product: 'i6Signal',
        question: 'What is i6Signal and how does it relate to our Forecasting, Recommendation and Pricing solutions?',
        answer: 'i6Signal is infinity6\'s predictive conversational layer. It consumes the outputs of our Demand Forecasting, Recommendation & Mix Optimization and Dynamic Pricing solutions, and translates them into answers, alerts and next-best-action recommendations for business teams, in natural language.',
      },
      {
        id: 2,
        product: 'i6Signal',
        question: 'Can business teams use i6Signal without a data science team?',
        answer: 'Yes. i6Signal is designed to be operated by commercial, trade, pricing and operations teams. All model complexity is encapsulated inside our Forecasting, Recommendation and Pricing solutions. The conversational layer surfaces context, justification and the recommended next action.',
      },
      {
        id: 3,
        product: 'i6Previsio',
        question: 'How to reduce shelf stockouts in retail and pharma with predictive demand forecasting?',
        answer: 'Our Demand Forecasting solution applies predictive forecasting by SKU and by store, with adaptive models that adjust projections to seasonality, promotion, local events and recent stockouts. This enables earlier replenishment, intelligent inventory allocation and consistent stockout reduction, especially in critical pharma and perishable categories.',
      },
      {
        id: 4,
        product: 'i6Previsio',
        question: 'How to reduce overstock and trapped working capital with our Demand Forecasting solution?',
        answer: 'Our Forecasting solution replaces moving averages and spreadsheets with adaptive forecasting. By increasing demand planning accuracy, it frees working capital tied up in excess stock without compromising service levels. In manufacturing this means more accurate S&OP; in retail, fewer forced clearance markdowns.',
      },
      {
        id: 5,
        product: 'i6Previsio',
        question: 'How to apply real-time demand sensing to anticipate sales deviations?',
        answer: 'In addition to the tactical horizon (weeks and months), our Forecasting solution incorporates short-term signals (daily sell-out, search behavior, local events) to perform demand sensing and dynamically adjust projections, feeding i6Signal with deviation alerts before they turn into stockouts or overstock.',
      },
      {
        id: 6,
        product: 'i6RecSys',
        question: 'How to optimize product mix by store or region with our Recommendation & Mix solution?',
        answer: 'Our Recommendation & Mix Optimization solution clusters stores by demand profile and recommends the optimal assortment per cluster, prioritizing SKUs with the highest turnover probability in that context. This increases sales per square meter, reduces unproductive long tail and frees shelf space for high-rotation items.',
      },
      {
        id: 7,
        product: 'i6RecSys',
        question: 'How to increase e-commerce conversion with real-time personalized recommendation?',
        answer: 'Our Recommendation solution applies real-time personalization considering history, session context, journey and elasticity. It replaces static "customers who bought X also bought Y" rules with behavioral modeling, lifting conversion rate, average ticket and items per order.',
      },
      {
        id: 8,
        product: 'i6RecSys',
        question: 'How to score purchase propensity for anonymous customers without login or history?',
        answer: 'Our Recommendation solution turns real-time behavioral signals (source, journey, intent, context) into a purchase propensity score even without login or history. Combined with predictive campaign targeting, it focuses commercial effort on visitors with the highest conversion probability and lowers CAC.',
      },
      {
        id: 9,
        product: 'i6ElasticPrice',
        question: 'How to protect margin in retail and manufacturing with our Dynamic Pricing solution?',
        answer: 'Our Dynamic Pricing solution adjusts prices based on measured elasticity per SKU, competitive positioning, lifecycle stage and demand projected by our Forecasting solution. The result is contribution margin protection and a significant reduction in the need for forced discounts and clearance sales.',
      },
      {
        id: 10,
        product: 'i6ElasticPrice',
        question: 'How to model dynamic price elasticity by SKU and channel?',
        answer: 'Our Dynamic Pricing solution estimates elasticity curves by SKU, channel and promotional context, and continuously updates those curves based on market response. This enables differentiated pricing policies per channel (e-commerce, B2B, physical store) and per product lifecycle stage.',
      },
    ],
  },
};
