import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, { message: '*Digite o nome do produto' }),
  category: z.string().min(1, { message: '*Digite  a categoria do produto' }),
  description: z.string().min(1, { message: '*Digite a descrição' }),
  color: z.string().min(1, { message: '*Digite a cor do produto' }),
  size: z.string().optional(),
  image: z
    .coerce
    .string()
    .min(1, { message: '*Selecione uma imagem para o produto'})
    .url({ message: '* Por favor, insira uma URL válida para a imagem' }),
});

export type ProductSchema = z.infer<typeof createProductSchema>;

export interface getProductSchema extends ProductSchema {
  id: string,
}