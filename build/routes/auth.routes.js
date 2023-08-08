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
const authController = __importStar(require("../controllers/auth.controller"));
const user_schemas_1 = require("../schemas/user.schemas");
const superAdmin_schemas_1 = require("../schemas/superAdmin.schemas");
const validate_1 = require("../middlewares/validate");
const auth_1 = require("../middlewares/auth");
const authRoutes = (app) => {
    //Login Super Admin
    app.post("/superadmin/login", (0, validate_1.validate)(superAdmin_schemas_1.loginSuperAdminSchema), authController.superAdminLogin);
    //Login User
    app.post("/users/login", (0, validate_1.validate)(user_schemas_1.loginUserSchema), authController.userLogin);
    //Login Admin
    app.post("/admin/login", (0, validate_1.validate)(user_schemas_1.loginUserSchema), authController.adminLogin);
    //Logout
    app.post("/logout", authController.logout);
    //Verifica quem esta logado (name, email, role, agencia) - (necessario token)
    app.get("/verify", auth_1.verifyToken, authController.verifyLoggedUser);
};
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map