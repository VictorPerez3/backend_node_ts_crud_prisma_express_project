import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import clientRoutes from "./client.routes";
import swaggerRoutes from "./swagger.routes";
import superAdminRoutes from "./superAdmin.routes";

const routes = (app: any) => {
  userRoutes(app);
  authRoutes(app);
  adminRoutes(app);
  clientRoutes(app);
  swaggerRoutes(app);
  superAdminRoutes(app)
};

export default routes;
