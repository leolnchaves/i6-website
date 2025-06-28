
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import ContentFieldRenderer from './ContentFieldRenderer';
import ResultsCardsManagement from '../ResultsCardsManagement';

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
  // Determine section names based on field sections
  const isSuccessStoriesPage = heroFields.some(field => field.section === 'successStoriesHero');
  
  const getFirstSectionTitle = () => {
    if (isSuccessStoriesPage) return 'Seção Hero - Cases de Sucesso';
    return 'Seção Hero - Página Principal';
  };

  const getSecondSectionTitle = () => {
    if (isSuccessStoriesPage) return 'Seção Métricas - Estatísticas';
    return 'Seção Results - Resultados';
  };

  const getThirdSectionTitle = () => {
    if (isSuccessStoriesPage) return 'Seção CTA - Chamada para Ação';
    return 'Seção Compact Solutions - Soluções Compactas';
  };

  const showCardsManagement = !isSuccessStoriesPage && resultsFields.length > 0;

  return (
    <Accordion type="single" collapsible className="w-full">
      {/* Primeira seção */}
      <AccordionItem value="first-section">
        <AccordionTrigger className="text-lg font-semibold">
          {getFirstSectionTitle()}
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

      {/* Segunda seção */}
      <AccordionItem value="second-section">
        <AccordionTrigger className="text-lg font-semibold">
          {getSecondSectionTitle()}
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-4 space-y-6">
            {/* Campos da segunda seção */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800 border-b pb-2">
                {isSuccessStoriesPage ? 'Métricas e Estatísticas' : 'Conteúdo Principal'}
              </h4>
              <ContentFieldRenderer
                fields={resultsFields}
                formData={formData}
                onFieldChange={onFieldChange}
              />
            </div>
            
            {/* Gestão dos Cards - apenas para página home */}
            {showCardsManagement && (
              <>
                <Separator />
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
              </>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Terceira seção */}
      <AccordionItem value="third-section">
        <AccordionTrigger className="text-lg font-semibold">
          {getThirdSectionTitle()}
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-4">
            <ContentFieldRenderer
              fields={compactSolutionsFields}
              formData={formData}
              onFieldChange={onFieldChange}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ContentSectionAccordion;
