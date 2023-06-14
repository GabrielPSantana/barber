import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { signIn } from "../services/auth";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import { User, UserLogin } from "../models/User";

interface AuthContextData {
  signed: boolean;
  user: User | null;
  handleSignIn:(user: UserLogin) => void;
  signOut(): void;
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
      api.defaults.headers["Authorization"] = `Bearer ${storageToken}`;
      setUser(JSON.parse(storageUser));
    }
  }, []);

  async function handleSignIn(user: UserLogin) {

    const response = await signIn(user);
    console.log(response)

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
        signed: Boolean(user),
        user,
        handleSignIn,
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
