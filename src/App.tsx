
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import SuccessStories from "./pages/SuccessStories";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EthicsPolicy from "./pages/EthicsPolicy";
import CMSAdmin from "./pages/CMSAdmin";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/common/ErrorBoundary";
import DebugPanel from "./components/debug/DebugPanel";
import { logger } from "./utils/logger";

// Configure React Query client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        logger.warn('Query failed, retrying...', { failureCount, error: error.message }, 'ReactQuery');
        return failureCount < 3;
      },
    },
    mutations: {
      onError: (error) => {
        logger.error('Mutation error occurred', { message: error.message }, 'ReactQuery');
      },
    },
  },
});

/**
 * Main App component with error boundaries and debug tools
 * Provides the root structure for the entire application
 */
const App = () => {
  // Log app initialization
  logger.info('App initialized', { 
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    viewport: { width: window.innerWidth, height: window.innerHeight }
  }, 'App');

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* CMS Admin routes - without Layout wrapper */}
                <Route path="/cms-admin-i6/*" element={<CMSAdmin />} />
                
                {/* Regular site routes - with Layout wrapper */}
                <Route path="/*" element={
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/solutions" element={<Solutions />} />
                      <Route path="/success-stories" element={<SuccessStories />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/ethics-policy" element={<EthicsPolicy />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                } />
              </Routes>
            </BrowserRouter>
            
            {/* Debug panel for development */}
            <DebugPanel />
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
