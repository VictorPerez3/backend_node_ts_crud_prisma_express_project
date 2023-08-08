"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSuperAdminSchema = void 0;
const zod_1 = require("zod");
exports.loginSuperAdminSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email address is required" })
            .email("Invalid email address"),
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .min(8, "Password must be more than 8 characters"),
    }),
});
//# sourceMappingURL=superAdmin.schemas.js.map