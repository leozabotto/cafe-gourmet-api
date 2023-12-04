import { Prisma } from '@prisma/client';

export interface Order {
  id?: number;
  date?: Date;
  total?: Prisma.Decimal;
  status?: string;
  paymentForm?: string;
  OrderItems?: OrderItem[];
}

export type OrderItem = {
  quantity: number;
  price: Prisma.Decimal;
  description: string;
  productId: number;
};

export interface IRequestCreateOrder {
  date?: Date;
  paymentForm: string;
  total: Prisma.Decimal;
  items: OrderItem[];
  addressId: number;
  customerId: number;
}

export interface IRequestUpdateOrder {
  id: number;
  status: string;
}

export interface IRequestFindOrder {
  id?: number;
}
