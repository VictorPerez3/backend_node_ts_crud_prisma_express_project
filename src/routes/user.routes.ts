import * as userController from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";
import { createUserSchema } from "../schemas/user.schemas";
import { validate } from "../middlewares/validate";

const userRoutes = (app: any) => {
  //Criação de usuarios user (com validação de cadastro)
  app.post(
    "/users/register",
    validate(createUserSchema),
    userController.createUser,
  );

  //(Admin/user) atualiza dados (nome e senha) da conta que esta logada (necessario token)
  app.put("/users/update", verifyToken, userController.update);

  //(Admin/user) deleta usuario logado (necessario token)
  app.delete("/users/delete", verifyToken, userController.destroy);
};

export default userRoutes;
