import { Request, Response } from "express";
import * as authServices from "../services/auth.services";

//middleware para verificar se o token de autenticação fornecido na requisição é válido

export const verifyToken = async (req: Request, res: Response, next: any) => {

  //obtém o token de autenticação presente no cabeçalho da requisição
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).send({ message: "Required Token" });
  }

  try {
    // Verifica e valide o token
    await authServices.validateTokenService(tokenHeader);
    next();
  } catch (e) {
    res.status(401).send({ message: "Invalid Credentials" });
  }
};
