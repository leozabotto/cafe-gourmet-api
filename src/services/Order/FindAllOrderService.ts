import Exception from '../../errors/Exception';
import OrderRepository from '../../repositories/OrderRepository';

import { Order } from '../../interfaces/OrderInterfaces';

interface IFindAllOrderService {
  execute: () => Promise<Order[]>;
}

export default class FindAllOrderService implements IFindAllOrderService {
  public orderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async execute() {
    const foundOrder = (await this.orderRepository.findAll()) as Order[];

    if (!foundOrder)
      throw new Exception({
        status: 'error',
        message: 'order not found',
        code: 404,
      });

    return foundOrder;
  }
}
