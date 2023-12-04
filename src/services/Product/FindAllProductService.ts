import Exception from '../../errors/Exception';
import ProductRepository from '../../repositories/ProductRepository';

import { Product } from '../../interfaces/ProductInterfaces';

interface IFindAllProductService {
  execute: () => Promise<Product[]>;
}

export default class FindAllProductService implements IFindAllProductService {
  public customerRepository;

  constructor() {
    this.customerRepository = new ProductRepository();
  }

  async execute() {
    const foundProduct = (await this.customerRepository.findAll()) as Product[];

    if (!foundProduct)
      throw new Exception({
        status: 'error',
        message: 'user not found',
        code: 404,
      });

    return foundProduct;
  }
}
