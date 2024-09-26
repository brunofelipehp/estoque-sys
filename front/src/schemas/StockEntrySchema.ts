import { z } from "zod";

export const stockEntryFormSchema = z.object({
  id: z.string().uuid(),
  name: z.object({
    value: z.string(),
    label: z.string(),
  }),
  costPrice: z
    .string()
    .min(1, { message: "Digite o Valor" })
    .transform((value) => Number(value)),
  salePrice: z
    .string()
    .min(1, { message: "Digite o Valor" })
    .transform((value) => Number(value)),
  quantity: z
    .string()
    .min(1, { message: "Digite o Valor" })
    .transform((value) => Number(value)),
  type: z.enum(["Entrada", "Saída"], {
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
}
