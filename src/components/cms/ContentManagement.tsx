
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Search } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PageSelector from './content/PageSelector';
import ContentTab from './content/ContentTab';
import SEOForm from './content/SEOForm';
import { useContentManagement } from '@/hooks/useContentManagement';

const ContentManagement = () => {
  const {
    pages,
    selectedPage,
    selectedLanguage,
    contentFormData,
    seoFormData,
    saving,
    loading,
    currentPage,
    isHomePage,
    isSuccessStoriesPage,
    isContactPage,
    isSolutionsPage,
    allFields,
    setSelectedPage,
    setSelectedLanguage,
    handleContentInputChange,
    handleSEOInputChange,
    handleSaveContent,
    handleSaveSEO,
    getPageTitle,
  } = useContentManagement();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Conteúdo</h1>
        <p className="text-gray-600">
          Gerencie o conteúdo das páginas e configurações de SEO com suporte a múltiplos idiomas.
        </p>
      </div>

      <Separator />

      <PageSelector
        pages={pages}
        selectedPage={selectedPage}
        selectedLanguage={selectedLanguage}
        onPageChange={setSelectedPage}
        onLanguageChange={setSelectedLanguage}
      />

      {selectedPage && (
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              SEO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentTab
              selectedPage={selectedPage}
              selectedLanguage={selectedLanguage}
              contentFormData={contentFormData}
              isHomePage={isHomePage}
              isSuccessStoriesPage={isSuccessStoriesPage}
              isContactPage={isContactPage}
              isSolutionsPage={isSolutionsPage}
              currentPageName={currentPage?.name}
              saving={saving}
              allFieldsLength={allFields.length}
              onFieldChange={handleContentInputChange}
              onSaveContent={handleSaveContent}
              getPageTitle={getPageTitle}
            />
          </TabsContent>

          <TabsContent value="seo">
            <SEOForm
              formData={seoFormData}
              selectedLanguage={selectedLanguage}
              saving={saving}
              onFieldChange={handleSEOInputChange}
              onSave={handleSaveSEO}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ContentManagement;
