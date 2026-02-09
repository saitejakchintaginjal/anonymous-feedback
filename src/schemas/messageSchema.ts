import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "Content must be atleast 10 characters")
    .max(100, "Content must be maximum 300 characters"),
});
