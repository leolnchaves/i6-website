export interface SolutionsHeroData {
  mainTitle: string;
  mainSubtitle: string;
  mainSuffix: string;
  description: string;
}

export const solutionsHeroData: Record<string, SolutionsHeroData> = {
  en: {
    mainTitle: 'Solutions that',
    mainSubtitle: 'anticipate',
    mainSuffix: 'the market.',
    description: 'AI that transforms signals into decisions and decisions into growth.'
  },
  pt: {
    mainTitle: 'Soluções que',
    mainSubtitle: 'antecipam',
    mainSuffix: 'o mercado.',
    description: 'IA que transforma sinais em decisões e decisões em crescimento.'
  }
};