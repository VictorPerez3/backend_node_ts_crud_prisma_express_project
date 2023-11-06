import * as userRepository from "../repositories/user.repository";
import * as userController from "../controllers/user.controller";
import { Request, Response } from "express";
import * as userServices from "../services/user.services";
import * as authServices from "../services/auth.services";

//Retorna todos os usuarios - (necessario token e ser admin)
export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Retorna o usuario pelo Token
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ message: "Authentication Token not provided" });
    }
    const userToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization
    );

    if (userToken?.role !== "admin") {
      return res.status(403).send({
        message:
          "User account does not have Admin permission to Get all Accounts",
      });
    }

    const users = await userRepository.getAllUsers();

    return res.status(200).json({
      success: true,
      payload: users,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Retorna usuario pelo ID (necessario token e ser admin)
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Retorna o usuario pelo Token
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ message: "Authentication Token not provided" });
    }
    const userToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization
    );

    if (userToken?.role !== "admin") {
      return res.status(403).send({
        message:
          "User account does not have Admin permission to Get Account by ID",
      });
    }

    const { id } = req.params;
    const user = await userRepository.getUserById(Number(id));

    if (!user) {
      return res.status(402).send({
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      payload: user,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Criação de usuarios <user/admin> (com validação de cadastro) - (necessario token e ser admin)
export const createAdmin = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Retorna o usuario pelo Token
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ message: "Authentication Token not provided" });
    }
    const userToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization
    );
    if (!userToken || userToken === null) {
      return res.status(403).send({
        message:
          "Authentication Token incorrect",
      });
    }
    //Agencia do cliente criado é a mesma do token
    req.body.agencyId = userToken.agencyId;

    if (userToken.role !== "admin") {
      return res.status(403).send({
        message:
          "User account does not have Admin permission to Create Admin Account",
      });
    }

    //encripitação da senha
    req.body.password = await userServices.passwordEncrypt(req.body.password);

    //Criado usuario com senha encriptada
    const userCreate = await userRepository.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Cadaster created",
      payload: userCreate,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Atualiza dados de usuarios tipo <user> ja criado, numa mesma agencia (necessario token e ser admin)
export const updateUserByEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email: emailBody, password: passwordBody } = req.body;

    if (!emailBody) {
      return res.status(400).send({ message: "Email not informed" });
    }

    //Repository: Busca o usuario com o email fornecido
    const userAuth = await userRepository.getUserByEmail(emailBody);

    if (!userAuth) {
      return res.status(401).send({ message: "Incorrect Email" });
    }

    //Retorna o usuario pelo Token
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ message: "Authentication Token not provided" });
    }

    const userToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization
    );

    if (userToken?.role !== "admin") {
      return res.status(403).send({
        message:
          "User account does not have Admin permission to Update by Email",
      });
    }

    if (userAuth.agencyId !== userToken.agencyId) {
      return res.status(405).send({
        message: "It is not allowed to change registrations of another agency",
      });
    }

    if (passwordBody) {
      //caso atualize a senha -> encriptação da senha
      req.body.password = await userServices.verifyPasswordEncryptUpdate(
        passwordBody
      );
    }

    const userUpdate = await userController.updateSuccessful(req.body, userAuth.id, res);

    return res.status(201).json({
      success: true,
      message: "User Updated",
      payload: userUpdate,
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Deleta usuarios <user/admin> ja criados, numa mesma agencia (necessario token e ser admin)
export const destroyUserById = async (req: Request, res: Response): Promise<Response> => {
  try {

    if (!req.params.id) {
      return res.status(401).send({
        message: "Id not provided",
      });
    }

    const userId = parseInt(req.params.id);

    //Repository: Busca o usuario com o id fornecido
    const userAuth = await userRepository.getUserById(userId);

    if (!userAuth) {
      return res.status(404).send({ message: "User not found" });
    }

    //Retorna o usuario pelo Token
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ message: "Authentication Token not provided" });
    }
    const userToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization
    );

    if (userToken?.role !== "admin") {
      return res.status(403).send({
        message: "User account does not have Admin permission to Delete by ID",
      });
    }

    if (userAuth.agencyId !== userToken.agencyId) {
      return res.status(405).send({
        message: "It is not allowed to change registrations of another agency",
      });
    }

    const usersDeleteById = await userRepository.destroyUserById(userId);
    return res.json({
      success: true,
      message: "Cadaster deleted successfully",
      payload: usersDeleteById,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};
