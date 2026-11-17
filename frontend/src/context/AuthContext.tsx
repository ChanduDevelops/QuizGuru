import React, { createContext, useContext, useState } from 'react';
import { AuthUser } from '../types/auth.types';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginUser: (authData: AuthUser) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('quizguru_user');
    const savedToken = localStorage.getItem('quizguru_token');
    if (savedUser && savedToken) {
      try {
        return JSON.parse(savedUser) as AuthUser;
      } catch {
        localStorage.removeItem('quizguru_user');
        localStorage.removeItem('quizguru_token');
        return null;
      }
    }
    return null;
  });

  const loginUser = (authData: AuthUser) => {
    localStorage.setItem('quizguru_token', authData.token);
    localStorage.setItem('quizguru_user', JSON.stringify(authData));
    setUser(authData);
  };

  const logoutUser = () => {
    localStorage.removeItem('quizguru_token');
    localStorage.removeItem('quizguru_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user?.token),
        isAdmin: user?.role === 'ROLE_ADMIN',
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
