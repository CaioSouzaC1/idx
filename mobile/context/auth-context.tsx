import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const savedToken = SecureStore.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        return;
      }
      router.push("/");
    };
    checkToken();
  }, []);

  const login = async (newToken: string) => {
    SecureStore.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = async () => {
    SecureStore.deleteItemAsync("token");
    setToken(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
