
interface ContentField {
  section: string;
  field: string;
  label: string;
  type: 'input' | 'textarea' | 'icon';
}

// Home page field definitions
export const homeHeroFields: ContentField[] = [
  { section: 'homeHero', field: 'title', label: 'Título Principal', type: 'input' },
  { section: 'homeHero', field: 'subtitle', label: 'Destaque', type: 'input' },
  { section: 'homeHero', field: 'poweredByAI', label: 'SubTítulo', type: 'input' },
  { section: 'homeHero', field: 'description', label: 'Descrição', type: 'textarea' },
  { section: 'homeHero', field: 'startJourney', label: 'Texto do Botão Principal', type: 'input' },
  { section: 'homeHero', field: 'watchDemo', label: 'Texto do Botão Demo', type: 'input' },
  { section: 'homeHero', field: 'demoLink', label: 'Link do Demo (YouTube)', type: 'input' },
];

export const resultsHeroFields: ContentField[] = [
  { section: 'resultsHero', field: 'title', label: 'Título da Seção', type: 'input' },
  { section: 'resultsHero', field: 'subtitle', label: 'Subtítulo da Seção', type: 'input' },
  { section: 'resultsHero', field: 'description', label: 'Descrição da Seção', type: 'textarea' },
];

export const compactSolutionsHeroFields: ContentField[] = [
  { section: 'compactSolutionsHero', field: 'title', label: 'Título da Seção', type: 'input' },
  { section: 'compactSolutionsHero', field: 'subtitle', label: 'Subtítulo da Seção', type: 'input' },
  { section: 'compactSolutionsHero', field: 'buttonText', label: 'Texto do Botão', type: 'input' },
];

export const statsFields: ContentField[] = [
  { section: 'stats', field: 'stat1Value', label: 'Valor da Estatística 1', type: 'input' },
  { section: 'stats', field: 'stat1Label', label: 'Label da Estatística 1', type: 'input' },
  { section: 'stats', field: 'stat2Value', label: 'Valor da Estatística 2', type: 'input' },
  { section: 'stats', field: 'stat2Label', label: 'Label da Estatística 2', type: 'input' },
  { section: 'stats', field: 'stat3Value', label: 'Valor da Estatística 3', type: 'input' },
  { section: 'stats', field: 'stat3Label', label: 'Label da Estatística 3', type: 'input' },
  { section: 'stats', field: 'stat4Value', label: 'Valor da Estatística 4', type: 'input' },
  { section: 'stats', field: 'stat4Label', label: 'Label da Estatística 4', type: 'input' },
];

export type { ContentField };
