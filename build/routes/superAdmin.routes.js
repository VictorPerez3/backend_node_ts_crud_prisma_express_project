"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const superAdminController = __importStar(require("../controllers/superAdmin.controller"));
const auth_1 = require("../middlewares/auth");
const agency_schemas_1 = require("../schemas/agency.schemas");
const validate_1 = require("../middlewares/validate");
const user_schemas_1 = require("../schemas/user.schemas");
const client_schemas_1 = require("../schemas/client.schemas");
const superAdminRoutes = (app) => {
    //Retorna agencias
    app.get("/superadmin/agency", auth_1.verifyToken, superAdminController.getAllAgencies);
    //Retorna agencias por id
    app.get("/superadmin/agency/:id", auth_1.verifyToken, superAdminController.getAgencyById);
    //Criar agencia
    app.post("/superadmin/agency/register", auth_1.verifyToken, (0, validate_1.validate)(agency_schemas_1.createAgencySchema), superAdminController.createAgency);
    //Criar usuario
    app.post("/superadmin/users/register", auth_1.verifyToken, (0, validate_1.validate)(user_schemas_1.createUserSchema), superAdminController.createUser);
    //Criar cliente
    app.post("/superadmin/client/register", auth_1.verifyToken, (0, validate_1.validate)(client_schemas_1.createClientSchema), superAdminController.createClient);
    //Atualizar agencia por id
    app.put("/superadmin/agency/update/:id", auth_1.verifyToken, superAdminController.updateAgencyById);
    //Atualizar usuario por id
    app.put("/superadmin/users/update/:id", auth_1.verifyToken, superAdminController.updateUserById);
    //Atualizar cliente por id
    app.put("/superadmin/client/update/:id", auth_1.verifyToken, superAdminController.updateClientById);
    //Deletar Agencias por id
    app.delete("/superadmin/agency/delete/:id", auth_1.verifyToken, superAdminController.destroyAgencyById);
    //Deletar Usuarios por id
    app.delete("/superadmin/users/delete/:id", auth_1.verifyToken, superAdminController.destroyUserById);
    //Deletar Clientes por id
    app.delete("/superadmin/client/delete/:id", auth_1.verifyToken, superAdminController.destroyClientById);
};
exports.default = superAdminRoutes;
//# sourceMappingURL=superAdmin.routes.js.map