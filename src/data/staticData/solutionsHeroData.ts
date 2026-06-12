export interface SolutionsHeroData {
  mainTitle: string;
  mainSubtitle: string;
  mainSuffix: string;
  description: string;
}

export const solutionsHeroData: Record<string, SolutionsHeroData> = {
  en: {
    mainTitle: 'Predictive AI that',
    mainSubtitle: 'anticipates',
    mainSuffix: 'demand, margin and inventory',
    description: 'Proprietary engines for demand forecasting, dynamic pricing, mix recommendation and purchase propensity.'
  },
  pt: {
    mainTitle: 'IA preditiva que',
    mainSubtitle: 'antecipa',
    mainSuffix: 'demanda, margem e estoque',
    description: 'Engines proprietários para previsão de demanda, precificação dinâmica, recomendação de mix e propensão de compra.'
  }
};
