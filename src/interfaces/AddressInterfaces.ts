import { Customer } from '@prisma/client';

export interface Address {
  id?: number;
  street?: string;
  number?: string;
  zipcode?: string;
  neighborhood?: string;
  state?: string;
  city?: string;
  complement?: string;
  customer: Customer;
  customerId: number;
}

export interface IRequestCreateAddress {
  street: string;
  number: string;
  zipcode: string;
  neighborhood: string;
  state: string;
  city: string;
  complement: string;
  customerId: number;
}

export interface IRequestUpdateAddress {
  id: number;
  street: string;
  number: string;
  zipcode: string;
  neighborhood: string;
  state: string;
  city: string;
  complement: string;
}

export interface IRequestFindAddress {
  id?: number;
}
