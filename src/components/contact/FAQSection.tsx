
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
      searchPlaceholder: "Busque por tema, desafio ou palavra-chave...",
      noResults: "Nenhuma pergunta frequente encontrada correspondendo à sua busca. Tente palavras-chave diferentes.",
      faqs: [
        { id: 1, question: "Quanto tempo leva para colocar a inteligência em produção?", answer: "Colocamos inteligência preditiva em produção entre 4 e 12 semanas, com geração de impacto financeiro mensurável já nas primeiras ativações, seja em crescimento de receita, proteção de margem ou ganho de eficiência operacional.", order: 1 },
        { id: 2, question: "Como iniciar sem alto risco de investimento?", answer: "Iniciamos com uma fase de validação orientada a negócio, utilizando amostras de dados para estimar potencial de impacto antes da integração completa. O modelo é progressivo, permitindo começar com escopo controlado e expandir conforme os resultados são comprovados.", order: 2 },
        { id: 3, question: "Em quais indústrias atuam?", answer: "Atuamos em setores como varejo, indústria, finanças, saúde, farmacêutica, educação e tecnologia, sempre com foco direto em impacto de negócio e resultados mensuráveis.", order: 3 },
        { id: 4, question: "O suporte é contínuo?", answer: "Sim. Monitoramos performance, ajustamos modelos continuamente e garantimos evolução constante dos resultados em produção.", order: 4 },
        { id: 5, question: "Como garantem que os modelos continuam performando ao longo do tempo?", answer: "Utilizamos modelos adaptativos e monitoramento contínuo de performance. Ajustes são realizados conforme mudanças de comportamento, mercado ou estratégia, mantendo impacto consistente ao longo do tempo.", order: 5 },
        { id: 6, question: "Qual o ROI típico das soluções?", answer: "Projetos podem gerar até 20x de ROI no primeiro ano, impulsionando receita, protegendo margem e reduzindo ineficiências operacionais.", order: 6 },
        { id: 7, question: "Que tipo de dados são necessários para começar?", answer: "Utilizamos os dados que sua empresa já possui, como transações, comportamento, CRM e supply. Iniciamos com amostras para validar potencial antes da integração completa, com modelos robustos a lacunas de dados.", order: 7 },
        { id: 8, question: "A solução integra com nossos sistemas atuais?", answer: "Sim. Nossa arquitetura é API-first e conecta-se facilmente a ERPs, CRMs, e-commerce e outras bases internas.", order: 8 },
        { id: 9, question: "É necessário ter equipe de ciência de dados?", answer: "Não. As soluções são projetadas para equipes de negócio operarem decisões preditivas sem dependência técnica.", order: 9 },
        { id: 10, question: "A inteligência é explicável e compatível com regulamentações?", answer: "Sim. Trabalhamos com camadas de explicabilidade e aderência a normas como LGPD e GDPR, garantindo transparência e segurança.", order: 10 },
        { id: 11, question: "O que diferencia vocês de outras empresas de IA?", answer: "Unimos inteligência preditiva com ativação em tempo real. Nossos motores proprietários transformam dados em decisões operacionais, enquanto o i6Signal conecta esses insights diretamente às equipes, convertendo análise em ação imediata.\n\nNão entregamos apenas modelos. Colocamos decisões em movimento.", order: 11 },
        { id: 12, question: "Como vocês mensuram impacto no negócio?", answer: "Trabalhamos com indicadores claros de receita, margem e eficiência desde o início do projeto, acompanhando variações diretamente atribuíveis às ativações preditivas em produção.", order: 12 }
      ]
    },
    en: {
      title: "What You Need to Know",
      subtitle: "Straight answers on how to deploy predictive intelligence quickly and securely.",
      searchPlaceholder: "Search by topic, challenge or keyword...",
      noResults: "No FAQs found matching your search. Try different keywords.",
      faqs: [
        { id: 1, question: "How long does it take to put intelligence into production?", answer: "We deploy predictive intelligence into production within 4 to 12 weeks, generating measurable financial impact from the first activations, whether in revenue growth, margin protection or operational efficiency gains.", order: 1 },
        { id: 2, question: "How to start without high investment risk?", answer: "We start with a business-oriented validation phase, using data samples to estimate impact potential before full integration. The model is progressive, allowing you to begin with a controlled scope and expand as results are proven.", order: 2 },
        { id: 3, question: "What industries do you serve?", answer: "We serve sectors such as retail, manufacturing, finance, healthcare, pharma, education and technology, always with a direct focus on business impact and measurable results.", order: 3 },
        { id: 4, question: "Is support ongoing?", answer: "Yes. We monitor performance, continuously adjust models and ensure constant evolution of results in production.", order: 4 },
        { id: 5, question: "How do you ensure models keep performing over time?", answer: "We use adaptive models and continuous performance monitoring. Adjustments are made according to changes in behavior, market or strategy, maintaining consistent impact over time.", order: 5 },
        { id: 6, question: "What is the typical ROI of your solutions?", answer: "Projects can generate up to 20x ROI in the first year, driving revenue, protecting margins and reducing operational inefficiencies.", order: 6 },
        { id: 7, question: "What kind of data is needed to get started?", answer: "We work with the data your company already has, such as transactions, behavior, CRM and supply. We start with samples to validate potential before full integration, with models robust to data gaps.", order: 7 },
        { id: 8, question: "Does the solution integrate with our current systems?", answer: "Yes. Our architecture is API-first and easily connects to ERPs, CRMs, e-commerce and other internal databases.", order: 8 },
        { id: 9, question: "Do we need a data science team?", answer: "No. Our solutions are designed for business teams to operate predictive decisions without technical dependency.", order: 9 },
        { id: 10, question: "Is the intelligence explainable and compliant with regulations?", answer: "Yes. We work with explainability layers and adherence to standards such as LGPD and GDPR, ensuring transparency and security.", order: 10 },
        { id: 11, question: "What sets you apart from other AI companies?", answer: "We combine predictive intelligence with real-time activation. Our proprietary engines transform data into operational decisions, while i6Signal connects these insights directly to teams, converting analysis into immediate action.\n\nWe don't just deliver models. We put decisions in motion.", order: 11 },
        { id: 12, question: "How do you measure business impact?", answer: "We work with clear revenue, margin and efficiency indicators from the start of the project, tracking variations directly attributable to predictive activations in production.", order: 12 }
      ]
    },
    es: {
      title: "Lo Que Necesitas Saber",
      subtitle: "Respuestas directas sobre cómo implementar inteligencia predictiva con rapidez y seguridad.",
      searchPlaceholder: "Busca por tema, desafío o palabra clave...",
      noResults: "No se encontraron preguntas frecuentes que coincidan con tu búsqueda. Prueba con otras palabras clave.",
      faqs: [
        { id: 1, question: "¿Cuánto tiempo toma poner la inteligencia en producción?", answer: "Ponemos inteligencia predictiva en producción entre 4 y 12 semanas, con generación de impacto financiero medible desde las primeras activaciones, ya sea en crecimiento de ingresos, protección de margen o ganancia de eficiencia operativa.", order: 1 },
        { id: 2, question: "¿Cómo empezar sin alto riesgo de inversión?", answer: "Empezamos con una fase de validación orientada al negocio, usando muestras de datos para estimar el potencial de impacto antes de la integración completa. El modelo es progresivo, lo que permite comenzar con un alcance controlado y expandirlo a medida que se comprueban los resultados.", order: 2 },
        { id: 3, question: "¿En qué industrias trabajan?", answer: "Trabajamos en sectores como retail, industria, finanzas, salud, farmacéutica, educación y tecnología, siempre con foco directo en impacto de negocio y resultados medibles.", order: 3 },
        { id: 4, question: "¿El soporte es continuo?", answer: "Sí. Monitoreamos el desempeño, ajustamos los modelos continuamente y garantizamos la evolución constante de los resultados en producción.", order: 4 },
        { id: 5, question: "¿Cómo garantizan que los modelos sigan rindiendo a lo largo del tiempo?", answer: "Usamos modelos adaptativos y monitoreo continuo de desempeño. Los ajustes se realizan según cambios de comportamiento, mercado o estrategia, manteniendo un impacto consistente en el tiempo.", order: 5 },
        { id: 6, question: "¿Cuál es el ROI típico de las soluciones?", answer: "Los proyectos pueden generar hasta 20x de ROI en el primer año, impulsando ingresos, protegiendo margen y reduciendo ineficiencias operativas.", order: 6 },
        { id: 7, question: "¿Qué tipo de datos se necesitan para empezar?", answer: "Usamos los datos que tu empresa ya tiene, como transacciones, comportamiento, CRM y supply. Empezamos con muestras para validar el potencial antes de la integración completa, con modelos robustos frente a lagunas de datos.", order: 7 },
        { id: 8, question: "¿La solución se integra con nuestros sistemas actuales?", answer: "Sí. Nuestra arquitectura es API-first y se conecta con facilidad a ERPs, CRMs, e-commerce y otras bases internas.", order: 8 },
        { id: 9, question: "¿Es necesario tener un equipo de ciencia de datos?", answer: "No. Las soluciones están diseñadas para que los equipos de negocio operen decisiones predictivas sin dependencia técnica.", order: 9 },
        { id: 10, question: "¿La inteligencia es explicable y compatible con las regulaciones?", answer: "Sí. Trabajamos con capas de explicabilidad y adherencia a normas como LGPD y GDPR, garantizando transparencia y seguridad.", order: 10 },
        { id: 11, question: "¿Qué los diferencia de otras empresas de IA?", answer: "Unimos inteligencia predictiva con activación en tiempo real. Nuestros motores propietarios transforman datos en decisiones operativas, mientras i6Signal conecta esos insights directamente a los equipos, convirtiendo el análisis en acción inmediata.\n\nNo entregamos solo modelos. Ponemos las decisiones en movimiento.", order: 11 },
        { id: 12, question: "¿Cómo miden el impacto en el negocio?", answer: "Trabajamos con indicadores claros de ingresos, margen y eficiencia desde el inicio del proyecto, siguiendo variaciones directamente atribuibles a las activaciones predictivas en producción.", order: 12 }
      ]
    }
  }), []);

  const text = useMemo(() => content[language] ?? content.pt, [content, language]);

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
    <section className="py-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {text.title}
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            {text.subtitle}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
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
