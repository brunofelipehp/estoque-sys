import { MultipartFields } from '@fastify/multipart';
import z from 'zod';

export const productBodySchema = z.object({
  name: z.string(),
  color: z.string(),
  size: z.string().optional(),
  description: z.string(),
  category: z.string(),
  supplier: z.string(),
});

export const queryPagesParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  productName: z.string().optional(),
  type: z.string().optional(),
});

export type findAllMovementsByProductDto = z.infer<typeof queryPagesParamsSchema>;

interface ProductFields {
  [key: string]: { value: string | undefined | MultipartFields };
}

export const parseProductFields = (productFields: ProductFields) => {
  return {
    name: productFields.name.value as string,
    color: productFields.color.value as string,
    size: productFields.size?.value,
    description: productFields.description.value as string,
    category: productFields.category.value as string,
    supplier: productFields.supplier.value as string,
  };
};
