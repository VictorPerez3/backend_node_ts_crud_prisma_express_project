"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientSchema = void 0;
const zod_1 = require("zod");
//client.schemas: esquemas de validação de dados de clientes em formato de objetos
exports.createClientSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: "Name is required" })
            .min(3, "Name must be more than 3 characters")
            .max(255, "Name must be less than 255 characters"),
        email: zod_1.z
            .string({ required_error: "Email address is required" })
            .min(3, "Email must be more than 3 characters")
            .email("Invalid email address"),
        agencyId: zod_1.z
            .number({ required_error: "Agency ID is required" })
            .int("Agency ID must be an integer")
            .positive("Agency ID must be a positive number"),
    }),
});
//# sourceMappingURL=client.schemas.js.map