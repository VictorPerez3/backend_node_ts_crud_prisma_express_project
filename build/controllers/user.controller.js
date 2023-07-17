"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//lida com as requisições HTTP e chama os métodos correspondentes
//do serviço.
class UserController {
}
_a = UserController;
UserController.ping = (req, res, next) => {
    res.json("ok");
};
//////////////////////////////////////
UserController.getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.default.getAll();
        console.log(users);
        res.json({
            success: true,
            payload: users,
        });
        return next();
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
        return next(err);
    }
});
////////////////////////////////////////
UserController.getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_service_1.default.getById(Number(id));
        res.json({
            success: true,
            payload: user,
        });
        return next();
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
        return next(err);
    }
});
//////////////////////////////////////////
UserController.create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //encripitação da senha
        const hashPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
        req.body.password = hashPassword;
        const userCreate = yield user_service_1.default.create(req.body);
        res.json({
            success: true,
            payload: userCreate,
        });
        return next();
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
        return next(err);
    }
});
////////////////////////////////////////////
UserController.update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersUpdateById = yield user_service_1.default.update(parseInt(req.params.id), req.body);
        res.json({
            success: true,
            payload: usersUpdateById,
        });
        return next();
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
        return next(err);
    }
});
/////////////////////////////////////////////
UserController.destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersDeleteById = yield user_service_1.default.destroy(parseInt(req.params.id));
        res.json({
            success: true,
            payload: usersDeleteById,
        });
        return next();
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
        return next(err);
    }
});
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map