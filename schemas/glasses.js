import { z } from "zod";

const glassesSchema = z.object({
  brand: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  genre: z.string().optional(),
  shape: z.string().optional(),
  color: z.string().optional(),
  price: z.number().optional(),
  image: z.string().optional(),
  quantity: z.number().optional(),
  stock: z.number().optional(),
});

export function validateGlasses(input) {
  return glassesSchema.safeParse(input);
}

export function validatePartialGlasses(input) {
  return glassesSchema.partial().safeParse(input);
}
