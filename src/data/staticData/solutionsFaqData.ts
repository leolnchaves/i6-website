// FAQ JTBD por produto real — fonte única para UI (SolutionsFAQ) e JSON-LD (FAQPage).
// Produtos: i6Signal (camada conversacional), i6Previsio (previsão), i6RecSys (recomendação),
// i6ElasticPrice (preço/elasticidade). Não existem produtos chamados i6Margin/i6Mix/i6Propensity —
// margem, mix e propensão são valores entregues pelos motores acima.

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
    subtitle: 'Respostas diretas sobre os motores proprietários e como eles entregam valor em demanda, mix, preço e propensão',
    productLabel: {
      i6Signal: 'i6Signal',
      i6Previsio: 'i6Previsio',
      i6RecSys: 'i6RecSys',
      i6ElasticPrice: 'i6ElasticPrice',
    },
    faqs: [
      // i6Signal — camada conversacional
      {
        id: 1,
        product: 'i6Signal',
        question: 'O que é o i6Signal e como ele se relaciona com os motores i6Previsio, i6RecSys e i6ElasticPrice?',
        answer: 'O i6Signal é a camada conversacional preditiva da infinity6. Ele consome as saídas dos três motores proprietários (i6Previsio para previsão de demanda, i6RecSys para recomendação e mix, i6ElasticPrice para precificação dinâmica) e traduz essas saídas em respostas, alertas e recomendações de ação para times de negócio, em linguagem natural.',
      },
      {
        id: 2,
        product: 'i6Signal',
        question: 'Times de negócio conseguem usar o i6Signal sem equipe de data science?',
        answer: 'Sim. O i6Signal foi desenhado para ser operado por times comerciais, de trade, de pricing e de operações. Toda a complexidade dos modelos preditivos fica encapsulada nos motores i6Previsio, i6RecSys e i6ElasticPrice. A interface conversacional entrega contexto, justificativa e próxima ação recomendada.',
      },
      // i6Previsio — demanda, ruptura, estoque
      {
        id: 3,
        product: 'i6Previsio',
        question: 'Como o i6Previsio reduz ruptura de gôndola (stockout) em varejo e farma?',
        answer: 'O i6Previsio aplica previsão de demanda preditiva por SKU e por PDV, com modelos adaptativos que ajustam projeções em função de sazonalidade, promoção, evento local e ruptura recente. Isso permite reposição antecipada, alocação inteligente de estoque e redução consistente da ruptura de gôndola, especialmente em categorias críticas de farma e perecíveis.',
      },
      {
        id: 4,
        product: 'i6Previsio',
        question: 'Como reduzir overstock e capital de giro parado com o i6Previsio?',
        answer: 'O i6Previsio substitui médias móveis e planilhas por previsão adaptativa. Ao aumentar a acurácia do planejamento de demanda, libera capital de giro travado em excesso de estoque, sem comprometer o nível de serviço. Em indústria, isso significa S&OP mais preciso; em varejo, menos liquidação forçada de saldo.',
      },
      {
        id: 5,
        product: 'i6Previsio',
        question: 'O i6Previsio funciona com sensoriamento de demanda em tempo real?',
        answer: 'Sim. Além do horizonte tático (semanas e meses), o i6Previsio incorpora sinais de curto prazo (sell-out diário, comportamento de busca, eventos locais) para fazer demand sensing e ajustar projeções dinamicamente, alimentando o i6Signal com alertas de desvio antes que virem ruptura ou sobra.',
      },
      // i6RecSys — recomendação, mix, conversão, propensão
      {
        id: 6,
        product: 'i6RecSys',
        question: 'Como o i6RecSys otimiza mix de produtos por loja ou região?',
        answer: 'O i6RecSys clusteriza PDVs por perfil de demanda e recomenda mix sortimento ideal por cluster, priorizando SKUs com maior probabilidade de giro naquele contexto. Isso aumenta vendas por metro quadrado, reduz cauda longa improdutiva e libera espaço para itens de alta rotação.',
      },
      {
        id: 7,
        product: 'i6RecSys',
        question: 'Como aumentar conversão em e-commerce com o i6RecSys?',
        answer: 'O i6RecSys aplica recomendação personalizada em tempo real, considerando histórico, contexto de sessão, jornada e elasticidade. Substitui regras estáticas de "quem comprou X também comprou Y" por modelagem comportamental, elevando taxa de conversão, ticket médio e itens por pedido.',
      },
      {
        id: 8,
        product: 'i6RecSys',
        question: 'Como calcular propensão de compra de clientes anônimos com o i6RecSys?',
        answer: 'O i6RecSys transforma sinais comportamentais em tempo real (origem, jornada, intenção, contexto) em score de propensão de compra mesmo sem login ou histórico. Combinado com segmentação preditiva de campanha, direciona esforço comercial aos visitantes com maior probabilidade de conversão e reduz CAC.',
      },
      // i6ElasticPrice — preço, margem, elasticidade
      {
        id: 9,
        product: 'i6ElasticPrice',
        question: 'Como o i6ElasticPrice protege margem em varejo e indústria?',
        answer: 'O i6ElasticPrice ajusta preços dinamicamente com base em elasticidade real medida por SKU, posicionamento competitivo, ciclo de vida e demanda projetada pelo i6Previsio. O resultado é proteção de margem de contribuição e redução significativa da necessidade de descontos forçados e liquidações de saldo.',
      },
      {
        id: 10,
        product: 'i6ElasticPrice',
        question: 'O i6ElasticPrice modela elasticidade dinâmica por SKU e canal?',
        answer: 'Sim. O motor estima curvas de elasticidade por SKU, canal e contexto promocional, e atualiza essas curvas continuamente com base em resposta de mercado. Isso permite políticas de pricing diferenciadas por canal (e-commerce, B2B, loja física) e por estágio do ciclo de vida do produto.',
      },
    ],
  },
  en: {
    title: 'Frequently asked questions about our AI',
    subtitle: 'Direct answers on the proprietary engines and how they deliver value across demand, mix, price and propensity',
    productLabel: {
      i6Signal: 'i6Signal',
      i6Previsio: 'i6Previsio',
      i6RecSys: 'i6RecSys',
      i6ElasticPrice: 'i6ElasticPrice',
    },
    faqs: [
      {
        id: 1,
        product: 'i6Signal',
        question: 'What is i6Signal and how does it relate to the i6Previsio, i6RecSys and i6ElasticPrice engines?',
        answer: 'i6Signal is infinity6\'s predictive conversational layer. It consumes the outputs of the three proprietary engines (i6Previsio for demand forecasting, i6RecSys for recommendation and mix, i6ElasticPrice for dynamic pricing) and translates them into answers, alerts and next-best-action recommendations for business teams, in natural language.',
      },
      {
        id: 2,
        product: 'i6Signal',
        question: 'Can business teams use i6Signal without a data science team?',
        answer: 'Yes. i6Signal is designed to be operated by commercial, trade, pricing and operations teams. All model complexity is encapsulated inside i6Previsio, i6RecSys and i6ElasticPrice. The conversational layer surfaces context, justification and the recommended next action.',
      },
      {
        id: 3,
        product: 'i6Previsio',
        question: 'How does i6Previsio reduce shelf stockouts in retail and pharma?',
        answer: 'i6Previsio applies predictive demand forecasting by SKU and by store, with adaptive models that adjust projections to seasonality, promotion, local events and recent stockouts. This enables earlier replenishment, intelligent inventory allocation and consistent stockout reduction, especially in critical pharma and perishable categories.',
      },
      {
        id: 4,
        product: 'i6Previsio',
        question: 'How to reduce overstock and trapped working capital with i6Previsio?',
        answer: 'i6Previsio replaces moving averages and spreadsheets with adaptive forecasting. By increasing demand planning accuracy, it frees working capital tied up in excess stock without compromising service levels. In manufacturing this means more accurate S&OP; in retail, fewer forced clearance markdowns.',
      },
      {
        id: 5,
        product: 'i6Previsio',
        question: 'Does i6Previsio support real-time demand sensing?',
        answer: 'Yes. In addition to the tactical horizon (weeks and months), i6Previsio incorporates short-term signals (daily sell-out, search behavior, local events) to perform demand sensing and dynamically adjust projections, feeding i6Signal with deviation alerts before they turn into stockouts or overstock.',
      },
      {
        id: 6,
        product: 'i6RecSys',
        question: 'How does i6RecSys optimize product mix by store or region?',
        answer: 'i6RecSys clusters stores by demand profile and recommends the optimal assortment mix per cluster, prioritizing SKUs with the highest turnover probability in that context. This increases sales per square meter, reduces unproductive long tail and frees shelf space for high-rotation items.',
      },
      {
        id: 7,
        product: 'i6RecSys',
        question: 'How to increase e-commerce conversion with i6RecSys?',
        answer: 'i6RecSys applies real-time personalized recommendation considering history, session context, journey and elasticity. It replaces static "customers who bought X also bought Y" rules with behavioral modeling, lifting conversion rate, average ticket and items per order.',
      },
      {
        id: 8,
        product: 'i6RecSys',
        question: 'How to score purchase propensity for anonymous customers with i6RecSys?',
        answer: 'i6RecSys turns real-time behavioral signals (source, journey, intent, context) into a purchase propensity score even without login or history. Combined with predictive campaign targeting, it focuses commercial effort on visitors with the highest conversion probability and lowers CAC.',
      },
      {
        id: 9,
        product: 'i6ElasticPrice',
        question: 'How does i6ElasticPrice protect margin in retail and manufacturing?',
        answer: 'i6ElasticPrice dynamically adjusts prices based on measured elasticity per SKU, competitive positioning, lifecycle stage and demand projected by i6Previsio. The result is contribution margin protection and a significant reduction in the need for forced discounts and clearance sales.',
      },
      {
        id: 10,
        product: 'i6ElasticPrice',
        question: 'Does i6ElasticPrice model dynamic elasticity by SKU and channel?',
        answer: 'Yes. The engine estimates elasticity curves by SKU, channel and promotional context, and continuously updates those curves based on market response. This enables differentiated pricing policies per channel (e-commerce, B2B, physical store) and per product lifecycle stage.',
      },
    ],
  },
};
