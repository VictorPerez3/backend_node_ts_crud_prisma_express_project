import AuthController from "../controllers/auth.controller";
import { loginUserSchema } from "../schemas/user.schemas";
import { validate } from "../middlewares/validate";

const authRoutes = (app: any) => {
  //Login User
  app.post("/users/login", validate(loginUserSchema), AuthController.userLogin);

  //Login Admin

  //Logout
  app.post("/logout", AuthController.logout);
};

export default authRoutes;
