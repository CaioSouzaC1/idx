import { z } from "zod";

export const createBookSchema = z.object({
  title: z
    .string()
    .min(8, "O título do livro precisa ter no mínimo 8 caracteres."),
  synopsis: z
    .string()
    .min(40, "A sinopse precisa ter no mínimo 40 caracteres."),
  thumb: z.instanceof(File),
  pdf: z.instanceof(File).refine((file) => file.type === "application/pdf", {
    message: "O arquivo deve ser um PDF",
  }),
  redirect_url: z.string().optional(),
  category_id: z.string().min(1, "Selecione a categoria"),
});

export type CreateBookType = z.infer<typeof createBookSchema>;
