import UserService from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

//lida com as requisições HTTP e chama os métodos correspondentes
//do serviço.

export default class UserController {
  static ping = (req: Request, res: Response, next: NextFunction) => {
    res.json("ok");
  };
  //////////////////////////////////////
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAll();

      console.log(users);
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
  ////////////////////////////////////////
  static getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await UserService.getById(Number(id));
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
  //////////////////////////////////////////
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //encripitação da senha
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;

      const userCreate = await UserService.create(req.body);
      res.json({
        success: true,
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
  ////////////////////////////////////////////
  static update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersUpdateById = await UserService.update(
        parseInt(req.params.id),
        req.body
      );
      res.json({
        success: true,
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
  /////////////////////////////////////////////
  static destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersDeleteById = await UserService.destroy(
        parseInt(req.params.id)
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
