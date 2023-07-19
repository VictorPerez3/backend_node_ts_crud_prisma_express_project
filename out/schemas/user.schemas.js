import { object, string } from "zod";
//esquemas de validação de dados em formato de objetos
// enum RoleEnumType {
//   ADMIN = 'admin',
//   USER = 'user',
// }
//Criar usuario: esquema de validação para o objeto que representa
//os dados de criação de um usuário
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    })
      .min(3, "Name must be more than 3 characters")
      .max(255, "Name must be less than 255 characters"),
    email: string({
      required_error: "Email address is required",
    })
      .min(3, "Email must be more than 3 characters")
      .email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string({
      required_error: "Please confirm your password",
    }),
    // role: z.optional(z.nativeEnum(RoleEnumType)),
  })
    //validação personalizada, verificando se a senha
    //e a confirmação da senha são iguais.
    .refine((data) => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Passwords do not match",
    }),
});
//Login de usuario:validação para o objeto que representa
//os dados de login de um usuário
export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Invalid email or password"),
  }),
});
//# sourceMappingURL=user.schemas.js.map
