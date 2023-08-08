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
exports.destroyClientById = exports.destroyUserById = exports.destroyAgencyById = exports.updateClientById = exports.updateUserById = exports.updateAgencyById = exports.createClient = exports.createUser = exports.createAgency = exports.getAgencyById = exports.getAllAgencies = void 0;
const userRepository = __importStar(require("../repositories/user.repository"));
const clientRepository = __importStar(require("../repositories/client.repository"));
const agencyRepository = __importStar(require("../repositories/agency.repository"));
const superAdminServices = __importStar(require("../services/superAdmin.services"));
const userServices = __importStar(require("../services/user.services"));
//Retorna todos as agencias
const getAllAgencies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o usuario é Super Admin
        if ((yield superAdminServices.isSuperAdmin(req.headers.authorization)) ===
            true) {
            const allAgencies = yield agencyRepository.getAllAgencies();
            res.json({
                success: true,
                payload: allAgencies,
            });
        }
        else {
            return res.status(403).send({
                message: "User account does not have Super Admin permission to Get all Agencies",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.getAllAgencies = getAllAgencies;
//Retorna agencia por ID
const getAgencyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o usuario é Super Admin
        if ((yield superAdminServices.isSuperAdmin(req.headers.authorization)) ===
            true) {
            const agenciesById = yield agencyRepository.getAgencyById(parseInt(req.params.id));
            res.json({
                success: true,
                payload: agenciesById,
            });
        }
        else {
            return res.status(403).send({
                message: "User account does not have Super Admin permission to Get Agency by Id",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.getAgencyById = getAgencyById;
//Criação de Agencia
const createAgency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o usuario é Super Admin
        if ((yield superAdminServices.isSuperAdmin(req.headers.authorization)) ===
            true) {
            const agencyCreate = yield agencyRepository.createAgency(req.body);
            res.json({
                success: true,
                message: "Cadaster type <Agency> created",
                payload: agencyCreate,
            });
        }
        else {
            return res.status(403).send({
                message: "User account does not have Super Admin permission to create Agency",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.createAgency = createAgency;
//Criação de Usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o usuario é Super Admin
        if ((yield superAdminServices.isSuperAdmin(req.headers.authorization)) ===
            true) {
            //encripitação da senha
            req.body.password = yield userServices.passwordEncrypt(req.body.password);
            const userCreate = yield userRepository.createUser(req.body);
            res.json({
                success: true,
                message: "Cadaster type <User> created",
                payload: userCreate,
            });
        }
        else {
            return res.status(403).send({
                message: "User account does not have Super Admin permission to create User",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.createUser = createUser;
//Criação de cliente
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o usuario é Super Admin
        if ((yield superAdminServices.isSuperAdmin(req.headers.authorization)) ===
            true) {
            const clientCreate = yield clientRepository.createClient(req.body);
            res.json({
                success: true,
                message: "Cadaster type <Client> created",
                payload: clientCreate,
            });
        }
        else {
            return res.status(403).send({
                message: "User account does not have Super Admin permission to create Client",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.createClient = createClient;
//Atualizar agencia por id
const updateAgencyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o usuario é Super Admin
        if ((yield superAdminServices.isSuperAdmin(req.headers.authorization)) ===
            true) {
            //Repository: Busca a agencia com o id fornecido
            const agencyById = yield agencyRepository.getAgencyById(parseInt(req.params.id));
            //Verifica se a agencia solicitada existe
            if (!agencyById) {
                return res.status(402).send({
                    message: "No agency found with this id",
                });
            }
            else {
                const agencyUpdateById = yield agencyRepository.updateAgencyById(parseInt(req.params.id), req.body);
                res.json({
                    success: true,
                    message: "Updated agency",
                    payload: agencyUpdateById,
                });
            }
        }
        else {
            return res.status(403).send({
                message: "User account does not have Super Admin permission to Update agency",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.updateAgencyById = updateAgencyById;
//Atualizar usuario por id
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o usuario é Super Admin
        if ((yield superAdminServices.isSuperAdmin(req.headers.authorization)) ===
            true) {
            //Repository: Busca o usuario com o id fornecido
            const userById = yield userRepository.getUserById(parseInt(req.params.id));
            //Verifica se o usuario solicitado existe
            if (!userById) {
                return res.status(402).send({
                    message: "No User found with this id",
                });
            }
            else {
                const userUpdateById = yield userRepository.updateUserById(parseInt(req.params.id), req.body);
                res.json({
                    success: true,
                    message: "Updated User",
                    payload: userUpdateById,
                });
            }
        }
        else {
            return res.status(403).send({
                message: "User account does not have Super Admin permission to Update User",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.updateUserById = updateUserById;
//Atualizar cliente por id
const updateClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o usuario é Super Admin
        if ((yield superAdminServices.isSuperAdmin(req.headers.authorization)) ===
            true) {
            //Repository: Busca o cliente com o id fornecido
            const clientById = yield clientRepository.getClientById(parseInt(req.params.id));
            //Verifica se o cliente solicitado existe
            if (!clientById) {
                return res.status(402).send({
                    message: "No Client found with this id",
                });
            }
            else {
                const clientUpdateById = yield clientRepository.updateClientById(parseInt(req.params.id), req.body);
                res.json({
                    success: true,
                    message: "Updated User",
                    payload: clientUpdateById,
                });
            }
        }
        else {
            return res.status(403).send({
                message: "User account does not have Super Admin permission to Update Client",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.updateClientById = updateClientById;
//Deletar Agencia por id
const destroyAgencyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o usuario é Super Admin
        if ((yield superAdminServices.isSuperAdmin(req.headers.authorization)) ===
            true) {
            //Repository: Busca a agencia com o id fornecido
            const agencyById = yield agencyRepository.getAgencyById(parseInt(req.params.id));
            //Verifica se a agencia solicitada existe
            if (!agencyById) {
                return res.status(402).send({
                    message: "No agency found with this id",
                });
            }
            else {
                const agencyDeleteById = yield agencyRepository.destroyAgencyById(parseInt(req.params.id));
                res.json({
                    success: true,
                    message: "Deleted Agency",
                    payload: agencyDeleteById,
                });
            }
        }
        else {
            return res.status(403).send({
                message: "User account does not have Super Admin permission to Delete Agency by Id",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.destroyAgencyById = destroyAgencyById;
//Deletar Usuarios por id
const destroyUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o usuario é Super Admin
        if ((yield superAdminServices.isSuperAdmin(req.headers.authorization)) ===
            true) {
            //Repository: Busca o usuario com o id fornecido
            const userById = yield userRepository.getUserById(parseInt(req.params.id));
            //Verifica se o usuario solicitado existe
            if (!userById) {
                return res.status(401).send({
                    message: "No user found with this id",
                });
            }
            else {
                const userDeleteById = yield userRepository.destroyUserById(parseInt(req.params.id));
                res.json({
                    success: true,
                    message: "Deleted User",
                    payload: userDeleteById,
                });
            }
        }
        else {
            return res.status(403).send({
                message: "User account does not have Super Admin permission to Delete User by Id",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.destroyUserById = destroyUserById;
//Deletar Clientes por id
const destroyClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Verifica se o usuario é Super Admin
        if ((yield superAdminServices.isSuperAdmin(req.headers.authorization)) ===
            true) {
            //Repository: Busca o cliente com o id fornecido
            const clientById = yield clientRepository.getClientById(parseInt(req.params.id));
            //Verifica se o cliente solicitado existe
            if (!clientById) {
                return res.status(401).send({
                    message: "No client found with this id",
                });
            }
            else {
                const clientDeleteById = yield clientRepository.destroyClientById(parseInt(req.params.id));
                res.json({
                    success: true,
                    message: "Deleted Client",
                    payload: clientDeleteById,
                });
            }
        }
        else {
            return res.status(403).send({
                message: "User account does not have Super Admin permission to Delete Client by Id",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Server error!",
        });
    }
});
exports.destroyClientById = destroyClientById;
//# sourceMappingURL=superAdmin.controller.js.map