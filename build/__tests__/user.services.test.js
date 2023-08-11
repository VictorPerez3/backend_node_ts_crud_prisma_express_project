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
const user_services_1 = require("../services/user.services");
const app_1 = require("../app");
let server;
//Teste 2 - User Services Tests
//Teste 2.1 - verifyPasswordEncryptUpdate/passwordEncrypt
describe("verifyPasswordEncryptUpdate", () => {
    beforeAll(() => {
        server = (0, app_1.startServer)(process.env.TEST_PORT);
    });
    afterAll(() => {
        server.close();
    });
    //Teste 2.1 - Verifica se o password foi hasheado
    it("should hash the password if provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const password = "password";
        const hashedPassword = yield (0, user_services_1.verifyPasswordEncryptUpdate)(password);
        // Verifica se a senha encriptada é uma string
        expect(typeof hashedPassword).toBe("string");
        // Verifica se a senha encriptada não é igual à senha original
        expect(hashedPassword).not.toBe(password);
    }));
    //Teste 2.2 - Verifica se retora null quando o password não é fornecido
    it("should return null if no password is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield (0, user_services_1.verifyPasswordEncryptUpdate)("");
        // Verifica se o resultado é null
        expect(hashedPassword).toBeNull();
    }));
});
//# sourceMappingURL=user.services.test.js.map