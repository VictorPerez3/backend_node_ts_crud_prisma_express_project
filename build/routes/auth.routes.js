"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const user_schemas_1 = require("../schemas/user.schemas");
const validate_1 = require("../middlewares/validate");
const authRoutes = (app) => {
    app.post("/users/login", (0, validate_1.validate)(user_schemas_1.loginUserSchema), auth_controller_1.default.authenticate);
};
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map