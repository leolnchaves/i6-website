
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Save, FileText, Globe } from 'lucide-react';
import ContentSectionAccordion from './ContentSectionAccordion';
import SuccessStoriesCardsManagement from '../SuccessStoriesCardsManagement';
import FAQCardsManagement from '../FAQCardsManagement';
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

  const getLanguageBadge = () => (
    <Badge 
      variant="outline" 
      className="ml-3 bg-white/80 border-gray-300 text-gray-700 font-medium px-3 py-1"
    >
      {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
    </Badge>
  );

  return (
    <div className="space-y-8">
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg shadow-gray-200/50">
        <CardHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  Conteúdo da {getPageTitle()}
                  {getLanguageBadge()}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2 text-base">
                  {getDescription()}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {(isHomePage || isSuccessStoriesPage || isContactPage || isSolutionsPage) && (
            <ContentSectionAccordion
              heroFields={accordionFields.heroFields}
              resultsFields={accordionFields.resultsFields}
              compactSolutionsFields={accordionFields.compactSolutionsFields}
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
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Página em desenvolvimento
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                A configuração de conteúdo para esta página ainda não foi implementada. 
                Será adicionada conforme necessário.
              </p>
            </div>
          )}

          <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
            <Button 
              onClick={onSaveContent} 
              disabled={saving || allFieldsLength === 0}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Save className="h-5 w-5 mr-2" />
              {saving ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Salvando...
                </div>
              ) : (
                'Salvar Conteúdo'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories Cards Management */}
      {isSuccessStoriesPage && (
        <>
          <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <SuccessStoriesCardsManagement
            selectedPage={selectedPage}
            selectedLanguage={selectedLanguage}
          />
        </>
      )}

      {/* FAQ Cards Management */}
      {isContactPage && (
        <>
          <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <FAQCardsManagement
            selectedPage={selectedPage}
            selectedLanguage={selectedLanguage}
          />
        </>
      )}
    </div>
  );
};

export default ContentTab;
