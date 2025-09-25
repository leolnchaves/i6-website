export interface ProcessStep {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

export const processStepsData = {
  en: [
    {
      key: "discovery",
      title: "Discovery & Business Angle Definition",
      subtitle: "Business Requirement Analysis",
      description: "Understanding your business needs and defining the optimal approach",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "data",
      title: "Data Sample & Anonymization",
      subtitle: "Secure Data Processing", 
      description: "Collecting and preparing your data with full privacy protection",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "training",
      title: "Model Training & Fine-tuning",
      subtitle: "Business-Oriented Training",
      description: "Building custom AI models tailored to your specific business context",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "testing",
      title: "Performance Evaluation",
      subtitle: "Precision & Backtest Analysis",
      description: "Comprehensive testing to ensure optimal performance and accuracy",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "integration",
      title: "Integration & Recommendations",
      subtitle: "Active Digital Channel Integration",
      description: "Seamless integration across your digital ecosystem",
      color: "from-blue-500 to-blue-600"
    }
  ],
  pt: [
    {
      key: "discovery",
      title: "Descoberta e Definição do Ângulo de Negócio",
      subtitle: "Análise de Requisitos de Negócio",
      description: "Entendendo suas necessidades de negócio e definindo a abordagem ideal",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "data",
      title: "Amostra de Dados e Anonimização",
      subtitle: "Processamento Seguro de Dados",
      description: "Coletando e preparando seus dados com proteção total de privacidade",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "training",
      title: "Treinamento e Ajuste Fino do Modelo",
      subtitle: "Treinamento Orientado ao Negócio",
      description: "Construindo modelos de IA customizados adaptados ao seu contexto específico de negócio",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "testing",
      title: "Avaliação de Performance",
      subtitle: "Análise de Precisão e Backtest",
      description: "Testes abrangentes para garantir performance e precisão ideais",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "integration",
      title: "Integração e Recomendações",
      subtitle: "Integração Ativa de Canal Digital",
      description: "Integração perfeita através do seu ecossistema digital",
      color: "from-blue-500 to-blue-600"
    }
  ]
} as const;