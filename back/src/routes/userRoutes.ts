import { FastifyInstance } from 'fastify';
import { loginController } from '../controllers/authController';
import {
  createUserController,
  findUserByIdController,
  getUsersController,
} from '../controllers/userController';
import { CheckRole } from '../middlewares/checkRole';

export async function userRouters(app: FastifyInstance) {
  app.get('/users', { preHandler: CheckRole(['ADMIN', 'ROOT']) }, getUsersController);
  app.get(
    '/user/:id',
    { preHandler: CheckRole(['ADMIN', 'ROOT', 'EDITOR', 'USER']) },
    findUserByIdController,
  );
  app.post('/user', { preHandler: CheckRole(['ADMIN', 'ROOT']) }, createUserController);
  app.post('/login', loginController);
}
