
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
import ContentSectionAccordion from './ContentSectionAccordion';
import SuccessStoriesCardsManagement from '../SuccessStoriesCardsManagement';
import FAQCardsManagement from '../FAQCardsManagement';
import SolutionsCardsManagement from '../SolutionsCardsManagement';
import ResultsCardsManagement from '../ResultsCardsManagement';
import { getAccordionFields } from './ContentFieldsConfig';

interface ContentTabProps {
  selectedPage: string;
  selectedLanguage: string;
  contentFormData: { [key: string]: string };
  isHomePage: boolean;
  isSuccessStoriesPage: boolean;
  isContactPage: boolean;
  isSolutionsPage: boolean;
  currentPageName?: string;
  saving: boolean;
  allFieldsLength: number;
  onFieldChange: (key: string, value: string) => void;
  onSaveContent: () => void;
  getPageTitle: () => string;
}

const ContentTab: React.FC<ContentTabProps> = ({
  selectedPage,
  selectedLanguage,
  contentFormData,
  isHomePage,
  isSuccessStoriesPage,
  isContactPage,
  isSolutionsPage,
  currentPageName,
  saving,
  allFieldsLength,
  onFieldChange,
  onSaveContent,
  getPageTitle,
}) => {
  const accordionFields = getAccordionFields(isHomePage, isSuccessStoriesPage, isContactPage, isSolutionsPage);

  const getDescription = () => {
    if (isHomePage) return 'Edite o conteúdo das seções da página inicial';
    if (isSuccessStoriesPage) return 'Edite o conteúdo das seções da página de cases de sucesso';
    if (isContactPage) return 'Edite o conteúdo das seções da página de contato';
    if (isSolutionsPage) return 'Edite o conteúdo das seções da página de soluções';
    return `Edite o conteúdo da página ${currentPageName}`;
  };

  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-medium text-gray-900">
                Conteúdo da {getPageTitle()}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                {getDescription()}
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {(isHomePage || isSuccessStoriesPage || isContactPage || isSolutionsPage) && (
            <ContentSectionAccordion
              heroFields={accordionFields.heroFields}
              resultsFields={accordionFields.resultsFields}
              compactSolutionsFields={accordionFields.compactSolutionsFields}
              statsFields={accordionFields.statsFields}
              ctaFields={accordionFields.ctaFields}
              formData={contentFormData}
              selectedPage={selectedPage}
              selectedLanguage={selectedLanguage}
              onFieldChange={onFieldChange}
              isContactPage={isContactPage}
              isSolutionsPage={isSolutionsPage}
            />
          )}

          {!isHomePage && !isSuccessStoriesPage && !isContactPage && !isSolutionsPage && (
            <div className="text-center py-12 text-gray-500">
              <p>Configuração de conteúdo para esta página ainda não foi implementada.</p>
              <p className="text-sm mt-2">Será adicionada conforme necessário.</p>
            </div>
          )}

          <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
            <Button 
              onClick={onSaveContent} 
              disabled={saving || allFieldsLength === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar Conteúdo'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Cards Management - Only for Home Page */}
      {isHomePage && (
        <>
          <Separator className="bg-gray-200" />
          <ResultsCardsManagement
            selectedPage={selectedPage}
            selectedLanguage={selectedLanguage}
          />
        </>
      )}

      {/* Success Stories Cards Management */}
      {isSuccessStoriesPage && (
        <>
          <Separator className="bg-gray-200" />
          <SuccessStoriesCardsManagement
            selectedPage={selectedPage}
            selectedLanguage={selectedLanguage}
          />
        </>
      )}

      {/* FAQ Cards Management */}
      {isContactPage && (
        <>
          <Separator className="bg-gray-200" />
          <FAQCardsManagement
            selectedPage={selectedPage}
            selectedLanguage={selectedLanguage}
          />
        </>
      )}

      {/* Solutions Cards Management */}
      {isSolutionsPage && (
        <>
          <Separator className="bg-gray-200" />
          <SolutionsCardsManagement
            selectedPage={selectedPage}
            selectedLanguage={selectedLanguage}
          />
        </>
      )}
    </div>
  );
};

export default ContentTab;
