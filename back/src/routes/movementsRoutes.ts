import { FastifyInstance } from 'fastify';
import {
  createMovementController,
  getMovementByIdController,
  getMovementsAllController,
  getMovementsPerProductController,
} from '../controllers/movementController';
import { CheckRole } from '../middlewares/checkRole';
import { verifyJwt } from '../middlewares/verify';

export async function movementsRouters(app: FastifyInstance) {
  app.get(
    '/movements',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1 },
            productName: { type: 'string' },
            type: { type: 'string' },
          },
        },
      },
      preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN', 'EDITOR', 'USER'])],
    },
    getMovementsAllController,
  );

  app.get(
    '/movement/:id',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN', 'EDITOR', 'USER'])] },
    getMovementByIdController,
  );

  app.post(
    '/movement',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN', 'EDITOR'])] },
    createMovementController,
  );

  app.get(
    '/movements/product/:id',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN', 'EDITOR', 'USER'])] },
    getMovementsPerProductController,
  );
}
