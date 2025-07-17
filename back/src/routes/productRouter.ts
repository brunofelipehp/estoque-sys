import { FastifyInstance } from 'fastify';
import { productController } from '../controllers/productsController';
import { CheckRole } from '../middlewares/checkRole';
import { verifyJwt } from '../middlewares/verify';

export async function productsRouters(app: FastifyInstance) {
  app.get(
    '/products',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN', 'EDITOR', 'USER'])] },
    productController.findAllProducts,
  );

  app.get(
    '/product/:id',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN', 'EDITOR', 'USER'])] },
    productController.findProductById,
  );

  app.post(
    '/product',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN'])] },
    productController.createProduct,
  );

  app.put(
    '/product/:id',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN'])] },
    productController.updateProduct,
  );

  app.delete(
    '/product/:id',
    { preHandler: [verifyJwt, CheckRole(['ROOT', 'ADMIN'])] },
    productController.deleteProduct,
  );
}
