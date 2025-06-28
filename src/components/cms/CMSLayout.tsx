
import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarFooter } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { FileText, Settings, Globe, Users, BarChart3, LogOut, User, Menu } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCMSAuth } from '@/hooks/useCMSAuth';

const cmsMenuItems = [
  {
    title: 'Estrutura do Site',
    url: '/cms-admin-i6/site-structure',
    icon: Globe,
  },
  {
    title: 'Conteúdo',
    url: '/cms-admin-i6/content',
    icon: FileText,
  },
  {
    title: 'Usuários',
    url: '/cms-admin-i6/users',
    icon: Users,
  },
  {
    title: 'Analytics',
    url: '/cms-admin-i6/analytics',
    icon: BarChart3,
  },
  {
    title: 'Configurações',
    url: '/cms-admin-i6/settings',
    icon: Settings,
  },
];

interface CMSLayoutProps {
  children: React.ReactNode;
}

const CMSLayout: React.FC<CMSLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useCMSAuth();

  const handleLogout = () => {
    logout();
    navigate('/cms-admin-i6/login');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200 bg-white">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">I6</span>
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-900">CMS Admin</h1>
                <p className="text-xs text-gray-500">Infinity6.ai</p>
              </div>
            </div>
          </div>
          
          <SidebarContent className="px-4 py-6">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {cmsMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isActive 
                                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                          }
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-100 bg-gray-50">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger>
                <Menu className="h-5 w-5 text-gray-600" />
              </SidebarTrigger>
              <h2 className="text-xl font-semibold text-gray-900">
                {cmsMenuItems.find(item => location.pathname === item.url)?.title || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-8 overflow-auto bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CMSLayout;
