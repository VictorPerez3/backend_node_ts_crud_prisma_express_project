import * as userRepository from "../repositories/user.repository";
import * as authRepository from "../repositories/auth.repository";
import { Request, Response } from "express";
import * as userServices from "../services/user.services";
import * as authServices from "../services/auth.services";

//Criação de usuarios user (com validação de cadastro)
export const createUser = async (req: Request, res: Response) => {
  try {
    //encripitação da senha
    req.body.password = await userServices.passwordEncrypt(req.body.password);

    //Garante que o usuario é user
    req.body.role = "user";

    //Criado usuario com senha encriptada
    const userCreate = await userRepository.create(req.body);

    res.json({
      success: true,
      message: "Cadaster type <User> created",
      payload: userCreate,
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error!",
    });
  }
};

//Atualiza dados (nome e senha) da conta que esta logada (necessario token)
export const update = async (req: Request, res: Response) => {
  try {
    const { email: emailBody, password: passwordBody } = req.body;

    if (emailBody) {
      //Repository: Busca o usuario com o email fornecido
      const userAuth = await authRepository.findUserAuthRepository(emailBody);

      //Retorna o usuario pelo Token
      const userToken = await authServices.decodedToken(
        req.headers.authorization
      );

      //Garante que o usuario é user
      req.body.role = userToken.role;

      //Verifica se o email passado é valido e se confere com o login
      if (!userAuth) {
        return res.status(401).send({ message: "Incorrect Email" });
      } else {
        if (emailBody === userToken.email) {
          if (passwordBody) {
            //caso atualize a senha -> encripitação da senha
            req.body.password = await userServices.verifyPasswordEncryptUpdate(
              passwordBody
            );
            updateSuccessful(req.body, userAuth.id, res);
          } else {
            updateSuccessful(req.body, userAuth.id, res);
          }
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

//Exclui conta que esta logada (necessario token)
export const destroy = async (req: Request, res: Response) => {
  try {
    //Retorna o usuario pelo Token
    const userToken = await authServices.decodedToken(
      req.headers.authorization
    );

    //Usuario do login (id do token) terá a conta excluida
    const usersDeleteById = await userRepository.destroy(
      parseInt(userToken.id)
    );
    res.json({
      success: true,
      message: "Deleted logged cadaster",
      payload: usersDeleteById,
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error!",
    });
  }
};

export const updateSuccessful = async (
  reqBody: any,
  ReqParamsId: any,
  res: Response
) => {
  const usersUpdateById = await userRepository.update(
    parseInt(ReqParamsId),
    reqBody
  );
  res.json({
    success: true,
    message: "Updated logged cadaster",
    payload: usersUpdateById,
  });
};


