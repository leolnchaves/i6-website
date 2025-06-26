
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.home': 'Home',
    'header.solutions': 'Solutions',
    'header.successStories': 'Success Stories',
    'header.contact': 'Contact Us',
    'header.getStarted': 'Get Started',
    
    // Hero Section
    'hero.infinite': 'Infinite',
    'hero.possibilities': 'Possibilities',
    'hero.poweredByAI': 'Powered by AI',
    'hero.description': 'Transform your business with cutting-edge artificial intelligence solutions that unlock unlimited potential and drive extraordinary results.',
    'hero.startJourney': 'Start Your Journey',
    'hero.watchDemo': 'Watch Demo',
    
    // Results Section
    'results.title': 'Real AI Impact That Drives Business Growth',
    'results.subtitle1': 'No more GenAI solutions and agents that don\'t deliver real results. No more focus only on software productivity. No more high technical complexity and long integration journeys.',
    'results.subtitle2': 'Our unique approach combines advanced artificial intelligence with business strategy, delivering measurable impact and real transformation for your company.',
    'results.conversionRate.title': 'Conversion Rate Optimization',
    'results.conversionRate.description': 'Advanced AI algorithms boost conversion rates through intelligent customer behavior analysis and personalized recommendations',
    'results.crmCost.title': 'CRM Cost Reduction',
    'results.crmCost.description': 'Streamlined operations and automated processes significantly reduce operational expenses while maintaining service quality',
    'results.avgTicket.title': 'Average Ticket Enhancement',
    'results.avgTicket.description': 'Substantial increase in average ticket value through AI-guided cross-selling with diversity balancing',
    'results.bounceRate.title': 'Bounce Rate Optimization',
    'results.bounceRate.description': 'Significant reduction of bounce rate in digital funnels through AI-driven user experience optimization',
    'results.proposalEngagement.title': 'Enhanced Proposal Engagement',
    'results.proposalEngagement.description': 'Data-driven insights and AI-powered personalization dramatically improve proposal success rates',
    'results.realTimeRec.title': 'Real-Time Recommendations',
    'results.realTimeRec.description': 'Predictive behavior recommendations with equal precision for logged users (with history) and anonymous users (without history)',
    'results.productDiscovery.title': 'Relevant Product Discovery',
    'results.productDiscovery.description': 'AI-powered product complementarity discovery based on navigation behavior patterns and user preferences',
    'results.dynamicPricing.title': 'Dynamic Pricing Intelligence',
    'results.dynamicPricing.description': 'Self-reinforcing pricing model adjusting prices based on demand, where adjustments increase either demand or margin, feeding back into the system',
    'results.marketDemand.title': 'Market Demand Forecasting',
    'results.marketDemand.description': 'AI-powered forecast precision directing production plans and commercial goals, optimizing stock breaks and turnover',
    'results.rapidImplementation.title': 'Rapid Implementation',
    'results.rapidImplementation.description': '100% API-first and cloud-native AI solutions deliver measurable outcomes in weeks, not months',
    
    // Stats Section
    'stats.companiesTransformed': 'Companies Transformed',
    'stats.accuracyRate': 'Accuracy Rate',
    'stats.expertSupport': 'Expert Support',
    
    // CTA Section
    'cta.title': 'Ready to Transform Your Business?',
    'cta.description': 'Join hundreds of companies that have already unlocked their infinite potential.',
    'cta.button': 'Get Started Today',
    
    // Video Modal
    'video.title': 'AI Solutions Demo',
    'video.close': 'Close',
    
    // Solutions Page
    'solutions.hero.title': 'AI Solutions That',
    'solutions.hero.subtitle': 'Drive Results',
    'solutions.hero.description': 'Discover our comprehensive suite of AI-powered solutions designed to transform your business operations and accelerate growth.',
    'solutions.aiAnalytics.title': 'AI Analytics',
    'solutions.aiAnalytics.description': 'Transform raw data into actionable insights with our advanced machine learning algorithms.',
    'solutions.aiAnalytics.feature1': 'Predictive Analytics',
    'solutions.aiAnalytics.feature2': 'Real-time Processing',
    'solutions.aiAnalytics.feature3': 'Custom Dashboards',
    'solutions.aiAnalytics.feature4': 'API Integration',
    'solutions.processAutomation.title': 'Process Automation',
    'solutions.processAutomation.description': 'Streamline operations and reduce costs with intelligent automation solutions.',
    'solutions.processAutomation.feature1': 'Workflow Automation',
    'solutions.processAutomation.feature2': 'Document Processing',
    'solutions.processAutomation.feature3': 'Quality Control',
    'solutions.processAutomation.feature4': 'Performance Monitoring',
    'solutions.dataIntelligence.title': 'Data Intelligence',
    'solutions.dataIntelligence.description': 'Unlock the full potential of your data with comprehensive intelligence solutions.',
    'solutions.dataIntelligence.feature1': 'Data Mining',
    'solutions.dataIntelligence.feature2': 'Pattern Recognition',
    'solutions.dataIntelligence.feature3': 'Anomaly Detection',
    'solutions.dataIntelligence.feature4': 'Trend Analysis',
    'solutions.cloudIntegration.title': 'Cloud Integration',
    'solutions.cloudIntegration.description': 'Seamlessly integrate AI capabilities with your existing cloud infrastructure.',
    'solutions.cloudIntegration.feature1': 'Multi-Cloud Support',
    'solutions.cloudIntegration.feature2': 'Scalable Architecture',
    'solutions.cloudIntegration.feature3': 'Security Compliance',
    'solutions.cloudIntegration.feature4': 'Cost Optimization',
    'solutions.learnMore': 'Learn More',
    'solutions.process.title': 'Our Implementation Process',
    'solutions.process.description': 'We follow a proven methodology to ensure successful AI integration and maximum return on investment.',
    'solutions.process.discovery.title': 'Discovery',
    'solutions.process.discovery.description': 'Analyze your current systems and identify opportunities',
    'solutions.process.strategy.title': 'Strategy',
    'solutions.process.strategy.description': 'Develop a customized AI implementation roadmap',
    'solutions.process.implementation.title': 'Implementation',
    'solutions.process.implementation.description': 'Deploy and integrate AI solutions seamlessly',
    'solutions.process.optimization.title': 'Optimization',
    'solutions.process.optimization.description': 'Monitor, refine, and scale for maximum impact',
    'solutions.cta.title': 'Ready to Implement AI Solutions?',
    'solutions.cta.description': 'Contact our experts today to discuss how our AI solutions can transform your business.',
    'solutions.cta.button': 'Schedule Consultation',
    
    // Success Stories Page - NEW TRANSLATIONS
    'successStories.hero.title': 'Success Stories That',
    'successStories.hero.subtitle': 'Inspire Innovation',
    'successStories.hero.description': 'Discover how leading companies across industries have transformed their operations and achieved remarkable results with our AI solutions.',
    'successStories.metrics.avgROI': 'Average ROI',
    'successStories.metrics.companiesServed': 'Companies Served',
    'successStories.metrics.costSavings': 'Cost Savings Generated',
    'successStories.testimonials.title': 'What Our Clients Say',
    'successStories.testimonials.subtitle': 'Hear directly from the leaders who\'ve transformed their businesses with Infinity6.',
    'successStories.testimonials.quote1': 'The AI implementation exceeded our expectations. ROI was achieved within 6 months.',
    'successStories.testimonials.author1': 'David Kim, CTO at DataTech',
    'successStories.testimonials.quote2': 'Incredible support team and cutting-edge technology. Highly recommended.',
    'successStories.testimonials.author2': 'Emma Watson, CEO at InnovateCorp',
    'successStories.testimonials.quote3': 'Game-changing AI solutions that transformed our entire operation.',
    'successStories.testimonials.author3': 'Robert Taylor, VP at FutureTech',
    'successStories.cta.title': 'Ready to Write Your Success Story?',
    'successStories.cta.description': 'Join the ranks of successful companies that have transformed their operations with our AI solutions.',
    'successStories.cta.button': 'Start Your Transformation',
    'successStories.stories.techcorp.company': 'TechCorp Industries',
    'successStories.stories.techcorp.industry': 'Manufacturing',
    'successStories.stories.techcorp.challenge': 'Reducing production downtime and optimizing efficiency',
    'successStories.stories.techcorp.solution': 'AI-powered predictive maintenance and quality control',
    'successStories.stories.techcorp.quote': 'Infinity6\'s AI solutions transformed our manufacturing process. We\'ve seen unprecedented efficiency gains and cost reductions.',
    'successStories.stories.techcorp.author': 'Sarah Johnson, CTO',
    'successStories.stories.financeflow.company': 'FinanceFlow',
    'successStories.stories.financeflow.industry': 'Financial Services',
    'successStories.stories.financeflow.challenge': 'Fraud detection and risk assessment automation',
    'successStories.stories.financeflow.solution': 'Machine learning algorithms for real-time transaction analysis',
    'successStories.stories.financeflow.quote': 'The AI-driven fraud detection system has revolutionized our security operations while improving customer experience.',
    'successStories.stories.financeflow.author': 'Michael Chen, VP of Operations',
    'successStories.stories.retailmax.company': 'RetailMax',
    'successStories.stories.retailmax.industry': 'E-commerce',
    'successStories.stories.retailmax.challenge': 'Personalizing customer experience and inventory management',
    'successStories.stories.retailmax.solution': 'AI recommendation engine and demand forecasting',
    'successStories.stories.retailmax.quote': 'Our customers love the personalized experience, and our inventory management has never been more efficient.',
    'successStories.stories.retailmax.author': 'Lisa Rodriguez, CEO',
    'successStories.common.challenge': 'Challenge',
    'successStories.common.solution': 'Solution',
    'successStories.common.downtimeReduction': 'Downtime Reduction',
    'successStories.common.costSavings': 'Cost Savings',
    'successStories.common.efficiencyIncrease': 'Efficiency Increase',
    'successStories.common.fraudDetection': 'Fraud Detection',
    'successStories.common.falsePositives': 'False Positives',
    'successStories.common.processingSpeed': 'Processing Speed',
    'successStories.common.revenueGrowth': 'Revenue Growth',
    'successStories.common.customerRetention': 'Customer Retention',
    'successStories.common.inventoryTurnover': 'Inventory Turnover',
    
    // Home Featured Stories - NEW TRANSLATIONS
    'home.featuredStories.title': 'Success Stories That',
    'home.featuredStories.subtitle': 'Transform Industries',
    'home.featuredStories.description': 'Discover how leading companies achieved remarkable results with our AI solutions',
    'home.featuredStories.learnMore': 'Learn more',
    'home.featuredStories.viewAll': 'View All Success Stories',
    'home.featuredStories.techcorp.description': 'AI-powered predictive maintenance reduced downtime by 75%',
    'home.featuredStories.financeflow.description': 'Machine learning fraud detection with 99.2% accuracy rate',
    'home.featuredStories.retailmax.description': 'AI recommendation engine boosted revenue by 45%',
    'home.featuredStories.detectionRate': 'Detection Rate',
    'home.featuredStories.retention': 'Retention',
    
    // Contact Page - NEW TRANSLATIONS
    'contact.hero.title': 'Let\'s Start a',
    'contact.hero.subtitle': 'Conversation',
    'contact.hero.description': 'Ready to transform your business with AI? Our experts are here to help you explore the infinite possibilities that await.',
    'contact.info.emailUs': 'Email Us',
    'contact.info.emailDescription': 'Send us an email anytime',
    'contact.info.callUs': 'Call Us',
    'contact.info.callDescription': 'Mon-Fri from 8am to 6pm',
    'contact.info.visitUs': 'Visit Us',
    'contact.info.visitDescription': 'Come say hello at our headquarters',
    'contact.faq.title': 'Frequently Asked Questions',
    'contact.faq.subtitle': 'Common questions about our AI solutions and services.',
    'contact.faq.q1': 'How long does AI implementation take?',
    'contact.faq.a1': 'Implementation time varies by project complexity, typically ranging from 2-6 months for full deployment.',
    'contact.faq.q2': 'What industries do you serve?',
    'contact.faq.a2': 'We serve all industries including manufacturing, finance, healthcare, retail, and technology companies.',
    'contact.faq.q3': 'Do you provide ongoing support?',
    'contact.faq.a3': 'Yes, we offer 24/7 support, maintenance, and continuous optimization services for all our AI solutions.',
    'contact.faq.q4': 'What\'s the typical ROI for AI projects?',
    'contact.faq.a4': 'Our clients typically see 150% ROI within the first year, with continued improvements over time.',
    'contact.form.title': 'Send Us a Message',
    'contact.form.subtitle': 'Fill out the form below and we\'ll get back to you within 24 hours.',
    'contact.form.fullName': 'Full Name',
    'contact.form.namePlaceholder': 'Your full name',
    'contact.form.emailAddress': 'Email Address',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.company': 'Company',
    'contact.form.companyPlaceholder': 'Your company name',
    'contact.form.phoneNumber': 'Phone Number',
    'contact.form.phonePlaceholder': '+1 (555) 123-4567',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPlaceholder': 'Select a subject',
    'contact.form.subjectGeneral': 'General Inquiry',
    'contact.form.subjectDemo': 'Request Demo',
    'contact.form.subjectPartnership': 'Partnership',
    'contact.form.subjectSupport': 'Technical Support',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Tell us about your project and how we can help...',
    'contact.form.sendMessage': 'Send Message',
    'contact.form.messageSent': 'Message Sent!',
    'contact.form.thankYou': 'Thank you for reaching out. We\'ll get back to you soon.',
    'contact.map.title': 'Our Global Presence',
    'contact.map.description': 'Find us across three continents. Click on each location to see detailed contact information.',
    'contact.map.headquarters': 'Headquarters',
    'contact.map.branchOffice': 'Branch Office',
    'contact.calendly.title': 'Ready to Get Started?',
    'contact.calendly.description': 'Schedule a free consultation with our AI experts to discuss your project and explore how we can help transform your business.',
    
    // Footer - NEW TRANSLATIONS
    'footer.description': 'Transforming businesses with cutting-edge AI solutions. Unlock infinite possibilities with our innovative technology.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2024 Infinity6.ai. All rights reserved.',
    
    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.subtitle': 'Your privacy is our priority. Learn how we protect and handle your data.',
    'privacy.lastUpdated': 'Last updated: December 2024',
    
    // Ethics Policy
    'ethics.title': 'Ethics Policy',
    'ethics.subtitle': 'Our commitment to ethical AI and responsible business practices.',
    'ethics.lastUpdated': 'Last updated: December 2024',
    
    // 404 Page
    'notFound.title': '404',
    'notFound.subtitle': 'Oops! Page not found',
    'notFound.backHome': 'Return to Home'
  },
  pt: {
    // Header
    'header.home': 'Início',
    'header.solutions': 'Soluções',
    'header.successStories': 'Cases de Sucesso',
    'header.contact': 'Contato',
    'header.getStarted': 'Começar',
    
    // Hero Section
    'hero.infinite': 'Infinitas',
    'hero.possibilities': 'Possibilidades',
    'hero.poweredByAI': 'Impulsionadas por IA',
    'hero.description': 'Transforme seu negócio com soluções de inteligência artificial de ponta que desbloqueiam potencial ilimitado e geram resultados extraordinários.',
    'hero.startJourney': 'Iniciar Jornada',
    'hero.watchDemo': 'Ver Demo',
    
    // Results Section
    'results.title': 'Impacto Real de IA Que Gera Crescimento dos Negócios',
    'results.subtitle1': 'Chega de soluções GenAI e agentes que não entregam resultados reais. Chega de focar apenas na produtividade de software. Chega de alta complexidade técnica e longas jornadas de integração.',
    'results.subtitle2': 'Nossa abordagem única combina inteligência artificial avançada com estratégia de negócios, entregando impacto mensurável e transformação real para sua empresa.',
    'results.conversionRate.title': 'Otimização da Taxa de Conversão',
    'results.conversionRate.description': 'Algoritmos avançados de IA aumentam taxas de conversão através de análise inteligente do comportamento do cliente e recomendações personalizadas',
    'results.crmCost.title': 'Redução de Custos CRM',
    'results.crmCost.description': 'Operações otimizadas e processos automatizados reduzem significativamente despesas operacionais mantendo a qualidade do serviço',
    'results.avgTicket.title': 'Aumento do Ticket Médio',
    'results.avgTicket.description': 'Aumento substancial no valor do ticket médio através de cross-selling guiado por IA com balanceamento de diversidade',
    'results.bounceRate.title': 'Otimização da Taxa de Rejeição',
    'results.bounceRate.description': 'Redução significativa da taxa de rejeição em funis digitais através de otimização de experiência do usuário guiada por IA',
    'results.proposalEngagement.title': 'Engajamento Aprimorado de Propostas',
    'results.proposalEngagement.description': 'Insights baseados em dados e personalização impulsionada por IA melhoram drasticamente as taxas de sucesso de propostas',
    'results.realTimeRec.title': 'Recomendações em Tempo Real',
    'results.realTimeRec.description': 'Recomendações preditivas de comportamento com precisão igual para usuários logados (com histórico) e usuários anônimos (sem histórico)',
    'results.productDiscovery.title': 'Descoberta Relevante de Produtos',
    'results.productDiscovery.description': 'Descoberta de complementaridade de produtos impulsionada por IA baseada em padrões de comportamento de navegação e preferências do usuário',
    'results.dynamicPricing.title': 'Inteligência de Preços Dinâmica',
    'results.dynamicPricing.description': 'Modelo de preços auto-reforçado ajustando preços baseado na demanda, onde ajustes aumentam demanda ou margem, realimentando o sistema',
    'results.marketDemand.title': 'Previsão de Demanda de Mercado',
    'results.marketDemand.description': 'Precisão de previsão impulsionada por IA direcionando planos de produção e metas comerciais, otimizando quebras de estoque e giro',
    'results.rapidImplementation.title': 'Implementação Rápida',
    'results.rapidImplementation.description': 'Soluções de IA 100% API-first e cloud-native entregam resultados mensuráveis em semanas, não meses',
    
    // Stats Section
    'stats.companiesTransformed': 'Empresas Transformadas',
    'stats.accuracyRate': 'Taxa de Precisão',
    'stats.expertSupport': 'Suporte Especializado',
    
    // CTA Section
    'cta.title': 'Pronto para Transformar Seu Negócio?',
    'cta.description': 'Junte-se a centenas de empresas que já desbloquearam seu potencial infinito.',
    'cta.button': 'Começar Hoje',
    
    // Video Modal
    'video.title': 'Demo de Soluções IA',
    'video.close': 'Fechar',
    
    // Solutions Page
    'solutions.hero.title': 'Soluções de IA Que',
    'solutions.hero.subtitle': 'Geram Resultados',
    'solutions.hero.description': 'Descubra nosso conjunto abrangente de soluções impulsionadas por IA projetadas para transformar as operações do seu negócio e acelerar o crescimento.',
    'solutions.aiAnalytics.title': 'Analytics com IA',
    'solutions.aiAnalytics.description': 'Transforme dados brutos em insights acionáveis com nossos algoritmos avançados de aprendizado de máquina.',
    'solutions.aiAnalytics.feature1': 'Analytics Preditiva',
    'solutions.aiAnalytics.feature2': 'Processamento em Tempo Real',
    'solutions.aiAnalytics.feature3': 'Dashboards Personalizados',
    'solutions.aiAnalytics.feature4': 'Integração de API',
    'solutions.processAutomation.title': 'Automação de Processos',
    'solutions.processAutomation.description': 'Otimize operações e reduza custos com soluções inteligentes de automação.',
    'solutions.processAutomation.feature1': 'Automação de Fluxo de Trabalho',
    'solutions.processAutomation.feature2': 'Processamento de Documentos',
    'solutions.processAutomation.feature3': 'Controle de Qualidade',
    'solutions.processAutomation.feature4': 'Monitoramento de Performance',
    'solutions.dataIntelligence.title': 'Inteligência de Dados',
    'solutions.dataIntelligence.description': 'Desbloqueie todo o potencial dos seus dados com soluções abrangentes de inteligência.',
    'solutions.dataIntelligence.feature1': 'Mineração de Dados',
    'solutions.dataIntelligence.feature2': 'Reconhecimento de Padrões',
    'solutions.dataIntelligence.feature3': 'Detecção de Anomalias',
    'solutions.dataIntelligence.feature4': 'Análise de Tendências',
    'solutions.cloudIntegration.title': 'Integração na Nuvem',
    'solutions.cloudIntegration.description': 'Integre perfeitamente capacidades de IA com sua infraestrutura de nuvem existente.',
    'solutions.cloudIntegration.feature1': 'Suporte Multi-Nuvem',
    'solutions.cloudIntegration.feature2': 'Arquitetura Escalável',
    'solutions.cloudIntegration.feature3': 'Compliance de Segurança',
    'solutions.cloudIntegration.feature4': 'Otimização de Custos',
    'solutions.learnMore': 'Saiba Mais',
    'solutions.process.title': 'Nosso Processo de Implementação',
    'solutions.process.description': 'Seguimos uma metodologia comprovada para garantir integração bem-sucedida de IA e máximo retorno sobre investimento.',
    'solutions.process.discovery.title': 'Descoberta',
    'solutions.process.discovery.description': 'Analisamos seus sistemas atuais e identificamos oportunidades',
    'solutions.process.strategy.title': 'Estratégia',
    'solutions.process.strategy.description': 'Desenvolvemos um roadmap personalizado de implementação de IA',
    'solutions.process.implementation.title': 'Implementação',
    'solutions.process.implementation.description': 'Implantamos e integramos soluções de IA perfeitamente',
    'solutions.process.optimization.title': 'Otimização',
    'solutions.process.optimization.description': 'Monitoramos, refinamos e escalamos para máximo impacto',
    'solutions.cta.title': 'Pronto para Implementar Soluções de IA?',
    'solutions.cta.description': 'Entre em contato com nossos especialistas hoje para discutir como nossas soluções de IA podem transformar seu negócio.',
    'solutions.cta.button': 'Agendar Consultoria',
    
    // Success Stories Page - NEW TRANSLATIONS
    'successStories.hero.title': 'Cases de Sucesso Que',
    'successStories.hero.subtitle': 'Inspiram Inovação',
    'successStories.hero.description': 'Descubra como empresas líderes de diversos setores transformaram suas operações e alcançaram resultados notáveis com nossas soluções de IA.',
    'successStories.metrics.avgROI': 'ROI Médio',
    'successStories.metrics.companiesServed': 'Empresas Atendidas',
    'successStories.metrics.costSavings': 'Economia de Custos Gerada',
    'successStories.testimonials.title': 'O Que Nossos Clientes Dizem',
    'successStories.testimonials.subtitle': 'Ouça diretamente dos líderes que transformaram seus negócios com a Infinity6.',
    'successStories.testimonials.quote1': 'A implementação de IA superou nossas expectativas. O ROI foi alcançado em 6 meses.',
    'successStories.testimonials.author1': 'David Kim, CTO da DataTech',
    'successStories.testimonials.quote2': 'Equipe de suporte incrível e tecnologia de ponta. Altamente recomendado.',
    'successStories.testimonials.author2': 'Emma Watson, CEO da InnovateCorp',
    'successStories.testimonials.quote3': 'Soluções de IA revolucionárias que transformaram toda nossa operação.',
    'successStories.testimonials.author3': 'Robert Taylor, VP da FutureTech',
    'successStories.cta.title': 'Pronto para Escrever Seu Case de Sucesso?',
    'successStories.cta.description': 'Junte-se às fileiras de empresas bem-sucedidas que transformaram suas operações com nossas soluções de IA.',
    'successStories.cta.button': 'Inicie Sua Transformação',
    'successStories.stories.techcorp.company': 'TechCorp Industries',
    'successStories.stories.techcorp.industry': 'Manufatura',
    'successStories.stories.techcorp.challenge': 'Reduzir tempo de inatividade da produção e otimizar eficiência',
    'successStories.stories.techcorp.solution': 'Manutenção preditiva e controle de qualidade impulsionados por IA',
    'successStories.stories.techcorp.quote': 'As soluções de IA da Infinity6 transformaram nosso processo de manufatura. Vimos ganhos de eficiência e reduções de custos sem precedentes.',
    'successStories.stories.techcorp.author': 'Sarah Johnson, CTO',
    'successStories.stories.financeflow.company': 'FinanceFlow',
    'successStories.stories.financeflow.industry': 'Serviços Financeiros',
    'successStories.stories.financeflow.challenge': 'Detecção de fraude e automação de avaliação de risco',
    'successStories.stories.financeflow.solution': 'Algoritmos de aprendizado de máquina para análise de transações em tempo real',
    'successStories.stories.financeflow.quote': 'O sistema de detecção de fraude impulsionado por IA revolucionou nossas operações de segurança enquanto melhora a experiência do cliente.',
    'successStories.stories.financeflow.author': 'Michael Chen, VP de Operações',
    'successStories.stories.retailmax.company': 'RetailMax',
    'successStories.stories.retailmax.industry': 'E-commerce',
    'successStories.stories.retailmax.challenge': 'Personalizar experiência do cliente e gerenciamento de estoque',
    'successStories.stories.retailmax.solution': 'Motor de recomendação de IA e previsão de demanda',
    'successStories.stories.retailmax.quote': 'Nossos clientes adoram a experiência personalizada, e nosso gerenciamento de estoque nunca foi tão eficiente.',
    'successStories.stories.retailmax.author': 'Lisa Rodriguez, CEO',
    'successStories.common.challenge': 'Desafio',
    'successStories.common.solution': 'Solução',
    'successStories.common.downtimeReduction': 'Redução de Tempo de Inatividade',
    'successStories.common.costSavings': 'Economia de Custos',
    'successStories.common.efficiencyIncrease': 'Aumento de Eficiência',
    'successStories.common.fraudDetection': 'Detecção de Fraude',
    'successStories.common.falsePositives': 'Falsos Positivos',
    'successStories.common.processingSpeed': 'Velocidade de Processamento',
    'successStories.common.revenueGrowth': 'Crescimento de Receita',
    'successStories.common.customerRetention': 'Retenção de Clientes',
    'successStories.common.inventoryTurnover': 'Giro de Estoque',
    
    // Home Featured Stories - NEW TRANSLATIONS
    'home.featuredStories.title': 'Cases de Sucesso Que',
    'home.featuredStories.subtitle': 'Transformam Indústrias',
    'home.featuredStories.description': 'Descubra como empresas líderes alcançaram resultados notáveis com nossas soluções de IA',
    'home.featuredStories.learnMore': 'Saiba mais',
    'home.featuredStories.viewAll': 'Ver Todos os Cases de Sucesso',
    'home.featuredStories.techcorp.description': 'Manutenção preditiva com IA reduziu tempo de inatividade em 75%',
    'home.featuredStories.financeflow.description': 'Detecção de fraude com aprendizado de máquina com 99,2% de precisão',
    'home.featuredStories.retailmax.description': 'Motor de recomendação de IA aumentou receita em 45%',
    'home.featuredStories.detectionRate': 'Taxa de Detecção',
    'home.featuredStories.retention': 'Retenção',
    
    // Contact Page - NEW TRANSLATIONS
    'contact.hero.title': 'Vamos Iniciar uma',
    'contact.hero.subtitle': 'Conversa',
    'contact.hero.description': 'Pronto para transformar seu negócio com IA? Nossos especialistas estão aqui para ajudá-lo a explorar as infinitas possibilidades que aguardam.',
    'contact.info.emailUs': 'Envie um Email',
    'contact.info.emailDescription': 'Envie-nos um email a qualquer momento',
    'contact.info.callUs': 'Ligue para Nós',
    'contact.info.callDescription': 'Seg-Sex das 8h às 18h',
    'contact.info.visitUs': 'Visite-nos',
    'contact.info.visitDescription': 'Venha nos cumprimentar em nossa sede',
    'contact.faq.title': 'Perguntas Frequentes',
    'contact.faq.subtitle': 'Perguntas comuns sobre nossas soluções e serviços de IA.',
    'contact.faq.q1': 'Quanto tempo leva a implementação de IA?',
    'contact.faq.a1': 'O tempo de implementação varia pela complexidade do projeto, tipicamente variando de 2-6 meses para implantação completa.',
    'contact.faq.q2': 'Quais indústrias vocês atendem?',
    'contact.faq.a2': 'Atendemos todas as indústrias incluindo manufatura, finanças, saúde, varejo e empresas de tecnologia.',
    'contact.faq.q3': 'Vocês fornecem suporte contínuo?',
    'contact.faq.a3': 'Sim, oferecemos suporte 24/7, manutenção e serviços de otimização contínua para todas nossas soluções de IA.',
    'contact.faq.q4': 'Qual é o ROI típico para projetos de IA?',
    'contact.faq.a4': 'Nossos clientes tipicamente veem 150% de ROI no primeiro ano, com melhorias contínuas ao longo do tempo.',
    'contact.form.title': 'Envie-nos uma Mensagem',
    'contact.form.subtitle': 'Preencha o formulário abaixo e entraremos em contato em até 24 horas.',
    'contact.form.fullName': 'Nome Completo',
    'contact.form.namePlaceholder': 'Seu nome completo',
    'contact.form.emailAddress': 'Endereço de Email',
    'contact.form.emailPlaceholder': 'seu@email.com',
    'contact.form.company': 'Empresa',
    'contact.form.companyPlaceholder': 'Nome da sua empresa',
    'contact.form.phoneNumber': 'Número de Telefone',
    'contact.form.phonePlaceholder': '+55 (11) 99999-9999',
    'contact.form.subject': 'Assunto',
    'contact.form.subjectPlaceholder': 'Selecione um assunto',
    'contact.form.subjectGeneral': 'Consulta Geral',
    'contact.form.subjectDemo': 'Solicitar Demo',
    'contact.form.subjectPartnership': 'Parceria',
    'contact.form.subjectSupport': 'Suporte Técnico',
    'contact.form.message': 'Mensagem',
    'contact.form.messagePlaceholder': 'Conte-nos sobre seu projeto e como podemos ajudar...',
    'contact.form.sendMessage': 'Enviar Mensagem',
    'contact.form.messageSent': 'Mensagem Enviada!',
    'contact.form.thankYou': 'Obrigado por entrar em contato. Retornaremos em breve.',
    'contact.map.title': 'Nossa Presença Global',
    'contact.map.description': 'Encontre-nos em três continentes. Clique em cada localização para ver informações detalhadas de contato.',
    'contact.map.headquarters': 'Sede',
    'contact.map.branchOffice': 'Filial',
    'contact.calendly.title': 'Pronto para Começar?',
    'contact.calendly.description': 'Agende uma consulta gratuita com nossos especialistas em IA para discutir seu projeto e explorar como podemos ajudar a transformar seu negócio.',
    
    // Footer - NEW TRANSLATIONS
    'footer.description': 'Transformando negócios com soluções de IA de ponta. Desbloqueie possibilidades infinitas com nossa tecnologia inovadora.',
    'footer.quickLinks': 'Links Rápidos',
    'footer.contact': 'Contato',
    'footer.copyright': '© 2024 Infinity6.ai. Todos os direitos reservados.',
    
    // Privacy Policy
    'privacy.title': 'Política de Privacidade',
    'privacy.subtitle': 'Sua privacidade é nossa prioridade. Saiba como protegemos e tratamos seus dados.',
    'privacy.lastUpdated': 'Última atualização: Dezembro 2024',
    
    // Ethics Policy
    'ethics.title': 'Política de Ética',
    'ethics.subtitle': 'Nosso compromisso com IA ética e práticas comerciais responsáveis.',
    'ethics.lastUpdated': 'Última atualização: Dezembro 2024',
    
    // 404 Page
    'notFound.title': '404',
    'notFound.subtitle': 'Ops! Página não encontrada',
    'notFound.backHome': 'Voltar ao Início'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
