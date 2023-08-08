import { z } from "zod";

export const loginSuperAdminSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email address is required" })
      .email("Invalid email address"),

    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be more than 8 characters"),
  }),
});
