import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError, ZodIssue } from 'zod';
import { idParamSchema } from '../schemas/idSchema';
import { userBodySchema } from '../schemas/userSchema';
import { userService } from '../services/userService';

export const userController = {
  async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password, role } = userBodySchema.parse(request.body);

      await userService.createUser({
        name,
        email,
        password,
        role,
      });

      reply.code(201).send({ message: 'User created with successfull' });
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors.map((err: ZodIssue) => err.message);
        return reply.code(400).send({ message: 'Error creating user', errors: message });
      }
      reply.code(500).send({ message: 'Error creating user', error });
    }
  },

  async findUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await userService.findUsers();

      return reply.code(200).send(users);
    } catch (error) {
      reply.code(500).send({
        message: 'Error fetching user',
        error: error instanceof Error ? error.message : error,
      });
    }
  },

  async findUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = idParamSchema.parse(request.params);

      const user = await userService.findUserById({ id });

      return reply.code(200).send(user);
    } catch (error) {
      reply.code(500).send({
        message: 'Error fetching user',
        error: error instanceof Error ? error.message : error,
      });
    }
  },
};
