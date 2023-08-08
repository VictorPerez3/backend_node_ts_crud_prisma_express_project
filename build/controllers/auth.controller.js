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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLoggedUser = exports.logout = exports.adminLogin = exports.userLogin = exports.superAdminLogin = void 0;
const authServices = __importStar(require("../services/auth.services"));
const authRepository = __importStar(require("../repositories/auth.repository"));
const userRepository = __importStar(require("../repositories/user.repository"));
const superAdminRepository = __importStar(require("../repositories/superAdmin.repository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//Login SuperAdmin
const superAdminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: emailBody, password: passwordBody } = req.body;
    //Repository: Busca o superadmin com o email fornecido
    const superAdminAuth = yield superAdminRepository.getSuperAdminByEmail(emailBody);
    if (!superAdminAuth) {
        return res.status(404).send({ message: "Superadmin not found" });
    }
    //Login: Verifica se a senha digitada é válida, igual à senha do banco de dados (superadmin criado)
    yield checkPasswordEntered(passwordBody, superAdminAuth, res);
});
exports.superAdminLogin = superAdminLogin;
//Login User
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: emailBody, password: passwordBody } = req.body;
    //Repository: Busca o usuário com o email fornecido
    const userAuth = yield userRepository.getUserByEmail(emailBody);
    //Login:Verifica se a senha digitada é válida, igual a senha do banco de dados (usuário criado)
    yield checkPasswordEntered(passwordBody, userAuth, res);
});
exports.userLogin = userLogin;
//Login Admin
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: emailBody, password: passwordBody } = req.body;
    //Repository: Busca o usuario com o email fornecido
    const userAuth = yield userRepository.getUserByEmail(emailBody);
    //Verifica se o usuario é admin
    if (!userAuth) {
        return res.status(401).send({ message: "Incorrect Email and/or Password" });
    }
    else {
        if ((userAuth === null || userAuth === void 0 ? void 0 : userAuth.role) === "admin") {
            //Login:Caso role=admin, realiza login
            return checkPasswordEntered(passwordBody, userAuth, res);
        }
        else {
            return res.status(405).send({
                message: "User account does not have Admin permission to login",
            });
        }
    }
});
exports.adminLogin = adminLogin;
//Logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Verifica se o token esta presente no Header
    if (!req.headers.authorization) {
        return res
            .status(401)
            .send({ message: "Authentication token not provided" });
    }
    else {
        //Verifica se o token esta expirado
        if (authServices.isTokenExpired(req.headers.authorization)) {
            return res
                .status(402)
                .send({ message: "Token expired OR No account logged in" });
        }
        else {
            // Verifica e valida o token (LOGOUT)
            if (!authServices.validateTokenService(req.headers.authorization)) {
                return res.status(403).send({ message: "Error verifying token" });
            }
            else {
                const replace = req.headers.authorization.replace("Bearer ", "");
                //Movendo o token de Logout para tabela "BlackListToken"
                yield authRepository.moveTokenToBlacklist(replace);
                res.status(200).send({ message: "Logout successfully" });
            }
        }
    }
});
exports.logout = logout;
//Verifica quem esta logado (name, email, role, agencia) - (necessario token)
const verifyLoggedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o token esta expirado
        if (authServices.isTokenExpired(req.headers.authorization)) {
            return res
                .status(402)
                .send({ message: "Token expired OR No account logged in" });
        }
        else {
            const userInfo = yield authServices.decodedTokenWithAgency(req.headers.authorization);
            return res.json({
                success: true,
                payload: userInfo,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.verifyLoggedUser = verifyLoggedUser;
//Verifica se a senha digitada é valida, igual a senha do banco de dados (usuario criado)
const checkPasswordEntered = (passwordBody, userAuth, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Verifica se o usuário existe no banco de dados
    if (!userAuth) {
        return res.status(403).send({ message: "Incorrect Email" });
    }
    //Verifica se a senha digitada é válida
    if (bcryptjs_1.default.compareSync(passwordBody, userAuth.password)) {
        try {
            //gera um token de autenticação com jwt
            const tokenGener = yield authServices.tokenGenerated(userAuth);
            return res.status(200).send({
                message: "Authentication was a success",
                tokenGener,
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).send({ message: "Server Error" });
        }
    }
    else {
        return res.status(402).send({ message: "Incorrect Password" });
    }
});
//# sourceMappingURL=auth.controller.js.map