export interface SolutionsHeroData {
  mainTitle: string;
  mainSubtitle: string;
  description: string;
}

export const solutionsHeroData: Record<string, SolutionsHeroData> = {
  en: {
    mainTitle: 'Transform Your Business with',
    mainSubtitle: 'AI-Powered Solutions',
    description: 'Discover our comprehensive suite of artificial intelligence solutions designed to optimize your operations, enhance decision-making, and drive sustainable growth across all sectors of your business.'
  },
  pt: {
    mainTitle: 'Transforme Seu Negócio com',
    mainSubtitle: 'Soluções Alimentadas por IA',
    description: 'Descubra nossa suíte abrangente de soluções de inteligência artificial projetadas para otimizar suas operações, aprimorar a tomada de decisões e impulsionar o crescimento sustentável em todos os setores do seu negócio.'
  }
};