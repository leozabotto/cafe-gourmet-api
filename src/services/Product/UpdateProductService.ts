import Exception from '../../errors/Exception';
import ProductRepository from '../../repositories/ProductRepository';

import {
  IRequestUpdateProduct,
  Product,
} from '../../interfaces/ProductInterfaces';
import { Prisma } from '@prisma/client';

interface IUpdateProductService {
  ProductRepository: ProductRepository;
  validate: (params: IRequestUpdateProduct) => Promise<boolean>;
  execute: (params: IRequestUpdateProduct) => Promise<Product>;
}

export default class UpdateProductService implements IUpdateProductService {
  public ProductRepository;

  constructor() {
    this.ProductRepository = new ProductRepository();
  }

  async validate({ name, price, active, description }: IRequestUpdateProduct) {
    console.log(name, price, active, description);
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
      case !description: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'description is required',
        });
      }
      case active === undefined: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'active is required',
        });
      }
      default:
        return true;
    }
  }

  async execute({
    name,
    price,
    description,
    active,
    id,
  }: IRequestUpdateProduct) {
    await this.validate({ name, price, description, active, id });
    const Product = await this.ProductRepository.update({
      id,
      name,
      price: new Prisma.Decimal(price),
      description,
      active,
    });

    return Product;
  }
}
