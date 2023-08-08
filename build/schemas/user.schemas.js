"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
//user.schemas: esquemas de validação de dados de usuarios em formato de objetos
//indica se o usuário é um administrador ou não
var RoleEnumType;
(function (RoleEnumType) {
    RoleEnumType["ADMIN"] = "admin";
    RoleEnumType["USER"] = "user";
})(RoleEnumType || (RoleEnumType = {}));
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: "Name is required" })
            .min(3, "Name must be more than 3 characters")
            .max(255, "Name must be less than 255 characters"),
        email: zod_1.z
            .string({ required_error: "Email address is required" })
            .min(3, "Email must be more than 3 characters")
            .email("Invalid email address"),
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .min(8, "Password must be more than 8 characters")
            .max(32, "Password must be less than 32 characters"),
        agencyId: zod_1.z
            .number({ required_error: "Agency ID is required" })
            .int("Agency ID must be an integer")
            .positive("Agency ID must be a positive number"),
        role: zod_1.z.optional(zod_1.z.nativeEnum(RoleEnumType)),
    }),
});
exports.loginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email address is required" })
            .email("Invalid email address"),
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .min(8, "Password must be more than 8 characters"),
    }),
});
//# sourceMappingURL=user.schemas.js.map