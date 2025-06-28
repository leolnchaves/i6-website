
interface ContentField {
  section: string;
  field: string;
  label: string;
  type: 'input' | 'textarea' | 'icon';
}

// Home page field definitions
export const homeHeroFields: ContentField[] = [
  { section: 'hero', field: 'infinite', label: 'Título Principal', type: 'input' },
  { section: 'hero', field: 'possibilities', label: 'Título Destaque', type: 'input' },
  { section: 'hero', field: 'poweredByAI', label: 'Subtítulo', type: 'input' },
  { section: 'hero', field: 'description', label: 'Descrição', type: 'textarea' },
  { section: 'hero', field: 'startJourney', label: 'Botão Jornada', type: 'input' },
  { section: 'hero', field: 'watchDemo', label: 'Botão Demo', type: 'input' },
  { section: 'hero', field: 'demoLink', label: 'Link do Demo (URL)', type: 'input' },
];

export const homeResultsFields: ContentField[] = [
  { section: 'results', field: 'mainTitle', label: 'Título', type: 'input' },
  { section: 'results', field: 'mainSubtitle', label: 'Subtítulo', type: 'input' },
  { section: 'results', field: 'description', label: 'Descrição', type: 'textarea' },
];

export const homeCompactSolutionsFields: ContentField[] = [
  { section: 'compactSolutions', field: 'title', label: 'Título', type: 'input' },
  { section: 'compactSolutions', field: 'subtitle', label: 'Subtítulo', type: 'input' },
];

// Success Stories page field definitions
export const successStoriesHeroFields: ContentField[] = [
  { section: 'successStoriesHero', field: 'title', label: 'Título Principal', type: 'input' },
  { section: 'successStoriesHero', field: 'subtitle', label: 'Subtítulo Destacado', type: 'input' },
  { section: 'successStoriesHero', field: 'description', label: 'Descrição', type: 'textarea' },
];

export const successStoriesMetricsFields: ContentField[] = [
  { section: 'successStoriesMetrics', field: 'avgROI', label: 'Estatística 1', type: 'input' },
  { section: 'successStoriesMetrics', field: 'avgROILabel', label: 'Label Estatística 1', type: 'input' },
  { section: 'successStoriesMetrics', field: 'avgROIIcon', label: 'Ícone Estatística 1', type: 'icon' },
  { section: 'successStoriesMetrics', field: 'companiesServed', label: 'Estatística 2', type: 'input' },
  { section: 'successStoriesMetrics', field: 'companiesServedLabel', label: 'Label Estatística 2', type: 'input' },
  { section: 'successStoriesMetrics', field: 'companiesServedIcon', label: 'Ícone Estatística 2', type: 'icon' },
  { section: 'successStoriesMetrics', field: 'costSavings', label: 'Estatística 3', type: 'input' },
  { section: 'successStoriesMetrics', field: 'costSavingsLabel', label: 'Label Estatística 3', type: 'input' },
  { section: 'successStoriesMetrics', field: 'costSavingsIcon', label: 'Ícone Estatística 3', type: 'icon' },
];

export const successStoriesTestimonialsFields: ContentField[] = [
  { section: 'testimonialsSection', field: 'title', label: 'Título da Seção', type: 'input' },
  { section: 'testimonialsSection', field: 'subtitle', label: 'Subtítulo da Seção', type: 'textarea' },
];

export const successStoriesCTAFields: ContentField[] = [
  { section: 'successStoriesCTA', field: 'title', label: 'Título do CTA', type: 'input' },
  { section: 'successStoriesCTA', field: 'description', label: 'Descrição do CTA', type: 'textarea' },
  { section: 'successStoriesCTA', field: 'buttonText', label: 'Texto do Botão', type: 'input' },
];

// Contact page field definitions
export const contactHeroFields: ContentField[] = [
  { section: 'contactHero', field: 'title', label: 'Título Principal', type: 'input' },
  { section: 'contactHero', field: 'subtitle', label: 'Subtítulo Destacado', type: 'input' },
  { section: 'contactHero', field: 'description', label: 'Descrição', type: 'textarea' },
];

export const contactFAQFields: ContentField[] = [
  { section: 'contactFAQ', field: 'title', label: 'Título da Seção FAQ', type: 'input' },
  { section: 'contactFAQ', field: 'subtitle', label: 'Subtítulo da Seção FAQ', type: 'textarea' },
  { section: 'contactFAQ', field: 'searchTitle', label: 'Título da Busca', type: 'input' },
  { section: 'contactFAQ', field: 'searchPlaceholder', label: 'Placeholder da Busca', type: 'input' },
  { section: 'contactFAQ', field: 'noResults', label: 'Mensagem Sem Resultados', type: 'input' },
];

// Helper functions
export const getPageFields = (isHome: boolean, isSuccessStories: boolean, isContact: boolean) => {
  if (isHome) {
    return [...homeHeroFields, ...homeResultsFields, ...homeCompactSolutionsFields];
  } else if (isSuccessStories) {
    return [...successStoriesHeroFields, ...successStoriesMetricsFields, ...successStoriesTestimonialsFields, ...successStoriesCTAFields];
  } else if (isContact) {
    return [...contactHeroFields, ...contactFAQFields];
  }
  return [];
};

export const getAccordionFields = (isHome: boolean, isSuccessStories: boolean, isContact: boolean) => {
  if (isHome) {
    return {
      heroFields: homeHeroFields,
      resultsFields: homeResultsFields,
      compactSolutionsFields: homeCompactSolutionsFields
    };
  } else if (isSuccessStories) {
    return {
      heroFields: successStoriesHeroFields,
      resultsFields: successStoriesMetricsFields,
      compactSolutionsFields: successStoriesTestimonialsFields,
      ctaFields: successStoriesCTAFields
    };
  } else if (isContact) {
    return {
      heroFields: contactHeroFields,
      resultsFields: contactFAQFields,
      compactSolutionsFields: []
    };
  }
  return {
    heroFields: [],
    resultsFields: [],
    compactSolutionsFields: [],
    ctaFields: []
  };
};

export type { ContentField };
