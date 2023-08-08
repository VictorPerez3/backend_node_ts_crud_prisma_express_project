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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyById = exports.updateByEmailUser = exports.createAdmin = exports.getById = exports.getAll = void 0;
const userRepository = __importStar(require("../repositories/user.repository"));
const userController = __importStar(require("../controllers/user.controller"));
const userServices = __importStar(require("../services/user.services"));
const authServices = __importStar(require("../services/auth.services"));
//Retorna todos os usuarios - (necessario token e ser admin)
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Retorna o usuario pelo Token
        const userToken = yield authServices.decodedTokenWithAgency(req.headers.authorization);
        if (userToken.role !== "admin") {
            return res.status(403).send({
                message: "User account does not have Admin permission to Get all Accounts",
            });
        }
        const users = yield userRepository.getAllUsers();
        res.status(200).json({
            success: true,
            payload: users,
        });
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.getAll = getAll;
//Retorna usuario pelo ID (necessario token e ser admin)
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Retorna o usuario pelo Token
        const userToken = yield authServices.decodedTokenWithAgency(req.headers.authorization);
        if (userToken.role !== "admin") {
            return res.status(403).send({
                message: "User account does not have Admin permission to Get Account by ID",
            });
        }
        const { id } = req.params;
        const user = yield userRepository.getUserById(Number(id));
        if (!user) {
            return res.status(402).send({
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            payload: user,
        });
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.getById = getById;
//Criação de usuarios <user/admin> (com validação de cadastro) - (necessario token e ser admin)
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Retorna o usuario pelo Token
        const userToken = yield authServices.decodedTokenWithAgency(req.headers.authorization);
        //Agencia do cliente criado é a mesma do token
        req.body.agencyId = userToken.agencyId;
        if (userToken.role !== "admin") {
            return res.status(403).send({
                message: "User account does not have Admin permission to Create Admin Account",
            });
        }
        //encripitação da senha
        req.body.password = yield userServices.passwordEncrypt(req.body.password);
        //Criado usuario com senha encriptada
        const userCreate = yield userRepository.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "Cadaster created",
            payload: userCreate,
        });
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.createAdmin = createAdmin;
//Atualiza dados de usuarios tipo <user> ja criado, numa mesma agencia (necessario token e ser admin)
const updateByEmailUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email: emailBody, password: passwordBody } = req.body;
        if (!emailBody) {
            return res.status(400).send({ message: "Email not informed" });
        }
        //Repository: Busca o usuario com o email fornecido
        const userAuth = yield userRepository.getUserByEmail(emailBody);
        if (!userAuth) {
            return res.status(401).send({ message: "Incorrect Email" });
        }
        //Retorna o usuario pelo Token
        const userToken = yield authServices.decodedTokenWithAgency(req.headers.authorization);
        if (userToken.role !== "admin") {
            return res.status(403).send({
                message: "User account does not have Admin permission to Update by Email",
            });
        }
        if (userAuth.agencyId !== userToken.agencyId) {
            return res.status(405).send({
                message: "It is not allowed to change registrations of another agency",
            });
        }
        if (passwordBody) {
            //caso atualize a senha -> encriptação da senha
            req.body.password = yield userServices.verifyPasswordEncryptUpdate(passwordBody);
        }
        userController.updateSuccessful(req.body, userAuth.id, res);
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.updateByEmailUser = updateByEmailUser;
//Deleta usuarios <user/admin> ja criados, numa mesma agencia (necessario token e ser admin)
const destroyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        //Repository: Busca o usuario com o id fornecido
        const userAuth = yield userRepository.getUserById(userId);
        if (!userAuth) {
            return res.status(404).send({ message: "User not found" });
        }
        //Retorna o usuario pelo Token
        const userToken = yield authServices.decodedTokenWithAgency(req.headers.authorization);
        if (userToken.role !== "admin") {
            return res.status(403).send({
                message: "User account does not have Admin permission to Delete by ID",
            });
        }
        if (userAuth.agencyId !== userToken.agencyId) {
            return res.status(405).send({
                message: "It is not allowed to change registrations of another agency",
            });
        }
        const usersDeleteById = yield userRepository.destroyUserById(userId);
        res.json({
            success: true,
            message: "Cadaster deleted successfully",
            payload: usersDeleteById,
        });
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.destroyById = destroyById;
//# sourceMappingURL=admin.controller.js.map