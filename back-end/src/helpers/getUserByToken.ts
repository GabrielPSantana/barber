import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { User } from "../entity/User";
import { getRepository } from "typeorm";

// get user by token
const getUserByToken = async (token: string) => {
  if (!token) {
    throw new Error("Acesso Negado, sem token!");
  }

  const secretKey: Secret = process.env.SECRET || "";

  const decoded = jwt.verify(token, secretKey);
 
  const userId = decoded.indexOf;

  const userRepository = getRepository(User);

  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new Error("Acesso Negado!");
  }

  return user;
};

export default getUserByToken;
