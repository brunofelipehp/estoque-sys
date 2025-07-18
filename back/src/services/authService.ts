import { prisma } from '../lib/prisma';
import { tokenUserDto } from '../schemas/authSchema';

import bcrypt from 'bcryptjs';

export const authService = {
  async login({ email, password }: tokenUserDto) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    return user;
  },
};
