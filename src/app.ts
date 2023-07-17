import express, { NextFunction, Request, Response, Router } from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

//middleware - Parsing do Body da requisição(possibilita conseguir ler o json)
app.use(express.json());

//Import de routers
routes(app);

// start the Express server
const port = process.env.SERVER_PORT; // default port to listen
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
