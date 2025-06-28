
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
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
  currentPageName,
  saving,
  allFieldsLength,
  onFieldChange,
  onSaveContent,
  getPageTitle,
}) => {
  const accordionFields = getAccordionFields(isHomePage, isSuccessStoriesPage, isContactPage);

  const getDescription = () => {
    if (isHomePage) return 'Edite o conteúdo das seções da página inicial';
    if (isSuccessStoriesPage) return 'Edite o conteúdo das seções da página de cases de sucesso';
    if (isContactPage) return 'Edite o conteúdo das seções da página de contato';
    return `Edite o conteúdo da página ${currentPageName}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo da {getPageTitle()}</CardTitle>
          <CardDescription>
            {getDescription()}
            <Badge variant="outline" className="ml-2">
              {selectedLanguage === 'en' ? '🇺🇸 English' : '🇧🇷 Português'}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(isHomePage || isSuccessStoriesPage || isContactPage) && (
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
            />
          )}

          {!isHomePage && !isSuccessStoriesPage && !isContactPage && (
            <div className="text-center py-8 text-gray-500">
              <p>Configuração de conteúdo para esta página ainda não foi implementada.</p>
              <p className="text-sm mt-2">Será adicionada conforme necessário.</p>
            </div>
          )}

          <div className="flex justify-end pt-6 mt-6 border-t">
            <Button onClick={onSaveContent} disabled={saving || allFieldsLength === 0}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar Conteúdo'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories Cards Management */}
      {isSuccessStoriesPage && (
        <>
          <Separator />
          <SuccessStoriesCardsManagement
            selectedPage={selectedPage}
            selectedLanguage={selectedLanguage}
          />
        </>
      )}

      {/* FAQ Cards Management */}
      {isContactPage && (
        <>
          <Separator />
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
