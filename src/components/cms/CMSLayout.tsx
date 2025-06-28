
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

  const getCurrentPageTitle = () => {
    const currentItem = cmsMenuItems.find(item => location.pathname === item.url);
    return currentItem?.title || 'Dashboard';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-gray-100">
        <Sidebar className="w-72 border-r border-gray-200/60 bg-white/70 backdrop-blur-sm shadow-xl">
          {/* Header do Sidebar */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  CMS Admin
                </h1>
                <p className="text-sm text-gray-500 font-medium">Infinity6.ai</p>
              </div>
            </div>
          </div>
          
          <SidebarContent className="px-4 py-6">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Menu Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {cmsMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                              isActive 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                                : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md hover:shadow-blue-100/50'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <item.icon className={`h-5 w-5 transition-transform duration-200 ${
                                isActive ? 'scale-110' : 'group-hover:scale-105'
                              }`} />
                              <span className="font-medium">{item.title}</span>
                            </>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-100 bg-gray-50/50">
            <div className="p-4 space-y-4">
              {/* User Info */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-500 capitalize font-medium">
                    {user?.role}
                  </p>
                </div>
              </div>
              
              {/* Logout Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 h-10 border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200/60 flex items-center px-8 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {getCurrentPageTitle()}
                </h2>
                <p className="text-sm text-gray-500">
                  Gerencie seu conteúdo de forma intuitiva
                </p>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-8 overflow-auto">
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
