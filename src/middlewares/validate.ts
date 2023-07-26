import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

//middleware para a validação de dados recebidos em uma
//requisição HTTP usando a biblioteca Zod.

export const validate =
  //tentativa de validação dos dados recebidos na requisição,
  //utilizando o esquema de validação definido em user.schemas


    (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({
          params: req.params,
          query: req.query,
          body: req.body,
        });

        next();
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            status: "Bad Request!",
            errors: error.errors,
          });
        }
        next(error);
      }
    };
