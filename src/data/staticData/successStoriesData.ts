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
    avgTicketIncrease: string;
    avgTicketIncreaseLabel: string;
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
      title: "Transforming Industries with AI",
      subtitle: "Driven by Results",
      description: "Discover how our AI cases are redefining how businesses grow, compete and lead."
    },
    metrics: {
      avgROI: "20x",
      avgROILabel: "Average ROI",
      companiesServed: "-25%",
      companiesServedLabel: "CRM Cost Reduction",
      costSavings: "+36%",
      costSavingsLabel: "New Product Discovery",
      avgTicketIncrease: "+27%",
      avgTicketIncreaseLabel: "Average Ticket Increase"
    },
    cta: {
      title: "Ready to Transform Your Business?",
      description: "Join hundreds of companies that have already transformed their operations with our AI solutions. Start your journey today.",
      buttonText: "Get Started Today"
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Real voices. Trusted results. Powered by specialist AI."
    }
  },
  pt: {
    hero: {
      title: "Transformando Indústrias com IA",
      subtitle: "Impulsionadas por resultados",
      description: "Descubra como nossos cases de IA estão redefinindo a forma como as empresas crescem, competem e lideram."
    },
    metrics: {
      avgROI: "20x",
      avgROILabel: "ROI Médio",
      companiesServed: "-25%",
      companiesServedLabel: "Redução de Custos CRM",
      costSavings: "+36%",
      costSavingsLabel: "Descoberta de Novos Produtos",
      avgTicketIncrease: "+27%",
      avgTicketIncreaseLabel: "Aumento Médio do Ticket"
    },
    cta: {
      title: "Pronto para Transformar Seu Negócio?",
      description: "Junte-se a centenas de empresas que já transformaram suas operações com nossas soluções de IA. Comece sua jornada hoje.",
      buttonText: "Comece Hoje"
    },
    testimonials: {
      title: "O Que Nossos Clientes Dizem",
      subtitle: "Vozes reais. Resultados confiáveis. Powered by IA especialista."
    }
  }
};