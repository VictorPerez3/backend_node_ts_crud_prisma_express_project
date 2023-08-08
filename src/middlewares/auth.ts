import { Request, Response } from "express";
import * as authServices from "../services/auth.services";

//middleware para verificar se o token de autenticação fornecido na requisição é válido

export const verifyToken = async (req: Request, res: Response, next: any) => {
  //obtém o token de autenticação presente no cabeçalho da requisição
  const tokenHeader: any = req.headers.authorization;
  try {
    if (!tokenHeader) {
      return res.status(401).send({ message: "Required Token" });
    }

    // Verifica e valida o token (valid;invalid;blacklist)
    const returnValidateTokenService: string = await authServices.validateTokenService(tokenHeader);

    if (returnValidateTokenService === "invalid") {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    if (returnValidateTokenService === "black list token") {
      return res.status(401).send({ message: "Login required" });
    }

    if (returnValidateTokenService === "valid") {
      next();
    }
  } catch (e) {
    res.status(500).json({
      error: "Server error!",
    });
  }
};
