
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface CMSUser {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  loginTime: string;
}

interface CMSAuthContextType {
  user: CMSUser | null;
  isAuthenticated: boolean;
  login: (userData: CMSUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const CMSAuthContext = createContext<CMSAuthContextType | undefined>(undefined);

export const CMSAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CMSUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há uma sessão ativa ao carregar
    const checkSession = () => {
      try {
        const storedUser = sessionStorage.getItem('cms_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          // Verificar se a sessão não expirou (24 horas)
          const loginTime = new Date(userData.loginTime);
          const now = new Date();
          const timeDiff = now.getTime() - loginTime.getTime();
          const hoursDiff = timeDiff / (1000 * 3600);

          if (hoursDiff < 24) {
            setUser(userData);
          } else {
            // Sessão expirada
            sessionStorage.removeItem('cms_user');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        sessionStorage.removeItem('cms_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (userData: CMSUser) => {
    setUser(userData);
    sessionStorage.setItem('cms_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('cms_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  };

  return (
    <CMSAuthContext.Provider value={value}>
      {children}
    </CMSAuthContext.Provider>
  );
};

export const useCMSAuth = () => {
  const context = useContext(CMSAuthContext);
  if (context === undefined) {
    throw new Error('useCMSAuth must be used within a CMSAuthProvider');
  }
  return context;
};
