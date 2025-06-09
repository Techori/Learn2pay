
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user credentials for fee management system
const mockUsers = [
  { email: 'admin@test.com', password: 'password123', role: 'super_admin', name: 'Super Admin' },
  { email: 'parent@test.com', password: 'password123', role: 'parent', name: 'Parent User' },
  { email: 'institute@test.com', password: 'password123', role: 'institute_admin', name: 'Institute Admin' },
  { email: 'referral@test.com', password: 'password123', role: 'referral', name: 'Referral Team' },
  { email: 'franchise@test.com', password: 'password123', role: 'franchise', name: 'Franchise Team' },
  { email: 'sales@test.com', password: 'password123', role: 'sales', name: 'Sales Team' },
  { email: 'support@test.com', password: 'password123', role: 'support', name: 'Support Team' }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData as User);
      // Create a mock session object
      const mockSession = {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
        token_type: 'bearer',
        user: userData
      } as Session;
      setSession(mockSession);
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, userData: any = {}) => {
    try {
      // For demo purposes, just create a mock user
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        user_metadata: { 
          full_name: userData.full_name || userData.fullName || email,
          role: userData.role || 'institute_admin'
        },
        app_metadata: {},
        aud: 'authenticated',
        confirmation_sent_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const mockSession = {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
        token_type: 'bearer',
        user: newUser
      } as Session;

      setUser(newUser as User);
      setSession(mockSession);
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      toast({
        title: "Success",
        description: "Account created successfully!"
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Sign Up Error",
        description: "Failed to create account",
        variant: "destructive"
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Check against mock users
      const mockUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!mockUser) {
        toast({
          title: "Sign In Error",
          description: "Invalid email or password",
          variant: "destructive"
        });
        return { error: { message: "Invalid credentials" } };
      }

      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: mockUser.email,
        user_metadata: { 
          full_name: mockUser.name,
          role: mockUser.role
        },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const mockSession = {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
        token_type: 'bearer',
        user: userData
      } as Session;

      setUser(userData as User);
      setSession(mockSession);
      localStorage.setItem('currentUser', JSON.stringify(userData));

      toast({
        title: "Success",
        description: `Welcome back, ${mockUser.name}!`
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Sign In Error",
        description: "An error occurred during sign in",
        variant: "destructive"
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setSession(null);
      localStorage.removeItem('currentUser');
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out."
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      if (user) {
        const updatedUser = {
          ...user,
          user_metadata: { ...user.user_metadata, ...updates }
        };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully."
        });
      }
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Update Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
