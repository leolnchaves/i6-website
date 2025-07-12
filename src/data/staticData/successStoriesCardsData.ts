export interface StaticSuccessStoryCard {
  id: string;
  industry: string;
  company_name: string;
  challenge: string;
  solution: string;
  metric1_value: string;
  metric1_label: string;
  metric2_value: string;
  metric2_label: string;
  metric3_value: string;
  metric3_label: string;
  customer_quote: string;
  customer_name: string;
  customer_title: string;
  image_url: string;
}

export const successStoriesCardsData: Record<string, StaticSuccessStoryCard[]> = {
  en: [
    {
      id: "1",
      industry: "E-commerce",
      company_name: "TechRetail Inc.",
      challenge: "Low conversion rates and difficulty understanding customer behavior patterns across multiple touchpoints, leading to inefficient marketing spend and poor user experience.",
      solution: "Implemented AI-powered recommendation engine and customer journey analytics to personalize shopping experiences and optimize marketing campaigns in real-time.",
      metric1_value: "45%",
      metric1_label: "Conversion Increase",
      metric2_value: "60%",
      metric2_label: "Revenue Growth",
      metric3_value: "30%",
      metric3_label: "Customer Retention",
      customer_quote: "The AI solution transformed our understanding of customer behavior and dramatically improved our conversion rates.",
      customer_name: "Sarah Johnson",
      customer_title: "Chief Marketing Officer",
      image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
    },
    {
      id: "2",
      industry: "Manufacturing",
      company_name: "Industrial Solutions Co.",
      challenge: "High equipment downtime and unpredictable maintenance costs affecting production efficiency and overall operational expenses.",
      solution: "Deployed predictive maintenance AI system with IoT sensors to forecast equipment failures and optimize maintenance schedules proactively.",
      metric1_value: "35%",
      metric1_label: "Downtime Reduction",
      metric2_value: "$2M",
      metric2_label: "Annual Savings",
      metric3_value: "50%",
      metric3_label: "Maintenance Efficiency",
      customer_quote: "Predictive maintenance has revolutionized our operations and saved us millions in unexpected downtime costs.",
      customer_name: "Michael Chen",
      customer_title: "Operations Director",
      image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
    },
    {
      id: "3",
      industry: "Healthcare",
      company_name: "MedTech Innovations",
      challenge: "Inefficient patient flow management leading to long wait times, resource waste, and decreased patient satisfaction scores.",
      solution: "Implemented AI-driven patient flow optimization system to predict demand patterns and allocate resources efficiently across departments.",
      metric1_value: "40%",
      metric1_label: "Wait Time Reduction",
      metric2_value: "25%",
      metric2_label: "Resource Efficiency",
      metric3_value: "90%",
      metric3_label: "Patient Satisfaction",
      customer_quote: "Our patients now experience significantly shorter wait times and our staff can focus on providing better care.",
      customer_name: "Dr. Emily Rodriguez",
      customer_title: "Chief Medical Officer",
      image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop"
    },
    {
      id: "4",
      industry: "Finance",
      company_name: "Capital Banking Group",
      challenge: "Manual fraud detection processes resulting in high false positive rates and significant financial losses from undetected fraudulent transactions.",
      solution: "Implemented machine learning fraud detection system with real-time transaction monitoring and adaptive risk scoring algorithms.",
      metric1_value: "75%",
      metric1_label: "Fraud Detection Rate",
      metric2_value: "50%",
      metric2_label: "False Positive Reduction",
      metric3_value: "$5M",
      metric3_label: "Annual Loss Prevention",
      customer_quote: "The AI fraud detection system has dramatically improved our security posture while reducing customer friction.",
      customer_name: "Robert Kim",
      customer_title: "Chief Risk Officer",
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    },
    {
      id: "5",
      industry: "Logistics",
      company_name: "Global Shipping Solutions",
      challenge: "Inefficient route planning and delivery scheduling leading to high fuel costs, delayed deliveries, and poor customer satisfaction.",
      solution: "Deployed AI-powered route optimization and demand forecasting system to improve delivery efficiency and reduce operational costs.",
      metric1_value: "30%",
      metric1_label: "Fuel Cost Reduction",
      metric2_value: "95%",
      metric2_label: "On-Time Deliveries",
      metric3_value: "20%",
      metric3_label: "Capacity Optimization",
      customer_quote: "Our delivery efficiency has never been better, and our customers are noticing the improved service quality.",
      customer_name: "Lisa Thompson",
      customer_title: "Logistics Director",
      image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop"
    },
    {
      id: "6",
      industry: "Automotive",
      company_name: "NextGen Motors",
      challenge: "Quality control issues in manufacturing leading to recalls, warranty claims, and brand reputation damage affecting market position.",
      solution: "Implemented computer vision AI for automated quality inspection and predictive analytics for defect prevention in production lines.",
      metric1_value: "80%",
      metric1_label: "Defect Detection",
      metric2_value: "60%",
      metric2_label: "Recall Reduction",
      metric3_value: "$3M",
      metric3_label: "Quality Cost Savings",
      customer_quote: "Our quality standards have reached new heights, and customer confidence in our products has never been stronger.",
      customer_name: "David Park",
      customer_title: "Quality Assurance Manager",
      image_url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop"
    }
  ],
  pt: [
    {
      id: "1",
      industry: "E-commerce",
      company_name: "TechRetail Inc.",
      challenge: "Baixas taxas de conversão e dificuldade em entender padrões de comportamento do cliente em múltiplos pontos de contato, levando a gastos ineficientes com marketing e má experiência do usuário.",
      solution: "Implementou motor de recomendação alimentado por IA e análise de jornada do cliente para personalizar experiências de compra e otimizar campanhas de marketing em tempo real.",
      metric1_value: "45%",
      metric1_label: "Aumento de Conversão",
      metric2_value: "60%",
      metric2_label: "Crescimento de Receita",
      metric3_value: "30%",
      metric3_label: "Retenção de Clientes",
      customer_quote: "A solução de IA transformou nossa compreensão do comportamento do cliente e melhorou drasticamente nossas taxas de conversão.",
      customer_name: "Sarah Johnson",
      customer_title: "Diretora de Marketing",
      image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
    },
    {
      id: "2",
      industry: "Manufatura",
      company_name: "Industrial Solutions Co.",
      challenge: "Alto tempo de inatividade de equipamentos e custos de manutenção imprevisíveis afetando a eficiência da produção e despesas operacionais gerais.",
      solution: "Implementou sistema de IA de manutenção preditiva com sensores IoT para prever falhas de equipamentos e otimizar cronogramas de manutenção proativamente.",
      metric1_value: "35%",
      metric1_label: "Redução de Inatividade",
      metric2_value: "$2M",
      metric2_label: "Economia Anual",
      metric3_value: "50%",
      metric3_label: "Eficiência de Manutenção",
      customer_quote: "A manutenção preditiva revolucionou nossas operações e nos poupou milhões em custos de inatividade inesperados.",
      customer_name: "Michael Chen",
      customer_title: "Diretor de Operações",
      image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
    },
    {
      id: "3",
      industry: "Saúde",
      company_name: "MedTech Innovations",
      challenge: "Gerenciamento ineficiente do fluxo de pacientes levando a longos tempos de espera, desperdício de recursos e diminuição das pontuações de satisfação do paciente.",
      solution: "Implementou sistema de otimização de fluxo de pacientes orientado por IA para prever padrões de demanda e alocar recursos eficientemente entre departamentos.",
      metric1_value: "40%",
      metric1_label: "Redução do Tempo de Espera",
      metric2_value: "25%",
      metric2_label: "Eficiência de Recursos",
      metric3_value: "90%",
      metric3_label: "Satisfação do Paciente",
      customer_quote: "Nossos pacientes agora experimentam tempos de espera significativamente menores e nossa equipe pode se concentrar em fornecer melhor cuidado.",
      customer_name: "Dra. Emily Rodriguez",
      customer_title: "Diretora Médica",
      image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop"
    },
    {
      id: "4",
      industry: "Financeiro",
      company_name: "Capital Banking Group",
      challenge: "Processos manuais de detecção de fraude resultando em altas taxas de falsos positivos e perdas financeiras significativas de transações fraudulentas não detectadas.",
      solution: "Implementou sistema de detecção de fraude de aprendizado de máquina com monitoramento de transações em tempo real e algoritmos adaptativos de pontuação de risco.",
      metric1_value: "75%",
      metric1_label: "Taxa de Detecção de Fraude",
      metric2_value: "50%",
      metric2_label: "Redução de Falsos Positivos",
      metric3_value: "$5M",
      metric3_label: "Prevenção de Perdas Anuais",
      customer_quote: "O sistema de detecção de fraude de IA melhorou drasticamente nossa postura de segurança enquanto reduziu o atrito do cliente.",
      customer_name: "Robert Kim",
      customer_title: "Diretor de Risco",
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    },
    {
      id: "5",
      industry: "Logística",
      company_name: "Global Shipping Solutions",
      challenge: "Planejamento de rotas ineficiente e agendamento de entregas levando a altos custos de combustível, entregas atrasadas e baixa satisfação do cliente.",
      solution: "Implementou sistema de otimização de rotas e previsão de demanda alimentado por IA para melhorar a eficiência de entrega e reduzir custos operacionais.",
      metric1_value: "30%",
      metric1_label: "Redução do Custo de Combustível",
      metric2_value: "95%",
      metric2_label: "Entregas no Prazo",
      metric3_value: "20%",
      metric3_label: "Otimização de Capacidade",
      customer_quote: "Nossa eficiência de entrega nunca foi melhor, e nossos clientes estão notando a melhoria na qualidade do serviço.",
      customer_name: "Lisa Thompson",
      customer_title: "Diretora de Logística",
      image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop"
    },
    {
      id: "6",
      industry: "Automotivo",
      company_name: "NextGen Motors",
      challenge: "Problemas de controle de qualidade na fabricação levando a recalls, reivindicações de garantia e danos à reputação da marca afetando a posição no mercado.",
      solution: "Implementou IA de visão computacional para inspeção automatizada de qualidade e análise preditiva para prevenção de defeitos nas linhas de produção.",
      metric1_value: "80%",
      metric1_label: "Detecção de Defeitos",
      metric2_value: "60%",
      metric2_label: "Redução de Recalls",
      metric3_value: "$3M",
      metric3_label: "Economia em Custos de Qualidade",
      customer_quote: "Nossos padrões de qualidade atingiram novos patamares, e a confiança do cliente em nossos produtos nunca foi tão forte.",
      customer_name: "David Park",
      customer_title: "Gerente de Garantia de Qualidade",
      image_url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop"
    }
  ]
};