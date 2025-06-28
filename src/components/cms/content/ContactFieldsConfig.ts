
interface ContentField {
  section: string;
  field: string;
  label: string;
  type: 'input' | 'textarea' | 'icon';
}

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

export const getContactAccordionFields = () => {
  return {
    heroFields: contactHeroFields,
    faqFields: contactFAQFields,
  };
};

export type { ContentField };
