import UserRepository from "../repositories/user.repository";
import { Request, Response, NextFunction, response } from "express";
import UserServices from "../services/user.services";

//lida com as requisições HTTP e chama os métodos correspondentes
//do serviço.

export default class UserController {
  //Verifica se o servidor esta online
  static verifyServer = (req: Request, res: Response) => {
    return res.json("Ok - The server is online");
  };

  //retorna todos os usuarios (necessario token)
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserRepository.getAll();
      res.json({
        success: true,
        payload: users,
      });

      return next();
    } catch (err) {
      res.status(500).json({
        error: "Server error!",
      });
      return next(err);
    }
  };

  //retorna usuario pelo ID (necessario token)
  static getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await UserRepository.getById(Number(id));
      res.json({
        success: true,
        payload: user,
      });

      return next();
    } catch (err) {
      res.status(500).json({
        error: "Server error!",
      });
      return next(err);
    }
  };

  //criação de usuarios user/admin (validação de cadastro)
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //encripitação da senha
      req.body.password = await UserServices.passwordEncrypt(req.body.password);

      //Criado usuario com senha encriptada
      const userCreate = await UserRepository.create(req.body);

      res.json({
        success: true,
        message: "Usuário criado",
        payload: userCreate,
      });

      return next();
    } catch (err) {
      res.status(500).json({
        error: "Server error!",
      });
      return next(err);
    }
  };

  //atualiza dados do usuario ja criado(necessario token)
  static update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //caso atualize a senha -> encripitação da senha
      req.body.password = await UserServices.verifyPasswordEncryptUpdate(
        req.body.password,
      );

      const usersUpdateById = await UserRepository.update(
        parseInt(req.params.id),
        req.body,
      );
      res.json({
        success: true,
        message: "Usuário Atualizado",
        payload: usersUpdateById,
      });

      return next();
    } catch (err) {
      res.status(500).json({
        error: "Server error!",
      });
      return next(err);
    }
  };

  //deleta usuario(necessario token)
  static destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersDeleteById = await UserRepository.destroy(
        parseInt(req.params.id),
      );
      res.json({
        success: true,
        payload: usersDeleteById,
      });

      return next();
    } catch (err) {
      res.status(500).json({
        error: "Server error!",
      });
      return next(err);
    }
  };
}
