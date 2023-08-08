"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAgencySchema = void 0;
const zod_1 = require("zod");
exports.createAgencySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: "Name is required" })
            .min(3, "Name must be more than 3 characters")
            .max(255, "Name must be less than 255 characters"),
    }),
});
//# sourceMappingURL=agency.schemas.js.map