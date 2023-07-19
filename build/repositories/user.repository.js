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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
//responsável por realizar as operações relacionadas ao banco de dados
//usando o Prisma
const prisma = new client_1.PrismaClient();
class UserRepository {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.users.findMany();
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.users.findUnique({
                where: { id },
            });
        });
    }
    static create(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.users.create({
                data: Object.assign({}, reqBody),
            });
        });
    }
    static update(reqParams, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.users.update({
                where: { id: reqParams },
                data: Object.assign({}, reqBody),
            });
        });
    }
    static destroy(reqParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.users.delete({
                where: { id: reqParams },
            });
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map