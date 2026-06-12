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
      title: "Real results from predictive AI",
      subtitle: "in retail, industry and pharma",
      description: "How leading companies reduced stockouts, protected margin and increased conversion with infinity6's proprietary engines."
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
      title: "Trust Built on Results",
      subtitle: "Real voices from those who turn signals into impact."
    }
  },
  pt: {
    hero: {
      title: "Resultados reais de IA preditiva",
      subtitle: "em varejo, indústria e farma",
      description: "Como empresas líderes reduziram ruptura, protegeram margem e aumentaram conversão com os engines proprietários da infinity6."
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
      title: "Confiança Construída em Resultado",
      subtitle: "Vozes reais de quem transforma sinais em impacto."
    }
  }
};