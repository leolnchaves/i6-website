
import React, { useState, useMemo, useCallback, memo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
}

const FAQSection = memo(() => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Static content - memoized for stability
  const content = useMemo(() => ({
    pt: {
      title: "O Que Você Precisa Saber",
      subtitle: "Respostas objetivas sobre como implementar inteligência preditiva com rapidez e segurança.",
      searchPlaceholder: "Digite para buscar nas perguntas frequentes...",
      noResults: "Nenhuma pergunta frequente encontrada correspondendo à sua busca. Tente palavras-chave diferentes.",
      faqs: [
        { id: 1, question: "Quanto tempo leva a implementação de IA?", answer: "O tempo de implementação varia dependendo da complexidade do projeto. A maioria dos nossos clientes vê implantação completa de 1 a 3 meses, com resultados mensuráveis começando em apenas algumas semanas.", order: 1 },
        { id: 2, question: "Quais indústrias vocês atendem?", answer: "Atendemos uma ampla gama de indústrias, incluindo varejo, manufatura, finanças, saúde, farmacêutica, educação e tecnologia, sempre com uma abordagem business-first.", order: 2 },
        { id: 3, question: "Vocês fornecem suporte contínuo?", answer: "Sim. Oferecemos suporte 24/7, monitoramento proativo, manutenção e otimização contínua para todas nossas soluções de IA.", order: 3 },
        { id: 4, question: "Qual é o ROI típico para suas soluções de IA?", answer: "Nossos clientes comumente veem até 20x ROI no primeiro ano, impulsionado por maior eficiência, decisões mais inteligentes e crescimento de receita.", order: 4 },
        { id: 5, question: "Que tipo de dados preciso para começar?", answer: "Trabalhamos com os dados que você já tem, incluindo dados comportamentais, transacionais, CRM ou de supply. Todos os dados são 100% anonimizados e tratados com segurança. Nossos modelos são robustos a lacunas e podem entregar valor mesmo com conjuntos de dados não estruturados. O primeiro treinamento do modelo é conduzido usando uma amostra dos seus dados, sem exigir integração completa.", order: 5 },
        { id: 6, question: "Seus modelos de IA podem se integrar com nossos sistemas existentes?", answer: "Sim. O Compass Suite é API-first e baseado em nuvem, facilitando a conexão com ERPs, CRMs, plataformas de e-commerce e fontes de dados internas.", order: 6 },
        { id: 7, question: "Preciso de uma equipe de ciência de dados para usar suas soluções?", answer: "Não. Nossas soluções são projetadas para serem usadas por equipes de negócios. Cuidamos da complexidade da IA para que sua equipe possa focar em ação e resultados.", order: 7 },
        { id: 8, question: "Sua IA é explicável e compatível com regulamentações de privacidade de dados?", answer: "Absolutamente. Todos nossos modelos incluem camadas de explicabilidade para garantir transparência e confiança. Somos compatíveis com GDPR, LGPD e outros padrões globais de privacidade de dados.", order: 8 },
        { id: 9, question: "O que torna a infinity6 diferente de outras empresas de IA?", answer: "Combinamos inteligência preditiva com ação em tempo real, possibilitando decisões inteligentes em toda a jornada - com integração rápida, resultados mensuráveis e sem carga técnica pesada. Nossos motores são proprietários, serão modelados de acordo com a sua necessidade específica e treinados com seu maior diferencial competitivo: seus dados. Também oferecemos uma fase de teste gratuita, provando o potencial concreto de resultados antes de qualquer custo ser incorrido.", order: 9 },
        { id: 10, question: "Vocês podem ajudar a definir nossa estratégia de IA e casos de uso?", answer: "Sim. Nossos especialistas apoiam você na formatação do ângulo de negócio por trás de cada iniciativa de IA. Cuidamos de todo o processo de engenharia de características — transformando dados brutos em sinais preditivos de alto impacto adaptados aos seus objetivos.", order: 10 }
      ]
    },
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Common questions about our AI solutions and services.",
      searchPlaceholder: "Type to search frequently asked questions...",
      noResults: "No FAQs found matching your search. Try different keywords.",
      faqs: [
        { id: 1, question: "How long does AI implementation take?", answer: "Implementation time varies depending on the project's complexity. Most of our clients see full deployment within 1 to 3 months, with measurable results starting in just a few weeks.", order: 1 },
        { id: 2, question: "What industries do you serve?", answer: "We serve a wide range of industries, including retail, manufacturing, finance, healthcare, pharma, education and technology, always with a business-first approach.", order: 2 },
        { id: 3, question: "Do you provide ongoing support?", answer: "Yes. We offer 24/7 support, proactive monitoring, maintenance and continuous optimization for all our AI solutions.", order: 3 },
        { id: 4, question: "What's the typical ROI for your AI solutions?", answer: "Our clients commonly see up to 20x ROI within the first year, driven by increased efficiency, smarter decisions and revenue growth.", order: 4 },
        { id: 5, question: "What kind of data do I need to get started?", answer: "We work with the data you already have, including behavioral, transactional, CRM or supply data. All data is 100% anonymized and handled securely. Our models are robust to gaps and can deliver value even with unstructured datasets. The first model training is conducted using a sample of your data, without requiring full integration.", order: 5 },
        { id: 6, question: "Can your AI models integrate with our existing systems?", answer: "Yes. The Compass Suite is API-first and cloud-based, making it easy to connect with ERPs, CRMs, e-commerce platforms and internal data sources.", order: 6 },
        { id: 7, question: "Do I need a data science team to use your solutions?", answer: "No. Our solutions are designed to be used by business teams. We take care of the AI complexity so your team can focus on action and results.", order: 7 },
        { id: 8, question: "Is your AI explainable and compliant with data privacy regulations?", answer: "Absolutely. All our models include explainability layers to ensure transparency and trust. We are compliant with GDPR, LGPD and other global data privacy standards.", order: 8 },
        { id: 9, question: "What makes infinity6 different from other AI companies?", answer: "We combine predictive intelligence with real-time action, enabling smart decisions across the entire journey - with fast integration, measurable results and no heavy tech lift. Our engines are proprietary, will be modeled according to your specific needs and trained with your greatest competitive advantage: your data. We also offer a free test phase, proving the concrete potential of results before any cost is incurred.", order: 9 },
        { id: 10, question: "Can you help define our AI strategy and use cases?", answer: "Yes. Our experts support you in shaping the business angle behind each AI initiative. We handle the entire feature engineering process — transforming raw data into high-impact predictive signals tailored to your goals.", order: 10 }
      ]
    }
  }), []);

  const text = useMemo(() => content[language], [language]);

  const filteredFaqs = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return text.faqs;
    const searchLower = debouncedSearchTerm.toLowerCase();
    return text.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower)
    );
  }, [text.faqs, debouncedSearchTerm]);

  const handleCardClick = useCallback((index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  }, [expandedCard]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {text.title}
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            {text.subtitle}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5 z-10" />
                <Input
                  type="text"
                  placeholder={text.searchPlaceholder}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-12 pr-4 py-4 text-lg bg-transparent border-0 rounded-xl text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#F4845F]/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <Collapsible
              key={faq.id}
              open={expandedCard === index}
              onOpenChange={() => handleCardClick(index)}
            >
              <div className="group relative">
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/[0.07] transition-all duration-300 overflow-hidden">
                  <CollapsibleTrigger className="w-full p-6 text-left transition-colors duration-200">
                    <div className="flex items-center justify-between group">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                          <span className="text-sm font-bold text-[#F4845F]">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#F4845F] transition-colors duration-200 leading-tight">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown 
                        className={`w-6 h-6 text-white/40 group-hover:text-[#F4845F] transition-all duration-300 flex-shrink-0 ml-4 ${
                          expandedCard === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                    <div className="px-6 pb-6">
                      <div className="ml-14 pt-4 border-t border-white/10">
                        <p className="whitespace-pre-wrap text-base text-white/60 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </div>
            </Collapsible>
          ))}
        </div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-2xl mb-6">
              <Search className="w-8 h-8 text-white/40" />
            </div>
            <p className="text-xl text-white/60">
              {text.noResults}
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';

export default FAQSection;
