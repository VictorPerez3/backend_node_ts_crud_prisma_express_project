"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
//esquemas de validação de dados em formato de objetos
//Criar usuario: esquema de validação para o objeto que representa 
//os dados de criação de um usuário
//indica se o usuário é um administrador ou não
var RoleEnumType;
(function (RoleEnumType) {
    RoleEnumType["ADMIN"] = "admin";
    RoleEnumType["USER"] = "user";
})(RoleEnumType || (RoleEnumType = {}));
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        })
            .min(3, 'Name must be more than 3 characters')
            .max(255, 'Name must be less than 255 characters'),
        email: zod_1.z.string({
            required_error: 'Email address is required',
        })
            .min(3, 'Email must be more than 3 characters')
            .email('Invalid email address'),
        password: zod_1.z.string({
            required_error: 'Password is required',
        })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        role: zod_1.z.optional(zod_1.z.nativeEnum(RoleEnumType)),
    })
});
//Login de usuario:validação para o objeto que representa 
//os dados de login de um usuário
exports.loginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }).min(8, 'Invalid email or password'),
    }),
});
//# sourceMappingURL=user.schemas.js.map