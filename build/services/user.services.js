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
exports.passwordEncrypt = exports.verifyPasswordEncryptUpdate = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//caso atualize a senha -> encripitação da senha
const verifyPasswordEncryptUpdate = (passwordBody) => __awaiter(void 0, void 0, void 0, function* () {
    if (passwordBody) {
        return yield (0, exports.passwordEncrypt)(passwordBody);
    }
    else {
        return null;
    }
});
exports.verifyPasswordEncryptUpdate = verifyPasswordEncryptUpdate;
//encripitação da senha
const passwordEncrypt = (passwordBody) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = bcryptjs_1.default.hash(passwordBody, 10);
    return yield hashPassword;
});
exports.passwordEncrypt = passwordEncrypt;
//# sourceMappingURL=user.services.js.map