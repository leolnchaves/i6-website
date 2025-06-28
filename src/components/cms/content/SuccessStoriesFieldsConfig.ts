
interface ContentField {
  section: string;
  field: string;
  label: string;
  type: 'input' | 'textarea' | 'icon';
}

// Success Stories page field definitions
export const successStoriesHeroFields: ContentField[] = [
  { section: 'successStoriesHero', field: 'title', label: 'Título Principal', type: 'input' },
  { section: 'successStoriesHero', field: 'subtitle', label: 'Subtítulo Destacado', type: 'input' },
  { section: 'successStoriesHero', field: 'description', label: 'Descrição', type: 'textarea' },
];

export const metricsFields: ContentField[] = [
  { section: 'successStoriesMetrics', field: 'avgROI', label: 'ROI Médio (%)', type: 'input' },
  { section: 'successStoriesMetrics', field: 'avgROILabel', label: 'Label ROI Médio', type: 'input' },
  { section: 'successStoriesMetrics', field: 'avgROIIcon', label: 'Ícone ROI Médio', type: 'icon' },
  { section: 'successStoriesMetrics', field: 'companiesServed', label: 'Empresas Atendidas', type: 'input' },
  { section: 'successStoriesMetrics', field: 'companiesServedLabel', label: 'Label Empresas', type: 'input' },
  { section: 'successStoriesMetrics', field: 'companiesServedIcon', label: 'Ícone Empresas', type: 'icon' },
  { section: 'successStoriesMetrics', field: 'costSavings', label: 'Economia Total', type: 'input' },
  { section: 'successStoriesMetrics', field: 'costSavingsLabel', label: 'Label Economia', type: 'input' },
  { section: 'successStoriesMetrics', field: 'costSavingsIcon', label: 'Ícone Economia', type: 'icon' },
];

export const testimonialsFields: ContentField[] = [
  { section: 'testimonialsSection', field: 'title', label: 'Título da Seção', type: 'input' },
  { section: 'testimonialsSection', field: 'subtitle', label: 'Subtítulo da Seção', type: 'textarea' },
];

export const ctaFields: ContentField[] = [
  { section: 'successStoriesCTA', field: 'title', label: 'Título do CTA', type: 'input' },
  { section: 'successStoriesCTA', field: 'description', label: 'Descrição do CTA', type: 'textarea' },
  { section: 'successStoriesCTA', field: 'buttonText', label: 'Texto do Botão', type: 'input' },
];

export type { ContentField };
