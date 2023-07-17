import jwt from "jsonwebtoken";
import { Request, Response } from "express";

//middleware para verificar se o token de autenticação fornecido na requisição é válido
export const verifyToken = (req: Request, res: Response, next: any) => {
    //obtém o token de autenticação presente no cabeçalho da requisição
    const token = req.headers.authorization;
    
  if (!token) {
    return res.status(401).send({ message: "Required Token" });
  }

  try {
    const replace = token.replace("Bearer ", "");
    //verificação do token usando jwt
    jwt.verify(replace, String(process.env.TOKEN_KEY));
    next();
  } catch (e) {
    res.status(401).send({ message: "Invalid Credentials" });
  }
};
