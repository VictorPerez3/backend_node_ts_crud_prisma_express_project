"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../middlewares/auth");
const user_schemas_1 = require("../schemas/user.schemas");
const validate_1 = require("../middlewares/validate");
//Importa o controller
const userRoutes = (app) => {
    //Verifica se o servidor esta online 
    app.get("/users/ping", user_controller_1.default.ping);
    //retorna todos os usuarios (necessario token)
    app.get("/users", auth_1.verifyToken, user_controller_1.default.getAll);
    //retorna usuario pelo ID (necessario token)
    app.get("/users/:id", auth_1.verifyToken, user_controller_1.default.getById);
    //criação de usuarios user/admin (validação de cadastro)
    app.post("/users/register", (0, validate_1.validate)(user_schemas_1.createUserSchema), user_controller_1.default.create);
    //atualiza dados do usuario ja criado(necessario token)
    app.put("/users/:id", auth_1.verifyToken, user_controller_1.default.update);
    //deleta usuario(necessario token)
    app.delete("/users/:id", auth_1.verifyToken, user_controller_1.default.destroy);
};
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map