"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { backendAPI } from "@/lib/api";

// 認証時のユーザー情報
type User = {
  id: string;
  name: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  fetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 認証プロバイダー
interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(backendAPI("/api/auth/me"), {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
export type { User, AuthContextType, AuthProviderProps };
