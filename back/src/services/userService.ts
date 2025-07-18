import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { FindUserDto } from '../schemas/idSchema';
import { userDto } from '../schemas/userSchema';

export const userService = {
  async findUsers() {
    return await prisma.user.findMany();
  },

  async createUser({ name, email, password, role }: userDto) {
    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
  },

  async findUserById({ id }: FindUserDto) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },
};
