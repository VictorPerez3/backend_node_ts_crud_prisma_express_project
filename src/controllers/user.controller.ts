import * as userRepository from "../repositories/user.repository";
import { Request, Response } from "express";
import * as userServices from "../services/user.services";
import * as authServices from "../services/auth.services";

//Atualiza dados (nome e senha) da conta que esta logada (necessario token)
export const update = async (req: Request, res: Response) => {
  try {
    const { email: emailBody, password: passwordBody } = req.body;

    if (emailBody) {
      //Repository: Busca o usuario com o email fornecido
      const userAuth = await userRepository.getUserByEmail(emailBody);

      //Retorna o usuario pelo Token
      const userToken = await authServices.decodedTokenWithAgency(
        req.headers.authorization,
      );

      //Garante que o usuario é user e agencia igual ao token
      req.body.role = userToken.role;
      req.body.agencyId = userToken.agencyId;

      //Verifica se o email passado é valido e se confere com o login
      if (!userAuth) {
        return res.status(403).send({ message: "Incorrect Email" });
      } else {
        if (emailBody === userToken.email) {
          if (passwordBody) {
            //caso atualize a senha -> encripitação da senha
            req.body.password = await userServices.verifyPasswordEncryptUpdate(
              passwordBody,
            );
            updateSuccessful(req.body, userAuth.id, res);
          } else {
            updateSuccessful(req.body, userAuth.id, res);
          }
        }
      }
    } else {
      return res.status(402).send({
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
    const userToken = await authServices.decodedTokenWithAgency(
      req.headers.authorization,
    );

    //Usuario do login (id do token) terá a conta excluida
    const usersDeleteById = await userRepository.destroyUserById(
      parseInt(userToken.id),
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
  res: Response,
) => {
  const usersUpdateById = await userRepository.updateUserById(
    parseInt(ReqParamsId),
    reqBody,
  );
  res.json({
    success: true,
    message: "Updated logged cadaster",
    payload: usersUpdateById,
  });
};
