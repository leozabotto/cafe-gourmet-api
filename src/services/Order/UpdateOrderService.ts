import Exception from '../../errors/Exception';
import OrderRepository from '../../repositories/OrderRepository';

import { IRequestUpdateOrder, Order } from '../../interfaces/OrderInterfaces';

interface IUpdateOrderService {
  OrderRepository: OrderRepository;
  validate: (params: IRequestUpdateOrder) => Promise<boolean>;
  execute: (params: IRequestUpdateOrder) => Promise<Order>;
}

export default class UpdateOrderService implements IUpdateOrderService {
  public OrderRepository;

  constructor() {
    this.OrderRepository = new OrderRepository();
  }

  async validate({ status }: IRequestUpdateOrder) {
    switch (true) {
      case !status:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'status is required',
        });

      default:
        return true;
    }
  }

  async execute({ status, id }: IRequestUpdateOrder) {
    await this.validate({ status, id });
    const Order = await this.OrderRepository.update({
      id,
      status,
    });

    return Order;
  }
}
