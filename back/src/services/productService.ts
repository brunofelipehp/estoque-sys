import { MultipartFields, MultipartFile } from '@fastify/multipart';
import { prisma } from '../lib/prisma';
import { minioClient } from '../middlewares/minioClient';
import { FindProductDto } from '../schemas/idSchema';
import { productBodySchema } from '../schemas/productSchema';
import { ALLOWED_MIME_TYPES } from '../utils/constants';

export const productService = {
  async findAllProducts() {
    return await prisma.product.findMany();
  },

  async findProductById({ id }: FindProductDto) {
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  },

  async createProduct(productImage: MultipartFile, productFields: MultipartFields) {
    const mimeTypes = productImage.mimetype;

    if (!ALLOWED_MIME_TYPES.includes(mimeTypes)) {
      throw new Error('Only image files (JPEG, PNG, WEBP) are allowed');
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
  },

  async updateProduct(
    productImage: MultipartFile,
    productFields: MultipartFields,
    { id }: FindProductDto,
  ) {
    const existingProduct = await this.findProductById({ id });

    if (!existingProduct) {
      throw new Error('Product not found');
    }
    const mimeTypes = productImage.mimetype;

    if (!ALLOWED_MIME_TYPES.includes(mimeTypes)) {
      throw new Error('Only image files (JPEG, PNG, WEBP) are allowed');
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

    return productUpdated;
  },

  async deleteProduct({ id }: FindProductDto) {
    const existingProduct = await this.findProductById({ id });

    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const imageUrl = existingProduct.imageUrl.replace('http://localhost:9000/uploads/', '');

    await minioClient.removeObject('uploads', imageUrl);

    await prisma.product.delete({
      where: { id },
    });
  },
};
