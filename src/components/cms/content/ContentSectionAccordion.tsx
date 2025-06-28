
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import ContentFieldRenderer from './ContentFieldRenderer';
import ResultsCardsManagement from '../ResultsCardsManagement';
import TestimonialsManagement from '../TestimonialsManagement';

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
  ctaFields?: ContentField[];
  formData: { [key: string]: string };
  selectedPage: string;
  selectedLanguage: string;
  onFieldChange: (key: string, value: string) => void;
  isContactPage?: boolean;
}

const ContentSectionAccordion: React.FC<ContentSectionAccordionProps> = ({
  heroFields,
  resultsFields,
  compactSolutionsFields,
  ctaFields = [],
  formData,
  selectedPage,
  selectedLanguage,
  onFieldChange,
  isContactPage = false,
}) => {
  // Determine section names based on field sections
  const isSuccessStoriesPage = heroFields.some(field => field.section === 'successStoriesHero');
  
  const getFirstSectionTitle = () => {
    if (isContactPage) return 'Seção Hero - Contato';
    if (isSuccessStoriesPage) return 'Seção Hero - Cases de Sucesso';
    return 'Seção Hero - Página Principal';
  };

  const getSecondSectionTitle = () => {
    if (isContactPage) return 'Seção FAQ - Perguntas Frequentes';
    if (isSuccessStoriesPage) return 'Seção Métricas - Estatísticas';
    return 'Seção Results - Resultados';
  };

  const getThirdSectionTitle = () => {
    if (isSuccessStoriesPage) return 'Seção Testimonials - Depoimentos';
    return 'Seção Compact Solutions - Soluções Compactas';
  };

  const showCardsManagement = !isSuccessStoriesPage && !isContactPage && resultsFields.length > 0;
  const showTestimonialsManagement = isSuccessStoriesPage && compactSolutionsFields.some(field => field.section === 'testimonialsSection');

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
      {resultsFields.length > 0 && (
        <AccordionItem value="second-section">
          <AccordionTrigger className="text-lg font-semibold">
            {getSecondSectionTitle()}
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 space-y-6">
              {/* Campos da segunda seção */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800 border-b pb-2">
                  {isContactPage ? 'Título e Configurações da FAQ' : 
                   isSuccessStoriesPage ? 'Métricas e Estatísticas' : 'Conteúdo Principal'}
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
      )}

      {/* Terceira seção - apenas para success stories */}
      {!isContactPage && compactSolutionsFields.length > 0 && (
        <AccordionItem value="third-section">
          <AccordionTrigger className="text-lg font-semibold">
            {getThirdSectionTitle()}
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 space-y-6">
              {/* Campos da terceira seção */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800 border-b pb-2">
                  {isSuccessStoriesPage ? 'Título e Subtítulo da Seção' : 'Conteúdo da Seção'}
                </h4>
                <ContentFieldRenderer
                  fields={compactSolutionsFields}
                  formData={formData}
                  onFieldChange={onFieldChange}
                />
              </div>

              {/* Gestão dos Testimonials - apenas para success stories */}
              {showTestimonialsManagement && (
                <>
                  <Separator />
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="testimonials-management">
                      <AccordionTrigger className="text-base font-medium">
                        Gestão dos Depoimentos
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-4">
                          <TestimonialsManagement 
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
      )}

      {/* Quarta seção - CTA (apenas para success stories) */}
      {isSuccessStoriesPage && ctaFields.length > 0 && (
        <AccordionItem value="fourth-section">
          <AccordionTrigger className="text-lg font-semibold">
            Seção CTA - Chamada para Ação
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <ContentFieldRenderer
                fields={ctaFields}
                formData={formData}
                onFieldChange={onFieldChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default ContentSectionAccordion;
