'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import { setTokens, clearTokens, getAccess } from '@/lib/auth';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'learner' | 'educator';
  bio: string;
  avatar: string | null;
  whatsapp: string;
  facebook: string;
  twitter_x: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<'learner' | 'educator'>;
  register: (username: string, email: string, password: string, role: string) => Promise<void>;
  googleAuth: (accessToken: string, role?: string) => Promise<{ role: 'learner' | 'educator'; isNewUser: boolean }>;
  updateProfile: (formData: FormData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getAccess()) {
      api.get('/auth/me/')
        .then((res) => setUser(res.data))
        .catch(() => clearTokens())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string): Promise<'learner' | 'educator'> => {
    const { data } = await api.post('/auth/login/', { username, password });
    setTokens(data.tokens.access, data.tokens.refresh);
    const me = await api.get('/auth/me/');
    setUser(me.data);
    return me.data.role as 'learner' | 'educator';
  };

  const register = async (username: string, email: string, password: string, role: string): Promise<void> => {
    await api.post('/auth/register/', { username, email, password, role });
  };

  const googleAuth = async (accessToken: string, role?: string): Promise<{ role: 'learner' | 'educator'; isNewUser: boolean }> => {
    const { data } = await api.post('/auth/google/', { access_token: accessToken, ...(role ? { role } : {}) });
    setTokens(data.tokens.access, data.tokens.refresh);
    const me = await api.get('/auth/me/');
    setUser(me.data);
    return { role: me.data.role as 'learner' | 'educator', isNewUser: data.is_new_user ?? false };
  };

  const updateProfile = async (formData: FormData): Promise<void> => {
    const { data } = await api.patch('/auth/profile/update/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setUser(data);
  };

  const logout = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      await api.post('/auth/logout/', { refresh });
    } finally {
      clearTokens();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleAuth, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
