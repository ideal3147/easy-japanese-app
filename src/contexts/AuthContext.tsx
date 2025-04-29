'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/libs/supabaseClient';
import { User, AuthError } from '@supabase/supabase-js';
import * as CryptoJS from 'crypto-js';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, apiKey: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  updateApiKey: (apiKey: string) => Promise<{ error: AuthError | null }>;
  getApiKey: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 暗号化関数
const encryptApiKey = (apiKey: string, secretKey: string) => {
  return CryptoJS.AES.encrypt(apiKey, secretKey).toString();
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user ?? null;
      setUser(user);
      setLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, apiKey: string): Promise<{ error: AuthError | null }> => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login/callback`,
          data: {
            pendingApiKey: apiKey,
          }
        },
      });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      localStorage.removeItem('pendingApiKey');
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: AuthError | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login'); // サインアウト後はログイン画面へ
  };

  const updateApiKey = async (apiKey: string): Promise<{ error: AuthError | null }> => {
    try {
      const { error } = await supabase.from('user_settings').upsert({
        user_id: user?.id,
        api_key: encryptApiKey(apiKey, process.env.NEXT_PUBLIC_API_KEY_SECRET!),
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const getApiKey = async () => {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('api_key')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      return data?.api_key || null;
    } catch (error) {
      console.error('Error fetching API key:', error);
      return null;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateApiKey,
    getApiKey,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
