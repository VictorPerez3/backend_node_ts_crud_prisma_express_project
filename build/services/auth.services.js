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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const auth_repository_1 = __importDefault(require("../repositories/auth.repository"));
//Service: responsável pelas regras de negocio do controller, abrigando tambem o repositorio.
const prisma = new client_1.PrismaClient();
class AuthServices {
    static authenticate(email) {
        return __awaiter(this, void 0, void 0, function* () {
            auth_repository_1.default.authenticate(email);
        });
    }
}
exports.default = AuthServices;
//# sourceMappingURL=auth.services.js.map