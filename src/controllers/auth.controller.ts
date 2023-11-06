import { Request, Response } from "express";
import * as authServices from "../services/auth.services";
import * as authRepository from "../repositories/auth.repository";
import * as userRepository from "../repositories/user.repository";
import * as superAdminRepository from "../repositories/superAdmin.repository";
import bcrypt from "bcryptjs";
import { IUserWithAgencyOrSuperAdmin } from "../utils/interface";

//Login SuperAdmin
export const superAdminLogin = async (req: Request, res: Response): Promise<Response> => {
  const { email: emailBody, password: passwordBody } = req.body;

  //Repository: Busca o superadmin com o email fornecido
  const superAdminAuth = await superAdminRepository.getSuperAdminByEmail(
    emailBody
  );

  if (!superAdminAuth) {
    return res.status(404).send({ message: "Superadmin not found" });
  }

  //Login: Verifica se a senha digitada é válida, igual à senha do banco de dados (superadmin criado)
  return await checkPasswordEntered(passwordBody, superAdminAuth, res);
};

//Login User
export const userLogin = async (req: Request, res: Response): Promise<Response> => {
  const { email: emailBody, password: passwordBody } = req.body;

  //Repository: Busca o usuário com o email fornecido
  const userAuth = await userRepository.getUserByEmail(emailBody);

  //Login:Verifica se a senha digitada é válida, igual a senha do banco de dados (usuário criado)
  return await checkPasswordEntered(passwordBody, userAuth, res);
};

//Login Admin
export const adminLogin = async (req: Request, res: Response): Promise<Response> => {
  const { email: emailBody, password: passwordBody } = req.body;

  //Repository: Busca o usuario com o email fornecido
  const userAuth = await userRepository.getUserByEmail(emailBody);

  //Verifica se o usuario é admin
  if (!userAuth) {
    return res.status(401).send({ message: "Incorrect Email and/or Password" });
  } else {
    if (userAuth?.role! === "admin") {
      return checkPasswordEntered(passwordBody, userAuth, res);
    } else {
      return res.status(405).send({
        message: "User account does not have Admin permission to login",
      });
    }
  }
};

//Logout
export const logout = async (req: Request, res: Response): Promise<Response> => {
  //Verifica se o token esta presente no Header
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send({ message: "Authentication token not provided" });
  } else {
    //Verifica se o token esta expirado
    if (authServices.isTokenExpired(req.headers.authorization)) {
      return res
        .status(402)
        .send({ message: "Token expired OR No account logged in" });
    } else {
      // Verifica e valida o token (LOGOUT)
      if (!authServices.validateTokenService(req.headers.authorization)) {
        return res.status(403).send({ message: "Error verifying token" });
      } else {
        const replace = req.headers.authorization.replace("Bearer ", "");
        //Movendo o token de Logout para tabela "BlackListToken"
        await authRepository.moveTokenToBlacklist(replace);
        return res.status(200).send({ message: "Logout successfully" });
      }
    }
  }
};

//Verifica quem esta logado (name, email, role, agencia) - (necessario token)
export const verifyLoggedUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Verifica se o token esta expirado
    if (!req.headers.authorization) {
      return res
        .status(402)
        .send({ message: "Authentication Token not provided" });
    }
    if (authServices.isTokenExpired(req.headers.authorization)) {
      return res
        .status(402)
        .send({ message: "Token expired OR No account logged in" });
    } else {
      const userInfo = await authServices.decodedTokenWithAgency(
        req.headers.authorization
      );
      return res.json({
        success: true,
        payload: userInfo,
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Verifica se a senha digitada é valida, igual a senha do banco de dados (usuario criado)
const checkPasswordEntered = async (
  passwordBody: string,
  userAuth: IUserWithAgencyOrSuperAdmin | null,
  res: Response
): Promise<Response> => {
  //Verifica se o usuário existe no banco de dados
  if (!userAuth || userAuth === null || userAuth.password === undefined) {
    return res.status(403).send({ message: "Incorrect Email" });
  }

  //Verifica se a senha digitada é válida
  if (bcrypt.compareSync(passwordBody, userAuth.password)) {
    try {
      //gera um token de autenticação com jwt
      const tokenGener = await authServices.tokenGenerated(userAuth);
      return res.status(200).send({
        message: "Authentication was a success",
        tokenGener,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ message: "Server Error" });
    }
  } else {
    return res.status(402).send({ message: "Incorrect Password" });
  }
};
