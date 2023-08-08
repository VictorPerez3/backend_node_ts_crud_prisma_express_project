import * as userController from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";

const userRoutes = (app: any) => {
  //(Admin/user) atualiza dados (nome e senha) da conta que esta logada (necessario token)
  app.put("/users/update", verifyToken, userController.update);

  //(Admin/user) deleta usuario logado (necessario token)
  app.delete("/users/delete", verifyToken, userController.destroy);
};

export default userRoutes;
