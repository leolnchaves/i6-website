
interface ContentField {
  section: string;
  field: string;
  label: string;
  type: 'input' | 'textarea' | 'icon';
}

// Home page field definitions
export const homeHeroFields: ContentField[] = [
  { section: 'homeHero', field: 'title', label: 'Título Principal', type: 'input' },
  { section: 'homeHero', field: 'subtitle', label: 'Subtítulo', type: 'input' },
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
];

export type { ContentField };
