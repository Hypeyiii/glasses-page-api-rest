import { z } from "zod";

const userSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
  username: z.string().optional(),
  role: z.string().optional(),
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}
