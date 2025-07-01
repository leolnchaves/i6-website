
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  TestTube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCMSAuth } from '@/hooks/useCMSAuth';

const CMSLayout = () => {
  const { logout } = useCMSAuth();
  const location = useLocation();

  const navigationItems = [
    { path: '/cms-admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/cms-admin/content', icon: FileText, label: 'Conteúdo' },
    { path: '/cms-admin/components', icon: Settings, label: 'Componentes' },
    { path: '/cms-admin/testimonials', icon: Users, label: 'Depoimentos' },
    { path: '/cms-admin/phase1-tests', icon: TestTube, label: 'Testes Fase 1' },
  ];

  const isActive = (path: string) => {
    if (path === '/cms-admin') {
      return location.pathname === '/cms-admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200">
            <img 
              src="/lovable-uploads/fa0e2de0-5d60-4759-bb8f-ae448b70417c.png" 
              alt="Infinity6" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-semibold text-gray-900">CMS</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <Button
              variant="ghost"
              onClick={logout}
              className="w-full justify-start text-gray-600 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CMSLayout;
