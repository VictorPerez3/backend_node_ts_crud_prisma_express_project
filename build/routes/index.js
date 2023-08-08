"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const client_routes_1 = __importDefault(require("./client.routes"));
const swagger_routes_1 = __importDefault(require("./swagger.routes"));
const superAdmin_routes_1 = __importDefault(require("./superAdmin.routes"));
const routes = (app) => {
    (0, user_routes_1.default)(app);
    (0, auth_routes_1.default)(app);
    (0, admin_routes_1.default)(app);
    (0, client_routes_1.default)(app);
    (0, swagger_routes_1.default)(app);
    (0, superAdmin_routes_1.default)(app);
};
exports.default = routes;
//# sourceMappingURL=index.js.map