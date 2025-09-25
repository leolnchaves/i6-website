export interface SolutionsHeroData {
  mainTitle: string;
  mainSubtitle: string;
  description: string;
}

export const solutionsHeroData: Record<string, SolutionsHeroData> = {
  en: {
    mainTitle: 'Transform Your Business with',
    mainSubtitle: 'AI-Powered Solutions',
    description: 'Explore solutions that optimize performance, guide smarter decisions and fuel sustainable growth across your business.'
  },
  pt: {
    mainTitle: 'Transforme seu Negócio com',
    mainSubtitle: 'Soluções de IA Aplicadas',
    description: 'Descubra como nossas soluções otimizam a performance, apoiam decisões mais inteligentes e impulsionam um crescimento sustentável em toda a sua empresa.'
  }
};