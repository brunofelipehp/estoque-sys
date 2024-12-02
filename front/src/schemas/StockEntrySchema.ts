import { z } from 'zod';

export const stockEntryFormSchema = z.object({
  id: z.string().uuid(),
  name: z.object({
    value: z.string(),
    label: z.string(),
  }),
  costPrice: z
    .string()
    .min(1, { message: 'O Valor deve ser  maior que  0' })
    .transform((value) => parseFloat(value)),
  salePrice: z
    .string()
    .min(1, { message:  'O Valor deve ser  maior que  0' })
    .transform((value) => parseFloat(value)),
  quantity: z
    .string()
    .min(1, { message:  'A quantidade deve ser  maior que  0' })
    .transform((value) => Number(value)),
  type: z.enum(['Entrada', 'Saída'], {
    errorMap: () => ({
      message: 'O tipo de movimentação deve ser "entrada" ou "saida".',
    }),
  }),
});

export type SchemaStockEntry = z.infer<typeof stockEntryFormSchema>;

export interface stockEntriesProps {
  id: string;
  productId: string;
  productName: string;
  category: string;
  supplier: string;
  costPrice: number;
  salePrice: number;
  quantity: number;
  type: string;
  totalCost: number;
  totalSale: number;
}
