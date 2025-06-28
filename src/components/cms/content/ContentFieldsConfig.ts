import { homeHeroFields, resultsHeroFields, compactSolutionsHeroFields } from './HomeFieldsConfig';
import { successStoriesHeroFields, metricsFields, testimonialsFields, ctaFields } from './SuccessStoriesFieldsConfig';
import { contactHeroFields, faqFields } from './ContactFieldsConfig';
import { solutionsHeroFields } from './SolutionsFieldsConfig';

interface ContentField {
  section: string;
  field: string;
  label: string;
  type: 'input' | 'textarea' | 'icon';
}

// Solutions page configuration
export const getAccordionFields = (
  isHomePage: boolean, 
  isSuccessStoriesPage: boolean, 
  isContactPage: boolean,
  isSolutionsPage: boolean
) => {
  if (isSolutionsPage) {
    return {
      heroFields: solutionsHeroFields,
      resultsFields: [], // Solutions page only has hero section
      compactSolutionsFields: [],
      ctaFields: []
    };
  }

  if (isHomePage) {
    return {
      heroFields: homeHeroFields,
      resultsFields: resultsHeroFields,
      compactSolutionsFields: compactSolutionsHeroFields,
      ctaFields: []
    };
  }

  if (isSuccessStoriesPage) {
    return {
      heroFields: successStoriesHeroFields,
      resultsFields: metricsFields,
      compactSolutionsFields: testimonialsFields,
      ctaFields: ctaFields
    };
  }

  if (isContactPage) {
    return {
      heroFields: contactHeroFields,
      resultsFields: faqFields,
      compactSolutionsFields: [],
      ctaFields: []
    };
  }

  return {
    heroFields: [],
    resultsFields: [],
    compactSolutionsFields: [],
    ctaFields: []
  };
};

export const getPageFields = (
  isHomePage: boolean, 
  isSuccessStoriesPage: boolean, 
  isContactPage: boolean,
  isSolutionsPage: boolean
): ContentField[] => {
  const { heroFields, resultsFields, compactSolutionsFields, ctaFields } = getAccordionFields(
    isHomePage, 
    isSuccessStoriesPage, 
    isContactPage,
    isSolutionsPage
  );
  
  return [...heroFields, ...resultsFields, ...compactSolutionsFields, ...ctaFields];
};

export type { ContentField };
