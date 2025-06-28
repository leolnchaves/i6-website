
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Search, FileText, TrendingUp } from 'lucide-react';
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
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Gestão de Conteúdo
          </h1>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Gerencie o conteúdo das páginas e configurações de SEO com suporte a múltiplos idiomas. 
          Mantenha seu site sempre atualizado e otimizado.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <PageSelector
        pages={pages}
        selectedPage={selectedPage}
        selectedLanguage={selectedLanguage}
        onPageChange={setSelectedPage}
        onLanguageChange={setSelectedLanguage}
      />

      {selectedPage && (
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100/80 backdrop-blur-sm border border-slate-200/60 p-1 rounded-xl">
            <TabsTrigger 
              value="content" 
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Home className="h-4 w-4" />
              <span className="font-medium">Conteúdo</span>
            </TabsTrigger>
            <TabsTrigger 
              value="seo" 
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">SEO</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
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

          <TabsContent value="seo" className="mt-6">
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
