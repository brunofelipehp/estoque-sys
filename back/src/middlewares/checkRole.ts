import { FastifyReply, FastifyRequest } from 'fastify';

interface UserProps {
  id: string;
  role: string;
}
export const CheckRole = (roles: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
      const user = request.user as UserProps;

      if (!roles.includes(user.role)) {
        return reply.code(403).send({ message: 'Forbidden insufficient permissions' });
      }
    } catch (error) {
      return reply.code(403).send({ message: 'Unauthorized', error });
    }
  };
};
