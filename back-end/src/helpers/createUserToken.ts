import { Login } from "./../models/User";
import jwt, { Secret } from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/User";

const createUserToken = async (user: User) => {
  const secretKey: Secret = process.env.SECRET || "";

  const token = jwt.sign(
    {
      name: user.email,
      id: user.password,
    },
    secretKey
  );

  return token;
};

export default createUserToken;
