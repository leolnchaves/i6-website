
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
];

export const resultsHeroFields: ContentField[] = [
  { section: 'resultsHero', field: 'title', label: 'Título da Seção', type: 'input' },
  { section: 'resultsHero', field: 'subtitle', label: 'Subtítulo da Seção', type: 'input' },
];

export const compactSolutionsHeroFields: ContentField[] = [
  { section: 'compactSolutionsHero', field: 'title', label: 'Título da Seção', type: 'input' },
  { section: 'compactSolutionsHero', field: 'subtitle', label: 'Subtítulo da Seção', type: 'input' },
];

export type { ContentField };
