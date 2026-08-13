export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (credentials: LoginCredentials) => { success: boolean; error?: string };
  logout: () => void;
}
