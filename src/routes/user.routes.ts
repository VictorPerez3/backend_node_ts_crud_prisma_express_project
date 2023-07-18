import UserController from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth";
import { createUserSchema } from "../schemas/user.schemas";
import { validate } from "../middleware/validate";

//Importa o controller

const userRoutes = (app: any) => {
  
  //Verifica se o servidor esta online 
  app.get("/users/ping", UserController.ping);

  //retorna todos os usuarios (necessario token)
  app.get("/users", verifyToken, UserController.getAll);

  //retorna usuario pelo ID (necessario token)
  app.get("/users/:id", verifyToken, UserController.getById);

  //criação de usuarios user/admin (validação de cadastro)
  app.post("/users/register", validate(createUserSchema), UserController.create);

  //atualiza dados do usuario ja criado(necessario token)
  app.put("/users/:id", verifyToken, UserController.update);

  //deleta usuario(necessario token)
  app.delete("/users/:id", verifyToken, UserController.destroy);
};

export default userRoutes;
