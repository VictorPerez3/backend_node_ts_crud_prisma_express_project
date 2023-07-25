import * as adminController from "../controllers/admin.controller";
import { verifyToken } from "../middlewares/auth";
import { createUserSchema } from "../schemas/user.schemas";
import { validate } from "../middlewares/validate";

const adminRoutes = (app: any) => {
  //Retorna todos os usuarios com senhas hasheada (necessario token e ser admin)
  app.get("/admin", verifyToken, adminController.getAll);

  //Retorna usuario pelo ID (necessario token e ser admin)
  app.get("/admin/:id", verifyToken, adminController.getById);

  //Criação de usuarios <user/admin> (com validação de cadastro) - (necessario token e ser admin)
  app.post(
    "/admin/register",
    validate(createUserSchema),
    adminController.createAdmin
  );

  //Atualiza dados de usuarios tipo <user/admin> ja criados (necessario token e ser admin)
  app.put(
    "/admin/updatebyemail",
    verifyToken,
    adminController.updateByEmailUser
  );

  //Deleta usuarios tipo <user/admin> ja criados (necessario token e ser admin)
  app.delete("/admin/deletebyid/:id", verifyToken, adminController.destroyById);
};

export default adminRoutes;
