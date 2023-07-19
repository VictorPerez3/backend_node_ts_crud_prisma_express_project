import { Request, Response } from "express";
import AuthServices from "../services/auth.services";
import AuthRepository from "../repositories/auth.repository";

export default class AuthController {
  //Login de usuarios
  static userLogin = async (req: Request, res: Response) => {
    try {
      const { email: emailBody, password: passwordBody } = req.body;

      //Repository: Busca o usuario com o email fornecido
      const userAuth = await AuthRepository.findUserAuthRepository(emailBody);

      //Verifica se o usuario existe no banco de dados
      AuthServices.verifyUserAuth(userAuth, res);

      //Login:Verifica se a senha digitada é valida, igual a senha do banco de dados (usuario criado)
      AuthServices.checkPasswordEntered(emailBody, passwordBody, userAuth, res);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  };

  //Logout
  static logout = async (req: Request, res: Response) => {
    //Verifica se o token esta presente no Header
    AuthServices.checkToken(req.headers.authorization, res);
    try {
      // Verifica e invalide o token
      AuthServices.invalidateToken(req.headers.authorization, res);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Internal server error" });
    }
  };
}
