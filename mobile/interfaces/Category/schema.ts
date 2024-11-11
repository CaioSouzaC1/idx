import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(3, "A Categoria precisa ter no mínimo 3 caracteres."),
  description: z.string().optional(),
  thumb: z.instanceof(File),
});

export type CreateCategoryType = z.infer<typeof createCategorySchema>;
