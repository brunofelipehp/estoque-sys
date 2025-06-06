import { FastifyInstance } from 'fastify';
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsAllController,
  updateProductController,
} from '../controllers/productsController';
import { CheckRole } from '../middlewares/checkRole';
import { verifyJwt } from '../middlewares/verify';

export async function productsRouters(app: FastifyInstance) {
  app.get(
    '/products',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN', 'EDITOR', 'USER'])] },
    getProductsAllController,
  );

  app.get(
    '/product/:id',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN', 'EDITOR', 'USER'])] },
    getProductByIdController,
  );

  app.post(
    '/product',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN'])] },
    createProductController,
  );

  app.put(
    '/product/:id',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN'])] },
    updateProductController,
  );

  app.delete(
    '/product/:id',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN'])] },
    deleteProductController,
  );
}
