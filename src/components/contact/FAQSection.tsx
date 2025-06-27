
import { useState } from 'react';
import { Search, Plus, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQSection = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const faqs = [
    {
      question: language === 'pt' ? "Quanto tempo leva a implementação de IA?" : "How long does AI implementation take?",
      answer: language === 'pt' ? "O tempo de implementação varia dependendo da complexidade do projeto. A maioria dos nossos clientes vê a implantação completa dentro de 1 a 3 meses, com resultados mensuráveis começando em apenas algumas semanas." : "Implementation time varies depending on the project's complexity. Most of our clients see full deployment within 1 to 3 months, with measurable results starting in just a few weeks."
    },
    {
      question: language === 'pt' ? "Quais indústrias vocês atendem?" : "What industries do you serve?",
      answer: language === 'pt' ? "Atendemos uma ampla gama de indústrias, incluindo varejo, manufatura, finanças, saúde, farmacêutica, educação e tecnologia, sempre com uma abordagem business-first." : "We serve a wide range of industries, including retail, manufacturing, finance, healthcare, pharma, education and technology, always with a business-first approach."
    },
    {
      question: language === 'pt' ? "Vocês fornecem suporte contínuo?" : "Do you provide ongoing support?",
      answer: language === 'pt' ? "Sim. Oferecemos suporte 24/7, monitoramento proativo, manutenção e otimização contínua para todas nossas soluções de IA." : "Yes. We offer 24/7 support, proactive monitoring, maintenance and continuous optimization for all our AI solutions."
    },
    {
      question: language === 'pt' ? "Qual é o ROI típico para suas soluções de IA?" : "What's the typical ROI for your AI solutions?",
      answer: language === 'pt' ? "Nossos clientes comumente veem até 20x ROI no primeiro ano, impulsionado por maior eficiência, decisões mais inteligentes e crescimento de receita." : "Our clients commonly see up to 20x ROI within the first year, driven by increased efficiency, smarter decisions and revenue growth."
    },
    {
      question: language === 'pt' ? "Que tipo de dados preciso para começar?" : "What kind of data do I need to get started?",
      answer: language === 'pt' ? "Trabalhamos com os dados que você já possui, incluindo dados comportamentais, transacionais, CRM ou de supply. Todos os dados são 100% anonimizados e tratados com segurança. Nossos modelos são robustos a lacunas e podem entregar valor mesmo com conjuntos de dados não estruturados. O primeiro treinamento do modelo é conduzido usando uma amostra dos seus dados, sem exigir integração completa." : "We work with the data you already have, including behavioral, transactional, CRM or supply data. All data is 100% anonymized and handled securely. Our models are robust to gaps and can deliver value even with unstructured datasets. The first model training is conducted using a sample of your data, without requiring full integration."
    },
    {
      question: language === 'pt' ? "Seus modelos de IA podem se integrar com nossos sistemas existentes?" : "Can your AI models integrate with our existing systems?",
      answer: language === 'pt' ? "Sim. O Compass Suite é API-first e baseado em nuvem, facilitando a conexão com ERPs, CRMs, plataformas de e-commerce e fontes de dados internas." : "Yes. The Compass Suite is API-first and cloud-based, making it easy to connect with ERPs, CRMs, e-commerce platforms and internal data sources."
    },
    {
      question: language === 'pt' ? "Preciso de uma equipe de ciência de dados para usar suas soluções?" : "Do I need a data science team to use your solutions?",
      answer: language === 'pt' ? "Não. Nossas soluções são projetadas para serem usadas por equipes de negócios. Nós cuidamos da complexidade da IA para que sua equipe possa focar na ação e resultados." : "No. Our solutions are designed to be used by business teams. We take care of the AI complexity so your team can focus on action and results."
    },
    {
      question: language === 'pt' ? "Sua IA é explicável e está em conformidade com regulamentações de privacidade de dados?" : "Is your AI explainable and compliant with data privacy regulations?",
      answer: language === 'pt' ? "Absolutamente. Todos os nossos modelos incluem camadas de explicabilidade para garantir transparência e confiança. Estamos em conformidade com GDPR, LGPD e outros padrões globais de privacidade de dados." : "Absolutely. All our models include explainability layers to ensure transparency and trust. We are compliant with GDPR, LGPD and other global data privacy standards."
    },
    {
      question: language === 'pt' ? "O que torna a Infinity6 diferente de outras empresas de IA?" : "What makes Infinity6 different from other AI companies?",
      answer: language === 'pt' ? "Combinamos inteligência preditiva com ação em tempo real, permitindo decisões inteligentes ao longo de toda a jornada - com integração rápida, resultados mensuráveis e sem necessidade de grande esforço técnico. Também oferecemos uma fase de teste gratuita, provando o potencial concreto de resultados antes de qualquer custo ser incorrido." : "We combine predictive intelligence with real-time action, enabling smart decisions across the entire journey - with fast integration, measurable results and no heavy tech lift. We also offer a free test phase, proving the concrete potential of results before any cost is incurred."
    },
    {
      question: language === 'pt' ? "Vocês podem ajudar a definir nossa estratégia de IA e casos de uso?" : "Can you help define our AI strategy and use cases?",
      answer: language === 'pt' ? "Sim. Nossos especialistas te apoiam na definição do ângulo de negócio por trás de cada iniciativa de IA. Cuidamos de todo o processo de engenharia de features — transformando dados brutos em sinais preditivos de alto impacto adaptados aos seus objetivos." : "Yes. Our experts support you in shaping the business angle behind each AI initiative. We handle the entire feature engineering process — transforming raw data into high-impact predictive signals tailored to your goals."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('contact.faq.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('contact.faq.subtitle')}
          </p>
        </div>

        {/* Search Filter */}
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            {language === 'pt' ? 'Buscar FAQs' : 'Search FAQs'}
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={language === 'pt' ? 'Digite para buscar perguntas frequentes...' : 'Type to search frequently asked questions...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <Card 
              key={index} 
              className="cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white rounded-xl overflow-hidden"
              onClick={() => handleCardClick(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 pr-4 leading-tight flex-1">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-2">
                    {expandedCard === index ? (
                      <Minus className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </div>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-2 border-t border-gray-100 mt-3">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              {language === 'pt' ? 'Nenhuma FAQ encontrada para sua busca. Tente palavras-chave diferentes.' : 'No FAQs found matching your search. Try different keywords.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
