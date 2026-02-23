export interface SolutionsHeroData {
  mainTitle: string;
  mainSubtitle: string;
  description: string;
}

export const solutionsHeroData: Record<string, SolutionsHeroData> = {
  en: {
    mainTitle: 'Solutions that anticipate',
    mainSubtitle: 'the market.',
    description: 'From data intelligence to action. AI solutions that transform signals into decisions and decisions into growth.'
  },
  pt: {
    mainTitle: 'Soluções que antecipam',
    mainSubtitle: 'o mercado.',
    description: 'Da inteligência de dados à ação. Soluções de IA que transformam sinais em decisões e decisões em crescimento.'
  }
};