import { PrismaClient } from '@prisma/client';
import {
  IRequestCreateCustomer,
  Customer,
} from '../interfaces/CustomerInterfaces';

const prisma = new PrismaClient();

export default class CustomerRepository {
  async findById(id: number) {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    return customer;
  }

  async findByEmail(email: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    return customer;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        phoneNumber,
      },
    });

    return customer;
  }

  async create(params: IRequestCreateCustomer): Promise<Customer> {
    const customer = await prisma.customer.create({
      data: {
        email: params.email,
        name: params.name,
        cpf: params.cpf,
        password: params.password,
        phoneNumber: params.phoneNumber,
      },
    });

    return customer;
  }
}
