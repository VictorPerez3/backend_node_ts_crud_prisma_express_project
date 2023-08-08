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
exports.updateClientById = exports.destroyClientById = exports.createClient = exports.getClientByAgencyId = exports.getClientById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getClientById = (reqParamsId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.client.findUnique({
        where: { id: reqParamsId },
        include: { agency: true },
    });
});
exports.getClientById = getClientById;
const getClientByAgencyId = (tokenAgencyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.client.findMany({
        take: 20,
        where: { agencyId: tokenAgencyId },
        include: { agency: true },
        orderBy: {
            updatedAt: "desc",
        },
    });
});
exports.getClientByAgencyId = getClientByAgencyId;
const createClient = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.client.create({
        data: Object.assign({}, reqBody),
        include: { agency: true },
    });
});
exports.createClient = createClient;
const destroyClientById = (reqParamsId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.client.delete({
        where: { id: reqParamsId },
        include: { agency: true },
    });
});
exports.destroyClientById = destroyClientById;
const updateClientById = (reqParamsId, reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.client.update({
        where: { id: reqParamsId },
        data: Object.assign({}, reqBody),
        include: { agency: true },
    });
});
exports.updateClientById = updateClientById;
//# sourceMappingURL=client.repository.js.map