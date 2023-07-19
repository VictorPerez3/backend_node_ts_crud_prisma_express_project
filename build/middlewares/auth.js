"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//middleware para verificar se o token de autenticação fornecido na requisição é válido
const verifyToken = (req, res, next) => {
    //obtém o token de autenticação presente no cabeçalho da requisição
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: "Required Token" });
    }
    try {
        const replace = token.replace("Bearer ", "");
        //verificação do token usando jwt
        jsonwebtoken_1.default.verify(replace, String(process.env.TOKEN_KEY));
        next();
    }
    catch (e) {
        res.status(401).send({ message: "Invalid Credentials" });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map