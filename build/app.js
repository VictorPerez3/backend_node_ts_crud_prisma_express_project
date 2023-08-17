"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
// Test - server
const startServer = (port = process.env.SERVER_PORT) => {
    const app = (0, express_1.default)();
    //middleware - Parsing do Body da requisição(possibilita conseguir ler o json)
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    //Import de routers
    (0, routes_1.default)(app);
    return app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
};
exports.startServer = startServer;
//# sourceMappingURL=app.js.map