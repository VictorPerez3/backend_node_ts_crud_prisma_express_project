import * as superAdminController from "../controllers/superAdmin.controller";
import { verifyToken } from "../middlewares/auth";
import { createAgencySchema } from "../schemas/agency.schemas";
import { validate } from "../middlewares/validate";
import { createUserSchema } from "../schemas/user.schemas";
import { createClientSchema } from "../schemas/client.schemas";

const superAdminRoutes = (app: any) => {
  //Retorna agencias
  app.get(
    "/superadmin/agency",
    verifyToken,
    superAdminController.getAllAgencies
  );

  //Retorna agencias por id
  app.get(
    "/superadmin/agency/:id",
    verifyToken,
    superAdminController.getAgencyById
  );

  //Criar agencia
  app.post(
    "/superadmin/agency/register",
    verifyToken,
    validate(createAgencySchema),
    superAdminController.createAgency
  );

  //Criar usuario
  app.post(
    "/superadmin/users/register",
    verifyToken,
    validate(createUserSchema),
    superAdminController.createUser
  );

  //Criar cliente
  app.post(
    "/superadmin/client/register",
    verifyToken,
    validate(createClientSchema),
    superAdminController.createClient
  );

  //Atualizar agencia por id
  app.put(
    "/superadmin/agency/update/:id",
    verifyToken,
    superAdminController.updateAgencyById
  );

  //Atualizar usuario por id
  app.put(
    "/superadmin/users/update/:id",
    verifyToken,
    superAdminController.updateUserById
  );

  //Atualizar cliente por id
  app.put(
    "/superadmin/client/update/:id",
    verifyToken,
    superAdminController.updateClientById
  );

  //Deletar Agencias por id
  app.delete(
    "/superadmin/agency/delete/:id",
    verifyToken,
    superAdminController.destroyAgencyById
  );

  //Deletar Usuarios por id
  app.delete(
    "/superadmin/users/delete/:id",
    verifyToken,
    superAdminController.destroyUserById
  );

  //Deletar Clientes por id
  app.delete(
    "/superadmin/client/delete/:id",
    verifyToken,
    superAdminController.destroyClientById
  );
};

export default superAdminRoutes;
