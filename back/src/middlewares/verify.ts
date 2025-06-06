import { FastifyReply, FastifyRequest } from 'fastify';

export const verifyJwt = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.code(401).send({ message: 'Unauthorized', error });
  }
};
