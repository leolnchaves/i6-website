
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Shield, Zap, Code, Trash2, CheckCircle } from 'lucide-react';

interface ReviewIssue {
  type: 'security' | 'performance' | 'size' | 'unused';
  severity: 'high' | 'medium' | 'low';
  file: string;
  line?: number;
  description: string;
  suggestion: string;
}

const CodeReviewPanel = () => {
  const [issues, setIssues] = useState<ReviewIssue[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Issues identificados no code review manual
  const detectedIssues: ReviewIssue[] = [
    {
      type: 'security',
      severity: 'high',
      file: 'src/components/cms/CMSLogin.tsx',
      line: 65,
      description: 'Senha hardcoded no código (tI#GhyB9kmlf)',
      suggestion: 'Mover senha para variável de ambiente ou implementar hash/bcrypt'
    },
    {
      type: 'security',
      severity: 'medium',
      file: 'src/hooks/useCMSAuth.tsx',
      line: 45,
      description: 'Dados do usuário salvos em sessionStorage sem criptografia',
      suggestion: 'Implementar criptografia dos dados ou usar token JWT'
    },
    {
      type: 'performance',
      severity: 'high',
      file: 'src/hooks/useContentManagement.tsx',
      line: 95,
      description: 'useEffect com muitas dependências causando re-renders desnecessários',
      suggestion: 'Dividir em múltiplos useEffect com dependências específicas'
    },
    {
      type: 'performance',
      severity: 'medium',
      file: 'src/hooks/useContentManagement.tsx',
      line: 120,
      description: 'Comparação de objetos complexos em useCallback',
      suggestion: 'Usar useMemo para comparações custosas'
    },
    {
      type: 'size',
      severity: 'high',
      file: 'src/components/cms/CMSLogin.tsx',
      line: 1,
      description: 'Componente com 234 linhas - muito grande',
      suggestion: 'Dividir em componentes menores: LoginForm, LoginHeader, TestCredentials'
    },
    {
      type: 'size',
      severity: 'high',
      file: 'src/hooks/useContentManagement.tsx',
      line: 1,
      description: 'Hook com 216 linhas - muito complexo',
      suggestion: 'Dividir em hooks específicos: useContent, useSEO, useFormData'
    },
    {
      type: 'unused',
      severity: 'low',
      file: 'src/components/ui/label.tsx',
      line: 1,
      description: 'Componente Label não está sendo utilizado no projeto',
      suggestion: 'Remover se não for necessário'
    }
  ];

  const runCodeReview = useCallback(async () => {
    setIsAnalyzing(true);
    
    // Simular análise
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIssues(detectedIssues);
    setIsAnalyzing(false);
  }, []);

  const getIssueIcon = (type: ReviewIssue['type']) => {
    switch (type) {
      case 'security':
        return <Shield className="h-4 w-4" />;
      case 'performance':
        return <Zap className="h-4 w-4" />;
      case 'size':
        return <Code className="h-4 w-4" />;
      case 'unused':
        return <Trash2 className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: ReviewIssue['severity']) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
    }
  };

  const getIssuesByType = (type: ReviewIssue['type']) => {
    return issues.filter(issue => issue.type === type);
  };

  const highSeverityIssues = issues.filter(issue => issue.severity === 'high');
  const mediumSeverityIssues = issues.filter(issue => issue.severity === 'medium');
  const lowSeverityIssues = issues.filter(issue => issue.severity === 'low');

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Code Review Analysis
          </CardTitle>
          <CardDescription>
            Comprehensive code review focusing on security, performance, component size, and unused code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-6">
            <Button 
              onClick={runCodeReview}
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  Run Code Review
                </>
              )}
            </Button>
          </div>

          {issues.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{issues.length}</div>
                  <div className="text-sm text-gray-600">Total Issues</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{highSeverityIssues.length}</div>
                  <div className="text-sm text-gray-600">High Severity</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{mediumSeverityIssues.length}</div>
                  <div className="text-sm text-gray-600">Medium Severity</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{lowSeverityIssues.length}</div>
                  <div className="text-sm text-gray-600">Low Severity</div>
                </CardContent>
              </Card>
            </div>
          )}

          {highSeverityIssues.length > 0 && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>{highSeverityIssues.length} high severity issues</strong> found that should be addressed immediately.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {issues.length > 0 && (
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Issues ({issues.length})</TabsTrigger>
            <TabsTrigger value="security">Security ({getIssuesByType('security').length})</TabsTrigger>
            <TabsTrigger value="performance">Performance ({getIssuesByType('performance').length})</TabsTrigger>
            <TabsTrigger value="size">Size ({getIssuesByType('size').length})</TabsTrigger>
            <TabsTrigger value="unused">Unused ({getIssuesByType('unused').length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {issues.map((issue, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2">
                        {getIssueIcon(issue.type)}
                        <Badge variant={getSeverityColor(issue.severity)}>
                          {issue.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{issue.file}</span>
                          {issue.line && (
                            <span className="text-sm text-gray-500">Line {issue.line}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-green-700">{issue.suggestion}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {['security', 'performance', 'size', 'unused'].map(type => (
            <TabsContent key={type} value={type} className="space-y-4">
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {getIssuesByType(type as ReviewIssue['type']).map((issue, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge variant={getSeverityColor(issue.severity)}>
                          {issue.severity.toUpperCase()}
                        </Badge>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{issue.file}</span>
                            {issue.line && (
                              <span className="text-sm text-gray-500">Line {issue.line}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-green-700">{issue.suggestion}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default CodeReviewPanel;
