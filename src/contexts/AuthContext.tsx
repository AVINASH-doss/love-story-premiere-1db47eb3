import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'couple' | 'public' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials for demo purposes
const COUPLE_CREDENTIALS = {
  email: 'kirthika@love.com',
  password: 'anniversary2024'
};

const PUBLIC_CREDENTIALS = {
  email: 'guest@love.com',
  password: 'wishes2024'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    // Check for existing session
    const savedRole = sessionStorage.getItem('userRole');
    if (savedRole === 'couple' || savedRole === 'public') {
      setIsAuthenticated(true);
      setUserRole(savedRole);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check couple credentials
    if (email === COUPLE_CREDENTIALS.email && password === COUPLE_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setUserRole('couple');
      sessionStorage.setItem('userRole', 'couple');
      return true;
    }
    
    // Check public credentials
    if (email === PUBLIC_CREDENTIALS.email && password === PUBLIC_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setUserRole('public');
      sessionStorage.setItem('userRole', 'public');
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    sessionStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
