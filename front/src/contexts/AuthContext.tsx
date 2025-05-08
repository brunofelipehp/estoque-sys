import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

interface DecodedToken {
  id: string;
  role: 'ROOT' | 'ADMIN' | 'EDITOR' | 'USER';
  Iat: number;
}

interface AuthContextType {
  token: string | null;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<DecodedToken | null>(() => {
    const storageToken = localStorage.getItem('token');
    if (storageToken) {
      try {
        return jwtDecode(storageToken) as DecodedToken;
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(jwtDecode(newToken));
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider >
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}