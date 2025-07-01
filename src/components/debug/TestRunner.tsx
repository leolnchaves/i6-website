
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Download, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { testAutomation } from '@/utils/testAutomation';

interface TestSuite {
  name: string;
  tests: Array<{
    name: string;
    success: boolean;
    error?: string;
    duration: number;
    timestamp: string;
  }>;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  duration: number;
}

const TestRunner = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestSuite[]>([]);
  const [beforeReport, setBeforeReport] = useState<string>('');
  const [afterReport, setAfterReport] = useState<string>('');

  const runTests = useCallback(async () => {
    setIsRunning(true);
    try {
      const testResults = await testAutomation.runAllTests();
      setResults(testResults);
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      setIsRunning(false);
    }
  }, []);

  const captureBeforeReport = useCallback(() => {
    const report = testAutomation.generateReport();
    setBeforeReport(report);
    console.log('BEFORE REPORT CAPTURED:', report);
  }, []);

  const captureAfterReport = useCallback(() => {
    const report = testAutomation.generateReport();
    setAfterReport(report);
    console.log('AFTER REPORT CAPTURED:', report);
    
    if (beforeReport) {
      const comparison = testAutomation.compareReports(beforeReport, afterReport);
      console.log('COMPARISON REPORT:', comparison);
    }
  }, [beforeReport]);

  const downloadReport = useCallback(() => {
    const report = testAutomation.generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-report-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const clearResults = useCallback(() => {
    testAutomation.clearResults();
    setResults([]);
    setBeforeReport('');
    setAfterReport('');
  }, []);

  const totalTests = results.reduce((sum, suite) => sum + suite.totalTests, 0);
  const totalPassed = results.reduce((sum, suite) => sum + suite.passedTests, 0);
  const totalFailed = results.reduce((sum, suite) => sum + suite.failedTests, 0);
  const successRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(2) : '0';

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Automated Test Runner
          </CardTitle>
          <CardDescription>
            Execute automated tests to verify all pages and functionality before and after code changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button 
              onClick={runTests}
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              {isRunning ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isRunning ? 'Running Tests...' : 'Run All Tests'}
            </Button>
            
            <Button 
              onClick={captureBeforeReport}
              variant="outline"
              disabled={results.length === 0}
            >
              Capture "Before" Report
            </Button>
            
            <Button 
              onClick={captureAfterReport}
              variant="outline"
              disabled={results.length === 0}
            >
              Capture "After" Report
            </Button>
            
            <Button 
              onClick={downloadReport}
              variant="outline"
              disabled={results.length === 0}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            
            <Button 
              onClick={clearResults}
              variant="destructive"
              disabled={results.length === 0}
            >
              Clear Results
            </Button>
          </div>

          {results.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{totalTests}</div>
                  <div className="text-sm text-gray-600">Total Tests</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{totalPassed}</div>
                  <div className="text-sm text-gray-600">Passed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{totalFailed}</div>
                  <div className="text-sm text-gray-600">Failed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </CardContent>
              </Card>
            </div>
          )}

          {beforeReport && afterReport && (
            <Alert className="mb-6">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Before and After reports captured. Check console for comparison details.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {results.map((suite, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{suite.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={suite.failedTests === 0 ? "default" : "destructive"}>
                        {suite.passedTests}/{suite.totalTests}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {suite.duration.toFixed(2)}ms
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {suite.tests.map((test, testIndex) => (
                      <div 
                        key={testIndex}
                        className={`p-3 rounded-lg border ${
                          test.success 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {test.success ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span className="font-medium text-sm">{test.name}</span>
                        </div>
                        {test.error && (
                          <p className="text-xs text-red-600 mt-1">{test.error}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Test Report</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <pre className="text-xs whitespace-pre-wrap">
                    {testAutomation.generateReport()}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default TestRunner;
