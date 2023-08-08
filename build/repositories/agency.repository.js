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
exports.destroyAgencyById = exports.updateAgencyById = exports.createAgency = exports.getAgencyById = exports.getAllAgencies = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllAgencies = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.agency.findMany({
        take: 20,
        orderBy: {
            updatedAt: "desc",
        },
    });
});
exports.getAllAgencies = getAllAgencies;
const getAgencyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.agency.findUnique({
        where: { id },
    });
});
exports.getAgencyById = getAgencyById;
const createAgency = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.agency.create({
        data: Object.assign({}, reqBody),
    });
});
exports.createAgency = createAgency;
const updateAgencyById = (reqParamsId, reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.agency.update({
        where: { id: reqParamsId },
        data: Object.assign({}, reqBody),
    });
});
exports.updateAgencyById = updateAgencyById;
const destroyAgencyById = (reqParamsId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.agency.delete({
        where: { id: reqParamsId },
    });
});
exports.destroyAgencyById = destroyAgencyById;
//# sourceMappingURL=agency.repository.js.map