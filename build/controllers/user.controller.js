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
exports.updateSuccessful = exports.destroy = exports.update = void 0;
const userRepository = __importStar(require("../repositories/user.repository"));
const userServices = __importStar(require("../services/user.services"));
const authServices = __importStar(require("../services/auth.services"));
//Atualiza dados (nome e senha) da conta que esta logada (necessario token)
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email: emailBody, password: passwordBody } = req.body;
        if (emailBody) {
            //Repository: Busca o usuario com o email fornecido
            const userAuth = yield userRepository.getUserByEmail(emailBody);
            //Retorna o usuario pelo Token
            const userToken = yield authServices.decodedTokenWithAgency(req.headers.authorization);
            //Garante que o usuario é user e agencia igual ao token
            req.body.role = userToken.role;
            req.body.agencyId = userToken.agencyId;
            //Verifica se o email passado é valido e se confere com o login
            if (!userAuth) {
                return res.status(403).send({ message: "Incorrect Email" });
            }
            else {
                if (emailBody === userToken.email) {
                    if (passwordBody) {
                        //caso atualize a senha -> encripitação da senha
                        req.body.password = yield userServices.verifyPasswordEncryptUpdate(passwordBody);
                        (0, exports.updateSuccessful)(req.body, userAuth.id, res);
                    }
                    else {
                        (0, exports.updateSuccessful)(req.body, userAuth.id, res);
                    }
                }
            }
        }
        else {
            return res.status(402).send({
                message: "Email not informed ",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.update = update;
//Exclui conta que esta logada (necessario token)
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Retorna o usuario pelo Token
        const userToken = yield authServices.decodedTokenWithAgency(req.headers.authorization);
        //Usuario do login (id do token) terá a conta excluida
        const usersDeleteById = yield userRepository.destroyUserById(parseInt(userToken.id));
        res.json({
            success: true,
            message: "Deleted logged cadaster",
            payload: usersDeleteById,
        });
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.destroy = destroy;
const updateSuccessful = (reqBody, ReqParamsId, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersUpdateById = yield userRepository.updateUserById(parseInt(ReqParamsId), reqBody);
    res.json({
        success: true,
        message: "Updated logged cadaster",
        payload: usersUpdateById,
    });
});
exports.updateSuccessful = updateSuccessful;
//# sourceMappingURL=user.controller.js.map