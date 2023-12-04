import Exception from '../../errors/Exception';
import ProductRepository from '../../repositories/ProductRepository';

import {
  IRequestCreateProduct,
  Product,
} from '../../interfaces/ProductInterfaces';
import { Prisma } from '@prisma/client';

interface ICreateProductService {
  ProductRepository: ProductRepository;
  validate: (params: IRequestCreateProduct) => Promise<boolean>;
  execute: (params: IRequestCreateProduct) => Promise<Product>;
}

export default class CreateProductService implements ICreateProductService {
  public ProductRepository;

  constructor() {
    this.ProductRepository = new ProductRepository();
  }

  async validate({ name, price, image, description }: IRequestCreateProduct) {
    switch (true) {
      case !name:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'name is required',
        });
      case price === undefined:
        throw new Exception({
          status: 'validation',
          code: 101,
          message: 'price is required',
        });
      case !image: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'image is required',
        });
      }
      case !description: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'description is required',
        });
      }
      default:
        return true;
    }
  }

  async execute({ name, price, description, image }: IRequestCreateProduct) {
    await this.validate({ name, price, description, image });
    const Product = await this.ProductRepository.create({
      name,
      price: new Prisma.Decimal(price),
      description,
      image,
    });

    return Product;
  }
}
