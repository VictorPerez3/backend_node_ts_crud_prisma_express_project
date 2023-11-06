import * as adminController from "../controllers/admin.controller";
import { verifyToken } from "../middlewares/auth";
import { createUserSchema } from "../schemas/user.schemas";
import { validate } from "../middlewares/validate";
import { Express } from "express";

const adminRoutes = (app: Express) => {
  //Retorna todos os usuarios com senhas hasheada (necessario token e ser admin)
  app.get("/admin/users", verifyToken, adminController.getAllUsers);

  //Retorna usuario pelo ID (necessario token e ser admin)
  app.get("/admin/users/:id", verifyToken, adminController.getUserById);

  //Criação de usuarios <user/admin> (com validação de cadastro) - (necessario token e ser admin)
  app.post(
    "/admin/register",
    verifyToken,
    validate(createUserSchema),
    adminController.createAdmin
  );

  //Atualiza dados de usuarios tipo <user/admin> ja criados (necessario token e ser admin)
  app.put(
    "/admin/updatebyemail",
    verifyToken,
    adminController.updateUserByEmail
  );

  //Deleta usuarios tipo <user/admin> ja criados (necessario token e ser admin)
  app.delete("/admin/delete/:id", verifyToken, adminController.destroyUserById);
};

export default adminRoutes;
