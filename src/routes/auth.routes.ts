import * as authController from "../controllers/auth.controller";
import { loginUserSchema } from "../schemas/user.schemas";
import { validate } from "../middlewares/validate";
import { verifyToken } from "../middlewares/auth";

const authRoutes = (app: any) => {
  //Login User
  app.post("/users/login", validate(loginUserSchema), authController.userLogin);

  //Login Admin
  app.post(
    "/admin/login",
    validate(loginUserSchema),
    authController.adminLogin,
  );

  //Logout
  app.post("/logout", authController.logout);

  //Verifica quem esta logado (name, email, role, agencia) - (necessario token)
  app.get("/verify", verifyToken, authController.verifyLoggedUser);
};

export default authRoutes;
