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
exports.validate = void 0;
const zod_1 = require("zod");
//middleware para a validação de dados recebidos em uma 
//requisição HTTP usando a biblioteca Zod.
const validate = 
//tentativa de validação dos dados recebidos na requisição, 
//utilizando o esquema de validação definido em user.schemas
(schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parse({
            params: req.params,
            query: req.query,
            body: req.body,
        });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                status: 'Bad Request!',
                errors: error.errors,
            });
        }
        next(error);
    }
});
exports.validate = validate;
//# sourceMappingURL=validate.js.map