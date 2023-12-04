import Exception from '../../errors/Exception';
import OrderRepository from '../../repositories/OrderRepository';

import { IRequestCreateOrder, Order } from '../../interfaces/OrderInterfaces';
import { Prisma } from '@prisma/client';

interface ICreateOrderService {
  OrderRepository: OrderRepository;
  validate: (params: IRequestCreateOrder) => Promise<boolean>;
  execute: (params: IRequestCreateOrder) => Promise<Order>;
}

export default class CreateOrderService implements ICreateOrderService {
  public OrderRepository;

  constructor() {
    this.OrderRepository = new OrderRepository();
  }

  async validate({
    addressId,
    customerId,
    date,
    items,
    total,
  }: IRequestCreateOrder) {
    switch (true) {
      case !addressId:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'addressId is required',
        });
      case customerId === undefined:
        throw new Exception({
          status: 'validation',
          code: 101,
          message: 'customerId is required',
        });
      case !items.length: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'items is required',
        });
      }
      case total === undefined: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'total is required',
        });
      }
      default:
        return true;
    }
  }

  async execute({
    addressId,
    customerId,
    date,
    items,
    total,
    paymentForm,
  }: IRequestCreateOrder) {
    await this.validate({
      addressId,
      customerId,
      date,
      items,
      total,
      paymentForm,
    });
    const Order = await this.OrderRepository.create({
      addressId,
      customerId,
      paymentForm,
      date,
      items,
      total: new Prisma.Decimal(total),
    });

    return Order;
  }
}
