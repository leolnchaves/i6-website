/**
 * Textos da página /contact (PT / EN / ES).
 * Hero, bloco de triagem, perguntas frequentes e legenda do mapa.
 */

export const BUILDERS_PATH = '/i6-builders';
export const COMMUNITY_PATH = '/community';
export const DOCS_PATH = '/docs';
export const TEAM_ANCHOR = '#fale-com-o-time';

/** E-mail exclusivo desta página (suporte@ é de /docs e /i6-builders). */
export const CONTACT_EMAIL = 'decida@infinity6.ai';

/**
 * Atalhos de pré-preenchimento do formulário de contato via `?intent=<id>`.
 * Cada intent define o assunto (chave fixa, igual ao select do formulário) e a
 * mensagem inicial nos três idiomas. O id também vai no payload como `intent`.
 * `subject` usa os valores do select ('other' = "Outro", motivo interno inalterado).
 */
export const CONTACT_INTENTS = {
  security: {
    subject: 'other',
    message: {
      pt: 'Olá! Cheguei pela seção de Governança e gostaria de mais detalhes sobre as camadas de segurança e privacidade da plataforma.',
      en: "Hi! I came from the Governance section and would like more details about the platform's security and privacy layers.",
      es: '¡Hola! Llegué desde la sección de Gobernanza y me gustaría más detalles sobre las capas de seguridad y privacidad de la plataforma.',
    },
  },
} as const;

export interface ContactFaq {
  id: number;
  question: string;
  answer: string;
}

export interface ContactCopy {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    sub: string;
    directPrefix: string;
  };
  triage: {
    title: string;
    links: { label: string; to: string }[];
    footnote: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    sub: string;
    items: ContactFaq[];
  };
  map: {
    title: string;
    description: string;
    hqLabel: string;
    city: string;
    region: string;
    country: string;
    address: string;
    nextLabel: string;
  };
}

