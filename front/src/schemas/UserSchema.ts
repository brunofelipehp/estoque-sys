import z from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  role: z.enum(['ROOT', 'ADMIN', 'EDITOR', 'USER']),
});

export type UserProps = z.infer<typeof userSchema>;

export interface UserTableProps extends UserProps {
  id: string; 
}
