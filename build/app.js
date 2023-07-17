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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
dotenv_1.default.config();
const port = process.env.SERVER_PORT; // default port to listen
//middleware - Parsing do Body da requisição(possibilita conseguir ler o json)
router.use(express_1.default.json());
//Import de routers
(0, routes_1.default)(app);
// // ping
// router.get("/ping", UserController.ping.bind(UserController));
// //get all
// router.get("/", UserController.getAll.bind(UserController));
// //get id
// router.get("/:id", UserController.getById.bind(UserController));
// //post
// router.post("/register", UserController.create.bind(UserController));
// //update 
// router.put("/:id", UserController.update.bind(UserController));
// //delete 
// router.delete("/:id", UserController.destroy.bind(UserController));
// //LOGIN post
// router.post("/login", AuthController.authenticate.bind(AuthController));
//Registrando a rota na aplicação
app.use("/users", router);
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map