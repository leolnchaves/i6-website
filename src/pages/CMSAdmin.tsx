
import { Routes, Route, Navigate } from 'react-router-dom';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { logger } from '@/utils/logger';
import CMSLayout from '@/components/cms/CMSLayout';
import SiteStructure from '@/components/cms/SiteStructure';

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
    <CMSLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/cms-admin-i6/site-structure" replace />} />
        <Route path="/site-structure" element={<SiteStructure />} />
        <Route path="/content" element={
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gestão de Conteúdo</h2>
            <p className="text-gray-600">Esta seção será implementada em breve.</p>
          </div>
        } />
        <Route path="/users" element={
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gestão de Usuários</h2>
            <p className="text-gray-600">Esta seção será implementada em breve.</p>
          </div>
        } />
        <Route path="/analytics" element={
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600">Esta seção será implementada em breve.</p>
          </div>
        } />
        <Route path="/settings" element={
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Configurações</h2>
            <p className="text-gray-600">Esta seção será implementada em breve.</p>
          </div>
        } />
      </Routes>
    </CMSLayout>
  );
};

export default CMSAdmin;
