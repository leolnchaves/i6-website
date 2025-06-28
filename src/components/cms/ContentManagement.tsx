
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      {/* Stats Cards */}
      <PageSelector
        pages={pages}
        selectedPage={selectedPage}
        selectedLanguage={selectedLanguage}
        onPageChange={setSelectedPage}
        onLanguageChange={setSelectedLanguage}
      />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Total Revenue Chart */}
        <div className="lg:col-span-2">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  TOTAL REVENUE This Year
                </CardTitle>
                <div className="text-sm text-gray-500">TOTAL EXPENSE</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl font-bold mb-2">Chart Area</div>
                  <div className="text-lg opacity-80">Revenue visualization would go here</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cost of sales</span>
                  <span className="text-sm font-medium text-gray-900">$600</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Management costs</span>
                  <span className="text-sm font-medium text-gray-900">$800</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Financial costs</span>
                  <span className="text-sm font-medium text-gray-900">$300</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Other operating costs</span>
                  <span className="text-sm font-medium text-gray-900">$600</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">60+</div>
                  <div className="text-sm text-gray-600">Likes</div>
                  <div className="text-xs text-gray-500">People you like</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">10+</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                  <div className="text-xs text-gray-500">New Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">30+</div>
                  <div className="text-sm text-gray-600">Shares</div>
                  <div className="text-xs text-gray-500">New Shares</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">NEW PRODUCTS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Admin Template</h3>
                <p className="text-sm text-gray-600">Responsive admin template</p>
              </div>
              <div className="text-xl font-bold text-gray-900">$36</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">NEW USERS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Name</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Date</span>
                  <span>Participation</span>
                  <span>%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedPage && (
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200 p-1 rounded-lg">
            <TabsTrigger 
              value="content" 
              className="rounded-md data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 data-[state=active]:border-purple-200"
            >
              <Home className="h-4 w-4 mr-2" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger 
              value="seo" 
              className="rounded-md data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 data-[state=active]:border-purple-200"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              SEO
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
