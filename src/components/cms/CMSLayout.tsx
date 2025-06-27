
import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { FileText, Settings, Globe, Users, BarChart3 } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="w-64 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">CMS Admin</h1>
            <p className="text-sm text-gray-600">Infinity6.ai</p>
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {cmsMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                              isActive 
                                ? 'bg-blue-100 text-blue-900 font-medium' 
                                : 'text-gray-700 hover:bg-gray-100'
                            }`
                          }
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6">
            <SidebarTrigger />
            <div className="ml-4">
              <h2 className="font-semibold text-gray-900">
                {cmsMenuItems.find(item => location.pathname === item.url)?.title || 'Dashboard'}
              </h2>
            </div>
          </header>
          
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CMSLayout;
