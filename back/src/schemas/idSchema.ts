import z from 'zod';

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

export const idUser = z.object({
  user: z.object({
    id: z.string().uuid(),
  }),
});
