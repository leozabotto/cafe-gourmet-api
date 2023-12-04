import Exception from '../../errors/Exception';
import OrderRepository from '../../repositories/OrderRepository';

import { IRequestFindOrder, Order } from '../../interfaces/OrderInterfaces';

interface IFindOrderService {
  orderRepository: OrderRepository;
  validate: (params: IRequestFindOrder) => boolean;
  execute: (params: IRequestFindOrder) => Promise<Order>;
}

export default class FindOrderService implements IFindOrderService {
  public orderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  validate({ id }: IRequestFindOrder) {
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

  async execute({ id }: IRequestFindOrder) {
    this.validate({ id });

    const foundOrder = (await this.orderRepository.findById(
      Number(id),
    )) as Order;

    if (!foundOrder)
      throw new Exception({
        status: 'error',
        message: 'order not found',
        code: 404,
      });

    return foundOrder;
  }
}
