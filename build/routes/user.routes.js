"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
//Importa o controller
const userRoutes = (app) => {
    //   // ping
    //   app.get("/ping", UserController.ping.bind);
    //   //post
    //   app.post("/register", validate(createUserSchema), UserController.create.bind);
    //   //get all
    //   app.get("/", verifyToken, UserController.getAll.bind);
    //   //get id
    //   app.get("/:id", verifyToken, UserController.getById.bind);
    //   //update
    //   app.put("/:id", verifyToken, UserController.update.bind);
    //   //delete
    //   app.delete("/:id", verifyToken, UserController.destroy.bind);
    ///////////////////////////////////////////////////////
    // ping
    app.get("/ping", user_controller_1.default.ping.bind(user_controller_1.default));
    //get all
    app.get("/", user_controller_1.default.getAll.bind(user_controller_1.default));
    //get id
    app.get("/:id", user_controller_1.default.getById.bind(user_controller_1.default));
    //post
    app.post("/register", user_controller_1.default.create.bind(user_controller_1.default));
    //update 
    app.put("/:id", user_controller_1.default.update.bind(user_controller_1.default));
    //delete 
    app.delete("/:id", user_controller_1.default.destroy.bind(user_controller_1.default));
};
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map