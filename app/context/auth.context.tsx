import { createContext, useContext, useState } from "react";
import { login, register } from "../services/api/auth.api";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isAuthenticated: boolean;
  handleLogin: (email: string, password: string) => void;
  handleRegister: (
    email: string,
    password: string,
    confirmaPassword: string,
  ) => void;
  logout: () => void;
  user: {
    email: string;
    id: number;
  };
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    email: "",
    id: 0,
  });
  const { push } = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);

    if (response) {
      const decrypt = decryptToken(response.access_token);
      setIsAuthenticated(true);
      setUser({
        email: decrypt.email,
        id: decrypt.sub,
      });
      localStorage.setItem("token", JSON.stringify(response));
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: decrypt.email,
          id: decrypt.sub,
        }),
      );
      push("/");
    }
  };

  const logout = () => {
    console.log("logout");
  };

  const handleRegister = (
    email: string,
    password: string,
    confirmaPassword: string,
  ) => {
    register(email, password, confirmaPassword);
    push("/auth/login");
  };

  const decryptToken = (token: string) => {
    return JSON.parse(atob(token.split(".")[1]));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleRegister, handleLogin, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
