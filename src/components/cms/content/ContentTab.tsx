
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Save, Sparkles, Globe2 } from 'lucide-react';
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
    if (isHomePage) return 'Edite o conteúdo das seções da página inicial para criar uma primeira impressão marcante';
    if (isSuccessStoriesPage) return 'Edite o conteúdo das seções da página de cases de sucesso para destacar seus resultados';
    if (isContactPage) return 'Edite o conteúdo das seções da página de contato para facilitar a comunicação';
    if (isSolutionsPage) return 'Edite o conteúdo das seções da página de soluções para apresentar seus serviços';
    return `Edite o conteúdo da página ${currentPageName} para manter seu site sempre atualizado`;
  };

  const getLanguageFlag = () => {
    return selectedLanguage === 'en' ? '🇺🇸' : '🇧🇷';
  };

  const getLanguageName = () => {
    return selectedLanguage === 'en' ? 'English' : 'Português';
  };

  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-b border-slate-200/60">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                Conteúdo da {getPageTitle()}
              </CardTitle>
              <CardDescription className="text-slate-600 leading-relaxed max-w-2xl">
                {getDescription()}
              </CardDescription>
            </div>
            <Badge variant="outline" className="border-blue-200 bg-blue-50/50 text-blue-700 font-medium px-3 py-1">
              <span className="text-base mr-2">{getLanguageFlag()}</span>
              {getLanguageName()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {(isHomePage || isSuccessStoriesPage || isContactPage || isSolutionsPage) && (
            <div className="space-y-6">
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
            </div>
          )}

          {!isHomePage && !isSuccessStoriesPage && !isContactPage && !isSolutionsPage && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center mx-auto mb-4">
                <Globe2 className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Página em Desenvolvimento</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Configuração de conteúdo para esta página ainda não foi implementada. 
                Será adicionada conforme necessário.
              </p>
            </div>
          )}

          <div className="flex justify-end pt-8 mt-8 border-t border-slate-200/60">
            <Button 
              onClick={onSaveContent} 
              disabled={saving || allFieldsLength === 0}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2.5"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar Conteúdo'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories Cards Management */}
      {isSuccessStoriesPage && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <SuccessStoriesCardsManagement
            selectedPage={selectedPage}
            selectedLanguage={selectedLanguage}
          />
        </>
      )}

      {/* FAQ Cards Management */}
      {isContactPage && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
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
