import { PrismaClient } from '@prisma/client';
import {
  IRequestCreateOrder,
  IRequestUpdateOrder,
  Order,
} from '../interfaces/OrderInterfaces';

const prisma = new PrismaClient();

export default class OrderRepository {
  async findById(id: number) {
    const product = await prisma.order.findUnique({
      include: {
        OrderItems: true,
        address: true,
        customer: true,
      },
      where: {
        id,
      },
    });

    return product;
  }

  async findAll() {
    const product = await prisma.order.findMany({
      include: {
        OrderItems: true,
        address: true,
        customer: true,
      },
    });

    return product;
  }

  async create(params: IRequestCreateOrder): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        status: 'Aguardando Confirmação',
        total: params.total,
        addressId: params.addressId,
        customerId: params.customerId,
        paymentForm: params.paymentForm,
        date: params.date,
        OrderItems: {
          create: params.items.map((item) => ({
            quantity: +item.quantity,
            description: item.description,
            productId: item.productId,
            price: item.price,
          })),
        },
      },
    });

    return order as unknown as Order;
  }

  async update(params: IRequestUpdateOrder): Promise<Order> {
    const order = await prisma.order.update({
      where: {
        id: params.id,
      },
      data: {
        ...params,
      },
    });

    return order;
  }
}
