"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRoutes = (app) => {
    //   app.post( "/login", validate(loginUserSchema), AuthController.authenticate.bind);
    app.post("/login", auth_controller_1.default.authenticate);
};
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map