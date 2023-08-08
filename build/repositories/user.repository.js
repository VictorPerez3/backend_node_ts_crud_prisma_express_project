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
exports.destroyUserById = exports.updateUserById = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.users.findMany({
        take: 20,
        include: { agency: true },
        orderBy: {
            updatedAt: "desc",
        },
    });
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.users.findUnique({
        where: { id },
        include: { agency: true },
    });
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.users.findUnique({
        where: { email },
        include: { agency: true },
    });
});
exports.getUserByEmail = getUserByEmail;
const createUser = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.users.create({
        data: Object.assign({}, reqBody),
        include: { agency: true },
    });
});
exports.createUser = createUser;
const updateUserById = (reqParams, reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.users.update({
        where: { id: reqParams },
        data: Object.assign({}, reqBody),
        include: { agency: true },
    });
});
exports.updateUserById = updateUserById;
const destroyUserById = (reqParams) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.users.delete({
        where: { id: reqParams },
    });
});
exports.destroyUserById = destroyUserById;
//# sourceMappingURL=user.repository.js.map