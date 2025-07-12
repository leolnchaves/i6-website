export interface StaticSuccessStoryCard {
  id: string;
  company_name: string;
  industry: string;
  challenge: string;
  solution: string;
  customer_name: string;
  customer_title: string;
  customer_quote: string;
  metric1_value: string;
  metric1_label: string;
  metric2_value: string;
  metric2_label: string;
  metric3_value: string;
  metric3_label: string;
  image_url: string;
  is_active: boolean;
  is_active_home: boolean;
}

export const successStoriesCardsData = {
  en: [
    {
      id: '1',
      company_name: 'TechShop Pro',
      industry: 'E-commerce',
      challenge: 'Low conversion rates and poor product discovery were limiting growth potential.',
      solution: 'Implemented AI-powered recommendation engine and dynamic pricing optimization.',
      customer_name: 'Sarah Johnson',
      customer_title: 'VP of Digital Strategy',
      customer_quote: 'The AI recommendations transformed our customer experience. Sales increased dramatically within weeks.',
      metric1_value: '+85%',
      metric1_label: 'Conversion Rate',
      metric2_value: '+40%',
      metric2_label: 'Average Order Value',
      metric3_value: '-60%',
      metric3_label: 'Cart Abandonment',
      image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      is_active: true,
      is_active_home: true
    },
    {
      id: '2',
      company_name: 'Fashion Forward',
      industry: 'Retail',
      challenge: 'Inventory management issues and inability to predict customer demand accurately.',
      solution: 'Deployed predictive analytics and customer behavior analysis platform.',
      customer_name: 'Michael Chen',
      customer_title: 'Operations Director',
      customer_quote: 'Predictive analytics completely changed how we manage inventory. Results exceeded expectations.',
      metric1_value: '+60%',
      metric1_label: 'Demand Accuracy',
      metric2_value: '-45%',
      metric2_label: 'Inventory Waste',
      metric3_value: '+35%',
      metric3_label: 'Profit Margin',
      image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
      is_active: true,
      is_active_home: true
    },
    {
      id: '3',
      company_name: 'InnovateNow',
      industry: 'Technology',
      challenge: 'High customer churn rates and low engagement with existing products.',
      solution: 'Implemented customer analytics platform with churn prediction and engagement optimization.',
      customer_name: 'Emily Rodriguez',
      customer_title: 'Chief Product Officer',
      customer_quote: 'The customer analytics platform gave us insights we never had before. Churn dropped significantly.',
      metric1_value: '-70%',
      metric1_label: 'Customer Churn',
      metric2_value: '+90%',
      metric2_label: 'User Engagement',
      metric3_value: '+120%',
      metric3_label: 'Customer Lifetime Value',
      image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      is_active: true,
      is_active_home: true
    }
  ],
  pt: [
    {
      id: '1',
      company_name: 'TechShop Pro',
      industry: 'E-commerce',
      challenge: 'Baixas taxas de conversão e descoberta de produtos ruim limitavam o potencial de crescimento.',
      solution: 'Implementamos motor de recomendação alimentado por IA e otimização de preços dinâmicos.',
      customer_name: 'Sarah Johnson',
      customer_title: 'VP de Estratégia Digital',
      customer_quote: 'As recomendações de IA transformaram nossa experiência do cliente. As vendas aumentaram drasticamente em semanas.',
      metric1_value: '+85%',
      metric1_label: 'Taxa de Conversão',
      metric2_value: '+40%',
      metric2_label: 'Valor Médio do Pedido',
      metric3_value: '-60%',
      metric3_label: 'Abandono de Carrinho',
      image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      is_active: true,
      is_active_home: true
    },
    {
      id: '2',
      company_name: 'Fashion Forward',
      industry: 'Varejo',
      challenge: 'Problemas de gestão de estoque e incapacidade de prever a demanda do cliente com precisão.',
      solution: 'Implementamos analytics preditivos e plataforma de análise de comportamento do cliente.',
      customer_name: 'Michael Chen',
      customer_title: 'Diretor de Operações',
      customer_quote: 'Analytics preditivos mudaram completamente como gerenciamos estoque. Resultados superaram expectativas.',
      metric1_value: '+60%',
      metric1_label: 'Precisão de Demanda',
      metric2_value: '-45%',
      metric2_label: 'Desperdício de Estoque',
      metric3_value: '+35%',
      metric3_label: 'Margem de Lucro',
      image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
      is_active: true,
      is_active_home: true
    },
    {
      id: '3',
      company_name: 'InnovateNow',
      industry: 'Tecnologia',
      challenge: 'Altas taxas de churn de clientes e baixo engajamento com produtos existentes.',
      solution: 'Implementamos plataforma de analytics de cliente com previsão de churn e otimização de engajamento.',
      customer_name: 'Emily Rodriguez',
      customer_title: 'Chief Product Officer',
      customer_quote: 'A plataforma de analytics de cliente nos deu insights que nunca tivemos antes. O churn caiu significativamente.',
      metric1_value: '-70%',
      metric1_label: 'Churn de Clientes',
      metric2_value: '+90%',
      metric2_label: 'Engajamento do Usuário',
      metric3_value: '+120%',
      metric3_label: 'Valor Vitalício do Cliente',
      image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      is_active: true,
      is_active_home: true
    }
  ]
};