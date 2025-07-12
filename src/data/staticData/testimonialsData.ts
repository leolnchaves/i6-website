export interface StaticTestimonial {
  id: string;
  quote: string;
  author_name: string;
  author_title?: string;
  company_name?: string;
  rating: number;
}

export const testimonialsData: Record<string, StaticTestimonial[]> = {
  en: [
    {
      id: "1",
      quote: "Infinity6's AI solutions transformed our entire business model. The predictive analytics capabilities have given us unprecedented insights into market trends and customer behavior.",
      author_name: "Amanda Foster",
      author_title: "CEO",
      company_name: "TechVision Corp",
      rating: 5
    },
    {
      id: "2",
      quote: "The implementation was seamless and the results were immediate. We saw a 40% improvement in operational efficiency within the first quarter.",
      author_name: "Carlos Rodriguez",
      author_title: "CTO",
      company_name: "DataFlow Solutions",
      rating: 5
    },
    {
      id: "3",
      quote: "Working with Infinity6 has been a game-changer for our organization. Their team's expertise and dedication to our success is unmatched in the industry.",
      author_name: "Jennifer Liu",
      author_title: "VP of Innovation",
      company_name: "Future Systems Inc",
      rating: 5
    }
  ],
  pt: [
    {
      id: "1",
      quote: "As soluções de IA da Infinity6 transformaram todo o nosso modelo de negócios. As capacidades de análise preditiva nos deram insights sem precedentes sobre tendências de mercado e comportamento do cliente.",
      author_name: "Amanda Foster",
      author_title: "CEO",
      company_name: "TechVision Corp",
      rating: 5
    },
    {
      id: "2",
      quote: "A implementação foi perfeita e os resultados foram imediatos. Vimos uma melhoria de 40% na eficiência operacional no primeiro trimestre.",
      author_name: "Carlos Rodriguez",
      author_title: "CTO",
      company_name: "DataFlow Solutions",
      rating: 5
    },
    {
      id: "3",
      quote: "Trabalhar com a Infinity6 foi um divisor de águas para nossa organização. A expertise da equipe e dedicação ao nosso sucesso é incomparável na indústria.",
      author_name: "Jennifer Liu",
      author_title: "VP de Inovação",
      company_name: "Future Systems Inc",
      rating: 5
    }
  ]
};