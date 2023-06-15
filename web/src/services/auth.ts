import { User, UserLogin } from "../models/User";
import api from "./api";

interface SignData {
  token: string;
  user: User;
}

const signIn = (user: UserLogin) => {
  return new Promise<SignData>((resolve, reject) => {
    api
      .post("/user/login", user)
      .then((res) => {
        const data = res.data;
        const signData: SignData = {
          token: data?.token || "", // Utilize uma string vazia como valor padrão
          user: data?.user || null, // Utilize null como valor padrão
        };
        resolve(signData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { signIn };
