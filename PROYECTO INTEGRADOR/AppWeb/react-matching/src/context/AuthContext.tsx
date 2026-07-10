import React, { createContext, useContext, useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseClient } from '../services/supabase';

interface AuthContextType {
  supabase: SupabaseClient | null;
  userId: string | null;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType>({ supabase: null, userId: null, isReady: false });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'SESSION_DATA') {
        const session = event.data.payload;
        setUserId(session.user?.id || null);
        setSupabase(createSupabaseClient(session.access_token));
        setIsReady(true);
      }
    };

    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: 'REQUEST_SESSION' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <AuthContext.Provider value={{ supabase, userId, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};
