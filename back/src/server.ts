import { fastifyCors } from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifyMultipart from '@fastify/multipart';
import Fastify from 'fastify';
import path from 'path';
import { movementsRouters } from './routes/movementsRoutes';
import { productsRouters } from './routes/productRouter';
import { userRouters } from './routes/userRoutes';
const app = Fastify();

app.register(fastifyCors, {
  origin: true,
});

app.register(fastifyJwt, {
  secret: process.env.SECRET_JWT as string,
});

app.register(fastifyMultipart);

app.register(require('@fastify/static'), {
  root: path.join(__dirname, '..', 'uploads'),
  prefix: '/uploads/',
});

app.register(productsRouters);
app.register(movementsRouters);
app.register(userRouters);

app.listen({ port: Number(process.env.Port || 7000), host: '0.0.0.0' }).then((address) => {
  console.log('Http server running in port 7000');
  console.log(`Server listening on ${address}`);
});
