import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { Express } from "express";

const swaggerRoutes = (app: Express) => {
  //Swagger Router
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default swaggerRoutes;
