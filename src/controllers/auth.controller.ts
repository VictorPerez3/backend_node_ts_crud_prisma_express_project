import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import AuthService from "../services/auth.services";

const prisma = new PrismaClient();

export default class AuthController {
  //Autenticação de usuarios
  static authenticate = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      //Garantir que tanto o email quanto a senha foram fornecidos
      if (!(email && password)) {
        return res
          .status(400)
          .send({ message: "Email and password are required" });
      }

      //Service: Busca o usuario com o email fornecido
      const userAuth = await AuthService.authenticate(email);
      
      //Verifica se o usuario existe no banco de dados
      if (!userAuth) {
        return res
          .status(401)
          .send({ message: "Email and/or password does not exist" });
      }
      
      //Verifica se a senha digitada é valida, igual a senha do banco de dados (usuario criado)
      if (userAuth && bcrypt.compareSync(password, userAuth.password)) {
        //gerado um token de autenticação com jwt
        const token = jwt.sign(
          {
            id: userAuth.id,
            email,
            name: userAuth.name,
          },
          //O token é assinado usando uma chave secreta definida na variável de ambiente process.env.TOKEN_KEY.
          String(process.env.TOKEN_KEY),
          {
            //Token expira em 24h
            expiresIn: "24h",
          }
        );
        return res.status(200).send({ 
            message: "Authentication was a success",
            token });
      } else {
        return res
          .status(401)
          .send({ message: "Incorrect Email and/or Password" });
      }
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  };
}
