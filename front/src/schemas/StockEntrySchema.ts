import { z } from 'zod';

export const stockEntryFormSchema = z.object({
  name: z.object({
    value: z.string({message: "*Selecione o produto"}).min(1, {message: "*Selecione o produto que deseja dar entra ou saida no estoque"}),
    label: z.string({message: "*Selecione o produto"}),
  }),
  price: z.coerce
    .number({
      required_error: '*O preço de custo é obrigatório',
      invalid_type_error: '*O preço de custo deve ser maior que 0',
    })
    .min(0.01, { message: '*O preço de custo deve ser maior que 0' })
    .positive({message:  '*O preço de venda deve ser maior que 0'}),
   
  quantity: z.coerce
    .number({
      required_error: '*A quantidade é obrigatória',
      invalid_type_error: '*O preço de custo deve ser maior que 0',
    })
    .min(1, { message: '*A quantidade deve ser maior que 0' })
    .int({message: '*Quantidade deve ser um numero inteiro não  pode conter " virgula , ou ponteiro ."'})
    .positive({message:   '*A quantidade deve ser maior que 0'}),
  type: z.enum(['IN', 'OUT'], {
    errorMap: () => ({
      message: '*O tipo de movimentação deve ser "Entrada" ou "Saída"',
    }),
  }),
});

export type SchemaStockEntry = z.infer<typeof stockEntryFormSchema>;

export interface stockEntriesProps {
  productId: string;
  price: number;
  quantity: number;
  type: string;
}

export interface StockMovementsProps extends stockEntriesProps {
  id: string;
  product: {
  name: string;
  color: string;
  category: string;
  size: string | null;
  description: string;
  supplier: string;
  stock: number;
  imageUrl: string;

  }
}
