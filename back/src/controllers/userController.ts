import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { prisma } from '../lib/prisma';
import { idParamSchema } from '../schemas/idSchema';
import { userBodySchema } from '../schemas/userSchema';

export const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { name, email, password, role } = userBodySchema.parse(request.body);

    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      return reply.code(400).send({ message: 'User already exists' });
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

    reply.code(201).send({ message: 'User created with successfull' });
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors.map((err) => err.message);
      return reply.code(400).send({ message: 'Error creating user', errors: message });
    }
    reply.code(500).send({ message: 'Error creating user', error });
  }
};

export const getUsersController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await prisma.user.findMany();

    return reply.code(200).send(users);
  } catch (error) {
    reply.code(500).send({ message: 'Error fetching users', error });
  }
};

export const findUserByIdController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = idParamSchema.parse(request.params);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return reply.code(404).send({ message: 'User not found' });
    }
    return reply.code(200).send(user);
  } catch {
    reply.code(500).send({ message: 'Error fetching user' });
  }
};
