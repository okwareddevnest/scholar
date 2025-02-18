'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from 'next/navigation';
import { syncUser } from '@/lib/actions/user';

interface UserData {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  role?: string;
  preferences?: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    theme: string;
  };
  stats?: {
    assignmentsCompleted: number;
    averageRating: number;
    totalEarnings: number;
  };
  subjects?: Array<{
    name: string;
    level: string;
  }>;
}

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: () => {},
  logout: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const { isAuthenticated, isLoading, user: kindeUser, login, logout } = useKindeAuth();

  const syncUserData = async () => {
    if (kindeUser) {
      try {
        const dbUser = await syncUser(kindeUser);
        if (dbUser) {
          setUser({
            id: kindeUser.id,
            email: kindeUser.email || '',
            firstName: dbUser.firstName || kindeUser.given_name || '',
            lastName: dbUser.lastName || kindeUser.family_name || '',
            picture: dbUser.picture || kindeUser.picture || '',
            role: dbUser.role,
            preferences: dbUser.preferences,
            stats: dbUser.stats,
            subjects: dbUser.subjects,
          });
        }
      } catch (error) {
        console.error('Error syncing user:', error);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    syncUserData();
  }, [kindeUser]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshUser = async () => {
    await syncUserData();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout: handleLogout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 