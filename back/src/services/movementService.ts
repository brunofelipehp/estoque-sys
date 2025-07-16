import { prisma } from '../lib/prisma';
import { FindMovementDto } from '../schemas/idSchema';
import { movementDto } from '../schemas/movementSchema';
import { findAllMovementsByProductDto } from '../schemas/productSchema';

export const movementService = {
  async createMovement(movementData: movementDto) {
    const { productId, price, quantity, type } = movementData;

    const product = await prisma.product.findUniqueOrThrow({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    if (type === 'OUT' && product.stock < quantity) {
      throw new Error('Quantidade insuficiente em estoque.');
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
  },

  async findAllMovements(findAllMovements: findAllMovementsByProductDto) {
    const { page, limit, productName, type } = findAllMovements;

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
    return {
      movements,
      totalPages,
      profit,
      expenses,
      totalProfit,
    };
  },

  async findMovementById(idMovement: FindMovementDto) {
    const { id } = idMovement;

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

    return {
      movement,
      profit,
      expenses,
      totalProfit,
    };
  },

  async findMovementsPerProduct(idMovement: FindMovementDto) {
    const { id: productId } = idMovement;

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
      throw new Error('Movements not found.');
    }

    const profit = movements.reduce((acc, movement) => {
      return movement.type === 'OUT' ? acc + movement.totalPrice : acc;
    }, 0);

    const expenses = movements.reduce((acc, movement) => {
      return movement.type === 'IN' ? acc + movement.totalPrice : acc;
    }, 0);

    const totalProfit = profit - expenses;

    return {
      movements,
      profit,
      expenses,
      totalProfit,
    };
  },
};
