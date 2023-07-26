import * as clientController from "../controllers/client.controller";
import { verifyToken } from "../middlewares/auth";
import { createClientSchema } from "../schemas/client.schemas";
import { validate } from "../middlewares/validate";

const clientRoutes = (app: any) => {
  //Retorna os clientes dentro da agencia do usuario logado
  app.get("/client", verifyToken, clientController.getAll);

  //Criação de clientes dentro da agencia do usuario logado
  app.post(
    "/client/register",
    verifyToken,
    validate(createClientSchema),
    clientController.createClient,
  );

  //Atualiza dados (nome e imagem) do cliente por id
  app.put("/client/update/:id", verifyToken, clientController.updateByIdClient);

  //Delete clientes dentro da agencia por id
  app.delete(
    "/client/delete/:id",
    verifyToken,
    clientController.destroyClientById,
  );
};

export default clientRoutes;
