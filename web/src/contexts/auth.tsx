import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { signIn, signUp } from "../services/auth";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import { User, UserLogin, UserRegister } from "../models/User";

interface AuthContextData {
  isSigned: boolean;
  user: User | null;
  handleSignIn: (user: UserLogin) => void;
  signOut(): void;
  handleSignUp: (user: UserRegister) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  // const [userToken, setUserToken] = useState<string | null>(null)

  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    const storageToken = localStorage.getItem("token");

    if (storageUser && storageToken) {
      api.defaults.headers.common["Authorization"] = "Bearer " + storageToken;
      setUser(JSON.parse(storageUser));
    }

  }, []);

  async function handleSignIn(user: UserLogin) {
    const response = await signIn(user);

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    const userObject = response.user as User;
    setUser(userObject);

    api.defaults.headers["Authorization"] = `Bearer ${response.token}`;

    navigate("/");
  }

  async function handleSignUp(user: UserRegister) {
    const response = await signUp(user);

    localStorage.setItem("token", JSON.stringify(response.token));
    localStorage.setItem("user", JSON.stringify(response.user));

    const userObject = response.user as User;
    setUser(userObject);

    api.defaults.headers["Authorization"] = `Bearer ${response.token}`;

    navigate("/");
  }

  function signOut() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        isSigned: Boolean(user),
        user,
        handleSignIn,
        handleSignUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
