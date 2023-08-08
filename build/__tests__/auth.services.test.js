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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_services_1 = require("../services/auth.services");
jest.mock("../repositories/auth.repository");
jest.mock("jsonwebtoken", () => ({
    verify: jest.fn(),
    sign: jest.fn(),
}));
jest.mock("../repositories/user.repository", () => ({
    getUserByEmail: jest.fn(),
}));
//Teste 3 - Auth Services Tests
//Teste 3.1 - tokenGenerated
describe("tokenGenerated", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    //Teste 3.1.1 - Verifica se poder ser gerado um token valido com um objeto userAuth
    it("should generate a valid token with userAuth data", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock das informações de usuário
        const userAuth = {
            id: 1,
            email: "test@example.com",
            name: "Test User",
            role: "admin",
            agency: "Test Agency",
        };
        // Mock da Token Key
        const mockSecretKey = String(process.env.TOKEN_KEY);
        // Espiona a função jwt.sign para verificar se ela foi chamada corretamente
        jest
            .spyOn(jsonwebtoken_1.default, "sign")
            .mockImplementationOnce((payload, secret, options) => {
            expect(payload).toEqual({
                id: userAuth.id,
                email: userAuth.email,
                name: userAuth.name,
                role: userAuth.role,
                agency: userAuth.agency,
            });
            expect(secret).toBe(mockSecretKey);
            expect(options).toEqual({
                expiresIn: "24h",
            });
            // Retorne um token falso para o teste
            return "faketoken123";
        });
        // Chama a função tokenGenerated com os dados de usuário e a chave secreta de teste
        const token = yield (0, auth_services_1.tokenGenerated)(userAuth);
        // Verifica se a função jwt.sign foi chamada
        expect(jsonwebtoken_1.default.sign).toHaveBeenCalledTimes(1);
        // Verifica se a função retornou o token falso gerado
        expect(token).toBe("faketoken123");
    }));
});
//Teste 3.2 - decodedTokenSuperAdmin
describe("decodedTokenSuperAdmin", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    //Teste 3.2.1 - Verifica se retorna o usuario a partir do token valido
    it("should return decoded user info if valid token is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock das informações do usuário decodificadas
        const mockUserInfo = {
            id: 1,
            email: "test@example.com",
            name: "Test User",
            role: "admin",
            agency: "Test Agency",
        };
        // Mock do token
        const mockToken = jsonwebtoken_1.default.sign(mockUserInfo, String(process.env.TOKEN_KEY), {
            expiresIn: "24h",
        });
        // Espiona a função jwt.verify para verificar se ela foi chamada corretamente
        jest.spyOn(jsonwebtoken_1.default, "verify").mockReturnValueOnce(mockUserInfo);
        // Chama a função decodedTokenSuperAdmin com o token mockado
        const result = yield (0, auth_services_1.decodedTokenSuperAdmin)(`Bearer ${mockToken}`);
        // Verifica se a função retornou as informações do usuário decodificadas
        expect(result).toEqual(mockUserInfo);
    }));
    //Teste 3.2.2 - Verifica se retorna null caso o token nao seja fornecido
    it("should return null if no token is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        // Chama a função decodedTokenSuperAdmin sem nenhum token
        const resultNoToken = yield (0, auth_services_1.decodedTokenSuperAdmin)(null);
        // Verifica se a função retornou null
        expect(resultNoToken).toBeNull();
    }));
    //Teste 3.2.3 - Verifica se retorna null caso o token seja invalido
    it("should return null if invalid token is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock do token inválido
        const mockInvalidToken = "invalidtoken123";
        // Chama a função decodedTokenSuperAdmin com o token inválido
        let resultInvalidToken = yield (0, auth_services_1.decodedTokenSuperAdmin)(`Bearer ${mockInvalidToken}`);
        if (resultInvalidToken === undefined) {
            return (resultInvalidToken = null);
        }
        if (resultInvalidToken === null) {
            return;
        }
        // Verifica se a função retornou null
        expect(resultInvalidToken).toBeNull();
    }));
});
//Teste 3.3 - isTokenExpired
describe("isTokenExpired", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    //Teste 3.3.1 - Verifica se retorna true se o token estiver expirado
    it("should return true if the token is expired", () => {
        // Mock do token expirado (data de expiração no passado)
        const expiredToken = jsonwebtoken_1.default.sign({ exp: Math.floor(Date.now() / 1000) - 3600 }, "secret");
        // Configura o mock de jwt.verify para retornar o token expirado
        jsonwebtoken_1.default.verify.mockImplementationOnce(() => {
            throw new jsonwebtoken_1.default.TokenExpiredError("jwt expired", new Date());
        });
        // Chama a função isTokenExpired com o token mockado
        const result = (0, auth_services_1.isTokenExpired)(`Bearer ${expiredToken}`);
        // Verifica se a função retornou true, indicando que o token está expirado
        expect(result).toBe(true);
    });
    //Teste 3.3.2 - Verifica se retorna false se o token não estiver expirado
    it("should return false if the token is not expired", () => {
        // Mock do token válido (data de expiração no futuro)
        const validToken = jsonwebtoken_1.default.sign({ exp: Math.floor(Date.now() / 1000) + 3600 }, "secret");
        // Configura o mock de jwt.verify para retornar o token válido
        jsonwebtoken_1.default.verify.mockReturnValueOnce({});
        // Chama a função isTokenExpired com o token mockado
        const result = (0, auth_services_1.isTokenExpired)(`Bearer ${validToken}`);
        // Verifica se a função retornou false, indicando que o token não está expirado
        expect(result).toBe(false);
    });
    //Teste 3.3.3 - Verifica se retorna true se houver mensagem de erro (token expirado)
    it("should return true if there is an error verifying the token", () => {
        // Mock do token malformado (gera um erro ao verificar)
        const malformedToken = "invalidtoken123";
        // Configura o mock de jwt.verify para lançar um erro (token malformado)
        jsonwebtoken_1.default.verify.mockImplementationOnce(() => {
            throw new jsonwebtoken_1.default.JsonWebTokenError("jwt malformed");
        });
        // Chama a função isTokenExpired com o token mockado
        const result = (0, auth_services_1.isTokenExpired)(`Bearer ${malformedToken}`);
        // Verifica se a função retornou true, indicando que o token está expirado (devido ao erro)
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=auth.services.test.js.map