export interface SolutionsCTAData {
  title: string;
  description: string;
  button: string;
}

export const solutionsCTAData: Record<string, SolutionsCTAData> = {
  en: {
    title: 'Ready to Transform Your Business?',
    description: 'Contact our experts today and discover how our AI solutions can revolutionize your operations and drive unprecedented growth.',
    button: 'Get Started Today'
  },
  pt: {
    title: 'Pronto para Transformar Seu Negócio?',
    description: 'Entre em contato com nossos especialistas hoje e descubra como nossas soluções de IA podem revolucionar suas operações e impulsionar um crescimento sem precedentes.',
    button: 'Comece Hoje'
  }
};