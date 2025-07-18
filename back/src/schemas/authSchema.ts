import z from 'zod';

export const userTokenSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});
export type userTokenType = z.infer<typeof userTokenSchema>;
export type tokenUserDto = userTokenType;
