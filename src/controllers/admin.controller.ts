import * as userRepository from "../repositories/user.repository";
import * as userController from "../controllers/user.controller";
import * as authRepository from "../repositories/auth.repository";
import { Request, Response } from "express";
import * as userServices from "../services/user.services";
import * as authServices from "../services/auth.services";

//Retorna todos os usuarios - (necessario token e ser admin)
export const getAll = async (req: Request, res: Response) => {
  try {
    //Retorna o usuario pelo Token
    const userToken = await authServices.decodedToken(
      req.headers.authorization
    );
    if (userToken.role === "admin") {
      const users = await userRepository.getAll();
      res.json({
        success: true,
        payload: users,
      });
    } else {
      return res.status(401).send({
        message:
          "User account does not have Admin permission to Get all Accounts",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Server error!",
    });
  }
};

//Retorna usuario pelo ID (necessario token e ser admin)
export const getById = async (req: Request, res: Response) => {
  try {
    //Retorna o usuario pelo Token
    const userToken = await authServices.decodedToken(
      req.headers.authorization
    );
    if (userToken.role === "admin") {
      const { id } = req.params;
      const user = await userRepository.getById(Number(id));
      res.json({
        success: true,
        payload: user,
      });
    } else {
      return res.status(401).send({
        message:
          "User account does not have Admin permission to Get Account by ID",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Server error!",
    });
  }
};

//Criação de usuarios <user/admin> (com validação de cadastro) - (necessario token e ser admin)
export const createAdmin = async (req: Request, res: Response) => {
  try {
    //Retorna o usuario pelo Token
    const userToken = await authServices.decodedToken(
      req.headers.authorization
    );
    if (userToken.role === "admin") {
      //encripitação da senha
      req.body.password = await userServices.passwordEncrypt(req.body.password);

      //Criado usuario com senha encriptada
      const userCreate = await userRepository.create(req.body);

      return res.json({
        success: true,
        message: "Cadaster created",
        payload: userCreate,
      });
    } else {
      return res.status(401).send({
        message:
          "User account does not have Admin permission to Create Admin Account",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Server error!",
    });
  }
};

//Atualiza dados de usuarios tipo <user> ja criado (necessario token e ser admin)
export const updateByEmailUser = async (req: Request, res: Response) => {
  try {
    const { email: emailBody, password: passwordBody } = req.body;

    if (emailBody) {
      //Repository: Busca o usuario com o email fornecido
      const userAuth = await authRepository.findUserAuthRepository(emailBody);

      //Retorna o usuario pelo Token
      const userToken = await authServices.decodedToken(
        req.headers.authorization
      );

      //Verifica se o email passado é valido e se confere com o login
      if (!userAuth) {
        return res.status(401).send({ message: "Incorrect Email" });
      } else {
        if (userToken.role === "admin") {
          if (passwordBody) {
            //caso atualize a senha -> encripitação da senha
            req.body.password = await userServices.verifyPasswordEncryptUpdate(
              passwordBody
            );
            userController.updateSuccessful(req.body, userAuth.id, res);
          } else {
            userController.updateSuccessful(req.body, userAuth.id, res);
          }
        } else {
          return res.status(401).send({
            message:
              "User account does not have Admin permission to Update by Email",
          });
        }
      }
    } else {
      return res.status(401).send({
        message: "Email not informed ",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Server error!",
    });
  }
};

//Deleta usuarios <user/admin> ja criados (necessario token e ser admin)
export const destroyById = async (req: Request, res: Response) => {
  try {
    //Retorna o usuario pelo Token
    const userToken = await authServices.decodedToken(
      req.headers.authorization
    );
    if (userToken.role === "admin") {
      const usersDeleteById = await userRepository.destroy(
        parseInt(req.params.id)
      );
      res.json({
        success: true,
        message: "Cadaster deleted successfully",
        payload: usersDeleteById,
      });
    } else {
      return res.status(401).send({
        message: "User account does not have Admin permission to Delete by ID",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Server error!",
    });
  }
};
