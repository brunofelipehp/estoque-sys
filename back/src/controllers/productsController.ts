import { MultipartFields, MultipartFile } from '@fastify/multipart';
import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';
import { minioClient } from '../middlewares/minioClient';
import { idParamSchema } from '../schemas/idSchema';
import { productBodySchema } from '../schemas/productSchema';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const getProductsAllController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const products = await prisma.product.findMany();

    return reply.code(200).send(products);
  } catch (error) {
    reply
      .code(400)
      .send({ message: 'An error occurred while fetching the product.', error: error || '' });
  }
};

export const getProductByIdController = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = idParamSchema.parse(request.params);

  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
    });

    if (!product) {
      return reply.code(404).send('Product not found');
    }

    return reply.send(product).code(200);
  } catch (error) {
    reply
      .code(400)
      .send({ message: 'An error occurred while fetching the product.', error: error || '' });
  }
};
export const createProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const product = await request.file();

    if (!product) {
      reply.code(400).send({ error: 'product image not selected' });
    }

    const productImage = product as MultipartFile;
    const productFields = product?.fields as MultipartFields;
    const mimeTypes = productImage.mimetype;

    if (!ALLOWED_MIME_TYPES.includes(mimeTypes)) {
      reply.code(400).send({ error: 'Only image files (JPEG, PNG, WEBP) are allowed' });
    }

    const { name, color, size, description, category, supplier } = productBodySchema.parse({
      name: (productFields.name as { value: string }).value,
      color: (productFields.color as { value: string }).value,
      size: (productFields.size as { value: string | undefined }).value,
      description: (productFields.description as { value: string }).value,
      category: (productFields.category as { value: string }).value,
      supplier: (productFields.supplier as { value: string }).value,
    });

    const fileName = `${Date.now()}-${productImage.filename}`;

    const imageUrl = `http://localhost:9000/uploads/${fileName}`;

    await minioClient.putObject('uploads', fileName, productImage.file);

    await prisma.product.create({
      data: {
        name,
        color,
        size,
        description,
        category,
        supplier,
        imageUrl,
      },
    });

    return reply.code(201).send('Product created with success!!!');
  } catch (error) {
    reply
      .code(400)
      .send({ message: 'An error occurred while fetching the product.', error: error || '' });
  }
};

export const updateProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = idParamSchema.parse(request.params as string);

  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) {
    return reply.code(404).send({ error: 'Product not found' });
  }

  const product = await request.file();

  if (!product) {
    reply.code(400).send({ error: 'product image not selected' });
  }

  const productImage = product as MultipartFile;
  const productFields = product?.fields as MultipartFields;
  const mimeTypes = productImage.mimetype;

  if (!ALLOWED_MIME_TYPES.includes(mimeTypes)) {
    reply.code(400).send({ error: 'Only image files (JPEG, PNG, WEBP) are allowed' });
  }

  const { name, color, size, description, category, supplier } = productBodySchema.parse({
    name: (productFields.name as { value: string }).value,
    color: (productFields.color as { value: string }).value,
    size: (productFields.size as { value: string | undefined }).value,
    description: (productFields.description as { value: string }).value,
    category: (productFields.category as { value: string }).value,
    supplier: (productFields.supplier as { value: string }).value,
  });

  let imageUrl = existingProduct.imageUrl;

  if (productImage) {
    const fileName = `${Date.now()}-${productImage.filename}`;

    imageUrl = `http://localhost:9000/uploads/${fileName}`;

    const oldImagePath = existingProduct.imageUrl.replace('http://localhost:9000/uploads/', '');
    console.log(oldImagePath);

    await minioClient.removeObject('uploads', oldImagePath);

    await minioClient.putObject('uploads', fileName, productImage.file);
  }

  try {
    const productUpdated = await prisma.product.update({
      where: { id },
      data: {
        name,
        color,
        size,
        description,
        category,
        supplier,
        imageUrl,
      },
    });

    return reply.code(200).send(productUpdated);
  } catch (error) {
    reply
      .code(400)
      .send({ message: 'An error occurred while updated the product.', error: error || '' });
  }
};

export const deleteProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = idParamSchema.parse(request.params);

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return reply.code(404).send({ error: 'Product not found' });
    }

    const imageUrl = existingProduct.imageUrl.replace('http://localhost:9000/uploads/', '');

    await minioClient.removeObject('uploads', imageUrl);

    await prisma.product.delete({
      where: { id: id },
    });

    return reply.code(200).send('Product deleted successfully');
  } catch (error) {
    reply
      .code(400)
      .send({ message: 'An error occurred while fetching the product.', error: error || '' });
  }
};
