
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

// Constantes de segurança
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 horas
const SESSION_KEY = 'cms_user_session';

export const CMSAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CMSUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para validar sessão
  const isSessionValid = (userData: CMSUser): boolean => {
    try {
      const loginTime = new Date(userData.loginTime);
      const now = new Date();
      const timeDiff = now.getTime() - loginTime.getTime();
      
      return timeDiff < SESSION_DURATION;
    } catch (error) {
      console.error('Erro ao validar sessão:', error);
      return false;
    }
  };

  // Função para limpar sessão
  const clearSession = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY); // Limpar também localStorage como precaução
  };

  useEffect(() => {
    const checkSession = () => {
      try {
        const storedUser = sessionStorage.getItem(SESSION_KEY);
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          // Validar estrutura dos dados
          if (!userData.id || !userData.email || !userData.role || !userData.loginTime) {
            console.warn('Dados de sessão inválidos encontrados');
            clearSession();
            return;
          }

          // Verificar se a sessão ainda é válida
          if (isSessionValid(userData)) {
            setUser(userData);
          } else {
            console.log('Sessão expirada');
            clearSession();
          }
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Verificar sessão periodicamente
    const intervalId = setInterval(checkSession, 60000); // A cada minuto

    return () => clearInterval(intervalId);
  }, []);

  const login = (userData: CMSUser) => {
    try {
      // Validar dados de entrada
      if (!userData.id || !userData.email || !userData.role) {
        throw new Error('Dados de usuário inválidos');
      }

      // Sanitizar dados
      const sanitizedUserData = {
        id: userData.id.toString(),
        email: userData.email.toLowerCase().trim(),
        role: userData.role,
        loginTime: userData.loginTime || new Date().toISOString()
      };

      setUser(sanitizedUserData);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sanitizedUserData));
      
      console.log('Usuário logado com sucesso:', sanitizedUserData.email);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('Fazendo logout do usuário:', user?.email);
    clearSession();
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
