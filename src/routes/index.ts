import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";

const routes = (app: any) => {
  userRoutes(app);
  authRoutes(app);
  adminRoutes(app);
};

export default routes;
