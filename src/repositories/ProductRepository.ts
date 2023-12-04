import { PrismaClient } from '@prisma/client';
import {
  IRequestCreateProduct,
  Product,
} from '../interfaces/ProductInterfaces';

const prisma = new PrismaClient();

export default class ProductRepository {
  async findById(id: number) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  }

  async findAll() {
    const product = await prisma.product.findMany();

    return product;
  }

  async create(params: IRequestCreateProduct): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        ...params,
      },
    });

    return product;
  }
}
