import { MultipartFields, MultipartFile } from '@fastify/multipart';
import { FastifyReply, FastifyRequest } from 'fastify';
import { idParamSchema } from '../schemas/idSchema';
import { productService } from '../services/productService';

export const productController = {
  async findAllProducts(request: FastifyRequest, reply: FastifyReply) {
    try {
      const products = await productService.findAllProducts();

      return reply.code(200).send(products);
    } catch (error) {
      reply
        .code(400)
        .send({ message: 'An error occurred while fetching the product.', error: error || '' });
    }
  },

  async findProductById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idParamSchema.parse(request.params);

    try {
      const product = await productService.findProductById({ id });

      return reply.code(200).send(product);
    } catch (error) {
      reply.code(400).send({
        message: 'An error occurred while fetching the product.',
        error: error instanceof Error ? error.message : error,
      });
    }
  },

  async createProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const product = await request.file();

      if (!product) {
        reply.code(400).send({ error: 'product image not selected' });
      }

      const productImage = product as MultipartFile;
      const productFields = product?.fields as MultipartFields;

      await productService.createProduct(productImage, productFields);

      return reply.code(201).send('Product created with success!!!');
    } catch (error) {
      reply.code(400).send({
        message: 'An error occurred while fetching the product.',
        error: error instanceof Error ? error.message : error,
      });
    }
  },

  async updateProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = idParamSchema.parse(request.params as string);

      const product = await request.file();

      if (!product) {
        reply.code(400).send({ error: 'product image not selected' });
      }

      const productImage = product as MultipartFile;
      const productFields = product?.fields as MultipartFields;

      const productUpdated = await productService.updateProduct(productImage, productFields, {
        id,
      });

      return reply.code(200).send(productUpdated);
    } catch (error) {
      reply.code(400).send({
        message: 'An error occurred while fetching the product.',
        error: error instanceof Error ? error.message : error,
      });
    }
  },

  async deleteProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = idParamSchema.parse(request.params);

      await productService.deleteProduct({ id });
      return reply.code(200).send('Product deleted successfully');
    } catch (error) {
      reply.code(400).send({
        message: 'An error occurred while fetching the product.',
        error: error instanceof Error ? error.message : error,
      });
    }
  },
};
