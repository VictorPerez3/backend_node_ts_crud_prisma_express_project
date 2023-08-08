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
const adminController = __importStar(require("../controllers/admin.controller"));
const auth_1 = require("../middlewares/auth");
const user_schemas_1 = require("../schemas/user.schemas");
const validate_1 = require("../middlewares/validate");
const adminRoutes = (app) => {
    //Retorna todos os usuarios com senhas hasheada (necessario token e ser admin)
    app.get("/admin/users", auth_1.verifyToken, adminController.getAll);
    //Retorna usuario pelo ID (necessario token e ser admin)
    app.get("/admin/users/:id", auth_1.verifyToken, adminController.getById);
    //Criação de usuarios <user/admin> (com validação de cadastro) - (necessario token e ser admin)
    app.post("/admin/register", auth_1.verifyToken, (0, validate_1.validate)(user_schemas_1.createUserSchema), adminController.createAdmin);
    //Atualiza dados de usuarios tipo <user/admin> ja criados (necessario token e ser admin)
    app.put("/admin/updatebyemail", auth_1.verifyToken, adminController.updateByEmailUser);
    //Deleta usuarios tipo <user/admin> ja criados (necessario token e ser admin)
    app.delete("/admin/delete/:id", auth_1.verifyToken, adminController.destroyById);
};
exports.default = adminRoutes;
//# sourceMappingURL=admin.routes.js.map