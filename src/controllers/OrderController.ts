import { Request, Response } from 'express';
import {
  IRequestCreateOrder,
  IRequestUpdateOrder,
  IRequestFindOrder,
} from '../interfaces/OrderInterfaces';

import CreateOrderService from '../services/Order/CreateOrderService';
import UpdateOrderService from '../services/Order/UpdateOrderService';
import FindOrderService from '../services/Order/FindOrderService';
import FindAllOrderService from '../services/Order/FindAllOrderService';

export default class OrderController {
  async create(req: Request, res: Response) {
    const { addressId, customerId, items, total }: IRequestCreateOrder =
      req.body;

    const createOrderService = new CreateOrderService();
    const createdOrder = await createOrderService.execute({
      addressId,
      customerId,
      items,
      total,
    });

    res.json(createdOrder);
  }

  async update(req: Request, res: Response) {
    const { status }: IRequestUpdateOrder = req.body;

    const { id } = req.params;

    const updateOrderService = new UpdateOrderService();
    const updatedOrder = await updateOrderService.execute({
      id: +id,
      status,
    });

    res.json(updatedOrder);
  }

  async find(req: Request, res: Response) {
    const { id }: IRequestFindOrder = req.params;

    const findOrderService = new FindOrderService();
    const foundOrder = await findOrderService.execute({
      id,
    });

    res.json(foundOrder);
  }

  async findAll(req: Request, res: Response) {
    const findAllOrderService = new FindAllOrderService();
    const foundOrders = await findAllOrderService.execute();

    res.json(foundOrders);
  }
}
