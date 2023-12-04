import { Prisma } from '@prisma/client';

export interface Product {
  id?: number;
  name?: string;
  price?: Prisma.Decimal;
  description?: string;
  image?: string;
  active?: boolean;
}

export interface IRequestCreateProduct {
  name: string;
  price: Prisma.Decimal;
  image: string;
  description: string;
}

export interface IRequestUpdateProduct {
  id: number;
  name: string;
  price: Prisma.Decimal;
  active: boolean;
  description: string;
}

export interface IRequestFindProduct {
  id?: number;
}
