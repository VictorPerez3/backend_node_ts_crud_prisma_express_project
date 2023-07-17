import AuthController from "../controllers/auth.controller";
import { loginUserSchema } from "../schemas/user.schemas";
import { validate } from "../middleware/validate";

const authRoutes = (app: any) => {
  app.post("/users/login", validate(loginUserSchema), AuthController.authenticate);
};

export default authRoutes;
