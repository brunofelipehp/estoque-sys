import bcrypt from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { prisma } from '../lib/prisma';
import { userTokenSchema } from '../schemas/authSchema';

export const loginController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = userTokenSchema.parse(request.body);

    const user = await prisma.user.findUniqueOrThrow({ where: { email } });

    if (!user) {
      reply.code(400).send({ message: 'Invalid credentials' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      reply.code(400).send({ message: 'Invalid credentials' });
    }

    const token = await reply.jwtSign({ id: user.id, role: user.role });
    reply.code(200).send({ token });
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors.map((err) => err.message);
      return reply.code(400).send({ message: 'Error logging in', errors: message });
    }
    return reply.status(500).send({ message: 'Error logging in', error });
  }
};
