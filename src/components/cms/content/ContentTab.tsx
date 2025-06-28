
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save } from 'lucide-react';
import ContentSectionAccordion from './ContentSectionAccordion';
import { getAccordionFields } from './ContentFieldsConfig';

interface ContentTabProps {
  selectedPage: string;
  selectedLanguage: string;
  contentFormData: { [key: string]: string };
  isHomePage: boolean;
  isSuccessStoriesPage: boolean;
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
  currentPageName,
  saving,
  allFieldsLength,
  onFieldChange,
  onSaveContent,
  getPageTitle,
}) => {
  const accordionFields = getAccordionFields(isHomePage, isSuccessStoriesPage);

  const getDescription = () => {
    if (isHomePage) return 'Edite o conteúdo das seções da página inicial';
    if (isSuccessStoriesPage) return 'Edite o conteúdo das seções da página de cases de sucesso';
    return `Edite o conteúdo da página ${currentPageName}`;
  };

  return (
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
        {(isHomePage || isSuccessStoriesPage) && (
          <ContentSectionAccordion
            heroFields={accordionFields.heroFields}
            resultsFields={accordionFields.resultsFields}
            compactSolutionsFields={accordionFields.compactSolutionsFields}
            formData={contentFormData}
            selectedPage={selectedPage}
            selectedLanguage={selectedLanguage}
            onFieldChange={onFieldChange}
          />
        )}

        {!isHomePage && !isSuccessStoriesPage && (
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
  );
};

export default ContentTab;
