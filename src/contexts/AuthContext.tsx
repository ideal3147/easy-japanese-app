import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/libs/supabaseClient';
import { User, AuthError } from '@supabase/supabase-js';

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

  useEffect(() => {
    // 初期ロード時にセッションを確認
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkSession();

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, apiKey: string): Promise<{ error: AuthError | null }> => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      const { error: apiKeyError } = await supabase
        .from('user_settings')
        .insert([
          { 
            user_id: (await supabase.auth.getUser()).data.user?.id,
            api_key: apiKey,
          }
        ]);

      if (apiKeyError) throw apiKeyError;

      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: AuthError | null }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateApiKey = async (apiKey: string): Promise<{ error: AuthError | null }> => {
    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user?.id,
          api_key: apiKey,
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