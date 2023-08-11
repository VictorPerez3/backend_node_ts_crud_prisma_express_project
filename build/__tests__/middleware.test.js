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
const zod_1 = require("zod");
const validate_1 = require("../middlewares/validate");
const agency_schemas_1 = require("../schemas/agency.schemas");
const superAdmin_schemas_1 = require("../schemas/superAdmin.schemas");
const client_schemas_1 = require("../schemas/client.schemas");
const user_schemas_1 = require("../schemas/user.schemas");
const auth_1 = require("../middlewares/auth");
const authServices = __importStar(require("../services/auth.services"));
const app_1 = require("../app");
let server;
jest.mock("../services/auth.services");
//Teste 1 - Middleware
//Teste 1.1 - Validate
describe("validate middleware", () => {
    beforeAll(() => {
        server = (0, app_1.startServer)(process.env.TEST_PORT);
    });
    afterAll(() => {
        server.close();
    });
    // Mock dos objetos Request, Response e NextFunction
    const mockRequest = {};
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const mockNextFunction = jest.fn();
    //Teste 1.1.1 - createAgencySchema - Dado Valido
    it("createAgencySchema is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = { nome: "teste" };
        yield (0, validate_1.validate)(agency_schemas_1.createAgencySchema)(mockRequest, mockResponse, mockNextFunction);
    }));
    //Teste 1.1.2 - createAgencySchema - Erro 400: Dado invalido
    it("createAgencySchema return 400 if data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = { nome: "t" }; //erro
        // Forçar um erro para simular dados inválidos
        jest.spyOn(agency_schemas_1.createAgencySchema, "parse").mockImplementation(() => {
            throw new zod_1.ZodError([]);
        });
        yield (0, validate_1.validate)(agency_schemas_1.createAgencySchema)(mockRequest, mockResponse, mockNextFunction);
        //Response em caso de erro
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Bad Request!",
            errors: expect.any(Array),
        });
    }));
    //Teste 1.1.3 - loginSuperAdminSchema - Dado Valido
    it("loginSuperAdminSchema is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = {
            email: "teste@gmail.com",
            password: "teste6789",
        };
        yield (0, validate_1.validate)(superAdmin_schemas_1.loginSuperAdminSchema)(mockRequest, mockResponse, mockNextFunction);
    }));
    //Teste 1.1.4 - loginSuperAdminSchema - Erro 400: Dado invalido
    it("loginSuperAdminSchema return 400 if data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = {
            email: "teste@gmail.com",
            password: "teste", //erro
        };
        // Forçar um erro para simular dados inválidos
        jest.spyOn(superAdmin_schemas_1.loginSuperAdminSchema, "parse").mockImplementation(() => {
            throw new zod_1.ZodError([]);
        });
        yield (0, validate_1.validate)(superAdmin_schemas_1.loginSuperAdminSchema)(mockRequest, mockResponse, mockNextFunction);
        //Response em caso de erro
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Bad Request!",
            errors: expect.any(Array),
        });
    }));
    //Teste 1.1.5 - createClientSchema - Dado Valido
    it("createClientSchema is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = {
            nome: "teste",
            email: "teste@gmail.com",
            agencyId: "1",
        };
        yield (0, validate_1.validate)(client_schemas_1.createClientSchema)(mockRequest, mockResponse, mockNextFunction);
    }));
    //Teste 1.1.6 - createClientSchema - Erro 400: Dado invalido
    it("createClientSchema return 400 if data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = {
            nome: "teste",
            email: "teste@gmail.com",
            agencyId: "teste", //erro
        };
        // Forçar um erro para simular dados inválidos
        jest.spyOn(client_schemas_1.createClientSchema, "parse").mockImplementation(() => {
            throw new zod_1.ZodError([]);
        });
        yield (0, validate_1.validate)(client_schemas_1.createClientSchema)(mockRequest, mockResponse, mockNextFunction);
        //Response em caso de erro
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Bad Request!",
            errors: expect.any(Array),
        });
    }));
    //Teste 1.1.7 - createUserSchema - Dado Valido
    it("createUserSchema is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = {
            nome: "teste",
            email: "teste@gmail.com",
            password: "senhateste",
            agencyId: "1",
        };
        yield (0, validate_1.validate)(user_schemas_1.createUserSchema)(mockRequest, mockResponse, mockNextFunction);
    }));
    //Teste 1.1.8 - createUserSchema - Erro 400: Dado invalido
    it("createUserSchema return 400 if data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = {
            nome: "teste",
            email: "teste@gmail.com",
            password: "senhateste",
            agencyId: "teste", //erro
        };
        // Forçar um erro para simular dados inválidos
        jest.spyOn(user_schemas_1.createUserSchema, "parse").mockImplementation(() => {
            throw new zod_1.ZodError([]);
        });
        yield (0, validate_1.validate)(user_schemas_1.createUserSchema)(mockRequest, mockResponse, mockNextFunction);
        //Response em caso de erro
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Bad Request!",
            errors: expect.any(Array),
        });
    }));
    //Teste 1.1.9 - loginUserSchema - Dado Valido
    it("loginUserSchema is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = {
            email: "teste@gmail.com",
            password: "senhateste",
        };
        yield (0, validate_1.validate)(user_schemas_1.loginUserSchema)(mockRequest, mockResponse, mockNextFunction);
    }));
    //Teste 1.1.10 - loginUserSchema - Erro 400: Dado invalido
    it("loginUserSchema return 400 if data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = {
            email: "teste@gmail.com",
            password: "teste", //erro
        };
        // Forçar um erro para simular dados inválidos
        jest.spyOn(user_schemas_1.loginUserSchema, "parse").mockImplementation(() => {
            throw new zod_1.ZodError([]);
        });
        yield (0, validate_1.validate)(user_schemas_1.loginUserSchema)(mockRequest, mockResponse, mockNextFunction);
        //Response em caso de erro
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Bad Request!",
            errors: expect.any(Array),
        });
    }));
});
//Teste 1.2 - verifyToken
describe("verifyToken", () => {
    const mockRequest = {};
    const mockResponse = {};
    const mockNextFunction = jest.fn();
    afterEach(() => {
        jest.clearAllMocks();
    });
    //Teste 1.2.1 - Verifica se retorna 401 caso o token não seja fornecido
    it("should return 401 if no token is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        // Configuração do mock para o cenário de token ausente
        mockRequest.headers = { authorization: undefined };
        const mockStatusFn = jest.fn().mockReturnThis();
        const mockSendFn = jest.fn();
        mockResponse.status = mockStatusFn;
        mockResponse.send = mockSendFn;
        yield (0, auth_1.verifyToken)(mockRequest, mockResponse, mockNextFunction);
        // Verifica se a função de status foi chamada com 401
        expect(mockStatusFn).toHaveBeenCalledWith(401);
        // Verifica se a função de send foi chamada com a mensagem de erro correta
        expect(mockSendFn).toHaveBeenCalledWith({ message: "Required Token" });
        // Verifica se a função next não foi chamada
        expect(mockNextFunction).not.toHaveBeenCalled();
    }));
    //Teste 1.2.2 - Verifica se retorna 401 caso o token seja invalido
    it("should return 401 if token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        // Configuração do mock para o cenário de token inválido
        const mockToken = "invalidtoken123";
        mockRequest.headers = { authorization: `Bearer ${mockToken}` };
        authServices.validateTokenService.mockResolvedValueOnce("invalid");
        const mockStatusFn = jest.fn().mockReturnThis();
        const mockSendFn = jest.fn();
        mockResponse.status = mockStatusFn;
        mockResponse.send = mockSendFn;
        yield (0, auth_1.verifyToken)(mockRequest, mockResponse, mockNextFunction);
        // Verifica se a função de status foi chamada com 401
        expect(mockStatusFn).toHaveBeenCalledWith(401);
        // Verifica se a função de send foi chamada com a mensagem de erro correta
        expect(mockSendFn).toHaveBeenCalledWith({ message: "Invalid Credentials" });
        // Verifica se a função next não foi chamada
        expect(mockNextFunction).not.toHaveBeenCalled();
    }));
    //Teste 1.2.3 - Verifica se retorna 401 caso o token esta na blacklist
    it("should return 401 if token is in the blacklist", () => __awaiter(void 0, void 0, void 0, function* () {
        // Configuração do mock para o cenário de token na blacklist
        const mockToken = "blacklisttoken123";
        mockRequest.headers = { authorization: `Bearer ${mockToken}` };
        authServices.validateTokenService.mockResolvedValueOnce("black list token");
        const mockStatusFn = jest.fn().mockReturnThis();
        const mockSendFn = jest.fn();
        mockResponse.status = mockStatusFn;
        mockResponse.send = mockSendFn;
        yield (0, auth_1.verifyToken)(mockRequest, mockResponse, mockNextFunction);
        // Verifica se a função de status foi chamada com 401
        expect(mockStatusFn).toHaveBeenCalledWith(401);
        // Verifica se a função de send foi chamada com a mensagem de erro correta
        expect(mockSendFn).toHaveBeenCalledWith({ message: "Login required" });
        // Verifica se a função next não foi chamada
        expect(mockNextFunction).not.toHaveBeenCalled();
    }));
});
//# sourceMappingURL=middleware.test.js.map