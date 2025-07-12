export interface SuccessStoriesStaticData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  metrics: {
    avgROI: string;
    avgROILabel: string;
    companiesServed: string;
    companiesServedLabel: string;
    costSavings: string;
    costSavingsLabel: string;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
}

export const successStoriesData: Record<string, SuccessStoriesStaticData> = {
  en: {
    hero: {
      title: "Transforming Industries with",
      subtitle: "AI-Powered Solutions",
      description: "Discover how our AI solutions have revolutionized businesses across various industries, delivering measurable results and sustainable growth."
    },
    metrics: {
      avgROI: "150%",
      avgROILabel: "Average ROI Increase",
      companiesServed: "500+",
      companiesServedLabel: "Companies Served",
      costSavings: "$50M+",
      costSavingsLabel: "Total Cost Savings"
    },
    cta: {
      title: "Ready to Transform Your Business?",
      description: "Join hundreds of companies that have already transformed their operations with our AI solutions. Start your journey today.",
      buttonText: "Get Started Today"
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Trusted voices on how our expert AI changed the way they operate and grow."
    }
  },
  pt: {
    hero: {
      title: "Transformando Indústrias com",
      subtitle: "Soluções Powered by IA",
      description: "Descubra como nossas soluções de IA revolucionaram negócios em várias indústrias, entregando resultados mensuráveis e crescimento sustentável."
    },
    metrics: {
      avgROI: "150%",
      avgROILabel: "Aumento Médio do ROI",
      companiesServed: "500+",
      companiesServedLabel: "Empresas Atendidas",
      costSavings: "$50M+",
      costSavingsLabel: "Total de Economia de Custos"
    },
    cta: {
      title: "Pronto para Transformar Seu Negócio?",
      description: "Junte-se a centenas de empresas que já transformaram suas operações com nossas soluções de IA. Comece sua jornada hoje.",
      buttonText: "Comece Hoje"
    },
    testimonials: {
      title: "O Que Nossos Clientes Dizem",
      subtitle: "Vozes confiáveis sobre como nossa IA especializada mudou a forma como operam e crescem."
    }
  }
};