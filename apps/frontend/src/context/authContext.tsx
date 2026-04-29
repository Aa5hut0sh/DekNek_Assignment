import { createContext, useState, useEffect, type ReactNode } from "react";
import * as authService from "../services/auth.services";

export type User = {
  id: number;
  name: string;
  email: string;
};


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const data = await authService.getCurrentUser();
          setUser(data.user);
        } catch (err) {
          console.error("Session expired or invalid token:", err);
          localStorage.removeItem("accessToken");
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);

    localStorage.setItem("accessToken", data.token);

    setUser(data.user);
  };

  const signup = async (email: string, password: string, name?: string) => {
    const data = await authService.signup(email, password, name ?? "");

    localStorage.setItem("accessToken", data.token);


    setUser(data.user);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
