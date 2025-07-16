import { FastifyReply, FastifyRequest } from 'fastify';
import { idParamSchema } from '../schemas/idSchema';
import { movementSchema } from '../schemas/movementSchema';
import { queryPagesParamsSchema } from '../schemas/productSchema';
import { movementService } from '../services/movementService';

export const movementController = {
  async getMovementsAllControllers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, limit, productName, type } = queryPagesParamsSchema.parse(request.query);

      const { movements, totalPages, profit, expenses, totalProfit } =
        await movementService.findAllMovements({
          page,
          limit,
          productName,
          type,
        });

      return reply.code(200).send({ movements, totalPages, profit, expenses, totalProfit });
    } catch (error) {
      reply
        .code(400)
        .send({ message: 'An error occurred while fetching the movement.', error: error || '' });
    }
  },

  async getMovementByIdControllers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = idParamSchema.parse(request.params);

      const { movement, profit, expenses, totalProfit } = await movementService.findMovementById({
        id,
      });

      return reply.code(200).send({ movement, profit, expenses, totalProfit });
    } catch (error) {
      reply
        .code(400)
        .send({ message: 'An error occurred while fetching the movement.', error: error || '' });
    }
  },

  async createMovementControllers(request: FastifyRequest, reply: FastifyReply) {
    const { productId, price, quantity, type } = movementSchema.parse(request.body);

    try {
      await movementService.createMovement({
        productId,
        price,
        quantity,
        type,
      });

      return reply.code(201).send('Movimentação feita com sucesso');
    } catch (error) {
      reply.code(400).send({
        message: 'An error occurred while fetching the movement.',
        error: error instanceof Error ? error.message : error,
      });
    }
  },

  async getMovementsPerProductControllers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = idParamSchema.parse(request.params);

      const { movements, profit, expenses, totalProfit } =
        await movementService.findMovementsPerProduct({
          id,
        });

      return reply.code(200).send({ movements, profit, expenses, totalProfit });
    } catch (error) {
      reply
        .code(400)
        .send({ message: 'An error occurred while fetching the movement.', error: error || '' });
    }
  },
};
