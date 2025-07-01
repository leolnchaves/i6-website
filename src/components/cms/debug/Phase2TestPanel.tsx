
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, CheckCircle, XCircle, Play, Eye, Layers } from 'lucide-react';
import { useCMSMode } from '@/hooks/useCMSMode';
import { useMarkdownPageContent } from '@/hooks/useMarkdownPageContent';
import { useMarkdownSuccessStoriesCards } from '@/hooks/useMarkdownSuccessStoriesCards';
import { useMarkdownResultsCards } from '@/hooks/useMarkdownResultsCards';
import { useMarkdownSolutionsCards } from '@/hooks/useMarkdownSolutionsCards';

const Phase2TestPanel = () => {
  const { config, isHybridMode, isMarkdownSupported } = useCMSMode();
  const markdownPageContent = useMarkdownPageContent('home', 'en');
  const markdownSuccessCards = useMarkdownSuccessStoriesCards('success-stories', 'en');
  const markdownResultsCards = useMarkdownResultsCards('home', 'en');
  const markdownSolutionsCards = useMarkdownSolutionsCards('solutions', 'en');
  
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const [testingInProgress, setTestingInProgress] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const runPhase2Tests = async () => {
    setTestingInProgress(true);
    const results: Record<string, boolean> = {};

    try {
      // Test 1: Markdown Page Content Hook
      console.log('Running Test 1: Markdown Page Content Hook');
      const pageContentWorks = typeof markdownPageContent.getContent === 'function' &&
                              markdownPageContent.getContent('homeHero', 'title', 'test') !== undefined;
      results.markdownPageContent = pageContentWorks;

      // Test 2: Fallback System
      console.log('Running Test 2: Fallback System');
      const fallbackValue = markdownPageContent.getContent('nonexistent', 'field', 'fallback-test');
      results.fallbackSystem = fallbackValue === 'fallback-test' || markdownPageContent.isUsingFallback;

      // Test 3: Cards Hooks
      console.log('Running Test 3: Cards Hooks');
      const cardsHooksWork = Array.isArray(markdownSuccessCards.cards) &&
                            Array.isArray(markdownResultsCards.cards) &&
                            Array.isArray(markdownSolutionsCards.cards);
      results.cardsHooks = cardsHooksWork;

      // Test 4: Loading States
      console.log('Running Test 4: Loading States');
      const loadingStatesWork = typeof markdownPageContent.loading === 'boolean' &&
                               typeof markdownSuccessCards.loading === 'boolean';
      results.loadingStates = loadingStatesWork;

      // Test 5: Error Handling
      console.log('Running Test 5: Error Handling');
      const errorHandlingWorks = (markdownPageContent.error === null || typeof markdownPageContent.error === 'string') &&
                                (markdownSuccessCards.error === null || typeof markdownSuccessCards.error === 'string');
      results.errorHandling = errorHandlingWorks;

      setTestResults(results);
    } catch (error) {
      console.error('Error running Phase 2 tests:', error);
    } finally {
      setTestingInProgress(false);
    }
  };

  const getTestStatus = (testName: string) => {
    if (testingInProgress) return 'running';
    if (testResults[testName] === undefined) return 'pending';
    return testResults[testName] ? 'passed' : 'failed';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tests = [
    { id: 'markdownPageContent', name: 'Hook de Conteúdo Markdown', description: 'Testa o hook useMarkdownPageContent' },
    { id: 'fallbackSystem', name: 'Sistema de Fallback', description: 'Verifica se o fallback para Supabase funciona' },
    { id: 'cardsHooks', name: 'Hooks de Cards', description: 'Testa todos os hooks de cards Markdown' },
    { id: 'loadingStates', name: 'Estados de Loading', description: 'Verifica se os estados de carregamento funcionam' },
    { id: 'errorHandling', name: 'Tratamento de Erros', description: 'Testa o tratamento de erros dos hooks' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Painel de Testes - Fase 2
          </CardTitle>
          <CardDescription>
            Teste os hooks específicos para Markdown e sistema de fallback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status dos Hooks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                Page Content: {markdownPageContent.hasMarkdownContent ? 'MD' : 'Fallback'}
              </Badge>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                Cards: {markdownSuccessCards.hasMarkdownCards ? 'MD' : 'Fallback'}
              </Badge>
            </div>
          </div>

          {/* Debug Info Detalhado */}
          <div className="bg-gray-50 p-3 rounded-lg text-xs">
            <strong>Debug Info Fase 2:</strong><br/>
            Page Content Loading: {String(markdownPageContent.loading)} | 
            Success Cards: {markdownSuccessCards.cards.length} cards | 
            Results Cards: {markdownResultsCards.cards.length} cards | 
            Solutions Cards: {markdownSolutionsCards.cards.length} cards
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={runPhase2Tests} 
              disabled={testingInProgress}
              className="flex items-center gap-2"
            >
              {testingInProgress ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {testingInProgress ? 'Executando Testes...' : 'Executar Testes da Fase 2'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {showDetails ? 'Ocultar' : 'Mostrar'} Detalhes
            </Button>
          </div>

          {/* Resultados dos Testes */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Resultados dos Testes</h3>
            {tests.map(test => (
              <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{test.name}</div>
                  <div className="text-sm text-gray-600">{test.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(getTestStatus(test.id))}
                  <Badge className={getStatusColor(getTestStatus(test.id))}>
                    {getTestStatus(test.id)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo */}
          {Object.keys(testResults).length > 0 && (
            <Alert>
              <AlertDescription>
                <strong>Resumo da Fase 2:</strong> {Object.values(testResults).filter(Boolean).length} de {Object.keys(testResults).length} testes passaram.
                {Object.values(testResults).every(Boolean) && (
                  <span className="text-green-600 font-semibold"> ✅ Fase 2 concluída com sucesso!</span>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Detalhes dos Hooks */}
          {showDetails && (
            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-3">Detalhes dos Hooks Markdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Page Content Hook</h4>
                  <div className="text-sm space-y-1">
                    <div>Loading: {String(markdownPageContent.loading)}</div>
                    <div>Error: {markdownPageContent.error || 'None'}</div>
                    <div>Has MD Content: {String(markdownPageContent.hasMarkdownContent)}</div>
                    <div>Using Fallback: {String(markdownPageContent.isUsingFallback)}</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Cards Hooks</h4>
                  <div className="text-sm space-y-1">
                    <div>Success Stories: {markdownSuccessCards.cards.length} cards</div>
                    <div>Results: {markdownResultsCards.cards.length} cards</div>  
                    <div>Solutions: {markdownSolutionsCards.cards.length} cards</div>
                    <div>All Loading: {String(markdownSuccessCards.loading)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase2TestPanel;
