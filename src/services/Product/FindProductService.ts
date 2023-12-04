import Exception from '../../errors/Exception';
import ProductRepository from '../../repositories/ProductRepository';

import {
  IRequestFindProduct,
  Product,
} from '../../interfaces/ProductInterfaces';

interface IFindProductService {
  customerRepository: ProductRepository;
  validate: (params: IRequestFindProduct) => boolean;
  execute: (params: IRequestFindProduct) => Promise<Product>;
}

export default class FindProductService implements IFindProductService {
  public customerRepository;

  constructor() {
    this.customerRepository = new ProductRepository();
  }

  validate({ id }: IRequestFindProduct) {
    switch (true) {
      case !id:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'id is required',
        });
      default:
        return true;
    }
  }

  async execute({ id }: IRequestFindProduct) {
    this.validate({ id });

    const foundProduct = (await this.customerRepository.findById(
      Number(id),
    )) as Product;

    if (!foundProduct)
      throw new Exception({
        status: 'error',
        message: 'user not found',
        code: 404,
      });

    return foundProduct;
  }
}
