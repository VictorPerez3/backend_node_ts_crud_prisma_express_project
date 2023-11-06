import * as userRepository from "../repositories/user.repository";
import { Request, Response } from "express";
import * as userServices from "../services/user.services";
import * as authServices from "../services/auth.services";

//Atualiza dados (nome e senha) da conta que esta logada (necessario token)
export const updateCurrentUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email: emailBody, password: passwordBody } = req.body;

    if (!emailBody) {
      return res.status(402).send({
        message: "Email not informed ",
      });
    }
    //Repository: Busca o usuario com o email fornecido
    const userAuth = await userRepository.getUserByEmail(emailBody);

    //Retorna o usuario pelo Token
    const userToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization,
    );

    //Garante que o usuario é user e agencia igual ao token
    req.body.role = userToken?.role;
    req.body.agencyId = userToken?.agencyId;

    //Verifica se o email passado é valido e se confere com o login
    if (!userAuth || emailBody !== userToken?.email) {
      return res.status(403).send({ message: "Incorrect Email" });
    }
    if (passwordBody) {
      //caso atualize a senha -> encripitação da senha
      req.body.password = await userServices.verifyPasswordEncryptUpdate(
        passwordBody,
      );
      return updateSuccessful(req.body, userAuth.id, res);
    } else {
      return updateSuccessful(req.body, userAuth.id, res);
    }
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

//Exclui conta que esta logada (necessario token)
export const destroyCurrentUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    //Retorna o usuario pelo Token
    const userToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization,
    );

    //Usuario do login (id do token) terá a conta excluida
    if (userToken === null || !userToken.id) {
      return res.status(500).json({
        error: "Authentication Token is incorrect",
      });
    }
    const usersDeleteById = await userRepository.destroyUserById(userToken.id);
    return res.json({
      success: true,
      message: "Deleted logged cadaster",
      payload: usersDeleteById,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

export const updateSuccessful = async (
  reqBody: any,
  ReqParamsId: number,
  res: Response,
): Promise<Response> => {
  const usersUpdateById = await userRepository.updateUserById(
    ReqParamsId,
    reqBody,
  );
  return res.json({
    success: true,
    message: "Updated logged cadaster",
    payload: usersUpdateById,
  });
};
