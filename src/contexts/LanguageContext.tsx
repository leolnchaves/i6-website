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
    'solutions.hero.mainTitle': 'Business AI Solutions.',
    'solutions.hero.mainSubtitle': 'Built to Perform.',
    'solutions.hero.description': 'Discover how our AI solutions can transform your business operations and drive growth.',
    'solutions.viewAllSolutions': 'View All Solutions',
    'solutions.businessOutcomes': 'Business Outcomes',
    'solutions.learnMore': 'Learn More',
    
    // Solutions Details
    'solutions.smartDiscovery.title': 'Smart Discovery for Anonymous Visitors',
    'solutions.smartDiscovery.focus': 'Focus: B2B, B2C',
    'solutions.smartDiscovery.description': 'Turn anonymous traffic into engaged buyers. Our engine uses real-time signals and context to drive high-value recommendations without needing prior user history.',
    'solutions.smartDiscovery.feature1': 'Contextual Affinity Modeling',
    'solutions.smartDiscovery.feature2': 'Cold-Start Personalization',
    'solutions.smartDiscovery.feature3': 'Anonymous Visitor Intelligence',
    'solutions.smartDiscovery.feature4': 'Real-time Recommendations',
    'solutions.smartDiscovery.outcome': 'Unlocks product discovery and boosts engagement with zero historical data.',
    
    'solutions.predictivePersonalization.title': 'Predictive Personalization for Identified Users',
    'solutions.predictivePersonalization.focus': 'Focus: B2B, B2C, B2B2C, D2C',
    'solutions.predictivePersonalization.description': 'Deliver truly personalized experiences by predicting customer needs based on individual behavior and preferences. Increase retention and drive higher purchase frequency.',
    'solutions.predictivePersonalization.feature1': 'Behavioral Data Analysis',
    'solutions.predictivePersonalization.feature2': 'Omnichannel Personalization',
    'solutions.predictivePersonalization.feature3': 'Cross-sell and Up-sell Intelligence',
    'solutions.predictivePersonalization.feature4': 'Profile Enrichment and Scoring',
    'solutions.predictivePersonalization.outcome': 'Increases customer lifetime value with intelligent, behavior-based personalization.',
    
    'solutions.industrialRecommendation.title': 'Industrial Recommendation Intelligence',
    'solutions.industrialRecommendation.focus': 'Focus: B2B, B2B2C',
    'solutions.industrialRecommendation.description': 'Align commercial targets with intelligent recommendations that optimize assortment, pricing, and POS behavior — all in real time.',
    'solutions.industrialRecommendation.feature1': 'Assortment Optimization',
    'solutions.industrialRecommendation.feature2': 'Dynamic Pricing Integration',
    'solutions.industrialRecommendation.feature3': 'Commercial Target Alignment',
    'solutions.industrialRecommendation.feature4': 'POS Behavioral Forecasting',
    'solutions.industrialRecommendation.outcome': 'Drives product relevance and sell-out, aligned with revenue and margin goals.',
    
    'solutions.predictiveCampaign.title': 'Predictive Campaign Targeting',
    'solutions.predictiveCampaign.focus': 'Focus: B2C',
    'solutions.predictiveCampaign.description': 'Identify and activate only the users most likely to convert before your campaign even begins. Reduce CAC and increase effectiveness with precision targeting.',
    'solutions.predictiveCampaign.feature1': 'Propensity Modeling',
    'solutions.predictiveCampaign.feature2': 'Conversion Likelihood Scoring',
    'solutions.predictiveCampaign.feature3': 'Campaign Audience Refinement',
    'solutions.predictiveCampaign.feature4': 'Lead Activation Strategy',
    'solutions.predictiveCampaign.outcome': 'Maximizes ROI by targeting the right customer at the right time.',
    
    'solutions.smartPricing.title': 'Smart Price Optimization',
    'solutions.smartPricing.focus': 'Focus: B2B, B2C, B2B2C, D2C',
    'solutions.smartPricing.description': 'A dynamic pricing solution that adapts in real time to demand, behavior, and product lifecycle. Maximize profitability without losing competitiveness.',
    'solutions.smartPricing.feature1': 'Behavior-Based Pricing',
    'solutions.smartPricing.feature2': 'Lifecycle-Aware Strategy',
    'solutions.smartPricing.feature3': 'Price Sensitivity Calibration',
    'solutions.smartPricing.feature4': 'Margin Optimization Engine',
    'solutions.smartPricing.outcome': 'Improves margin, sales velocity, and competitiveness through intelligent pricing.',
    
    'solutions.demandForecasting.title': 'Adaptive Demand Forecasting',
    'solutions.demandForecasting.focus': 'Focus: B2B, B2C',
    'solutions.demandForecasting.description': 'Forecast demand with precision and adaptability. Our self-adjusting models project future sales based on trends, seasonality, and behaviors — empowering supply chain and commercial planning.',
    'solutions.demandForecasting.feature1': 'Self-Reinforcing Forecast Model',
    'solutions.demandForecasting.feature2': 'Extended Projection (N+M)',
    'solutions.demandForecasting.feature3': 'Seasonality and Trend Detection',
    'solutions.demandForecasting.feature4': 'Inventory and Supply Chain Alignment',
    'solutions.demandForecasting.outcome': 'Enhances demand planning accuracy and agility in fast-changing markets.',
    
    // Solutions Process
    'solutions.process.title': 'AI Implementation Journey',
    'solutions.process.subtitle': 'Risk-free testing. Concrete potential in 30 days.',
    'solutions.process.discovery.title': 'Discovery & Business Angle Definition',
    'solutions.process.discovery.subtitle': 'Business Requirement Analysis',
    'solutions.process.discovery.description': 'Understanding your business needs and defining the optimal approach',
    'solutions.process.data.title': 'Data Sample & Anonymization',
    'solutions.process.data.subtitle': 'Secure Data Processing',
    'solutions.process.data.description': 'Collecting and preparing your data with full privacy protection',
    'solutions.process.training.title': 'Model Training & Fine-tuning',
    'solutions.process.training.subtitle': 'Business-Oriented Training',
    'solutions.process.training.description': 'Building custom AI models tailored to your specific business context',
    'solutions.process.testing.title': 'Performance Evaluation',
    'solutions.process.testing.subtitle': 'Precision & Backtest Analysis',
    'solutions.process.testing.description': 'Comprehensive testing to ensure optimal performance and accuracy',
    'solutions.process.integration.title': 'Integration & Recommendations',
    'solutions.process.integration.subtitle': 'Active Digital Channel Integration',
    'solutions.process.integration.description': 'Seamless deployment across your digital ecosystem',
    
    // Solutions Sandbox
    'solutions.sandbox.title': 'Sandbox Environment & Consulting Support Included',
    'solutions.sandbox.description': 'Complete testing environment with expert guidance throughout your journey',
    'solutions.sandbox.feature1': 'Risk-Free Testing Environment',
    'solutions.sandbox.feature2': 'Expert Consulting & Support',
    'solutions.sandbox.feature3': '30-Day Concrete Results',
    
    // Solutions CTA
    'solutions.cta.title': 'Transform Your Business Today',
    'solutions.cta.description': 'Ready to revolutionize your business with AI? Let\'s discuss how we can help you achieve your goals.',
    'solutions.cta.button': 'Get Started Now',
    
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
    'footer.privacy': 'Privacy Policy',
    'footer.ethics': 'Ethics Policy',
    
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
    'solutions.hero.mainTitle': 'Soluções de IA Empresariais.',
    'solutions.hero.mainSubtitle': 'Construídas para Performar.',
    'solutions.hero.description': 'Descubra como nossas soluções de IA podem transformar as operações do seu negócio e impulsionar o crescimento.',
    'solutions.viewAllSolutions': 'Ver Todas as Soluções',
    'solutions.businessOutcomes': 'Resultados Empresariais',
    'solutions.learnMore': 'Saiba Mais',
    
    // Solutions Details
    'solutions.smartDiscovery.title': 'Descoberta Inteligente para Visitantes Anônimos',
    'solutions.smartDiscovery.focus': 'Foco: B2B, B2C',
    'solutions.smartDiscovery.description': 'Transforme tráfego anônimo em compradores engajados. Nosso motor usa sinais em tempo real e contexto para gerar recomendações de alto valor sem precisar de histórico do usuário.',
    'solutions.smartDiscovery.feature1': 'Modelagem de Afinidade Contextual',
    'solutions.smartDiscovery.feature2': 'Personalização Cold-Start',
    'solutions.smartDiscovery.feature3': 'Inteligência de Visitante Anônimo',
    'solutions.smartDiscovery.feature4': 'Recomendações em Tempo Real',
    'solutions.smartDiscovery.outcome': 'Desbloqueie descoberta de produtos e aumente engajamento com zero dados históricos.',
    
    'solutions.predictivePersonalization.title': 'Personalização Preditiva para Usuários Identificados',
    'solutions.predictivePersonalization.focus': 'Foco: B2B, B2C, B2B2C, D2C',
    'solutions.predictivePersonalization.description': 'Entregue experiências verdadeiramente personalizadas prevendo necessidades do cliente baseadas em comportamento individual e preferências. Aumente retenção e impulsione maior frequência de compra.',
    'solutions.predictivePersonalization.feature1': 'Análise de Dados Comportamentais',
    'solutions.predictivePersonalization.feature2': 'Personalização Omnichannel',
    'solutions.predictivePersonalization.feature3': 'Inteligência de Cross-sell e Up-sell',
    'solutions.predictivePersonalization.feature4': 'Enriquecimento e Pontuação de Perfil',
    'solutions.predictivePersonalization.outcome': 'Aumenta valor vitalício do cliente com personalização inteligente baseada em comportamento.',
    
    'solutions.industrialRecommendation.title': 'Inteligência de Recomendação Industrial',
    'solutions.industrialRecommendation.focus': 'Foco: B2B, B2B2C',
    'solutions.industrialRecommendation.description': 'Alinhe metas comerciais com recomendações inteligentes que otimizam sortimento, precificação e comportamento de PDV — tudo em tempo real.',
    'solutions.industrialRecommendation.feature1': 'Otimização de Sortimento',
    'solutions.industrialRecommendation.feature2': 'Integração de Precificação Dinâmica',
    'solutions.industrialRecommendation.feature3': 'Alinhamento de Metas Comerciais',
    'solutions.industrialRecommendation.feature4': 'Previsão Comportamental de PDV',
    'solutions.industrialRecommendation.outcome': 'Impulsiona relevância de produtos e sell-out, alinhado com metas de receita e margem.',
    
    'solutions.predictiveCampaign.title': 'Segmentação Preditiva de Campanhas',
    'solutions.predictiveCampaign.focus': 'Foco: B2C',
    'solutions.predictiveCampaign.description': 'Identifique e ative apenas os usuários mais propensos a converter antes da sua campanha começar. Reduza CAC e aumente efetividade com segmentação de precisão.',
    'solutions.predictiveCampaign.feature1': 'Modelagem de Propensão',
    'solutions.predictiveCampaign.feature2': 'Pontuação de Probabilidade de Conversão',
    'solutions.predictiveCampaign.feature3': 'Refinamento de Audiência de Campanha',
    'solutions.predictiveCampaign.feature4': 'Estratégia de Ativação de Leads',
    'solutions.predictiveCampaign.outcome': 'Maximiza ROI segmentando o cliente certo no momento certo.',
    
    'solutions.smartPricing.title': 'Otimização Inteligente de Preços',
    'solutions.smartPricing.focus': 'Foco: B2B, B2C, B2B2C, D2C',
    'solutions.smartPricing.description': 'Uma solução de precificação dinâmica que se adapta em tempo real à demanda, comportamento e ciclo de vida do produto. Maximize lucratividade sem perder competitividade.',
    'solutions.smartPricing.feature1': 'Precificação Baseada em Comportamento',
    'solutions.smartPricing.feature2': 'Estratégia Consciente do Ciclo de Vida',
    'solutions.smartPricing.feature3': 'Calibração de Sensibilidade a Preços',
    'solutions.smartPricing.feature4': 'Motor de Otimização de Margem',
    'solutions.smartPricing.outcome': 'Melhora margem, velocidade de vendas e competitividade através de precificação inteligente.',
    
    'solutions.demandForecasting.title': 'Previsão Adaptativa de Demanda',
    'solutions.demandForecasting.focus': 'Foco: B2B, B2C',
    'solutions.demandForecasting.description': 'Preveja demanda com precisão e adaptabilidade. Nossos modelos auto-ajustáveis projetam vendas futuras baseadas em tendências, sazonalidade e comportamentos — capacitando planejamento de supply chain e comercial.',
    'solutions.demandForecasting.feature1': 'Modelo de Previsão Auto-Reforçado',
    'solutions.demandForecasting.feature2': 'Projeção Estendida (N+M)',
    'solutions.demandForecasting.feature3': 'Detecção de Sazonalidade e Tendências',
    'solutions.demandForecasting.feature4': 'Alinhamento de Estoque e Supply Chain',
    'solutions.demandForecasting.outcome': 'Melhora precisão e agilidade no planejamento de demanda em mercados em rápida mudança.',
    
    // Solutions Process
    'solutions.process.title': 'Jornada de Implementação de IA',
    'solutions.process.subtitle': 'Testes sem risco. Potencial concreto em 30 dias.',
    'solutions.process.discovery.title': 'Descoberta e Definição do Ângulo de Negócio',
    'solutions.process.discovery.subtitle': 'Análise de Requisitos de Negócio',
    'solutions.process.discovery.description': 'Entendendo suas necessidades de negócio e definindo a abordagem ideal',
    'solutions.process.data.title': 'Amostra de Dados e Anonimização',
    'solutions.process.data.subtitle': 'Processamento Seguro de Dados',
    'solutions.process.data.description': 'Coletando e preparando seus dados com proteção completa de privacidade',
    'solutions.process.training.title': 'Treinamento e Ajuste Fino do Modelo',
    'solutions.process.training.subtitle': 'Treinamento Orientado ao Negócio',
    'solutions.process.training.description': 'Construindo modelos de IA personalizados adaptados ao seu contexto específico de negócio',
    'solutions.process.testing.title': 'Avaliação de Performance',
    'solutions.process.testing.subtitle': 'Análise de Precisão e Backtest',
    'solutions.process.testing.description': 'Testes abrangentes para garantir performance e precisão ideais',
    'solutions.process.integration.title': 'Integração e Recomendações',
    'solutions.process.integration.subtitle': 'Integração Ativa de Canal Digital',
    'solutions.process.integration.description': 'Implantação perfeita em todo seu ecossistema digital',
    
    // Solutions Sandbox
    'solutions.sandbox.title': 'Ambiente Sandbox e Suporte de Consultoria Incluídos',
    'solutions.sandbox.description': 'Ambiente completo de testes com orientação especializada durante toda sua jornada',
    'solutions.sandbox.feature1': 'Ambiente de Testes Sem Risco',
    'solutions.sandbox.feature2': 'Consultoria e Suporte Especializado',
    'solutions.sandbox.feature3': 'Resultados Concretos em 30 Dias',
    
    // Solutions CTA
    'solutions.cta.title': 'Transforme Seu Negócio Hoje',
    'solutions.cta.description': 'Pronto para revolucionar seu negócio com IA? Vamos discutir como podemos ajudá-lo a alcançar seus objetivos.',
    'solutions.cta.button': 'Começar Agora',
    
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
    'footer.privacy': 'Política de Privacidade',
    'footer.ethics': 'Política de Ética',
    
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
