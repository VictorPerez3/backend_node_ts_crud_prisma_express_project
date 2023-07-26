import { Request, Response } from "express";
import * as authServices from "../services/auth.services";
import * as authRepository from "../repositories/auth.repository";
import bcrypt from "bcryptjs";

//Login User
export const userLogin = async (req: Request, res: Response) => {
  const { email: emailBody, password: passwordBody } = req.body;

  //Repository: Busca o usuario com o email fornecido
  const userAuth = await authRepository.findUserAuthRepository(emailBody);

  //Login:Verifica se a senha digitada é valida, igual a senha do banco de dados (usuario criado)
  await checkPasswordEntered(passwordBody, userAuth, res);
};

//Login Admin
export const adminLogin = async (req: Request, res: Response) => {
  const { email: emailBody, password: passwordBody } = req.body;

  //Repository: Busca o usuario com o email fornecido
  const userAuth = await authRepository.findUserAuthRepository(emailBody);

  //Verifica se o usuario é admin
  if (!userAuth) {
    return res.status(401).send({ message: "Incorrect Email and/or Password" });
  } else {
    if (userAuth?.role! === "admin") {
      //Login:Caso role=admin, realiza login
      return checkPasswordEntered(passwordBody, userAuth, res);
    } else {
      return res.status(401).send({
        message: "User account does not have Admin permission to login",
      });
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  //Verifica se o token esta presente no Header
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send({ message: "Authentication token not provided" });
  } else {
    //Verifica se o token esta expirado
    if (authServices.isTokenExpired(req.headers.authorization)) {
      return res
        .status(401)
        .send({ message: "Token expired OR No account logged in" });
    } else {
      // Verifica e valida o token (LOGOUT)
      if (!authServices.validateTokenService(req.headers.authorization)) {
        return res.status(401).send({ message: "Error verifying token" });
      } else {
        const replace = req.headers.authorization.replace("Bearer ", "");
        //Movendo o token de Logout para tabela "BlackListToken"
        await authRepository.moveTokenToBlacklist(replace);
        res.status(200).send({ message: "Logout successfully" });
      }
    }
  }
};

//Verifica quem esta logado (name, email, role, agencia) - (necessario token)
export const verifyLoggedUser = async (req: Request, res: Response) => {
  try {
    //Verifica se o token esta expirado
    if (authServices.isTokenExpired(req.headers.authorization)) {
      return res
        .status(401)
        .send({ message: "Token expired OR No account logged in" });
    } else {
      const userInfo = await authServices.decodedToken(
        req.headers.authorization,
      );
      return res.json({
        success: true,
        payload: userInfo,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Server error!",
    });
  }
};

//Verifica se a senha digitada é valida, igual a senha do banco de dados (usuario criado)
const checkPasswordEntered = async (
  passwordBody: string,
  userAuth: any,
  res: Response,
) => {
  //Verifica se o usuario existe no banco de dados
  try {
    if (!userAuth) {
      return res.status(401).send({ message: "Incorrect Email" });
    } else {
      //Verifica se a senha digitada é valida
      if (bcrypt.compareSync(passwordBody, userAuth.password)) {
        //gerado um token de autenticação com jwt
        const tokenGener = await authServices.tokenGenerated(userAuth);
        return res.status(200).send({
          message: "Authentication was a success",
          tokenGener,
        });
      } else {
        return res.status(401).send({ message: "Incorrect Password" });
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
