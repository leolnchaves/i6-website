
export interface ContentField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'icon';
  placeholder: string;
}

export const getAccordionFields = (isHomePage: boolean, isSuccessStoriesPage: boolean) => {
  if (isHomePage) {
    return {
      heroFields: [
        {
          key: 'hero.title',
          label: 'Título Principal',
          type: 'text' as const,
          placeholder: 'Transforming Industries with'
        },
        {
          key: 'hero.subtitle', 
          label: 'Subtítulo',
          type: 'text' as const,
          placeholder: 'AI-Powered Solutions'
        },
        {
          key: 'hero.description',
          label: 'Descrição',
          type: 'textarea' as const,
          placeholder: 'Discover how our cutting-edge AI solutions are revolutionizing industries...'
        }
      ],
      resultsFields: [
        {
          key: 'results.title',
          label: 'Título da Seção',
          type: 'text' as const,
          placeholder: 'Proven Results'
        },
        {
          key: 'results.subtitle',
          label: 'Subtítulo',
          type: 'text' as const,
          placeholder: 'Across Industries'
        },
        {
          key: 'results.description',
          label: 'Descrição',
          type: 'textarea' as const,
          placeholder: 'Our AI solutions deliver measurable impact...'
        }
      ],
      compactSolutionsFields: [
        {
          key: 'compactSolutions.title',
          label: 'Título da Seção',
          type: 'text' as const,
          placeholder: 'Compact Solutions'
        },
        {
          key: 'compactSolutions.subtitle',
          label: 'Subtítulo',
          type: 'text' as const,
          placeholder: 'Tailored for Your Business'
        },
        {
          key: 'compactSolutions.description',
          label: 'Descrição',
          type: 'textarea' as const,
          placeholder: 'Discover our streamlined AI solutions...'
        }
      ]
    };
  }

  if (isSuccessStoriesPage) {
    return {
      heroFields: [
        {
          key: 'successStoriesHero.title',
          label: 'Título Principal',
          type: 'text' as const,
          placeholder: 'Transforming Industries with'
        },
        {
          key: 'successStoriesHero.subtitle',
          label: 'Subtítulo',
          type: 'text' as const,
          placeholder: 'AI-Powered Solutions'
        },
        {
          key: 'successStoriesHero.description',
          label: 'Descrição',
          type: 'textarea' as const,
          placeholder: 'Discover how our AI solutions have revolutionized businesses...'
        }
      ],
      resultsFields: [
        {
          key: 'successStoriesMetrics.avgROI',
          label: 'ROI Médio',
          type: 'text' as const,
          placeholder: '150%'
        },
        {
          key: 'successStoriesMetrics.avgROILabel',
          label: 'Label do ROI',
          type: 'text' as const,
          placeholder: 'Average ROI Increase'
        },
        {
          key: 'successStoriesMetrics.avgROIIcon',
          label: 'Ícone do ROI',
          type: 'icon' as const,
          placeholder: 'trending-up'
        },
        {
          key: 'successStoriesMetrics.companiesServed',
          label: 'Empresas Atendidas',
          type: 'text' as const,
          placeholder: '500+'
        },
        {
          key: 'successStoriesMetrics.companiesServedLabel',
          label: 'Label das Empresas',
          type: 'text' as const,
          placeholder: 'Companies Served'
        },
        {
          key: 'successStoriesMetrics.companiesServedIcon',
          label: 'Ícone das Empresas',
          type: 'icon' as const,
          placeholder: 'users'
        },
        {
          key: 'successStoriesMetrics.costSavings',
          label: 'Economia de Custos',
          type: 'text' as const,
          placeholder: '$50M+'
        },
        {
          key: 'successStoriesMetrics.costSavingsLabel',
          label: 'Label da Economia',
          type: 'text' as const,
          placeholder: 'Total Cost Savings'
        },
        {
          key: 'successStoriesMetrics.costSavingsIcon',
          label: 'Ícone da Economia',
          type: 'icon' as const,
          placeholder: 'dollar-sign'
        }
      ],
      compactSolutionsFields: [
        {
          key: 'successStoriesCTA.title',
          label: 'Título da CTA',
          type: 'text' as const,
          placeholder: 'Ready to Transform Your Business?'
        },
        {
          key: 'successStoriesCTA.description',
          label: 'Descrição da CTA',
          type: 'textarea' as const,
          placeholder: 'Join hundreds of companies that have already transformed their operations...'
        },
        {
          key: 'successStoriesCTA.buttonText',
          label: 'Texto do Botão',
          type: 'text' as const,
          placeholder: 'Get Started Today'
        }
      ]
    };
  }

  return {
    heroFields: [],
    resultsFields: [],
    compactSolutionsFields: []
  };
};

export const getPageFields = (isHomePage: boolean, isSuccessStoriesPage: boolean): ContentField[] => {
  const accordionFields = getAccordionFields(isHomePage, isSuccessStoriesPage);
  return [
    ...accordionFields.heroFields,
    ...accordionFields.resultsFields,
    ...accordionFields.compactSolutionsFields
  ];
};
