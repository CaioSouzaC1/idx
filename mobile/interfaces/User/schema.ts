import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({
      message: "E-mail obrigatório.",
    })
    .min(1, "E-mail obrigatório.")
    .email("Formato de e-mail incorreto.")
    .transform((email) => email.toLocaleLowerCase()),
  password: z
    .string({
      message: "Senha obrigatória.",
    })
    .min(8, "A senha precisa ter no mínimo 8 caracteres."),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export const registerFormSchema = loginFormSchema.extend({
  name: z
    .string({
      message: "Nome obrigatório.",
    })
    .min(1, "Nome obrigatório."),
});

export type RegisterFormType = z.infer<typeof registerFormSchema>;
