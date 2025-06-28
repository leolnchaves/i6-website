
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <Sidebar className="border-r-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <div className="p-6 border-b border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  CMS Admin
                </h1>
                <p className="text-sm text-slate-500 font-medium">Infinity6.ai</p>
              </div>
            </div>
          </div>
          
          <SidebarContent className="px-4 py-6">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-600/80 uppercase tracking-wider mb-4 px-3">
                Menu Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {cmsMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                              isActive 
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25' 
                                : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <item.icon className={`h-5 w-5 transition-transform duration-200 ${
                                isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                              } group-hover:scale-110`} />
                              <span className="font-medium text-sm">{item.title}</span>
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

          <SidebarFooter className="border-t border-slate-200/60 bg-slate-50/50">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center shadow-sm">
                  <User className="h-5 w-5 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-slate-500 capitalize font-medium">
                    {user?.role}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200/60 flex items-center px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200">
                <Menu className="h-5 w-5 text-slate-600" />
              </SidebarTrigger>
              <div className="h-6 w-px bg-slate-200"></div>
              <div>
                <h2 className="font-semibold text-slate-800 text-lg">
                  {cmsMenuItems.find(item => location.pathname === item.url)?.title || 'Dashboard'}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Gerencie seu conteúdo com facilidade
                </p>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6 overflow-auto">
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
