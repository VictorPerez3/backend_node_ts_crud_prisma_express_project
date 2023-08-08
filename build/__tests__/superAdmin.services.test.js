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
const superAdmin_services_1 = require("../services/superAdmin.services");
const authServices = __importStar(require("../services/auth.services"));
const superAdminRepository = __importStar(require("../repositories/superAdmin.repository"));
jest.mock("../services/auth.services", () => ({
    decodedTokenSuperAdmin: jest.fn(),
}));
//Teste 4 - SuperAdmin Services Tests
//Teste 4.1 - isSuperAdmin
describe("isSuperAdmin", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    //Teste 4.1.1 - Verifica se retorna true se o usuario é superadmin
    it("should return true if the user is a super admin", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock do token válido (pode ser qualquer token válido, não estamos verificando a decodificação real aqui)
        const validToken = "validtoken123";
        // Mock das informações do usuário decodificadas a partir do token, onde o usuário é um super admin
        const mockUserToken = { email: "test@example.com", role: "superadmin" };
        // Configura o mock de decodedTokenSuperAdmin para retornar as informações do usuário
        authServices.decodedTokenSuperAdmin.mockResolvedValueOnce(mockUserToken);
        // Mock da função returnSuperAdmin para retornar o objeto do super admin
        const mockSuperAdmin = {
            id: 1,
            name: "Victor Tegrus",
            email: "victortegrus@gmail.com",
            password: "alecandrius@35",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        jest.spyOn(superAdminRepository, "returnSuperAdmin").mockResolvedValueOnce(mockSuperAdmin);
        // Chama a função isSuperAdmin com o token mockado
        const result = yield (0, superAdmin_services_1.isSuperAdmin)(validToken);
        // Verifica se a função retornou true, indicando que o usuário é um super admin
        expect(result).toBe(true);
    }));
    //Teste 4.1.2 - Verifica se retorna false se o usuario nao é superadmin
    it("should return false if the user is not a super admin", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock do token válido (pode ser qualquer token válido, não estamos verificando a decodificação real aqui)
        const validToken = "validtoken123";
        // Mock das informações do usuário decodificadas a partir do token, onde o usuário não é um super admin
        const mockUserToken = { email: "test@example.com", role: "user" };
        // Configura o mock de decodedTokenSuperAdmin para retornar as informações do usuário
        authServices.decodedTokenSuperAdmin.mockResolvedValueOnce(mockUserToken);
        // Mock da função returnSuperAdmin para retornar null (usuário não é um super admin)
        jest.spyOn(superAdminRepository, "returnSuperAdmin").mockResolvedValueOnce(null);
        // Chama a função isSuperAdmin com o token mockado
        const result = yield (0, superAdmin_services_1.isSuperAdmin)(validToken);
        // Verifica se a função retornou false, indicando que o usuário não é um super admin
        expect(result).toBe(false);
    }));
    //Teste 4.1.3 - Verifica se retorna false se o token é invalido
    it("should return false if the token is invalid or not provided", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock do token inválido (ou não fornecido)
        const invalidToken = "invalidtoken123";
        // Configura o mock de decodedTokenSuperAdmin para retornar null (token inválido ou não fornecido)
        authServices.decodedTokenSuperAdmin.mockResolvedValueOnce(null);
        // Chama a função isSuperAdmin com o token mockado
        const result = yield (0, superAdmin_services_1.isSuperAdmin)(invalidToken);
        // Verifica se a função retornou false, indicando que o token é inválido ou não fornecido
        expect(result).toBe(false);
    }));
});
//# sourceMappingURL=superAdmin.services.test.js.map