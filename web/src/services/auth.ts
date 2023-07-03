import { toast } from "react-toastify";
import { User, UserLogin, UserRegister } from "../models/User";
import api from "./api";
import { useToastMessage } from "../hooks/useToast";

interface SignData {
  token: string;
  user: User;
}

const signIn = (user: UserLogin) => {
  return new Promise<SignData>((resolve, reject) => {
    const { setToastMessage } = useToastMessage();
    api
      .post("/user/login", user)
      .then((res) => {
        const data = res.data;
        const signData: SignData = {
          token: data?.token || "", // Utilize uma string vazia como valor padrão
          user: data?.user || null, // Utilize null como valor padrão
        };
        setToastMessage(data.message, "success");
        resolve(signData);
      })
      .catch((error) => {
        setToastMessage(error.response.data.message, "error");
        reject(error);
      });
  });
};

const signUp = (user: UserRegister) => {
 
  return new Promise<SignData>((resolve, reject) => {
    const { setToastMessage } = useToastMessage();
    api
      .post("/user/register", user)
      .then((res) => {
        const data = res.data;
        const signData: SignData = {
          token: data?.token || "", // Utilize uma string vazia como valor padrão
          user: data?.user || null, // Utilize null como valor padrão
        };
        setToastMessage(data.message, "success");
        resolve(signData);
      })
      .catch((error) => {
        setToastMessage(error.response.data.message, "error")
        reject(error);
      });
  });
};

export { signIn, signUp };
