import z from 'zod';

const MovementType = ['IN', 'OUT'] as const;

export const movementSchema = z.object({
  productId: z.string().uuid(),
  price: z.number(),
  quantity: z.number().int(),
  type: z.enum(MovementType),
});
