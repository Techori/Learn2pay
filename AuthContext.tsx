import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  user: { email: string } | null;
  login: (formState: { email: string; password: string }) => void;
  logout: () => void;
  signIn: (loginId: string, password: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = (formState: { email: string; password: string }) => {
    if (formState.email && formState.password) {
      setUser({ email: formState.email });
      console.log('Logged in:', formState);
    }
  };

  const signIn = async (loginId: string, password: string): Promise<{ error?: string }> => {
    // Dummy logic, replace with real authentication
    if (loginId && password) {
      setUser({ email: loginId });
      return {};
    }
    return { error: 'Invalid credentials' };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};