import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';
import { idParamSchema } from '../schemas/idSchema';
import { movementSchema } from '../schemas/movementSchema';
import { queryPagesParamsSchema } from '../schemas/productSchema';

export const getMovementsAllController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { page, limit, productName, type } = queryPagesParamsSchema.parse(request.query);

    const offset = page && limit ? (page - 1) * limit : 0;

    const whereCondition: any = {};

    if (productName) {
      whereCondition.product = {
        name: {
          contains: productName,
          mode: 'insensitive',
        },
      };
    }

    if (type) {
      whereCondition.type = type;
    }

    const totalMovements = await prisma.movement.count({ where: whereCondition });

    const totalPages = totalMovements > 5 && limit ? Math.ceil(totalMovements / limit) : 1;

    const movements = await prisma.movement.findMany({
      where: whereCondition,
      include: {
        product: {
          select: {
            name: true,
            color: true,
            supplier: true,
          },
        },
      },
      take: limit,
      skip: offset,
    });

    const profit = movements.reduce((acc, movement) => {
      return movement.type === 'OUT' ? acc + movement.totalPrice : acc;
    }, 0);

    const expenses = movements.reduce((acc, movement) => {
      return movement.type === 'IN' ? acc + movement.totalPrice : acc;
    }, 0);

    const totalProfit = profit - expenses;

    //sconst {id, productId } = movements;

    return reply.code(200).send({ movements, totalPages, profit, expenses, totalProfit });
  } catch (error) {
    reply
      .code(400)
      .send({ message: 'An error occurred while fetching the movement.', error: error || '' });
  }
};

export const getMovementByIdController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = idParamSchema.parse(request.params);

    const movement = await prisma.movement.findUniqueOrThrow({
      where: { id },
      include: {
        product: {
          select: {
            name: true,
            color: true,
            imageUrl: true,
            description: true,
            supplier: true,
            size: true,
            stock: true,
            createdAt: true,
            updatedAt: true,
            category: true,
          },
        },
      },
    });

    const summary = await prisma.$queryRaw<{ type: string; total: number }[]>`
    SELECT type, SUM("totalPrice") AS total
     FROM "Movement" 
     WHERE "productId" = ${movement.productId}
      GROUP BY type
      `;

    let profit = 0;
    let expenses = 0;

    for (const item of summary) {
      if (item.type === 'OUT') profit = Number(item.total);
      if (item.type === 'IN') expenses = Number(item.total);
    }

    const totalProfit = profit - expenses;

    return reply.code(200).send({ movement, profit, expenses, totalProfit });
  } catch (error) {
    reply
      .code(400)
      .send({ message: 'An error occurred while fetching the movement.', error: error || '' });
  }
};

export const createMovementController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { productId, price, quantity, type } = movementSchema.parse(request.body);

    const product = await prisma.product.findUniqueOrThrow({
      where: { id: productId },
    });

    if (type === 'OUT' && product.stock < quantity) {
      return reply.code(400).send({ message: 'Quantidade insuficiente em estoque.' });
    }

    if (!product) {
      reply.code(400).send({ message: 'Product not found.' });
    }

    const updatedStock = type === 'IN' ? product.stock + quantity : product.stock - quantity;

    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: updatedStock,
      },
    });

    const totalPrice = price * quantity;

    await prisma.movement.create({
      data: {
        productId,
        price,
        totalPrice,
        quantity,
        type,
      },
    });

    return reply.code(201).send('Movimentação feita com sucesso');
  } catch (error) {
    reply
      .code(400)
      .send({ message: 'An error occurred while fetching the movement.', error: error || '' });
  }
};

export const getMovementsPerProductController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id: productId } = idParamSchema.parse(request.params);

    const movements = await prisma.movement.findMany({
      where: { productId },
      include: {
        product: {
          select: {
            name: true,
            color: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!movements) {
      return reply.code(400).send({ message: 'Movements not found.' });
    }

    const profit = movements.reduce((acc, movement) => {
      return movement.type === 'OUT' ? acc + movement.totalPrice : acc;
    }, 0);

    const expenses = movements.reduce((acc, movement) => {
      return movement.type === 'IN' ? acc + movement.totalPrice : acc;
    }, 0);

    const totalProfit = profit - expenses;

    return reply.code(200).send({ movements, profit, expenses, totalProfit });
  } catch (error) {
    reply
      .code(400)
      .send({ message: 'An error occurred while fetching the movement.', error: error || '' });
  }
};
