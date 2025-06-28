import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import ContentFieldRenderer from './ContentFieldRenderer';
import ResultsCardsManagement from '../ResultsCardsManagement';
import CompactSolutionsCardsManagement from '../CompactSolutionsCardsManagement';

interface ContentField {
  section: string;
  field: string;
  label: string;
  type: 'input' | 'textarea';
}

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
  return (
    <Accordion type="single" collapsible className="w-full">
      {/* Seção Hero */}
      <AccordionItem value="hero">
        <AccordionTrigger className="text-lg font-semibold">
          Seção Hero - Página Principal
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-4">
            <ContentFieldRenderer
              fields={heroFields}
              formData={formData}
              onFieldChange={onFieldChange}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Seção Results */}
      <AccordionItem value="results">
        <AccordionTrigger className="text-lg font-semibold">
          Seção Results - Resultados
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-4 space-y-6">
            {/* Campos da seção Results */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800 border-b pb-2">Conteúdo Principal</h4>
              <ContentFieldRenderer
                fields={resultsFields}
                formData={formData}
                onFieldChange={onFieldChange}
              />
            </div>
            
            <Separator />
            
            {/* Gestão dos Cards - Nested Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="cards-management">
                <AccordionTrigger className="text-base font-medium">
                  Gestão dos Cards da Seção Results
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <ResultsCardsManagement 
                      selectedPage={selectedPage}
                      selectedLanguage={selectedLanguage}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Seção Compact Solutions */}
      <AccordionItem value="compact-solutions">
        <AccordionTrigger className="text-lg font-semibold">
          Seção Compact Solutions - Soluções Compactas
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-4 space-y-6">
            {/* Campos da seção Compact Solutions */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800 border-b pb-2">Conteúdo Principal</h4>
              <ContentFieldRenderer
                fields={compactSolutionsFields}
                formData={formData}
                onFieldChange={onFieldChange}
              />
            </div>
            
            <Separator />
            
            {/* Gestão dos Cards das Soluções Compactas - Nested Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="compact-solutions-cards-management">
                <AccordionTrigger className="text-base font-medium">
                  Gestão dos Cards da Seção Compact Solutions
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <CompactSolutionsCardsManagement 
                      selectedPage={selectedPage}
                      selectedLanguage={selectedLanguage}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ContentSectionAccordion;
