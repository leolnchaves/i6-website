
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Search, Sparkles } from 'lucide-react';
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
        <div className="text-center space-y-4">
          <LoadingSpinner />
          <p className="text-gray-600 font-medium">Carregando conteúdo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <div className="flex items-center gap-4 justify-center lg:justify-start mb-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Gestão de Conteúdo
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie o conteúdo das páginas e configurações de SEO com suporte a múltiplos idiomas
            </p>
          </div>
        </div>
      </div>

      <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <PageSelector
        pages={pages}
        selectedPage={selectedPage}
        selectedLanguage={selectedLanguage}
        onPageChange={setSelectedPage}
        onLanguageChange={setSelectedLanguage}
      />

      {selectedPage && (
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-1 border border-gray-200/50 shadow-lg">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/60 rounded-xl p-1 h-14">
              <TabsTrigger 
                value="content" 
                className="flex items-center gap-3 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-semibold"
              >
                <Home className="h-5 w-5" />
                Conteúdo
              </TabsTrigger>
              <TabsTrigger 
                value="seo" 
                className="flex items-center gap-3 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-semibold"
              >
                <Search className="h-5 w-5" />
                SEO
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="content" className="mt-0">
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

              <TabsContent value="seo" className="mt-0">
                <SEOForm
                  formData={seoFormData}
                  selectedLanguage={selectedLanguage}
                  saving={saving}
                  onFieldChange={handleSEOInputChange}
                  onSave={handleSaveSEO}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
