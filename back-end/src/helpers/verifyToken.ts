import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getToken } from "./getToken";

interface CustomRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Acesso negado, efetue o login",
    });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({
      message: "Acesso negado!",
    });
  }
  const secretKey: Secret = process.env.SECRET || "";

  try {
    const verified = jwt.verify(token, secretKey) as JwtPayload;
    req.user = verified;
    next();
  } catch (error) {
    return res.status(422).json({
      message: "Token Inválido!",
    });
  }
};
