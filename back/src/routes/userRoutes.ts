import { FastifyInstance } from 'fastify';
import { loginController } from '../controllers/authController';
import { userController } from '../controllers/userController';
import { CheckRole } from '../middlewares/checkRole';

export async function userRouters(app: FastifyInstance) {
  app.get('/users', { preHandler: CheckRole(['ADMIN', 'ROOT']) }, userController.findUsers);
  app.get(
    '/user/:id',
    { preHandler: CheckRole(['ADMIN', 'ROOT', 'EDITOR', 'USER']) },
    userController.findUserById,
  );
  app.post('/user', { preHandler: CheckRole(['ADMIN', 'ROOT']) }, userController.createUser);
  app.post('/login', loginController.login);
}
