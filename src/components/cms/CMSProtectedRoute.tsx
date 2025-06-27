
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCMSAuth } from '@/hooks/useCMSAuth';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface CMSProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'editor' | 'viewer';
}

const CMSProtectedRoute: React.FC<CMSProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'viewer' 
}) => {
  const { isAuthenticated, user, isLoading } = useCMSAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/cms-admin-i6/login" replace />;
  }

  // Verificar permissões de role
  if (user && requiredRole) {
    const roleHierarchy = { admin: 3, editor: 2, viewer: 1 };
    const userLevel = roleHierarchy[user.role];
    const requiredLevel = roleHierarchy[requiredRole];

    if (userLevel < requiredLevel) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
            <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default CMSProtectedRoute;
