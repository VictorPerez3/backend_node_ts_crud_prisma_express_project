import { object, string, TypeOf, z } from "zod";

//user.schemas: esquemas de validação de dados em formato de objetos

//indica se o usuário é um administrador ou não
enum RoleEnumType {
  ADMIN = "admin",
  USER = "user",
}

//Criar usuario: esquema de validação para o objeto que representa
//os dados de criação de um usuário
export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(3, "Name must be more than 3 characters")
      .max(255, "Name must be less than 255 characters"),

    email: z
      .string({ required_error: "Email address is required" })
      .min(3, "Email must be more than 3 characters")
      .email("Invalid email address"),

    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),

    role: z.optional(z.nativeEnum(RoleEnumType)),
  }),
});

//Login de usuario:validação para o objeto que representa
//os dados de login de um usuário
export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email address is required" })
      .email("Invalid email address"),

    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be more than 8 characters"),
  }),
});
