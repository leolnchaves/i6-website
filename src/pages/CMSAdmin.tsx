
import { Routes, Route, Navigate } from 'react-router-dom';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { logger } from '@/utils/logger';
import { CMSAuthProvider } from '@/hooks/useCMSAuth';
import CMSLayout from '@/components/cms/CMSLayout';
import CMSLogin from '@/components/cms/CMSLogin';
import CMSProtectedRoute from '@/components/cms/CMSProtectedRoute';
import SiteStructure from '@/components/cms/SiteStructure';
import ContentManagement from '@/components/cms/ContentManagement';
import ComponentsManagement from '@/components/cms/ComponentsManagement';

/**
 * CMS Admin page - hidden admin interface
 * Accessible only by direct URL navigation
 */
const CMSAdmin = () => {
  // Performance monitoring for the CMS admin page
  const metrics = usePerformanceMonitor('CMSAdminPage', 20);
  
  // Log admin page access
  logger.info('CMS Admin page accessed', { 
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent 
  }, 'CMSAdmin');
  
  return (
    <CMSAuthProvider>
      <Routes>
        <Route path="/login" element={<CMSLogin />} />
        <Route path="/" element={<Navigate to="/cms-admin-i6/site-structure" replace />} />
        <Route path="/*" element={
          <CMSProtectedRoute>
            <CMSLayout>
              <Routes>
                <Route path="/site-structure" element={<SiteStructure />} />
                <Route path="/content" element={<ContentManagement />} />
                <Route path="/components" element={<ComponentsManagement />} />
                <Route path="/users" element={
                  <CMSProtectedRoute requiredRole="admin">
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gestão de Usuários</h2>
                      <p className="text-gray-600">Esta seção será implementada em breve.</p>
                    </div>
                  </CMSProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analytics</h2>
                    <p className="text-gray-600">Esta seção será implementada em breve.</p>
                  </div>
                } />
                <Route path="/settings" element={
                  <CMSProtectedRoute requiredRole="admin">
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Configurações</h2>
                      <p className="text-gray-600">Esta seção será implementada em breve.</p>
                    </div>
                  </CMSProtectedRoute>
                } />
              </Routes>
            </CMSLayout>
          </CMSProtectedRoute>
        } />
      </Routes>
    </CMSAuthProvider>
  );
};

export default CMSAdmin;
