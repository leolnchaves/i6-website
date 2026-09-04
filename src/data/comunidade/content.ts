/**
 * Textos da página /comunidade (PT / EN / ES).
 *
 * Regras de conteúdo: nenhum número fabricado, nenhuma pessoa ou empresa
 * fictícia. A escala vem de um fato real — a plataforma já roda em produção
 * em farmacêutica, cooperativa financeira, alimentício, fitness e
 * investimentos — e dos arquétipos genéricos do mural.
 */

export const COMMUNITY_CONTACT_ANCHOR = '#fale-com-a-comunidade';

export const communityCopy = {
  pt: {
    opening: {
      eyebrow: 'comunidade infinity6',
      titleTop: 'O lugar de',
      titleAccent: 'quem constrói',
      titleBottom: 'decisão com dados',
      sub: 'Uma comunidade técnica de alto nível, feita para times que projetam, treinam, integram e colocam modelos de decisão em produção — não para espectadores de tendências',
      cta: 'Quero participar',
      scrollHint: 'role para ver',
    },
    scale: {
      eyebrow: 'prova real',
      title: 'Isso não começa do zero',
      sub: 'A plataforma que sustenta esta comunidade já opera em produção nestas indústrias',
      sectors: ['Farmacêutica', 'Cooperativa financeira', 'Alimentício', 'Fitness', 'Investimentos'],
      note: 'Ambientes reais, com dados reais e decisões que já rodam no dia a dia',
    },
    mural: {
      eyebrow: 'quem está aqui',
      title: 'Um mural de gente que constrói',
      sub: 'Perfis técnicos que se encontram nos mesmos problemas: previsão, recomendação, precificação, risco e explicabilidade',
      archetypes: [
        { label: 'Times de forecasting', note: 'Quem vive de erro percentual, sazonalidade e horizonte de previsão' },
        { label: 'Squads de recomendação', note: 'Quem testa ranqueamento, cold start e relevância em produção' },
        { label: 'Fintechs construindo scoring próprio', note: 'Quem precisa de decisão auditável, não de caixa preta' },
        { label: 'Engenharia de dados', note: 'Quem sustenta pipeline, contrato de dados e observabilidade' },
        { label: 'Pricing e revenue', note: 'Quem busca elasticidade e margem sem quebrar a operação' },
        { label: 'Product builders', note: 'Quem embute inteligência dentro do próprio produto' },
        { label: 'MLOps e plataforma', note: 'Quem versiona, monitora e reduz o custo de manter modelos vivos' },
        { label: 'Pesquisa aplicada', note: 'Quem traz método científico para problemas de negócio' },
      ],
    },
    events: {
      eyebrow: 'ritmo da comunidade',
      title: 'Cinco encontros, uma agenda técnica',
      sub: 'Encontros construídos para sair com decisão, não com slide',
      items: [
        { name: 'Office Hours', desc: 'Sessões abertas com engenheiros e cientistas da infinity6 para destravar problema real de modelagem, integração ou avaliação' },
        { name: 'Meetups por Segmento', desc: 'Recortes por indústria, onde o caso discutido é do mesmo setor de quem está na sala' },
        { name: 'Meetups Regionais', desc: 'Encontros locais com apresentação técnica e discussão de caso, no formato de quem mostra código e resultado' },
        { name: 'Hackatons de Soluções', desc: 'Times atacando um problema real de decisão do começo ao fim, com dado, modelo e resultado medido' },
        { name: 'i6 Builder Summit', desc: 'O encontro maior: arquitetura, benchmarks, explicabilidade e o que vem na fronteira da decisão orientada a dados' },
      ],
    },
    belonging: {
      eyebrow: 'convite',
      title: 'Isso é para quem constrói',
      body: [
        'Não é um grupo de novidades, nem uma lista de espera. É espaço de trabalho: se você projeta modelo, integra API, mede impacto e responde por resultado, você já pertence',
        'A troca aqui é técnica e direta — problema, hipótese, experimento, número',
      ],
      bullets: ['Discussão técnica com autoria', 'Acesso direto a quem mantém as engines', 'Prática antes de teoria'],
    },
    finalCta: {
      title: 'Entre na comunidade',
      sub: 'Conte em que você está trabalhando e o time entra em contato com o convite e os próximos encontros',
      primary: 'Falar com o time',
    },
  },
  en: {
    opening: {
      eyebrow: 'infinity6 community',
      titleTop: 'The home of',
      titleAccent: 'those who build',
      titleBottom: 'decisions with data',
      sub: 'A high-level technical community, made for teams that design, train, integrate and ship decision models to production — not for trend spectators',
      cta: 'I want in',
      scrollHint: 'scroll to see',
    },
    scale: {
      eyebrow: 'real proof',
      title: 'This does not start from zero',
      sub: 'The platform behind this community already runs in production across these industries',
      sectors: ['Pharmaceutical', 'Financial cooperative', 'Food', 'Fitness', 'Investments'],
      note: 'Real environments, real data and decisions already running every day',
    },
    mural: {
      eyebrow: 'who is here',
      title: 'A wall of people who build',
      sub: 'Technical profiles that keep meeting the same problems: forecasting, recommendation, pricing, risk and explainability',
      archetypes: [
        { label: 'Forecasting teams', note: 'People who live on error rates, seasonality and horizon' },
        { label: 'Recommendation squads', note: 'People testing ranking, cold start and relevance in production' },
        { label: 'Fintechs building their own scoring', note: 'People who need auditable decisions, not black boxes' },
        { label: 'Data engineering', note: 'People holding pipelines, data contracts and observability' },
        { label: 'Pricing and revenue', note: 'People chasing elasticity and margin without breaking operations' },
        { label: 'Product builders', note: 'People embedding intelligence inside their own product' },
        { label: 'MLOps and platform', note: 'People who version, monitor and cut the cost of keeping models alive' },
        { label: 'Applied research', note: 'People bringing scientific method to business problems' },
      ],
    },
    events: {
      eyebrow: 'community rhythm',
      title: 'Three formats, one technical agenda',
      sub: 'Sessions built to end in a decision, not in a slide',
      items: [
        { name: 'Office Hours', kicker: 'every round, live', desc: 'Open sessions with infinity6 engineers and scientists to unblock a real modeling, integration or evaluation problem' },
        { name: 'Regional Meetups', kicker: 'in person, by city', desc: 'Local gatherings with a technical talk and case discussion, in the format of people who show code and results' },
        { name: 'Builder Summit', kicker: 'the big one', desc: 'The peak of the calendar: architecture, benchmarks, explainability and what comes next on the decision frontier' },
      ],
    },
    belonging: {
      eyebrow: 'invitation',
      title: 'This is for people who build',
      body: [
        'Not a news group and not a waiting list. It is a workspace: if you design models, integrate APIs, measure impact and answer for outcomes, you already belong',
        'The exchange here is technical and direct — problem, hypothesis, experiment, number',
      ],
      bullets: ['Technical discussion with authorship', 'Direct access to the people maintaining the engines', 'Practice before theory'],
    },
    finalCta: {
      title: 'Join the community',
      sub: 'Tell us what you are building and the team gets back with your invitation and the next sessions',
      primary: 'Talk to the team',
    },
  },
  es: {
    opening: {
      eyebrow: 'comunidad infinity6',
      titleTop: 'El lugar de',
      titleAccent: 'quien construye',
      titleBottom: 'decisión con datos',
      sub: 'Una comunidad técnica de alto nivel, hecha para equipos que diseñan, entrenan, integran y llevan modelos de decisión a producción — no para espectadores de tendencias',
      cta: 'Quiero participar',
      scrollHint: 'desplázate para ver',
    },
    scale: {
      eyebrow: 'prueba real',
      title: 'Esto no empieza de cero',
      sub: 'La plataforma que sostiene esta comunidad ya opera en producción en estas industrias',
      sectors: ['Farmacéutica', 'Cooperativa financiera', 'Alimentación', 'Fitness', 'Inversiones'],
      note: 'Entornos reales, con datos reales y decisiones que ya corren cada día',
    },
    mural: {
      eyebrow: 'quién está aquí',
      title: 'Un mural de gente que construye',
      sub: 'Perfiles técnicos que se cruzan con los mismos problemas: previsión, recomendación, precios, riesgo y explicabilidad',
      archetypes: [
        { label: 'Equipos de forecasting', note: 'Quien vive de error porcentual, estacionalidad y horizonte' },
        { label: 'Squads de recomendación', note: 'Quien prueba ranking, cold start y relevancia en producción' },
        { label: 'Fintechs construyendo su propio scoring', note: 'Quien necesita decisión auditable, no caja negra' },
        { label: 'Ingeniería de datos', note: 'Quien sostiene pipeline, contrato de datos y observabilidad' },
        { label: 'Pricing y revenue', note: 'Quien busca elasticidad y margen sin romper la operación' },
        { label: 'Product builders', note: 'Quien integra inteligencia dentro de su propio producto' },
        { label: 'MLOps y plataforma', note: 'Quien versiona, monitorea y baja el costo de mantener modelos vivos' },
        { label: 'Investigación aplicada', note: 'Quien lleva método científico a problemas de negocio' },
      ],
    },
    events: {
      eyebrow: 'ritmo de la comunidad',
      title: 'Tres formatos, una agenda técnica',
      sub: 'Encuentros construidos para terminar en decisión, no en slide',
      items: [
        { name: 'Office Hours', kicker: 'cada ronda, en vivo', desc: 'Sesiones abiertas con ingenieros y científicos de infinity6 para desbloquear un problema real de modelado, integración o evaluación' },
        { name: 'Meetups regionales', kicker: 'presencial, por plaza', desc: 'Encuentros locales con charla técnica y discusión de caso, en el formato de quien muestra código y resultado' },
        { name: 'Builder Summit', kicker: 'el encuentro mayor', desc: 'El punto alto del calendario: arquitectura, benchmarks, explicabilidad y lo que viene en la frontera de la decisión con datos' },
      ],
    },
    belonging: {
      eyebrow: 'invitación',
      title: 'Esto es para quien construye',
      body: [
        'No es un grupo de novedades ni una lista de espera. Es espacio de trabajo: si diseñas modelos, integras APIs, mides impacto y respondes por resultado, ya perteneces',
        'El intercambio aquí es técnico y directo — problema, hipótesis, experimento, número',
      ],
      bullets: ['Discusión técnica con autoría', 'Acceso directo a quien mantiene las engines', 'Práctica antes que teoría'],
    },
    finalCta: {
      title: 'Entra en la comunidad',
      sub: 'Cuéntanos qué estás construyendo y el equipo responde con la invitación y los próximos encuentros',
      primary: 'Hablar con el equipo',
    },
  },
};
