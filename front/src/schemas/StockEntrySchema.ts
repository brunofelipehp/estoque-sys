import { z } from 'zod';

// export const stockEntryFormSchema = z.object({
//   id: z.string().uuid(),
//   name: z.object({
//     value: z.string(),
//     label: z.string(),
//   }),
//   costPrice: z.coerce
//   .number()
//   .min(1, 'O preço de custo deve ser maior que 0')
//   .positive('O preço de custo deve ser maior que 0'),
//   salePrice: z.coerce
//   .number()
//   .min(1, 'O preço de venda deve ser maior que 0')
//   .positive('O preço de venda deve ser maior que 0'),
//  quantity: z.coerce
//   .number()
//   .min(1, 'A quantidade deve ser maior')
//   .positive('A quantidade deve ser maior que 0'),
//   type: z.enum(['Entrada', 'Saída'], {
//     errorMap: () => ({
//       message: 'O tipo de movimentação deve ser "entrada" ou "saida".',
//     }),
//   }),
// });


export const stockEntryFormSchema = z.object({
  name: z.object({
    value: z.string({message: "Selecione o produto"}),
    label: z.string(),
  }),
  costPrice: z.coerce
    .number({
      required_error: 'O preço de custo é obrigatório',
      invalid_type_error: 'O preço de custo deve ser um número',
    })
    .min(0.01, { message: 'O preço de custo deve ser maior que 0' }),
  salePrice: z.coerce
    .number({
      required_error: 'O preço de venda é obrigatório',
      invalid_type_error: 'O preço de venda deve ser um número',
    })
    .min(0.01, { message: 'O preço de venda deve ser maior que 0' }),
  quantity: z.coerce
    .number({
      required_error: 'A quantidade é obrigatória',
      invalid_type_error: 'A quantidade deve ser um número',
    })
    .min(1, { message: 'A quantidade deve ser maior que 0' }),
  type: z.enum(['Entrada', 'Saída'], {
    errorMap: () => ({
      message: 'O tipo de movimentação deve ser "Entrada" ou "Saída"',
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
