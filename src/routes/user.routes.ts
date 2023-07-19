import UserController from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";
import { createUserSchema } from "../schemas/user.schemas";
import { validate } from "../middlewares/validate";

const userRoutes = (app: any) => {
  //Verifica se o servidor esta online
  app.get("/users/ping", UserController.verifyServer);

  //User: Verifica quem esta logado (name)

  //retorna todos os usuarios (necessario token)
  app.get("/users", verifyToken, UserController.getAll);

  //retorna usuario pelo ID (necessario token)
  app.get("/users/:id", verifyToken, UserController.getById);

  //criação de usuarios user/admin (validação de cadastro)
  app.post(
    "/users/register",
    validate(createUserSchema),
    UserController.create,
  );

  //atualiza dados do usuario ja criado(necessario token)
  app.put("/users/:id", verifyToken, UserController.update);

  //deleta usuario(necessario token)
  app.delete("/users/:id", verifyToken, UserController.destroy);
};

export default userRoutes;
