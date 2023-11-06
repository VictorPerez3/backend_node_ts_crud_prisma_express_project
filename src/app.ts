import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

dotenv.config();

// Test - server
export const startServer = (port = process.env.SERVER_PORT) => {
  const app = express();

  //middleware - Parsing do Body da requisição(possibilita conseguir ler o json)
  app.use(cors());
  app.use(express.json());

  //Import de routers
  routes(app);

  return app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
};
