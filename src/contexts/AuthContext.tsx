"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { STORAGE_KEYS, VALID_CREDENTIALS } from "@/constants";
import { AuthContextValue, AuthUser, LoginCredentials } from "@/types/auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Restore session on mount so a page reload keeps the user logged in.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.AUTH);
      if (raw) {
        setUser(JSON.parse(raw) as AuthUser);
      }
    } catch {
      // Corrupt/blocked storage — treat as logged out.
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const login = useCallback((credentials: LoginCredentials) => {
    const email = credentials.email.trim();
    const { password } = credentials;

    if (
      email.toLowerCase() === VALID_CREDENTIALS.email.toLowerCase() &&
      password === VALID_CREDENTIALS.password
    ) {
      const authUser: AuthUser = { email };
      window.localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authUser));
      setUser(authUser);
      return { success: true };
    }

    return { success: false, error: "Invalid email or password." };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEYS.AUTH);
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isInitializing,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
