import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const swaggerRoutes = (app: any) => {
  //Swagger Router
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default swaggerRoutes;
