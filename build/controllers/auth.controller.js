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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthController {
}
_a = AuthController;
//Autenticação de usuarios
AuthController.authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //Garantir que tanto o email quanto a senha foram fornecidos
        if (!(email && password)) {
            return res
                .status(400)
                .send({ message: "Email and password are required" });
        }
        //Busca o usuario com o email fornecido
        const userAuth = yield prisma.users.findFirst({
            where: {
                email,
            },
        });
        //Verifica se o usuario existe no banco de dados
        if (!userAuth) {
            return res
                .status(401)
                .send({ message: "Email and/or password does not exist" });
        }
        //Verifica se a senha digitada é valida, igual a senha do banco de dados (usuario criado)
        if (userAuth && bcryptjs_1.default.compareSync(password, userAuth.password)) {
            //gerado um token de autenticação com jwt
            const token = jsonwebtoken_1.default.sign({
                id: userAuth.id,
                email,
                name: userAuth.name,
            }, 
            //O token é assinado usando uma chave secreta definida na variável de ambiente process.env.TOKEN_KEY.
            String(process.env.TOKEN_KEY), {
                //Token expira em 24h
                expiresIn: "24h",
            });
            return res.status(200).send({
                message: "Authentication was a success",
                token
            });
        }
        else {
            return res
                .status(401)
                .send({ message: "Incorrect Email and/or Password" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map