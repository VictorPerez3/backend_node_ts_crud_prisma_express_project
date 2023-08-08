import { z } from "zod";

export const createAgencySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(3, "Name must be more than 3 characters")
      .max(255, "Name must be less than 255 characters"),
  }),
});