export const contactCopy: { pt: ContactCopy; en: ContactCopy; es: ContactCopy } = {
  pt: {
    hero: {
      eyebrow: 'Fale com a infinity6',
      title: 'Toda decisão importante começa com uma conversa.',
      highlight: 'uma conversa',
      sub: 'Fale com o nosso time sobre inteligência preditiva aplicada ao seu negócio — do primeiro diagnóstico à implementação.',
      directPrefix: 'Prefere e-mail direto?',
    },
    triage: {
      title: 'Já sabe o que procura?',
      links: [
        { label: 'i6 Builder Platform', to: `${BUILDERS_PATH}${TEAM_ANCHOR}` },
        { label: 'Comunidade', to: `${COMMUNITY_PATH}${TEAM_ANCHOR}` },
        { label: 'Documentação', to: DOCS_PATH },
      ],
      footnote: 'Se é sobre a i6 Decision Suite ou outro assunto, continue abaixo.',
    },
    faq: {
      eyebrow: 'Perguntas frequentes',
      title: 'O que você precisa saber',
      sub: 'Respostas objetivas sobre como implementar inteligência preditiva com rapidez e segurança',
      items: [
        { id: 1, question: 'Quanto tempo leva para colocar a inteligência em produção?', answer: 'Colocamos inteligência preditiva em produção entre 4 e 12 semanas, com geração de impacto financeiro mensurável já nas primeiras ativações, seja em crescimento de receita, proteção de margem ou ganho de eficiência operacional.' },
        { id: 2, question: 'Como iniciar sem alto risco de investimento?', answer: 'Iniciamos com uma fase de validação orientada a negócio, utilizando amostras de dados para estimar potencial de impacto antes da integração completa. O modelo é progressivo, permitindo começar com escopo controlado e expandir conforme os resultados são comprovados.' },
        { id: 3, question: 'Em quais indústrias vocês atuam?', answer: 'Hoje operamos em farmacêutica, cooperativa financeira, alimentício, fitness e investimentos — indústrias diferentes entre si, unidas pela mesma necessidade de decisão orientada a dados.' },
        { id: 4, question: 'Qual a diferença entre a i6 Decision Suite e a i6 Builder Platform?', answer: 'A i6 Decision Suite é o conjunto de aplicações prontas da i6 — forecasting, pricing, assortment, sales planning, discovery e targeting — para quem quer usar a inteligência diretamente. A i6 Builder Platform é a camada de plataforma por trás disso: os mesmos motores, expostos via SDKs, APIs e toolkits, para quem quer construir seus próprios produtos usando essa inteligência como base.' },
        { id: 5, question: 'Como funciona a Comunidade de builders?', answer: 'A Comunidade i6 conecta quem constrói sobre a i6 Builder Platform — troca técnica entre pares, eventos como Office Hours e Meetups, e reconhecimento de quem está implementando de verdade. Veja mais em /community.' },
        { id: 6, question: 'O suporte é contínuo?', answer: 'Sim. Monitoramos performance, ajustamos modelos continuamente e garantimos evolução constante dos resultados em produção.' },
        { id: 7, question: 'Como garantem que os modelos continuam performando ao longo do tempo?', answer: 'Utilizamos modelos adaptativos e monitoramento contínuo de performance. Ajustes são realizados conforme mudanças de comportamento, mercado ou estratégia, mantendo impacto consistente ao longo do tempo.' },
        { id: 8, question: 'Que tipo de dados são necessários para começar?', answer: 'Utilizamos os dados que sua empresa já possui, como transações, comportamento, CRM e supply. Iniciamos com amostras para validar potencial antes da integração completa, com modelos robustos a lacunas de dados.' },
        { id: 9, question: 'A solução integra com nossos sistemas atuais?', answer: 'Sim. Nossa arquitetura é API-first e conecta-se facilmente a ERPs, CRMs, e-commerce e outras bases internas.' },
        { id: 10, question: 'É necessário ter equipe de ciência de dados?', answer: 'Não. As soluções são projetadas para equipes de negócio operarem decisões preditivas sem dependência técnica.' },
        { id: 11, question: 'A inteligência é explicável e compatível com regulamentações?', answer: 'Sim. Trabalhamos com camadas de explicabilidade e aderência a normas como LGPD e GDPR, garantindo transparência e segurança.' },
        { id: 12, question: 'O que diferencia vocês de outras empresas de IA?', answer: 'A i6 não nasceu para entregar modelos de IA isolados. Nós construímos uma infraestrutura de decisão para empresas. A i6 Builder Platform expõe os motores de inteligência que preveem, recomendam e otimizam decisões, prontos para virar soluções e workflows específicos de cada negócio. E a i6 Decision Suite entrega aplicações prontas para problemas como forecasting, pricing, assortment, sales planning, discovery e targeting. Na prática, nosso diferencial é fechar o ciclo inteiro: dados entram, decisões são geradas, executadas, mensuradas e continuamente melhoradas. Por isso, não competimos apenas pela melhor IA. Competimos pela capacidade de transformar IA em decisões melhores, repetíveis e em escala.' },
        { id: 13, question: 'Como vocês mensuram impacto no negócio?', answer: 'Nós mensuramos impacto comparando a decisão que a empresa tomaria sem a i6 com a decisão recomendada pela i6. Dependendo do caso, fazemos isso por backtest histórico, grupos de controle, testes incrementais ou comparação entre baseline e resultado realizado. E não paramos em métricas técnicas como acurácia do modelo. Medimos o KPI econômico que aquela decisão deveria mover, como receita incremental, margem, conversão, redução de estoque, ruptura, desperdício, CAC ou produtividade comercial. Nossa lógica é simples: um modelo só gera valor quando muda uma decisão, e uma decisão só gera valor quando move um indicador de negócio.' },
      ],
    },
    map: {
      title: 'De Campinas para o mundo',
      description: 'Hoje, do Brasil. Estamos construindo a expansão da Infinity6 para novos países — o mapa vai crescer com a gente.',
      hqLabel: 'Sede',
      city: 'Campinas',
      region: 'São Paulo',
      country: 'Brasil',
      address: 'Av. Antônio Artioli, 570 — Sala 134 / Prédio A\nCEP 13049-900 — Campinas, SP',
      nextLabel: 'Em expansão',
    },
  },
  en: {
    hero: {
      eyebrow: 'Talk to infinity6',
      title: 'Every important decision starts with a conversation.',
      highlight: 'a conversation',
      sub: 'Talk to our team about predictive intelligence applied to your business — from the first diagnosis to implementation.',
      directPrefix: 'Prefer email?',
    },
    triage: {
      title: "Already know what you're looking for?",
      links: [
        { label: 'i6 Builder Platform', to: `${BUILDERS_PATH}${TEAM_ANCHOR}` },
        { label: 'Community', to: `${COMMUNITY_PATH}${TEAM_ANCHOR}` },
        { label: 'Documentation', to: DOCS_PATH },
      ],
      footnote: "If it's about i6 Decision Suite or anything else, continue below.",
    },
    faq: {
      eyebrow: 'Frequently asked questions',
      title: 'What you need to know',
      sub: 'Straight answers on how to deploy predictive intelligence quickly and securely',
      items: [
        { id: 1, question: 'How long does it take to put intelligence into production?', answer: 'We deploy predictive intelligence into production within 4 to 12 weeks, generating measurable financial impact from the first activations, whether in revenue growth, margin protection or operational efficiency gains.' },
        { id: 2, question: 'How to start without high investment risk?', answer: 'We start with a business-oriented validation phase, using data samples to estimate impact potential before full integration. The model is progressive, allowing you to begin with a controlled scope and expand as results are proven.' },
        { id: 3, question: 'What industries do you operate in?', answer: 'Today we operate in pharmaceuticals, financial cooperatives, food, fitness, and investments — different industries united by the same need for data-driven decisions.' },
        { id: 4, question: "What's the difference between i6 Decision Suite and i6 Builder Platform?", answer: "i6 Decision Suite is Infinity6's set of ready-to-use applications — forecasting, pricing, assortment, sales planning, discovery, and targeting — for those who want to use the intelligence directly. i6 Builder Platform is the platform layer behind it: the same engines, exposed via SDKs, APIs, and toolkits, for those who want to build their own products using that intelligence as a foundation." },
        { id: 5, question: 'How does the builders Community work?', answer: 'The i6 Community connects people building on i6 Builder Platform — peer technical exchange, events like Office Hours and Meetups, and recognition for real implementers. See more at /community.' },
        { id: 6, question: 'Is support ongoing?', answer: 'Yes. We monitor performance, continuously adjust models and ensure constant evolution of results in production.' },
        { id: 7, question: 'How do you ensure models keep performing over time?', answer: 'We use adaptive models and continuous performance monitoring. Adjustments are made according to changes in behavior, market or strategy, maintaining consistent impact over time.' },
        { id: 8, question: 'What kind of data is needed to get started?', answer: 'We work with the data your company already has, such as transactions, behavior, CRM and supply. We start with samples to validate potential before full integration, with models robust to data gaps.' },
        { id: 9, question: 'Does the solution integrate with our current systems?', answer: 'Yes. Our architecture is API-first and easily connects to ERPs, CRMs, e-commerce and other internal databases.' },
        { id: 10, question: 'Do we need a data science team?', answer: 'No. Our solutions are designed for business teams to operate predictive decisions without technical dependency.' },
        { id: 11, question: 'Is the intelligence explainable and compliant with regulations?', answer: 'Yes. We work with explainability layers and adherence to standards such as LGPD and GDPR, ensuring transparency and security.' },
        { id: 12, question: 'What sets you apart from other AI companies?', answer: "i6 wasn't built to deliver isolated AI models. We built decision infrastructure for companies. i6 Builder Platform exposes the intelligence engines that predict, recommend, and optimize decisions, ready to become solutions and workflows specific to each business. And i6 Decision Suite delivers ready-made applications for problems like forecasting, pricing, assortment, sales planning, discovery, and targeting. In practice, our differentiator is closing the entire loop: data comes in, decisions are generated, executed, measured, and continuously improved. That's why we don't just compete on the best AI. We compete on the ability to turn AI into better, repeatable decisions at scale." },
        { id: 13, question: 'How do you measure business impact?', answer: "We measure impact by comparing the decision a company would make without i6 to the decision i6 recommends. Depending on the case, we do this through historical backtesting, control groups, incremental testing, or baseline-versus-actual comparison. And we don't stop at technical metrics like model accuracy. We measure the economic KPI that decision should move — incremental revenue, margin, conversion, inventory reduction, stockouts, waste, CAC, or sales productivity. Our logic is simple: a model only creates value when it changes a decision, and a decision only creates value when it moves a business indicator." },
      ],
    },
    map: {
      title: 'From Campinas to the world',
      description: "Today, from Brazil. We're building Infinity6's expansion into new countries — this map will grow with us.",
      hqLabel: 'Headquarters',
      city: 'Campinas',
      region: 'São Paulo',
      country: 'Brazil',
      address: 'Av. Antônio Artioli, 570 — Suite 134 / Building A\n13049-900 — Campinas, SP, Brazil',
      nextLabel: 'Expanding',
    },
  },
  es: {
    hero: {
      eyebrow: 'Habla con infinity6',
      title: 'Toda decisión importante empieza con una conversación.',
      highlight: 'una conversación',
      sub: 'Habla con nuestro equipo sobre inteligencia predictiva aplicada a tu negocio — desde el primer diagnóstico hasta la implementación.',
      directPrefix: '¿Prefieres el correo directo?',
    },
    triage: {
      title: '¿Ya sabes qué buscas?',
      links: [
        { label: 'i6 Builder Platform', to: `${BUILDERS_PATH}${TEAM_ANCHOR}` },
        { label: 'Comunidad', to: `${COMMUNITY_PATH}${TEAM_ANCHOR}` },
        { label: 'Documentación', to: DOCS_PATH },
      ],
      footnote: 'Si es sobre i6 Decision Suite o cualquier otro asunto, continúa abajo.',
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo que necesitas saber',
      sub: 'Respuestas directas sobre cómo implementar inteligencia predictiva con rapidez y seguridad',
      items: [
        { id: 1, question: '¿Cuánto tiempo toma poner la inteligencia en producción?', answer: 'Ponemos inteligencia predictiva en producción entre 4 y 12 semanas, con generación de impacto financiero medible desde las primeras activaciones, ya sea en crecimiento de ingresos, protección de margen o ganancia de eficiencia operativa.' },
        { id: 2, question: '¿Cómo empezar sin alto riesgo de inversión?', answer: 'Empezamos con una fase de validación orientada al negocio, usando muestras de datos para estimar el potencial de impacto antes de la integración completa. El modelo es progresivo, lo que permite comenzar con un alcance controlado y expandirlo a medida que se comprueban los resultados.' },
        { id: 3, question: '¿En qué industrias operan?', answer: 'Hoy operamos en farmacéutica, cooperativa financiera, alimentos, fitness e inversiones — industrias distintas unidas por la misma necesidad de decisiones basadas en datos.' },
        { id: 4, question: '¿Cuál es la diferencia entre i6 Decision Suite e i6 Builder Platform?', answer: 'i6 Decision Suite es el conjunto de aplicaciones listas para usar de Infinity6 — forecasting, pricing, assortment, sales planning, discovery y targeting — para quienes quieren usar la inteligencia directamente. i6 Builder Platform es la capa de plataforma detrás de eso: los mismos motores, expuestos vía SDKs, APIs y toolkits, para quienes quieren construir sus propios productos usando esa inteligencia como base.' },
        { id: 5, question: '¿Cómo funciona la Comunidad de builders?', answer: 'La Comunidad i6 conecta a quienes construyen sobre i6 Builder Platform — intercambio técnico entre pares, eventos como Office Hours y Meetups, y reconocimiento para quienes realmente implementan. Ver más en /community.' },
        { id: 6, question: '¿El soporte es continuo?', answer: 'Sí. Monitoreamos el desempeño, ajustamos los modelos continuamente y garantizamos la evolución constante de los resultados en producción.' },
        { id: 7, question: '¿Cómo garantizan que los modelos sigan rindiendo a lo largo del tiempo?', answer: 'Usamos modelos adaptativos y monitoreo continuo del desempeño. Los ajustes se realizan según cambios de comportamiento, mercado o estrategia, manteniendo un impacto consistente a lo largo del tiempo.' },
        { id: 8, question: '¿Qué tipo de datos son necesarios para empezar?', answer: 'Usamos los datos que tu empresa ya tiene, como transacciones, comportamiento, CRM y supply. Empezamos con muestras para validar el potencial antes de la integración completa, con modelos robustos a vacíos de datos.' },
        { id: 9, question: '¿La solución se integra con nuestros sistemas actuales?', answer: 'Sí. Nuestra arquitectura es API-first y se conecta fácilmente a ERPs, CRMs, e-commerce y otras bases internas.' },
        { id: 10, question: '¿Es necesario tener un equipo de ciencia de datos?', answer: 'No. Las soluciones están diseñadas para que los equipos de negocio operen decisiones predictivas sin dependencia técnica.' },
        { id: 11, question: '¿La inteligencia es explicable y compatible con las regulaciones?', answer: 'Sí. Trabajamos con capas de explicabilidad y adherencia a normas como LGPD y GDPR, garantizando transparencia y seguridad.' },
        { id: 12, question: '¿Qué los diferencia de otras empresas de IA?', answer: 'i6 no nació para entregar modelos de IA aislados. Construimos infraestructura de decisión para empresas. i6 Builder Platform expone los motores de inteligencia que predicen, recomiendan y optimizan decisiones, listos para convertirse en soluciones y flujos de trabajo específicos de cada negocio. Y i6 Decision Suite entrega aplicaciones listas para problemas como forecasting, pricing, assortment, sales planning, discovery y targeting. En la práctica, nuestro diferencial es cerrar todo el ciclo: los datos entran, las decisiones se generan, se ejecutan, se miden y se mejoran continuamente. Por eso, no competimos solo por la mejor IA. Competimos por la capacidad de transformar IA en decisiones mejores, repetibles y a escala.' },
        { id: 13, question: '¿Cómo miden el impacto en el negocio?', answer: 'Medimos el impacto comparando la decisión que la empresa tomaría sin i6 con la decisión que i6 recomienda. Según el caso, lo hacemos mediante backtest histórico, grupos de control, pruebas incrementales o comparación entre línea base y resultado real. Y no nos detenemos en métricas técnicas como la precisión del modelo. Medimos el KPI económico que esa decisión debería mover — ingresos incrementales, margen, conversión, reducción de inventario, quiebres de stock, desperdicio, CAC o productividad comercial. Nuestra lógica es simple: un modelo solo genera valor cuando cambia una decisión, y una decisión solo genera valor cuando mueve un indicador de negocio.' },
      ],
    },
    map: {
      title: 'De Campinas para el mundo',
      description: 'Hoy, desde Brasil. Estamos construyendo la expansión de Infinity6 hacia nuevos países — este mapa va a crecer con nosotros.',
      hqLabel: 'Sede',
      city: 'Campinas',
      region: 'São Paulo',
      country: 'Brasil',
      address: 'Av. Antônio Artioli, 570 — Sala 134 / Edificio A\nCEP 13049-900 — Campinas, SP, Brasil',
      nextLabel: 'En expansión',
    },
  },
};
