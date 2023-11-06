import { z } from "zod";

//client.schemas: esquemas de validação de dados de clientes em formato de objetos

export const createClientSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(3, "Name must be more than 3 characters")
      .max(255, "Name must be less than 255 characters"),

    email: z
      .string({ required_error: "Email address is required" })
      .min(3, "Email must be more than 3 characters")
      .email("Invalid email address"),

      agencyId: z
      .number({ required_error: "Agency ID is required" })
      .int("Agency ID must be an integer")
      .positive("Agency ID must be a positive number"),
  }),
});
