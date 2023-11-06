import * as userController from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";
import { Express } from "express";

const userRoutes = (app: Express) => {
  //(Admin/user) atualiza dados (nome e senha) da conta que esta logada (necessario token)
  app.put("/users/update", verifyToken, userController.updateCurrentUser);

  //(Admin/user) deleta usuario logado (necessario token)
  app.delete("/users/delete", verifyToken, userController.destroyCurrentUser);
};

export default userRoutes;
