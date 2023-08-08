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
exports.destroyClientById = exports.updateByIdClient = exports.createClient = exports.getAll = void 0;
const clientRepository = __importStar(require("../repositories/client.repository"));
const authServices = __importStar(require("../services/auth.services"));
//Retorna os clientes dentro da agencia do usuario logado
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Retorna o usuario pelo Token
        const clientToken = yield authServices.decodedTokenWithAgency(req.headers.authorization);
        //Clientes na agencia do token
        const allClients = yield clientRepository.getClientByAgencyId(parseInt(clientToken.agencyId));
        if (!allClients) {
            return res.status(403).send({
                message: "There are no clients in this agency",
            });
        }
        else {
            return res.json({
                success: true,
                payload: allClients,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.getAll = getAll;
//Criação de clientes dentro da agencia do usuario logado
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Retorna o usuario pelo Token
        const clientToken = yield authServices.decodedTokenWithAgency(req.headers.authorization);
        //Agencia do cliente criado é a mesma do token
        req.body.agencyId = clientToken.agencyId;
        //Criado cliente
        const clientCreate = yield clientRepository.createClient(req.body);
        res.json({
            success: true,
            message: "Cadaster type <Client> created",
            payload: clientCreate,
        });
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.createClient = createClient;
//Atualiza dados (nome e imagem) do cliente por id
const updateByIdClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Retorna o usuario pelo Token
        const clientToken = yield authServices.decodedTokenWithAgency(req.headers.authorization);
        //ID da requisição
        const { id } = req.params;
        //Repository: Busca o usuario com o email fornecido
        const clientById = yield clientRepository.getClientById(parseInt(id));
        //Verifica se o cliente solicitado esta na agencia de login
        if (!clientById) {
            return res.status(403).send({
                message: "In this agency there is no client with the informed id",
            });
        }
        else {
            if (clientById.agencyId === clientToken.agencyId) {
                //Usuario do login (id do token) terá a conta atualizada
                const clientUpdateById = yield clientRepository.updateClientById(parseInt(id), req.body);
                res.json({
                    success: true,
                    message: "Updated client",
                    payload: clientUpdateById,
                });
            }
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.updateByIdClient = updateByIdClient;
//Delete clientes dentro da agencia por id (necessario token)
const destroyClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Retorna o usuario pelo Token
        const clientToken = yield authServices.decodedTokenWithAgency(req.headers.authorization);
        //ID da requisição
        const { id } = req.params;
        //Repository: Busca o usuario com o Id fornecido
        const clientById = yield clientRepository.getClientById(parseInt(id));
        //Verifica se o cliente solicitado esta na agencia de login
        if (!clientById) {
            return res.status(403).send({
                message: "In this agency there is no client with the informed id",
            });
        }
        else {
            if (clientById.agencyId === clientToken.agencyId) {
                //Usuario do login (id do token) terá a conta excluida
                const clientDeleteById = yield clientRepository.destroyClientById(parseInt(id));
                res.json({
                    success: true,
                    message: "Deleted client",
                    payload: clientDeleteById,
                });
            }
            else {
                return res.status(402).send({
                    message: "Forbidden to exclude clients outside the agency",
                });
            }
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.destroyClientById = destroyClientById;
//# sourceMappingURL=client.controller.js.map