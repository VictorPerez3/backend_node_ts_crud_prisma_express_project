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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenExpired = exports.decodedTokenSuperAdmin = exports.decodedTokenWithAgency = exports.tokenGenerated = exports.validateTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository = __importStar(require("../repositories/user.repository"));
const authRepository = __importStar(require("../repositories/auth.repository"));
//Verifica e valide o token (valid;invalid;blacklist)
const validateTokenService = (tokenHeaders) => __awaiter(void 0, void 0, void 0, function* () {
    const replace = tokenHeaders.replace("Bearer ", "");
    const tokenBlacklist = yield authRepository.getTokenInBlacklist(replace);
    if (!tokenBlacklist) {
        if (jsonwebtoken_1.default.verify(replace, String(process.env.TOKEN_KEY)) === null) {
            return "invalid";
        }
        else {
            return "valid";
        }
    }
    else {
        return "black list token";
    }
});
exports.validateTokenService = validateTokenService;
//Gera um token de autenticação com jwt
const tokenGenerated = (userAuth) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenGener = jsonwebtoken_1.default.sign({
        id: userAuth.id,
        email: userAuth.email,
        name: userAuth.name,
        role: userAuth.role,
        agency: userAuth.agency,
    }, 
    //O token é assinado usando uma chave secreta definida na variável de ambiente process.env.TOKEN_KEY.
    String(process.env.TOKEN_KEY), {
        //Token expira em 24h
        expiresIn: "24h",
    });
    return tokenGener;
});
exports.tokenGenerated = tokenGenerated;
//Decodificar token com agencia
const decodedTokenWithAgency = (reqHeaderAuthorization) => __awaiter(void 0, void 0, void 0, function* () {
    if (reqHeaderAuthorization) {
        const replace = reqHeaderAuthorization.replace("Bearer ", "");
        const userInfo = jsonwebtoken_1.default.verify(replace, String(process.env.TOKEN_KEY));
        const userInfoWithAgency = yield userRepository.getUserByEmail(userInfo.email);
        if (userInfoWithAgency) {
            // Retorna objeto User do token
            return userInfoWithAgency;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
});
exports.decodedTokenWithAgency = decodedTokenWithAgency;
//Decodificar token de SuperAdmin
const decodedTokenSuperAdmin = (reqHeaderAuthorization) => __awaiter(void 0, void 0, void 0, function* () {
    if (reqHeaderAuthorization) {
        const replace = reqHeaderAuthorization.replace("Bearer ", "");
        try {
            const userInfo = jsonwebtoken_1.default.verify(replace, String(process.env.TOKEN_KEY));
            return userInfo;
        }
        catch (error) {
            // Caso ocorra um erro ao verificar o token, retorna null
            return null;
        }
    }
    else {
        return null;
    }
});
exports.decodedTokenSuperAdmin = decodedTokenSuperAdmin;
// Função para verificar se o token JWT está expirado
const isTokenExpired = (reqHeaderAuthorization) => {
    try {
        const replace = reqHeaderAuthorization.replace("Bearer ", "");
        const solvedToken = jsonwebtoken_1.default.verify(replace, String(process.env.TOKEN_KEY));
        // Obtém o timestamp atual em segundos
        const currentTimestamp = Math.floor(Date.now() / 1000);
        // Verifica se a data de expiração (exp) está presente e é menor do que o timestamp atual
        if (solvedToken.exp && solvedToken.exp < currentTimestamp) {
            // O token está expirado
            return true;
        }
        // O token não está expirado
        return false;
    }
    catch (error) {
        return true; // Consideramos o token como expirado em caso de erro
    }
};
exports.isTokenExpired = isTokenExpired;
//# sourceMappingURL=auth.services.js.map