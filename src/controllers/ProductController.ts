import { Request, Response } from 'express';
import {
  IRequestCreateProduct,
  IRequestFindProduct,
} from '../interfaces/ProductInterfaces';

import CreateProductService from '../services/Product/CreateProductService';
import FindProductService from '../services/Product/FindProductService';
import FindAllProductService from '../services/Product/FindAllProductService';

export default class ProductController {
  async create(req: Request, res: Response) {
    const { name, description, price }: IRequestCreateProduct = req.body;

    const createProductService = new CreateProductService();
    const createdProduct = await createProductService.execute({
      name,
      description,
      price,
      image: 'A',
    });

    res.json(createdProduct);
  }

  async find(req: Request, res: Response) {
    const { id }: IRequestFindProduct = req.params;

    const findProductService = new FindProductService();
    const foundProduct = await findProductService.execute({
      id,
    });

    res.json(foundProduct);
  }

  async findAll(req: Request, res: Response) {
    const findAllProductService = new FindAllProductService();
    const foundProducts = await findAllProductService.execute();

    res.json(foundProducts);
  }
}
