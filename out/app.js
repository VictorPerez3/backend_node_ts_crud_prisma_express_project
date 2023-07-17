import * as dotenv from "dotenv";
import * as express from "express";
import Controller from "./controllers/user.controller";
import { Router } from "express";
const app = express();
const router = Router();
dotenv.config();
const port = process.env.SERVER_PORT; // default port to listen
//middleware - Parsing do Body da requisição(possibilita conseguir ler o json)
router.use(express.json());
//get all
router.get("/", Controller.getAll.bind(Controller));
//get id
router.get("/:id", Controller.getById.bind(Controller));
//post
router.post("/", Controller.create.bind(Controller));
//update 
router.put("/:id", Controller.update.bind(Controller));
//delete 
router.delete("/:id", Controller.destroy.bind(Controller));
//Registrando a rota na aplicação
app.use("/users", router);
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map