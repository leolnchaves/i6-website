
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ContentFieldRenderer from './ContentFieldRenderer';

interface ContentField {
  section: string;
  field: string;
  label: string;
  type: 'input' | 'textarea' | 'icon';
}

interface ContentSectionAccordionProps {
  heroFields: ContentField[];
  resultsFields: ContentField[];
  compactSolutionsFields: ContentField[];
  statsFields: ContentField[];
  ctaFields: ContentField[];
  formData: { [key: string]: string };
  selectedPage: string;
  selectedLanguage: string;
  onFieldChange: (key: string, value: string) => void;
  isContactPage?: boolean;
  isSolutionsPage?: boolean;
}

const ContentSectionAccordion: React.FC<ContentSectionAccordionProps> = ({
  heroFields,
  resultsFields,
  compactSolutionsFields,
  statsFields,
  ctaFields,
  formData,
  onFieldChange,
  isContactPage = false,
  isSolutionsPage = false,
}) => {
  const getSectionTitle = (sectionType: string) => {
    if (isContactPage) {
      if (sectionType === 'hero') return 'Seção Hero';
      if (sectionType === 'results') return 'Seção FAQ';
    }
    
    if (isSolutionsPage) {
      if (sectionType === 'hero') return 'Seção Hero';
      if (sectionType === 'results') return 'Sandbox Environment';
    }
    
    // Default titles for other pages
    if (sectionType === 'hero') return 'Seção Hero';
    if (sectionType === 'results') return 'Seção de Resultados';
    if (sectionType === 'compactSolutions') return 'Seção Compact Solutions';
    if (sectionType === 'stats') return 'Seção de Estatísticas';
    if (sectionType === 'cta') return 'Seção Call to Action';
    
    return 'Seção';
  };

  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {heroFields.length > 0 && (
        <AccordionItem value="hero" className="border border-gray-200 rounded-lg px-4">
          <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
            {getSectionTitle('hero')}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <ContentFieldRenderer
              fields={heroFields}
              formData={formData}
              onFieldChange={onFieldChange}
            />
          </AccordionContent>
        </AccordionItem>
      )}

      {resultsFields.length > 0 && (
        <AccordionItem value="results" className="border border-gray-200 rounded-lg px-4">
          <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
            {getSectionTitle('results')}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <ContentFieldRenderer
              fields={resultsFields}
              formData={formData}
              onFieldChange={onFieldChange}
            />
          </AccordionContent>
        </AccordionItem>
      )}

      {compactSolutionsFields.length > 0 && (
        <AccordionItem value="compactSolutions" className="border border-gray-200 rounded-lg px-4">
          <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
            {getSectionTitle('compactSolutions')}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <ContentFieldRenderer
              fields={compactSolutionsFields}
              formData={formData}
              onFieldChange={onFieldChange}
            />
          </AccordionContent>
        </AccordionItem>
      )}

      {statsFields.length > 0 && (
        <AccordionItem value="stats" className="border border-gray-200 rounded-lg px-4">
          <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
            {getSectionTitle('stats')}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <ContentFieldRenderer
              fields={statsFields}
              formData={formData}
              onFieldChange={onFieldChange}
            />
          </AccordionContent>
        </AccordionItem>
      )}

      {ctaFields.length > 0 && (
        <AccordionItem value="cta" className="border border-gray-200 rounded-lg px-4">
          <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
            {getSectionTitle('cta')}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <ContentFieldRenderer
              fields={ctaFields}
              formData={formData}
              onFieldChange={onFieldChange}
            />
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default ContentSectionAccordion;
