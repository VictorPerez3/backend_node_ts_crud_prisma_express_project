import UserController from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";
import { createUserSchema } from "../schemas/user.schemas";
import { validate } from "../middlewares/validate";

const adminRoutes = (app: any) => {
  //Admin: Verifica quem esta logado (name, email, role)

  //Admin: retorna todos os usuarios com senhas sem hash (necessario token)
  app.get("/admin", verifyToken, UserController.getAll);

  //Admin: retorna usuario pelo ID com senha sem hash (necessario token)
  app.get("/admin/:id", verifyToken, UserController.getById);

  //Admin: criação de usuarios user/admin (validação de cadastro)
  app.post(
    "/admin/register",
    validate(createUserSchema),
    UserController.create,
  );

  //atualiza dados do usuario ja criado(necessario token)
  app.put("/users/:id", verifyToken, UserController.update);

  //deleta usuario(necessario token)
  app.delete("/users/:id", verifyToken, UserController.destroy);
};

export default adminRoutes;
