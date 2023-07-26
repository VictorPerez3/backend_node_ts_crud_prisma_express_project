import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import clientRoutes from "./client.routes";

const routes = (app: any) => {
  userRoutes(app);
  authRoutes(app);
  adminRoutes(app);
  clientRoutes(app);
};

export default routes;
