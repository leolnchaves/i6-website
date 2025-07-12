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
      company_name: 'EMS',
      industry: 'Manufacturing',
      challenge: 'Complex inventory optimization and demand forecasting challenges affecting operational efficiency.',
      solution: 'Implemented predictive buying intelligence to optimize engagement, prevent stockouts and improve digital sell-out margins.',
      customer_name: 'Roberto Silva',
      customer_title: 'Supply Chain Director',
      customer_quote: 'The predictive intelligence has transformed our supply chain efficiency completely.',
      metric1_value: '85%',
      metric1_label: 'Stockout Reduction',
      metric2_value: '32%',
      metric2_label: 'Margin Improvement',
      metric3_value: '78%',
      metric3_label: 'Engagement Boost',
      image_url: '/lovable-uploads/45512e07-9b52-443f-a5ec-b84351ff2b9a.png',
      is_active: true,
      is_active_home: true
    },
    {
      id: '2',
      company_name: 'World\'s second-largest foods producer',
      industry: 'Manufacturing',
      challenge: 'Assortment optimization complexity and identifying new growth opportunities in competitive markets.',
      solution: 'Deployed AI-powered assortment optimization to boost sales efficiency and uncover new growth opportunities.',
      customer_name: 'Maria González',
      customer_title: 'VP of Sales Strategy',
      customer_quote: 'The AI assortment optimization opened new growth paths we never saw before.',
      metric1_value: '45%',
      metric1_label: 'Sales Efficiency',
      metric2_value: '28%',
      metric2_label: 'Revenue Growth',
      metric3_value: '67%',
      metric3_label: 'New Opportunities',
      image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      is_active: true,
      is_active_home: true
    },
    {
      id: '3',
      company_name: 'Most traditional fashion brand in LATAM',
      industry: 'Retail',
      challenge: 'Personalization challenges for diverse user types and maximizing online engagement across all customer segments.',
      solution: 'Implemented real-time recommendation engine for both logged-in and anonymous users to boost engagement and online sales.',
      customer_name: 'Ana Castillo',
      customer_title: 'Digital Innovation Manager',
      customer_quote: 'The recommendation engine revolutionized our online customer experience.',
      metric1_value: '92%',
      metric1_label: 'User Engagement',
      metric2_value: '58%',
      metric2_label: 'Online Sales Growth',
      metric3_value: '3.2x',
      metric3_label: 'Conversion Rate',
      image_url: '/lovable-uploads/d0935f4c-9873-49c4-bd9c-ba5054253145.png',
      is_active: true,
      is_active_home: true
    }
  ],
  pt: [
    {
      id: '1',
      company_name: 'EMS',
      industry: 'Manufacturing',
      challenge: 'Desafios complexos de otimização de estoque e previsão de demanda afetando a eficiência operacional.',
      solution: 'Implementou inteligência preditiva de compras para otimizar engajamento, prevenir faltas de estoque e melhorar margens de venda digital.',
      customer_name: 'Roberto Silva',
      customer_title: 'Diretor de Supply Chain',
      customer_quote: 'A inteligência preditiva transformou completamente nossa eficiência de supply chain.',
      metric1_value: '85%',
      metric1_label: 'Redução de Falta de Estoque',
      metric2_value: '32%',
      metric2_label: 'Melhoria de Margem',
      metric3_value: '78%',
      metric3_label: 'Aumento de Engajamento',
      image_url: '/lovable-uploads/45512e07-9b52-443f-a5ec-b84351ff2b9a.png',
      is_active: true,
      is_active_home: true
    },
    {
      id: '2',
      company_name: 'Segunda maior produtora de alimentos do mundo',
      industry: 'Manufacturing',
      challenge: 'Complexidade na otimização de sortimento e identificação de novas oportunidades de crescimento em mercados competitivos.',
      solution: 'Implementou otimização de sortimento alimentada por IA para aumentar eficiência de vendas e descobrir novas oportunidades de crescimento.',
      customer_name: 'Maria González',
      customer_title: 'VP de Estratégia de Vendas',
      customer_quote: 'A otimização de sortimento por IA abriu novos caminhos de crescimento que nunca vimos antes.',
      metric1_value: '45%',
      metric1_label: 'Eficiência de Vendas',
      metric2_value: '28%',
      metric2_label: 'Crescimento de Receita',
      metric3_value: '67%',
      metric3_label: 'Novas Oportunidades',
      image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      is_active: true,
      is_active_home: true
    },
    {
      id: '3',
      company_name: 'Marca de moda mais tradicional da LATAM',
      industry: 'Retail',
      challenge: 'Desafios de personalização para tipos diversos de usuários e maximização do engajamento online em todos os segmentos de clientes.',
      solution: 'Implementou motor de recomendação em tempo real para usuários logados e anônimos para aumentar engajamento e vendas online.',
      customer_name: 'Ana Castillo',
      customer_title: 'Gerente de Inovação Digital',
      customer_quote: 'O motor de recomendação revolucionou nossa experiência online do cliente.',
      metric1_value: '92%',
      metric1_label: 'Engajamento do Usuário',
      metric2_value: '58%',
      metric2_label: 'Crescimento Vendas Online',
      metric3_value: '3.2x',
      metric3_label: 'Taxa de Conversão',
      image_url: '/lovable-uploads/d0935f4c-9873-49c4-bd9c-ba5054253145.png',
      is_active: true,
      is_active_home: true
    }
  ]
};