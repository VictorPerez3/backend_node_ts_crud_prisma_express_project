import { Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Service: responsável pelas regras de negocio do controller, abrigando tambem o repositorio.

export default class AuthServices {
  //Verifica se o usuario existe no banco de dados
  static verifyUserAuth(userAuth: any, res: Response) {
    if (!userAuth) {
      return res
        .status(401)
        .send({ message: "Incorrect Email and/or Password" });
    }
  }

  //Verifica se a senha digitada é valida, igual a senha do banco de dados (usuario criado)
  static checkPasswordEntered(
    emailBody: string,
    passwordBody: string,
    userAuth: any,
    res: Response,
  ) {
    if (userAuth && bcrypt.compareSync(passwordBody, userAuth.password)) {
      //gerado um token de autenticação com jwt
      const tokenGenerated = jwt.sign(
        {
          id: userAuth.id,
          emailBody,
          name: userAuth.name,
        },
        //O token é assinado usando uma chave secreta definida na variável de ambiente process.env.TOKEN_KEY.
        String(process.env.TOKEN_KEY),
        {
          //Token expira em 24h
          expiresIn: "24h",
        },
      );
      return res.status(200).send({
        message: "Authentication was a success",
        tokenGenerated,
      });
    }
  }

  //Verifica se o token esta presente no Header
  static checkToken(tokenHeaders: any, res: Response) {
    if (!tokenHeaders) {
      return res
        .status(401)
        .send({ message: "Authentication token not provided" });
    }
  }

  // Verifica e invalide o token
  static invalidateToken(tokenHeaders: any, res: Response) {
    const replace = tokenHeaders.replace("Bearer ", "");
    jwt.verify(replace, String(process.env.TOKEN_KEY), (err: any) => {
      if (err) {
        return res.status(401).send({ message: "Error verifying token" });
      }
      res.status(200).send({ message: "Logout successfully" });
    });
  }
}
