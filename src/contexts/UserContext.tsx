import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkAuth } from '../utils/auth';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isVip: boolean;
  vipLevel: number;
  balance: number;
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查用户认证状态
    const authenticatedUser = checkAuth();
    if (authenticatedUser) {
      setUser(authenticatedUser);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 