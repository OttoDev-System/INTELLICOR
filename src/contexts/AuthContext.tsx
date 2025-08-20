import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'broker' | 'support' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'staff' | 'client') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana@efika.com.br',
    role: 'admin',
    avatar: 'AS',
    company: 'Efika Seguros'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos@efika.com.br',
    role: 'broker',
    avatar: 'CS',
    company: 'Efika Seguros'
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria@efika.com.br',
    role: 'support',
    avatar: 'MO',
    company: 'Efika Seguros'
  },
  {
    id: '4',
    name: 'João Costa',
    email: 'joao.costa@gmail.com',
    role: 'client',
    avatar: 'JC',
    company: 'Cliente Efika'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('efika_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: 'staff' | 'client'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => 
      u.email === email && 
      (userType === 'staff' ? u.role !== 'client' : u.role === 'client')
    );

    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('efika_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('efika_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}