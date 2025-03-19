import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, { message: '*Digite o nome do produto' }),
  category: z.string().min(1, { message: '*Digite  a categoria do produto' }),
  description: z.string().min(1, { message: '*Digite a descrição' }),
  color: z.string().min(1, { message: '*Digite a cor do produto' }),
  size: z.string().optional(),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), "Apenas arquivos de imagem são permitidos"),
});

export type ProductSchema = z.infer<typeof createProductSchema>;

export interface getProductSchema extends ProductSchema {
  id: string,
}


export const filterProductFormSchema = z
  .object({
    name: z.string().optional(),
    type: z
      .enum(['IN', 'OUT'], {
        errorMap: () => ({
          message: 'O tipo de movimentação deve ser "entrada" ou "saida".',
        }),
      })
      .optional(),
  })
  .refine((data) => data.name || data.type, {
    message: 'Pelo menos um campo (nome ou tipo) deve ser preenchido.',
    path: ['name', 'type'],
  });

export type FilterProducts = z.infer<typeof filterProductFormSchema>;
