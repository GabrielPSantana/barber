import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/User";

const createUserToken = async (user: User) => {
  const secretKey: Secret = process.env.SECRET || "";

  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      id: user.id,
    },
    secretKey
  );

  return token;
};

export default createUserToken;
