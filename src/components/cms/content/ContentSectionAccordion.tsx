
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import ContentFieldRenderer from './ContentFieldRenderer';
import SuccessStoriesCardsManagement from '../SuccessStoriesCardsManagement';
import { ContentField } from './ContentFieldsConfig';

interface ContentSectionAccordionProps {
  heroFields: ContentField[];
  resultsFields: ContentField[];
  compactSolutionsFields: ContentField[];
  formData: { [key: string]: string };
  selectedPage: string;
  selectedLanguage: string;
  onFieldChange: (key: string, value: string) => void;
}

const ContentSectionAccordion: React.FC<ContentSectionAccordionProps> = ({
  heroFields,
  resultsFields,
  compactSolutionsFields,
  formData,
  selectedPage,
  selectedLanguage,
  onFieldChange,
}) => {
  const isSuccessStoriesPage = selectedPage === 'success-stories';

  return (
    <Accordion type="multiple" defaultValue={["hero", "results", "compactSolutions", "cardsManagement"]} className="w-full">
      <AccordionItem value="hero">
        <AccordionTrigger className="text-left">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-medium">
              {isSuccessStoriesPage ? 'Seção Hero - Cases de Sucesso' : 'Seção Hero - Página Inicial'}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pt-4">
          {heroFields.map((field) => (
            <ContentFieldRenderer
              key={field.key}
              field={field}
              value={formData[field.key] || ''}
              onChange={onFieldChange}
            />
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="results">
        <AccordionTrigger className="text-left">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-medium">
              {isSuccessStoriesPage ? 'Seção Métricas - Resultados' : 'Seção Resultados - Página Inicial'}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pt-4">
          {resultsFields.map((field) => (
            <ContentFieldRenderer
              key={field.key}
              field={field}
              value={formData[field.key] || ''}
              onChange={onFieldChange}
            />
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="compactSolutions">
        <AccordionTrigger className="text-left">
          <div className="flex items-center gap-2">
            <span className="text-purple-600 font-medium">
              {isSuccessStoriesPage ? 'Seção CTA - Chamada para Ação' : 'Seção Soluções Compactas'}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pt-4">
          {compactSolutionsFields.map((field) => (
            <ContentFieldRenderer
              key={field.key}
              field={field}
              value={formData[field.key] || ''}
              onChange={onFieldChange}
            />
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* Nova seção de Gestão de Cards - Cases de Sucesso */}
      {isSuccessStoriesPage && (
        <AccordionItem value="cardsManagement">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-orange-600 font-medium">
                Gestão de Cards - Cases de Sucesso
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <SuccessStoriesCardsManagement
              selectedPage={selectedPage}
              selectedLanguage={selectedLanguage}
            />
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default ContentSectionAccordion;
