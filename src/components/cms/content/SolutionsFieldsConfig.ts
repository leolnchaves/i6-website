
interface ContentField {
  section: string;
  field: string;
  label: string;
  type: 'input' | 'textarea' | 'icon';
}

// Solutions page field definitions
export const solutionsHeroFields: ContentField[] = [
  { section: 'solutionsHero', field: 'mainTitle', label: 'Título Principal (Primeira Linha)', type: 'input' },
  { section: 'solutionsHero', field: 'mainSubtitle', label: 'Título Destacado (Segunda Linha)', type: 'input' },
  { section: 'solutionsHero', field: 'description', label: 'Descrição', type: 'textarea' },
];

// Sandbox Environment fields
export const sandboxEnvironmentFields: ContentField[] = [
  { section: 'sandboxEnvironment', field: 'title', label: 'Título do Sandbox Environment', type: 'input' },
  { section: 'sandboxEnvironment', field: 'description', label: 'Descrição do Sandbox Environment', type: 'textarea' },
];

export type { ContentField };
