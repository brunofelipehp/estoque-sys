import z from 'zod';

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

export const idUser = z.object({
  user: z.object({
    id: z.string().uuid(),
  }),
});

export type FindMovementDto = z.infer<typeof idParamSchema>;
export type FindProductDto = FindMovementDto;
export type FindUserDto = FindMovementDto;
