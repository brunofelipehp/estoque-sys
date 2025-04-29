import { z } from "zod";

export const loginUserSchema =  z.object({
  email: z
    .string()
    .min(1, { message: "*Digite o e-mail" })
    .email({ message: "*Digite um e-mail válido" }),
  password: z.string().min(1, { message: "*Digite a senha" }),
})

export type LoginSchema = z.infer<typeof loginUserSchema>