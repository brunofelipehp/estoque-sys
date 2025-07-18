import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { userTokenSchema } from '../schemas/authSchema';
import { authService } from '../services/authService';

export const loginController = {
  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = userTokenSchema.parse(request.body);

      const user = await authService.login({ email, password });

      const token = await reply.jwtSign({ id: user.id, role: user.role });

      reply.code(200).send({ token });
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors.map((err) => err.message);
        return reply.code(400).send({ message: 'Error logging in', errors: message });
      }
      return reply.status(500).send({
        message: 'Error logging in',
        error: error instanceof Error ? error.message : error,
      });
    }
  },
};
