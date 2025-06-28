
import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarFooter } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { FileText, Settings, Globe, Users, BarChart3, LogOut, User, Menu } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCMSAuth } from '@/hooks/useCMSAuth';

const cmsMenuItems = [
  {
    title: 'DASHBOARD',
    url: '/cms-admin-i6/site-structure',
    icon: Globe,
  },
  {
    title: 'CARDS',
    url: '/cms-admin-i6/content',
    icon: FileText,
  },
  {
    title: 'CHARTS',
    url: '/cms-admin-i6/users',
    icon: Users,
  },
  {
    title: 'WIDGETS',
    url: '/cms-admin-i6/analytics',
    icon: BarChart3,
  },
  {
    title: 'Components',
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
        <Sidebar className="border-r-0 shadow-none bg-gradient-to-b from-purple-600 via-purple-700 to-pink-600 w-72">
          <div className="p-6 border-b border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-600 rounded-sm"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Reduction
                </h1>
              </div>
            </div>
          </div>
          
          <SidebarContent className="px-4 py-6">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {cmsMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-sm font-medium ${
                              isActive 
                                ? 'bg-white/20 text-white' 
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <item.icon className={`h-4 w-4 ${
                                isActive ? 'text-white' : 'text-white/70'
                              }`} />
                              <span className="text-sm font-medium uppercase tracking-wide">{item.title}</span>
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

          <SidebarFooter className="border-t border-purple-500/30 bg-transparent">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-white/60 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                LOGIN / SIGNUP
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200/60 flex items-center px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Menu className="h-5 w-5 text-gray-600" />
              </SidebarTrigger>
              <div className="h-6 w-px bg-gray-200"></div>
              <div>
                <h2 className="font-semibold text-gray-800 text-xl">
                  Dashboard
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Home</span>
                  <span>/</span>
                  <span>Dashboard</span>
                </div>
              </div>
            </div>
          </header>
          
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
