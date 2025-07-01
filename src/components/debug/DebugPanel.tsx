
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bug, TestTube, AlertTriangle } from 'lucide-react';
import TestRunner from './TestRunner';
import CodeReviewPanel from './CodeReviewPanel';

const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline" 
            size="sm"
            className="bg-white shadow-lg hover:bg-gray-50"
          >
            <Bug className="h-4 w-4 mr-2" />
            Debug Panel
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-none">
          <SheetHeader>
            <SheetTitle>Development Debug Panel</SheetTitle>
            <SheetDescription>
              Code review and testing tools for development
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6">
            <Tabs defaultValue="tests" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tests" className="flex items-center gap-2">
                  <TestTube className="h-4 w-4" />
                  Test Runner
                </TabsTrigger>
                <TabsTrigger value="review" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Code Review
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tests" className="mt-6">
                <TestRunner />
              </TabsContent>
              
              <TabsContent value="review" className="mt-6">
                <CodeReviewPanel />
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DebugPanel;
